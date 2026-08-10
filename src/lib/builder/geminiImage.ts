import { IMAGE_SLOTS, type ImageSlotKey } from "@/lib/niche-template/images";
import { friendlyGeminiQuotaError, parseGeminiRetrySeconds, sleep } from "./geminiErrors";

const IMAGE_MODELS = (
  process.env.GEMINI_IMAGE_MODELS ||
  "gemini-2.5-flash-image,gemini-2.0-flash-preview-image-generation,gemini-2.0-flash-exp-image-generation"
)
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

export function isImageGenConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

const GEMINI_ASPECTS = [
  { ratio: 1, label: "1:1" },
  { ratio: 4 / 3, label: "4:3" },
  { ratio: 3 / 4, label: "3:4" },
  { ratio: 16 / 9, label: "16:9" },
  { ratio: 9 / 16, label: "9:16" },
] as const;

export function nearestGeminiAspectRatio(width: number, height: number): string {
  const target = width / height;
  let best: (typeof GEMINI_ASPECTS)[number] = GEMINI_ASPECTS[0];
  let bestDiff = Infinity;
  for (const a of GEMINI_ASPECTS) {
    const diff = Math.abs(Math.log(a.ratio) - Math.log(target));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = a;
    }
  }
  return best.label;
}

const ICON_SLOTS: ImageSlotKey[] = ["logo", "favicon"];

export interface ImagePromptContext {
  siteName: string;
  niche?: string;
  tone?: string;
  label?: string;
  /** Used by local SVG fallbacks for logo/favicon/placeholders. */
  primaryColor?: string;
}

export function composeImagePrompt(slot: ImageSlotKey, ctx: ImagePromptContext): string {
  const niche = ctx.niche || "a general-interest blog";
  if (ICON_SLOTS.includes(slot)) {
    return `A minimal, flat vector logo mark for "${ctx.siteName}", a website about ${niche}. Simple geometric icon, no text, no watermark, solid background, professional brand identity style.`;
  }
  const subject = ctx.label ? `${ctx.label}, in the context of ${niche}` : niche;
  return `A clean, professional editorial photograph representing "${subject}" for a website called "${ctx.siteName}". Tone: ${ctx.tone || "friendly and approachable"}. No text, no watermark, no logos, high quality, natural lighting.`;
}

async function callModel(
  model: string,
  apiKey: string,
  prompt: string,
  aspectRatio: string
): Promise<{ base64: string; mimeType: string }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: { aspectRatio },
      },
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Gemini image API error ${res.status}: ${text}`);
  }

  const data = JSON.parse(text);
  const parts: Array<{ inlineData?: { data?: string; mimeType?: string } }> =
    data?.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData?.data);

  if (!imagePart?.inlineData?.data) {
    throw new Error("No image returned by the model.");
  }

  return { base64: imagePart.inlineData.data, mimeType: imagePart.inlineData.mimeType || "image/png" };
}

export async function generateImageBase64(params: {
  prompt: string;
  aspectRatio: string;
}): Promise<{ base64: string; mimeType: string; model: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("IMAGE_GEN_NOT_CONFIGURED");

  const models = IMAGE_MODELS.length ? IMAGE_MODELS : ["gemini-2.5-flash-image"];
  let lastError = "No models configured.";

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const result = await callModel(model, apiKey, params.prompt, params.aspectRatio);
        return { ...result, model };
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        const is429 = lastError.includes("429") || lastError.includes("RESOURCE_EXHAUSTED");
        if (is429 && attempt === 0) {
          await sleep((parseGeminiRetrySeconds(lastError) ?? 20) * 1000);
          continue;
        }
        if (!is429 && !lastError.includes("404")) break;
      }
    }
  }

  throw new Error(friendlyGeminiQuotaError(lastError, "image"));
}

export function slotRatio(slot: ImageSlotKey): string {
  const { width, height } = IMAGE_SLOTS[slot];
  return nearestGeminiAspectRatio(width, height);
}
