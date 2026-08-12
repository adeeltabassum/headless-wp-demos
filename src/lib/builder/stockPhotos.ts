import { IMAGE_SLOTS, type ImageSlotKey } from "@/lib/niche-template/images";

/** Stable numeric seed from a string (same input → same photo). */
function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const PHOTO_SLOTS: ImageSlotKey[] = ["hero", "categoryTile", "articleThumbnail", "pageBanner", "articleHero"];

export function isPhotoSlot(slot: ImageSlotKey): boolean {
  return PHOTO_SLOTS.includes(slot);
}

/**
 * Instant Picsum fallback — no keyword search, no API key.
 * Same niche+label always returns the same photo (stable seed).
 */
export function picsumPhotoUrl(label: string, niche: string | undefined, slot: ImageSlotKey): string {
  const { width, height } = IMAGE_SLOTS[slot];
  const seed = hashSeed(`${niche || "blog"}:${label}:${slot}`);
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

/** @deprecated Prefer picsumPhotoUrl name; kept for existing imports. */
export function stockPhotoUrl(label: string, niche: string | undefined, slot: ImageSlotKey): string {
  return picsumPhotoUrl(label, niche, slot);
}

export function isStockPhotoUrl(url: string): boolean {
  return (
    /^https:\/\/(fastly\.)?picsum\.photos\//.test(url) ||
    /^https:\/\/images\.pexels\.com\//.test(url)
  );
}

/**
 * Keyword-searchable Pexels photo. Returns null when the API key is missing,
 * the request fails, or no results — caller should fall back to Picsum.
 */
export async function pexelsPhotoUrl(
  label: string,
  niche: string | undefined,
  slot: ImageSlotKey
): Promise<string | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return null;

  const { width, height } = IMAGE_SLOTS[slot];
  const query = [niche, label].filter(Boolean).join(" ").trim() || "business";

  try {
    const url = new URL("https://api.pexels.com/v1/search");
    url.searchParams.set("query", query);
    url.searchParams.set("per_page", "8");
    url.searchParams.set("orientation", width >= height * 1.2 ? "landscape" : width <= height * 0.85 ? "portrait" : "square");

    const res = await fetch(url.toString(), {
      headers: { Authorization: apiKey },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as {
      photos?: Array<{ src?: { large?: string; medium?: string; original?: string } }>;
    };
    const photos = data.photos || [];
    if (!photos.length) return null;

    const pick = photos[hashSeed(`${niche || ""}:${label}:${slot}`) % photos.length];
    return pick.src?.large || pick.src?.medium || pick.src?.original || null;
  } catch {
    return null;
  }
}

/**
 * Prefer Pexels (keyword search) when configured; otherwise Picsum.
 * Safe to call from client via /api/builder/stock-image or server-side.
 */
export async function resolveStockPhoto(
  label: string,
  niche: string | undefined,
  slot: ImageSlotKey
): Promise<{ url: string; source: "pexels" | "picsum" }> {
  const pexels = await pexelsPhotoUrl(label, niche, slot);
  if (pexels) return { url: pexels, source: "pexels" };
  return { url: picsumPhotoUrl(label, niche, slot), source: "picsum" };
}
