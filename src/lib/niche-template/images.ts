/**
 * Image + icon slot contract for the niche blog master template.
 *
 * Every image slot in the skeleton is declared here ONCE with its exact
 * intrinsic dimensions and aspect ratio. Components import these constants
 * for their <Image width/height> props (so Next.js reserves the right
 * space and there is zero layout shift), and the placeholder SVGs shipped
 * in /public/niche-template/images are pre-built at these exact ratios.
 *
 * When a real site is ready for photography, an AI image job (or a real
 * photo) just needs to match the `ratio` below — drop it in at the
 * `slot.output` path and nothing else needs to change.
 */

export interface ImageSlot {
  /** Human label, used in AI generation prompts and placeholder captions. */
  label: string;
  /** Intrinsic width used for next/image width/height (px). */
  width: number;
  /** Intrinsic height used for next/image width/height (px). */
  height: number;
  /** width:height expressed as a CSS aspect-ratio string. */
  ratio: string;
  /** Default placeholder asset shipped with the skeleton. */
  placeholder: string;
}

export const IMAGE_SLOTS = {
  /** Header + footer wordmark. Rendered at 64px tall (44px on mobile), auto width. */
  logo: {
    label: "Logo",
    width: 320,
    height: 88,
    ratio: "320 / 88",
    placeholder: "/niche-template/images/logo-placeholder.svg",
  },
  /** Favicon / browser tab icon. */
  favicon: {
    label: "Favicon",
    width: 32,
    height: 32,
    ratio: "1 / 1",
    placeholder: "/niche-template/images/favicon-placeholder.svg",
  },
  /** Homepage hero background card. */
  hero: {
    label: "Hero background",
    width: 1600,
    height: 800,
    ratio: "2 / 1",
    placeholder: "/niche-template/images/hero-placeholder.svg",
  },
  /** Homepage topic/category tile background (square-ish, 4-up grid). */
  categoryTile: {
    label: "Category tile background",
    width: 640,
    height: 640,
    ratio: "1 / 1",
    placeholder: "/niche-template/images/tile-placeholder.svg",
  },
  /** Article card thumbnail in listing grids. */
  articleThumbnail: {
    label: "Article thumbnail",
    width: 800,
    height: 500,
    ratio: "16 / 10",
    placeholder: "/niche-template/images/thumbnail-placeholder.svg",
  },
  /** Full-width band used on category / static / contact pages. */
  pageBanner: {
    label: "Page banner",
    width: 1600,
    height: 480,
    ratio: "10 / 3",
    placeholder: "/niche-template/images/banner-placeholder.svg",
  },
  /** Single article hero image, above the prose body. */
  articleHero: {
    label: "Article hero image",
    width: 1200,
    height: 675,
    ratio: "16 / 9",
    placeholder: "/niche-template/images/article-hero-placeholder.svg",
  },
} as const satisfies Record<string, ImageSlot>;

export type ImageSlotKey = keyof typeof IMAGE_SLOTS;

/**
 * Social platforms with a built-in icon in the Icons registry. Content
 * files reference one of these keys so swapping platforms (e.g. dropping
 * Twitter for TikTok) automatically swaps the rendered glyph — no CSS or
 * component edits required.
 */
export const SOCIAL_ICON_KEYS = [
  "facebook",
  "instagram",
  "twitter",
  "youtube",
  "tiktok",
  "pinterest",
  "linkedin",
] as const;

export type SocialIconKey = (typeof SOCIAL_ICON_KEYS)[number];
