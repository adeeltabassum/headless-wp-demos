import type { CSSProperties } from "react";

/**
 * Branding for the SaaS master template.
 *
 * Elementor’s layout CSS assumes primary/accent/heading stay near black/gray/white.
 * Studio brand color must NOT replace those tokens (that paints every heading red/teal).
 * Brand is exposed as --saas-brand / --saas-on-brand for CTAs only.
 */
export interface SaasTheme {
  /** Studio brand — solid CTA backgrounds */
  brand: string;
  /** Text/icon color on brand CTAs (white on dark, near-black on light) */
  onBrand: string;
  primary: string;
  secondary: string;
  text: string;
  accent: string;
  soft: string;
  muted: string;
  heading: string;
  border: string;
  ink: string;
  dark: string;
}

/** Relative luminance 0–1 for sRGB hex colors. */
export function hexLuminance(hex: string): number {
  const raw = hex.replace("#", "").trim();
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw.slice(0, 6);
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return 0;
  const channel = (i: number) => {
    const v = parseInt(full.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const r = channel(0);
  const g = channel(2);
  const b = channel(4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Pick readable text for a solid brand fill. */
export function onBrandFor(brand: string): string {
  return hexLuminance(brand) > 0.55 ? "#111827" : "#ffffff";
}

export const defaultSaasTheme: SaasTheme = {
  brand: "#111827",
  onBrand: "#ffffff",
  primary: "#000000",
  secondary: "#FFFFFF",
  text: "#636363",
  accent: "#000000",
  soft: "#FAFAFA",
  muted: "#636363",
  heading: "#111827",
  border: "#E2E8F0",
  ink: "#2A3342",
  dark: "#1E1E1E",
};

export function saasThemeToCssVars(theme: SaasTheme): CSSProperties {
  const onBrand = theme.onBrand || onBrandFor(theme.brand);
  return {
    "--saas-brand": theme.brand,
    "--saas-on-brand": onBrand,
    // Keep Elementor kit colors stable for typography / section contrast
    "--e-global-color-primary": theme.primary,
    "--e-global-color-secondary": theme.secondary,
    "--e-global-color-text": theme.text,
    "--e-global-color-accent": theme.accent,
    "--e-global-color-61d96f8": theme.soft,
    "--e-global-color-ccdcc5a": theme.muted,
    "--e-global-color-eee44a8": theme.heading,
    "--e-global-color-3827621": theme.border,
    "--e-global-color-bd707bf": theme.ink,
    "--e-global-color-d23ecc0": theme.dark,
    "--e-global-color-462584c": theme.border,
  } as CSSProperties;
}
