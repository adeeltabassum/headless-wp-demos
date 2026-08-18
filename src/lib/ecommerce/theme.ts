import type { CSSProperties } from "react";

/**
 * Branding contract for the ecommerce master template.
 * Components + CSS read --ec-* vars — never hardcode a per-site palette.
 */
export interface EcommerceTheme {
  background: string;
  backgroundSoft: string;
  ink: string;
  muted: string;
  border: string;
  /** Brand / CTA color from Studio design system */
  accent: string;
  onAccent: string;
  placeholderA: string;
  placeholderB: string;
  white: string;
  fontBody: string;
  containerWidth: string;
  radius: string;
  radiusPill: string;
}

/** Neutral grayscale default — matches Figma wireframe. */
export const defaultEcommerceTheme: EcommerceTheme = {
  background: "#ffffff",
  backgroundSoft: "#f5f5f5",
  ink: "#1a1a1a",
  muted: "#6b6b6b",
  border: "#e6e6e6",
  accent: "#1a1a1a",
  onAccent: "#ffffff",
  placeholderA: "#ececec",
  placeholderB: "#f7f7f7",
  white: "#ffffff",
  fontBody: "var(--font-inter), Inter, system-ui, sans-serif",
  containerWidth: "1120px",
  radius: "10px",
  radiusPill: "999px",
};

export function ecommerceThemeToCssVars(theme: EcommerceTheme): CSSProperties {
  return {
    "--ec-bg": theme.background,
    "--ec-bg-soft": theme.backgroundSoft,
    "--ec-ink": theme.ink,
    "--ec-muted": theme.muted,
    "--ec-border": theme.border,
    "--ec-accent": theme.accent,
    "--ec-on-accent": theme.onAccent,
    "--ec-ph-a": theme.placeholderA,
    "--ec-ph-b": theme.placeholderB,
    "--ec-white": theme.white,
    "--ec-font": theme.fontBody,
    "--ec-container": theme.containerWidth,
    "--ec-radius": theme.radius,
    "--ec-radius-pill": theme.radiusPill,
  } as CSSProperties;
}
