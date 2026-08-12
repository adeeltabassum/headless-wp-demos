import { NextRequest, NextResponse } from "next/server";
import { IMAGE_SLOTS, type ImageSlotKey } from "@/lib/niche-template/images";
import { resolveStockPhoto } from "@/lib/builder/stockPhotos";

/**
 * Keyword stock image lookup: Pexels first (if PEXELS_API_KEY), Picsum fallback.
 * Does not touch Gemini image generation.
 */
export async function POST(req: NextRequest) {
  let body: { label?: string; niche?: string; slot?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const label = typeof body.label === "string" ? body.label.trim() : "";
  if (!label) {
    return NextResponse.json({ error: "label is required." }, { status: 400 });
  }

  const slot = (body.slot || "hero") as ImageSlotKey;
  if (!(slot in IMAGE_SLOTS)) {
    return NextResponse.json({ error: `Unknown slot: ${slot}` }, { status: 400 });
  }

  const niche = typeof body.niche === "string" ? body.niche : undefined;
  const result = await resolveStockPhoto(label, niche, slot);
  return NextResponse.json(result);
}
