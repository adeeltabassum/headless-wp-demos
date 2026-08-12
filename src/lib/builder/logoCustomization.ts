import {
  buildCustomFaviconSvgDataUrl,
  buildCustomLogoSvgDataUrl,
  type LogoWord,
} from "./localSvgAssets";

export type LogoCustomization = {
  words: LogoWord[];
  iconBg: string;
  iconText: string;
  faviconBg: string;
  faviconText: string;
};

export function siteNameToWords(siteName: string, defaultColor = "#1a1a1a"): LogoWord[] {
  return siteName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((text) => ({ text, color: defaultColor }));
}

export function defaultLogoCustomization(siteName: string, primary: string): LogoCustomization {
  return {
    words: siteNameToWords(siteName, "#1a1a1a"),
    iconBg: primary,
    iconText: "#ffffff",
    faviconBg: primary,
    faviconText: "#ffffff",
  };
}

export function renderLogoFromCustomization(custom: LogoCustomization): string {
  return buildCustomLogoSvgDataUrl(custom.words, custom.iconBg, custom.iconText);
}

export function renderFaviconFromCustomization(custom: LogoCustomization): string {
  return buildCustomFaviconSvgDataUrl(custom.words, custom.faviconBg, custom.faviconText);
}

/** Pick closest design system preset by primary color distance. */
export function matchDesignSystemFromPrimary(
  primary: string,
  presets: Array<{ id: string; theme: { primary?: string } }>
): string {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    if (h.length !== 6) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };
  const target = parse(primary);
  if (!target) return presets[0]?.id || "forest";

  let best = presets[0]?.id || "forest";
  let bestDist = Infinity;
  for (const p of presets) {
    const c = parse(p.theme.primary || "#000000");
    if (!c) continue;
    const dist = Math.hypot(c[0] - target[0], c[1] - target[1], c[2] - target[2]);
    if (dist < bestDist) {
      bestDist = dist;
      best = p.id;
    }
  }
  return best;
}
