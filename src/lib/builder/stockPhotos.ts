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
 * Real photograph from Lorem Picsum — used when Gemini image generation is
 * unavailable. Same niche+label always returns the same photo (stable seed).
 * No API key required.
 */
export function stockPhotoUrl(label: string, niche: string | undefined, slot: ImageSlotKey): string {
  const { width, height } = IMAGE_SLOTS[slot];
  const seed = hashSeed(`${niche || "blog"}:${label}:${slot}`);
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export function isStockPhotoUrl(url: string): boolean {
  return /^https:\/\/(fastly\.)?picsum\.photos\//.test(url);
}
