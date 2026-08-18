import type { BuilderDraft } from "./schema";
import type { SectionKey } from "./sections";
import { stockPhotoUrl } from "./stockPhotos";
import type { ImageSlotKey } from "@/lib/niche-template/images";
import {
  defaultLogoCustomization,
  renderFaviconFromCustomization,
  renderLogoFromCustomization,
} from "./logoCustomization";
import { getNicheLabel, getPhotoSearchNiche } from "./presets";
import { DEFAULT_ECOMMERCE_CATEGORIES } from "./schema";

export type GenerateProgress = {
  step: string;
  status: "running" | "done" | "error";
};

type SectionResult = Record<string, unknown>;

async function callSection(
  section: SectionKey,
  context: Record<string, unknown>
): Promise<SectionResult | null> {
  const res = await fetch("/api/builder/generate-section", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section, context }),
  });
  const data = await res.json();
  if (!res.ok) return null;
  return data.data as SectionResult;
}

async function callStockImage(
  slot: ImageSlotKey,
  label: string,
  niche: string | undefined
): Promise<string> {
  try {
    const res = await fetch("/api/builder/stock-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot, label, niche }),
    });
    if (res.ok) {
      const data = (await res.json()) as { url?: string };
      if (data.url) return data.url;
    }
  } catch {
    // fall through to picsum
  }
  return stockPhotoUrl(label, niche, slot);
}

/**
 * Orchestrates AI content + stock image population from wizard configuration.
 */
export async function generateSiteContent(
  draft: BuilderDraft,
  onProgress?: (p: GenerateProgress) => void
): Promise<Partial<BuilderDraft>> {
  const patch: Partial<BuilderDraft> = {};
  const templateId = draft.templateId || "niche-template";
  const photoNiche = getPhotoSearchNiche(draft);
  const ctx = {
    siteName: draft.siteName,
    niche: draft.niche,
    tone: draft.tone,
    nicheCustom: draft.nicheCustom,
  };

  const step = (name: string) => onProgress?.({ step: name, status: "running" });

  // Branding: logo/favicon from customization if not uploaded
  if (!draft.hasLogo && !draft.logo) {
    step("Generating logo");
    const custom = draft.logoCustomization || defaultLogoCustomization(draft.siteName, draft.theme?.primary || "#2d6a3e");
    patch.logoCustomization = custom;
    patch.logo = renderLogoFromCustomization(custom);
    patch.favicon = renderFaviconFromCustomization(custom);
    onProgress?.({ step: "Generating logo", status: "done" });
  }

  step("Generating hero copy");
  const hero = await callSection("hero", ctx);
  if (hero) {
    patch.hero = {
      title: hero.title as string,
      subtitle: hero.subtitle as string,
      button: hero.button as string,
      background: draft.hero?.background,
    };
  }
  onProgress?.({ step: "Generating hero copy", status: "done" });

  // Niche sidebar / multi-page generation — skip for one-page SaaS / ecommerce
  if (templateId !== "saas" && templateId !== "ecommerce") {
    step("Generating sidebar");
    const sidebar = await callSection("sidebar", ctx);
    if (sidebar) {
      patch.sidebar = {
        about: sidebar.about as string,
        legal: sidebar.legal as string,
        tags: sidebar.tags as string[],
      };
    }
    onProgress?.({ step: "Generating sidebar", status: "done" });
  } else {
    step(templateId === "ecommerce" ? "Generating store blurb" : "Generating product blurb");
    const sidebar = await callSection("sidebar", ctx);
    if (sidebar) {
      patch.sidebar = {
        about: sidebar.about as string,
        legal: sidebar.legal as string,
        tags: sidebar.tags as string[],
      };
    }
    onProgress?.({
      step: templateId === "ecommerce" ? "Generating store blurb" : "Generating product blurb",
      status: "done",
    });
  }

  step("Generating footer");
  const footer = await callSection("footer", ctx);
  if (footer) {
    patch.footer = {
      newsletterText: footer.newsletterText as string,
      copyright: footer.copyright as string,
    };
  }
  onProgress?.({ step: "Generating footer", status: "done" });

  if (templateId !== "saas" && templateId !== "ecommerce") {
    const enabled = draft.enabledPages || {};
    const pageKeys = (
      [
        ["about", "about"],
        ["faq", "faq"],
        ["privacy", "privacy"],
        ["terms", "terms"],
        ["contact", "contactIntro"],
      ] as const
    ).filter(([key]) => enabled[key as keyof typeof enabled] !== false);

    patch.pages = { ...draft.pages };
    for (const [, pageKey] of pageKeys) {
      step(`Generating ${pageKey} page`);
      const page = await callSection("page", { ...ctx, pageKey });
      if (page?.blocks && Array.isArray(page.blocks)) {
        patch.pages = { ...patch.pages, [pageKey]: { blocks: page.blocks as never } };
      } else if (typeof page?.text === "string") {
        // Legacy mock / older responses
        patch.pages = { ...patch.pages, [pageKey]: page.text as string };
      }
      onProgress?.({ step: `Generating ${pageKey} page`, status: "done" });
    }
  } else {
    step("Generating FAQ");
    const page = await callSection("page", { ...ctx, pageKey: "faq" });
    if (page?.blocks && Array.isArray(page.blocks)) {
      patch.pages = { ...draft.pages, faq: { blocks: page.blocks as never } };
    }
    onProgress?.({ step: "Generating FAQ", status: "done" });
  }

  // Tools / categories for SaaS + product categories for ecommerce
  if (templateId === "saas" || templateId === "ecommerce") {
    const defaultCats =
      templateId === "ecommerce"
        ? DEFAULT_ECOMMERCE_CATEGORIES.map((c) => ({ ...c }))
        : [
            { label: "Automation", slug: "automation" },
            { label: "Analytics", slug: "analytics" },
            { label: "Integrations", slug: "integrations" },
            { label: "Collaboration", slug: "collaboration" },
            { label: "Reporting", slug: "reporting" },
            { label: "Security", slug: "security" },
          ];
    const seed = draft.categories?.length ? draft.categories : defaultCats;
    const categories = seed.slice(0, 6).map((c) => ({ ...c }));
    for (let i = 0; i < categories.length; i++) {
      const label = templateId === "ecommerce" ? "category" : "tool";
      step(`Generating ${label}: ${categories[i].label}`);
      const desc = await callSection("categoryDescription", { ...ctx, label: categories[i].label });
      if (desc?.description) categories[i] = { ...categories[i], description: desc.description as string };
      onProgress?.({ step: `Generating ${label}: ${categories[i].label}`, status: "done" });
    }
    patch.categories = categories;

    step("Generating blog teasers");
    const nicheLabel = getNicheLabel(draft.niche, draft.nicheCustom);
    const arts = await callSection("articles", {
      ...ctx,
      categoryLabel: templateId === "ecommerce" ? photoNiche : nicheLabel,
      count: 3,
    });
    if (arts?.articles) {
      patch.articles = (
        arts.articles as Array<{ title: string; excerpt: string; blocks?: unknown; content?: string[] }>
      ).map((a) => ({
        title: a.title,
        excerpt: a.excerpt,
        blocks: a.blocks as never,
        content: a.content,
        category: templateId === "ecommerce" ? photoNiche : nicheLabel,
        image: stockPhotoUrl(
          `${photoNiche} ${a.title}`,
          templateId === "ecommerce" ? photoNiche : draft.niche,
          "articleThumbnail"
        ),
      }));
    }
    onProgress?.({ step: "Generating blog teasers", status: "done" });
  }

  // Category descriptions + articles for niche blog
  if (templateId === "niche-template" && draft.categories?.length) {
    const categories = draft.categories.slice();
    for (let i = 0; i < categories.length; i++) {
      step(`Generating category: ${categories[i].label}`);
      const desc = await callSection("categoryDescription", { ...ctx, label: categories[i].label });
      if (desc?.description) categories[i] = { ...categories[i], description: desc.description as string };
      categories[i] = {
        ...categories[i],
        background: categories[i].background || (await callStockImage("categoryTile", categories[i].label, draft.niche)),
      };
      onProgress?.({ step: `Generating category: ${categories[i].label}`, status: "done" });
    }
    patch.categories = categories;

    const allArticles = draft.articles ? [...draft.articles] : [];
    for (const cat of categories) {
      step(`Generating articles for ${cat.label}`);
      const arts = await callSection("articles", { ...ctx, categoryLabel: cat.label, count: 3 });
      if (arts?.articles) {
        const generated = (
          arts.articles as Array<{
            title: string;
            excerpt: string;
            blocks?: import("./contentBlocks").ContentBlock[];
            content?: string[];
          }>
        ).map((a) => ({
          title: a.title,
          excerpt: a.excerpt,
          blocks: a.blocks,
          content: a.content,
          category: cat.label,
          image: stockPhotoUrl(a.title, draft.niche, "articleThumbnail"),
        }));
        const filtered = allArticles.filter((a) => a.category !== cat.label);
        allArticles.splice(0, allArticles.length, ...filtered, ...generated);
      }
      onProgress?.({ step: `Generating articles for ${cat.label}`, status: "done" });
    }
    patch.articles = allArticles;
  }

  step("Adding stock images");
  const templateImages = { ...draft.templateImages };
  const heroLabel =
    templateId === "ecommerce"
      ? `${photoNiche} products storefront`
      : draft.siteName;
  const heroNiche = templateId === "ecommerce" ? photoNiche : draft.niche;
  templateImages.hero =
    draft.hero?.background ||
    templateImages.hero ||
    (await callStockImage("hero", heroLabel, heroNiche));
  patch.hero = { ...patch.hero, ...draft.hero, background: templateImages.hero };

  if (templateId === "local") {
    templateImages.heroBackground = templateImages.hero;
    templateImages.services = await Promise.all(
      (draft.categories?.length ? draft.categories : [{ label: "Service" }]).slice(0, 5).map((c) =>
        callStockImage("categoryTile", c.label, draft.niche)
      )
    );
    templateImages.gallery = await Promise.all(
      ["Gallery 1", "Gallery 2", "Gallery 3", "Gallery 4"].map((l) =>
        callStockImage("articleThumbnail", l, draft.niche)
      )
    );
  }

  if (templateId === "saas") {
    templateImages.heroBackground = templateImages.hero;
    const toolLabels = (patch.categories || draft.categories || []).slice(0, 4);
    templateImages.services = await Promise.all(
      (toolLabels.length ? toolLabels : [{ label: "Feature" }]).map((c) =>
        callStockImage("categoryTile", c.label, draft.niche)
      )
    );
  }

  if (templateId === "ecommerce") {
    templateImages.heroBackground = templateImages.hero;
    const productLabels = (patch.categories || draft.categories || []).slice(0, 6);
    templateImages.services = await Promise.all(
      (productLabels.length ? productLabels : [{ label: "Product" }]).map((c) =>
        callStockImage("categoryTile", `${photoNiche} ${c.label}`, photoNiche)
      )
    );
  }

  patch.templateImages = templateImages;
  onProgress?.({ step: "Adding stock images", status: "done" });

  return patch;
}
