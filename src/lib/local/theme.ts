export const localTheme = {
  colors: {
    primary: "#D63742",
    accent: "#58d0f5",
    dark: "#1f2124",
    text: "#636363",
    accentGray: "#475467",
    border: "#E2E8F0",
    background: "#FAFAFA",
    black: "#0c0d0e",
    green: "#319F43",
    white: "#ffffff",
  },
  fonts: {
    sans: "var(--font-inter)",
  },
} as const;

export type LocalTheme = typeof localTheme;
