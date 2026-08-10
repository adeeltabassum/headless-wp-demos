import { defaultNicheTheme, type NicheTheme } from "@/lib/niche-template/theme";

/**
 * Pet Grooming Guide branding. Every color/font the site uses lives here — the
 * skeleton components and CSS never hardcode a value, so this is the only
 * file you touch to change how Pet Grooming Guide looks.
 */
export const PetGroomingTheme: NicheTheme = {
  ...defaultNicheTheme,
  primary: "#2f7d6b",
  onPrimary: "#ffffff",
  // Uncomment and adjust once the brand is finalized:
  // text: "#222222",
  // surface: "#f7f5f2",
  // ink: "#1a1a1a",
  // fontBody: "'Inter', -apple-system, sans-serif",
  // fontHeading: "'Poppins', sans-serif",
  // radiusSm: "6px",
  // radiusMd: "10px",
  // radiusLg: "16px",
};
