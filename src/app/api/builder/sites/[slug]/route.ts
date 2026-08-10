import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";
import { contentToBuilderDraft } from "@/lib/builder/reverseDerive";
import type { NicheTemplateContent } from "@/lib/niche-template/content";
import type { NicheTheme } from "@/lib/niche-template/theme";

/** GET /api/builder/sites/<slug> — loads a published site's content.json sidecar back into a BuilderDraft for editing. */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), "src", "lib", "sites", slug, "content.json");
    const raw = readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as { slug: string; content: NicheTemplateContent; theme: NicheTheme };
    const draft = contentToBuilderDraft(slug, data.content, data.theme);
    return NextResponse.json({ draft });
  } catch (err) {
    return NextResponse.json(
      {
        error: `Could not load site "${slug}". It may not have a content.json sidecar (only sites published through /studio have one).`,
        detail: err instanceof Error ? err.message : undefined,
      },
      { status: 404 }
    );
  }
}
