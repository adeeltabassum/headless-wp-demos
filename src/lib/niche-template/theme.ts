import type { CSSProperties } from "react";

/**
 * Branding contract for the niche blog master template.
 *
 * This is the ONLY place colors/fonts are chosen per-site. The skeleton
 * (components + CSS) never hardcodes a color or font — everything reads
 * from these tokens via CSS custom properties, so re-skinning a site is a
 * one-file change.
 */
export interface NicheTheme {
  /** Brand accent — used for buttons, active nav state, category heading bg, links on hover. */
  primary: string;
  /** Text color rendered on top of `primary` (usually #fff or a near-black). */
  onPrimary: string;
  /** Primary body text color. */
  text: string;
  /** Secondary/muted text (excerpts, meta, legal copy). */
  muted: string;
  /** Hairline borders, dividers. */
  border: string;
  /** Page background. */
  background: string;
  /** Widget/card background (sidebar, tags, inputs). */
  surface: string;
  /** Header topbar + footer background (usually near-black, but themeable). */
  ink: string;
  /** Text/icons on top of `ink`. */
  onInk: string;

  /** Body copy + nav font. Any valid CSS font-family stack or a Google Font name. */
  fontBody: string;
  /** Optional distinct font for headings/CTAs. Falls back to fontBody. */
  fontHeading?: string;

  /** Corner rounding scale. Set all to "0px" for a sharp, square aesthetic. */
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;

  /** Max content width for the container. */
  containerWidth: string;
}

/**
 * Neutral, "no branding yet" default — basic system font, grayscale palette,
 * square corners. This is what the skeleton renders until a site fills in
 * its own theme.
 */
export const defaultNicheTheme: NicheTheme = {
  primary: "#4a4a4a",
  onPrimary: "#ffffff",
  text: "#2b2b2b",
  muted: "#6b6b6b",
  border: "#e2e2e2",
  background: "#ffffff",
  surface: "#f5f5f5",
  ink: "#111111",
  onInk: "#ffffff",

  fontBody:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  fontHeading: undefined,

  radiusSm: "4px",
  radiusMd: "8px",
  radiusLg: "12px",

  containerWidth: "1140px",
};

/** Converts a theme object into the CSS custom properties the skeleton reads. */
export function nicheThemeToCssVars(theme: NicheTheme): CSSProperties {
  return {
    "--nt-primary": theme.primary,
    "--nt-on-primary": theme.onPrimary,
    "--nt-text": theme.text,
    "--nt-muted": theme.muted,
    "--nt-border": theme.border,
    "--nt-background": theme.background,
    "--nt-surface": theme.surface,
    "--nt-ink": theme.ink,
    "--nt-on-ink": theme.onInk,
    "--nt-font-body": theme.fontBody,
    "--nt-font-heading": theme.fontHeading || theme.fontBody,
    "--nt-radius-sm": theme.radiusSm,
    "--nt-radius-md": theme.radiusMd,
    "--nt-radius-lg": theme.radiusLg,
    "--nt-container": theme.containerWidth,
  } as CSSProperties;
}
