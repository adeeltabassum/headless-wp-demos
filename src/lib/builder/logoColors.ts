/** Sample dominant colors from an uploaded logo (data URL or http URL). */

export type ExtractedPalette = {
  primary: string;
  background: string;
  text: string;
  surface: string;
  ink: string;
};

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

function luminance(r: number, g: number, b: number): number {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function isNearWhite(r: number, g: number, b: number): boolean {
  return r > 240 && g > 240 && b > 240;
}

function isNearBlack(r: number, g: number, b: number): boolean {
  return r < 30 && g < 30 && b < 30;
}

/**
 * Load image, bucket quantized colors, return a theme-friendly palette.
 * Runs client-side only.
 */
export async function extractLogoColors(src: string): Promise<ExtractedPalette> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const size = 64;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas unavailable");
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        const buckets = new Map<string, { r: number; g: number; b: number; count: number }>();
        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3];
          if (a < 128) continue;
          const r = Math.round(data[i] / 32) * 32;
          const g = Math.round(data[i + 1] / 32) * 32;
          const b = Math.round(data[i + 2] / 32) * 32;
          if (isNearWhite(r, g, b)) continue;
          const key = `${r},${g},${b}`;
          const prev = buckets.get(key);
          if (prev) prev.count++;
          else buckets.set(key, { r, g, b, count: 1 });
        }

        const sorted = [...buckets.values()].sort((a, b) => b.count - a.count);
        const primary = sorted[0] || { r: 45, g: 106, b: 62 };
        const accent = sorted.find((c) => !isNearBlack(c.r, c.g, c.b) && c !== primary) || primary;
        const dark = sorted.find((c) => luminance(c.r, c.g, c.b) < 0.35) || { r: 26, g: 26, b: 26 };

        resolve({
          primary: rgbToHex(accent.r, accent.g, accent.b),
          background: "#f8fafc",
          surface: "#ffffff",
          text: rgbToHex(dark.r, dark.g, dark.b),
          ink: rgbToHex(dark.r, dark.g, dark.b),
        });
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error("Could not load logo image"));
    img.src = src;
  });
}

export function paletteToTheme(palette: ExtractedPalette): Partial<import("@/lib/niche-template/theme").NicheTheme> {
  const hex = palette.primary.replace("#", "");
  let onPrimary = "#ffffff";
  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    if (luminance(r, g, b) > 0.65) onPrimary = "#111111";
  }
  return {
    primary: palette.primary,
    onPrimary,
    background: palette.background,
    surface: palette.surface,
    text: palette.text,
    ink: palette.ink,
    onInk: "#ffffff",
    muted: "#6b7280",
    border: "#e5e7eb",
  };
}
