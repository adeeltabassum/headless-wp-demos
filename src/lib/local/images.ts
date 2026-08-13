/**
 * Image slot contract for the local business master template.
 * Placeholders reuse niche-template SVGs so the skeleton ships without
 * Flat Bid client photography.
 */

export interface LocalImageSlot {
  label: string;
  width: number;
  height: number;
  placeholder: string;
}

export const LOCAL_IMAGE_SLOTS = {
  logo: {
    label: "Logo",
    width: 320,
    height: 88,
    placeholder: "/niche-template/images/logo-placeholder.svg",
  },
  favicon: {
    label: "Favicon",
    width: 32,
    height: 32,
    placeholder: "/niche-template/images/favicon-placeholder.svg",
  },
  heroBackground: {
    label: "Hero background",
    width: 1600,
    height: 900,
    placeholder: "/niche-template/images/hero-placeholder.svg",
  },
  service: {
    label: "Service card",
    width: 640,
    height: 480,
    placeholder: "/niche-template/images/tile-placeholder.svg",
  },
  gallery: {
    label: "Gallery image",
    width: 800,
    height: 600,
    placeholder: "/niche-template/images/tile-placeholder.svg",
  },
  blog: {
    label: "Blog thumbnail",
    width: 800,
    height: 500,
    placeholder: "/niche-template/images/thumbnail-placeholder.svg",
  },
} as const satisfies Record<string, LocalImageSlot>;
