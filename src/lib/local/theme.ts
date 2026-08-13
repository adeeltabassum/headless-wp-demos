import type { CSSProperties } from "react";

/**
 * Branding contract for the local business master template.
 * Components + CSS read --fb-* vars — never hardcode a per-site palette.
 */
export interface LocalTheme {
  primary: string;
  onPrimary: string;
  accent: string;
  dark: string;
  text: string;
  heading: string;
  accentGray: string;
  border: string;
  background: string;
  surface: string;
  black: string;
  white: string;
  fontBody: string;
  containerWidth: string;
}

/** Neutral grayscale default — no client branding. */
export const defaultLocalTheme: LocalTheme = {
  primary: "#4a4a4a",
  onPrimary: "#ffffff",
  accent: "#6b7280",
  dark: "#1f2124",
  text: "#636363",
  heading: "#111827",
  accentGray: "#475467",
  border: "#e2e8f0",
  background: "#fafafa",
  surface: "#ffffff",
  black: "#0c0d0e",
  white: "#ffffff",
  fontBody: "var(--font-inter), Inter, system-ui, sans-serif",
  containerWidth: "1140px",
};

/** @deprecated Use defaultLocalTheme — kept for any legacy imports. */
export const localTheme = {
  colors: {
    primary: defaultLocalTheme.primary,
    accent: defaultLocalTheme.accent,
    dark: defaultLocalTheme.dark,
    text: defaultLocalTheme.text,
    accentGray: defaultLocalTheme.accentGray,
    border: defaultLocalTheme.border,
    background: defaultLocalTheme.background,
    black: defaultLocalTheme.black,
    green: "#319F43",
    white: defaultLocalTheme.white,
  },
  fonts: {
    sans: defaultLocalTheme.fontBody,
  },
} as const;

export function localThemeToCssVars(theme: LocalTheme): CSSProperties {
  return {
    "--fb-primary": theme.primary,
    "--fb-on-primary": theme.onPrimary,
    "--fb-accent": theme.accent,
    "--fb-dark": theme.dark,
    "--fb-text": theme.text,
    "--fb-heading": theme.heading,
    "--fb-accent-gray": theme.accentGray,
    "--fb-border": theme.border,
    "--fb-bg-soft": theme.background,
    "--fb-bg": theme.background,
    "--fb-surface": theme.surface,
    "--fb-black": theme.black,
    "--fb-white": theme.white,
    "--fb-font": theme.fontBody,
    "--fb-container": theme.containerWidth,
  } as CSSProperties;
}
