import type { ImageSlotKey } from "@/lib/niche-template/images";
import type { ImagePromptContext } from "@/lib/builder/geminiImage";

export interface ImageGenResult {
  url: string;
  warning?: string;
  note?: string;
  source?: string;
}

export interface ImageGenOptions {
  localOnly?: boolean;
}

export type GenerateImageFn = (
  slot: ImageSlotKey,
  context: ImagePromptContext,
  busyKey: string,
  options?: ImageGenOptions
) => Promise<ImageGenResult>;
