import { NextRequest, NextResponse } from "next/server";
import { type ImageSlotKey } from "@/lib/niche-template/images";
import { defaultNicheTheme } from "@/lib/niche-template/theme";
import {
  composeImagePrompt,
  generateImageBase64,
  isImageGenConfigured,
  slotRatio,
  type ImagePromptContext,
} from "@/lib/builder/geminiImage";
import { friendlyGeminiQuotaError } from "@/lib/builder/geminiErrors";
import { generateFaviconSvgDataUrl, generateLogoSvgDataUrl } from "@/lib/builder/localSvgAssets";
import { isPhotoSlot, stockPhotoUrl } from "@/lib/builder/stockPhotos";

const SLOT_KEYS = [
  "logo",
  "favicon",
  "hero",
  "categoryTile",
  "articleThumbnail",
  "pageBanner",
  "articleHero",
] as const satisfies readonly ImageSlotKey[];

function fallbackUrl(slot: ImageSlotKey, ctx: ImagePromptContext): { url: string; source: string } {
  const primary = ctx.primaryColor || defaultNicheTheme.primary;
  const label = ctx.label || ctx.siteName;

  if (slot === "logo") {
    return { url: generateLogoSvgDataUrl(ctx.siteName, primary), source: "local-svg" };
  }
  if (slot === "favicon") {
    return { url: generateFaviconSvgDataUrl(ctx.siteName, primary), source: "local-svg" };
  }
  if (isPhotoSlot(slot)) {
    return { url: stockPhotoUrl(label, ctx.niche, slot), source: "stock-photo" };
  }
  return { url: stockPhotoUrl(label, ctx.niche, "hero"), source: "stock-photo" };
}

interface GenerateImageBody {
  slot?: unknown;
  context?: unknown;
  localOnly?: unknown;
}

export async function POST(req: NextRequest) {
  let body: GenerateImageBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const slot = body.slot as ImageSlotKey;
  if (!slot || !SLOT_KEYS.includes(slot as (typeof SLOT_KEYS)[number])) {
    return NextResponse.json({ error: `slot must be one of: ${SLOT_KEYS.join(", ")}` }, { status: 400 });
  }

  const context = (body.context && typeof body.context === "object" ? body.context : {}) as ImagePromptContext;
  if (!context.siteName || typeof context.siteName !== "string") {
    return NextResponse.json({ error: "context.siteName is required." }, { status: 400 });
  }

  if (body.localOnly === true) {
    const { url, source } = fallbackUrl(slot, context);
    return NextResponse.json({
      url,
      source,
      note: slot === "logo" || slot === "favicon" ? "Generated branded SVG logo/icon." : "Using a stock photo (no Gemini quota).",
    });
  }

  if (!isImageGenConfigured()) {
    const { url, source } = fallbackUrl(slot, context);
    return NextResponse.json({
      url,
      source,
      mock: true,
      note: "GEMINI_API_KEY is not set — using stock photos / SVG fallbacks.",
    });
  }

  try {
    const prompt = composeImagePrompt(slot, context);
    const { base64, mimeType, model } = await generateImageBase64({ prompt, aspectRatio: slotRatio(slot) });
    return NextResponse.json({ url: `data:${mimeType};base64,${base64}`, prompt, source: "gemini", model });
  } catch (err) {
    const raw = err instanceof Error ? err.message : "Image generation failed.";
    console.error("[api/builder/generate-image]", raw);

    const { url, source } = fallbackUrl(slot, context);
    const warning =
      source === "stock-photo"
        ? `${friendlyGeminiQuotaError(raw, "image")} A real stock photo was used instead.`
        : friendlyGeminiQuotaError(raw, "image");

    return NextResponse.json({ url, source: `${source}-fallback`, warning });
  }
}
