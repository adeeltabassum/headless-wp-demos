import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "fs";
import path from "path";
import { BuilderDraftSchema } from "@/lib/builder/schema";
import { deriveContent, deriveTheme } from "@/lib/builder/derive";
import { deriveLocalContent, deriveLocalTheme } from "@/lib/builder/deriveLocal";
import { deriveSaasContent, deriveSaasTheme } from "@/lib/builder/deriveSaas";
import { deriveEcommerceContent, deriveEcommerceTheme } from "@/lib/builder/deriveEcommerce";
import { generateAllSiteFiles } from "@/lib/builder/generateSiteFiles";
import { generateLocalSiteFiles } from "@/lib/builder/generateLocalSiteFiles";
import { generateSaasSiteFiles } from "@/lib/builder/generateSaasSiteFiles";
import { generateEcommerceSiteFiles } from "@/lib/builder/generateEcommerceSiteFiles";
import { extractDraftImages } from "@/lib/builder/extractImages";
import { isSlugTaken, upsertEntry, type SiteRegistryEntry } from "@/lib/sites/registry";
import { isGithubConfigured, commitFilesAndOpenPr, type CommitFile } from "@/lib/builder/github";

/**
 * Validates the full draft, derives the real NicheTemplateContent/Theme,
 * generates every file the site needs (via the same generator the CLI
 * scaffold script uses), and either:
 *  - commits them to a new branch + opens a PR (GITHUB_TOKEN configured), or
 *  - returns a "dry run" describing exactly what would have been written
 *    (no credentials configured — keeps the feature testable/demoable).
 */
export async function POST(req: NextRequest) {
  let body: { draft?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = BuilderDraftSchema.safeParse(body.draft);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Draft is incomplete or invalid.",
        issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      },
      { status: 400 }
    );
  }
  const draft = parsed.data;

  if (isSlugTaken(draft.slug)) {
    return NextResponse.json(
      { error: `Slug "${draft.slug}" is already used by a published site. Choose a different URL slug.` },
      { status: 409 }
    );
  }
  try {
    if (existsSync(path.join(process.cwd(), "src", "app", draft.slug))) {
      return NextResponse.json(
        { error: `A route already exists at /${draft.slug} in this repo. Choose a different URL slug.` },
        { status: 409 }
      );
    }
  } catch {
    // fs unavailable in this runtime — the registry check above is the source of truth there.
  }

  const templateId = draft.templateId || "niche-template";

  let siteFiles;
  let imageFiles: Awaited<ReturnType<typeof extractDraftImages>>["imageFiles"] = [];
  let publishSummary: { categories?: string; articles?: number } = {};

  if (templateId === "local") {
    const localContent = deriveLocalContent(draft);
    const localTheme = deriveLocalTheme(draft);
    siteFiles = generateLocalSiteFiles(draft.slug, localContent, localTheme);
    publishSummary = { categories: draft.categories?.map((c) => c.label).join(", "), articles: 0 };
  } else if (templateId === "saas") {
    const saasContent = deriveSaasContent(draft);
    const saasTheme = deriveSaasTheme(draft);
    siteFiles = generateSaasSiteFiles(draft.slug, saasContent, saasTheme);
    publishSummary = {
      categories: draft.categories?.map((c) => c.label).join(", "),
      articles: draft.articles?.length || 0,
    };
  } else if (templateId === "ecommerce") {
    const ecommerceContent = deriveEcommerceContent(draft);
    const ecommerceTheme = deriveEcommerceTheme(draft);
    siteFiles = generateEcommerceSiteFiles(draft.slug, ecommerceContent, ecommerceTheme);
    publishSummary = {
      categories: draft.categories?.map((c) => c.label).join(", "),
      articles: draft.articles?.length || 0,
    };
  } else {
    const rawContent = deriveContent(draft);
    const theme = deriveTheme(draft);
    const extracted = await extractDraftImages(draft.slug, rawContent);
    const { content, imageFiles: imgs } = extracted;
    imageFiles = imgs;
    siteFiles = generateAllSiteFiles({ slug: draft.slug, content, theme });
    publishSummary = {
      categories: content.categories.map((c) => c.label).join(", "),
      articles: content.articles.length,
    };
  }

  if (templateId !== "niche-template") {
    // Extract logo/favicon data URLs for local/saas if present
    const { imageFiles: brandImages } = await extractDraftImages(draft.slug, deriveContent({ ...draft, templateId: "niche-template" }));
    imageFiles = brandImages.filter((f) => f.path.includes("logo") || f.path.includes("favicon"));
  }

  const textFiles: CommitFile[] = siteFiles.map((f) => ({ path: f.path, content: f.contents, encoding: "utf-8" }));
  const allFiles = [...textFiles, ...imageFiles];

  const now = new Date().toISOString();
  const entry: SiteRegistryEntry = {
    slug: draft.slug,
    siteName: draft.siteName,
    createdAt: now,
    updatedAt: now,
    status: "draft-pr",
  };

  if (!isGithubConfigured()) {
    return NextResponse.json({
      dryRun: true,
      note: "GITHUB_TOKEN/GITHUB_REPO are not configured — files were generated and validated but nothing was committed. Set both env vars to enable real publishing.",
      files: allFiles.map((f) => ({ path: f.path, bytes: f.content.length, encoding: f.encoding })),
    });
  }

  try {
    const branchName = `builder/${draft.slug}-${Date.now()}`;
    const registryFile: CommitFile = {
      path: "src/lib/sites/registry.json",
      content: JSON.stringify(upsertEntry(entry), null, 2) + "\n",
      encoding: "utf-8",
    };

    const { prUrl } = await commitFilesAndOpenPr({
      branchName,
      commitMessage: `feat: scaffold ${draft.siteName} (/${draft.slug}) via site builder`,
      prTitle: `Add new site: ${draft.siteName} (/${draft.slug})`,
      prBody: [
        "Generated by the /studio site builder.",
        "",
        `- Site: ${draft.siteName}`,
        `- Slug: /${draft.slug}`,
        `- Template: ${templateId}`,
        `- Categories: ${publishSummary.categories || "—"}`,
        `- Articles: ${publishSummary.articles ?? 0}`,
        `- Generated images: ${imageFiles.length}`,
        "",
        "Review the diff, then merge to deploy.",
      ].join("\n"),
      files: [...allFiles, registryFile],
    });

    return NextResponse.json({ prUrl, branch: branchName });
  } catch (err) {
    console.error("[api/builder/publish]", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Publish failed." }, { status: 502 });
  }
}
