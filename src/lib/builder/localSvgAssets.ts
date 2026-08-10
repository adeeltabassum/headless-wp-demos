/**
 * Instant logo + favicon generation without calling Gemini — used as a
 * reliable fallback when the image API quota is exhausted, and as the
 * primary path for favicon (always 1:1 SVG).
 */

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function initials(siteName: string): string {
  const words = siteName.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return siteName.slice(0, 2).toUpperCase() || "LG";
}

function svgDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function generateLogoSvgDataUrl(siteName: string, primary = "#4a4a4a"): string {
  const mark = escapeXml(initials(siteName));
  const name = escapeXml(siteName.slice(0, 28));
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="88" viewBox="0 0 320 88">
  <rect width="320" height="88" fill="#ffffff"/>
  <rect x="12" y="14" width="60" height="60" rx="12" fill="${primary}"/>
  <text x="42" y="52" text-anchor="middle" fill="#ffffff" font-family="Arial,sans-serif" font-size="22" font-weight="700">${mark}</text>
  <text x="88" y="52" fill="#1a1a1a" font-family="Arial,sans-serif" font-size="22" font-weight="700">${name}</text>
</svg>`;
  return svgDataUrl(svg);
}

export function generateFaviconSvgDataUrl(siteName: string, primary = "#4a4a4a"): string {
  const mark = escapeXml(initials(siteName));
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="${primary}"/>
  <text x="16" y="21" text-anchor="middle" fill="#ffffff" font-family="Arial,sans-serif" font-size="13" font-weight="700">${mark}</text>
</svg>`;
  return svgDataUrl(svg);
}

/** Simple colored placeholder for photo slots when Gemini is unavailable. */
export function generateSlotPlaceholderSvgDataUrl(
  label: string,
  width: number,
  height: number,
  primary = "#4a4a4a"
): string {
  const safe = escapeXml(label.slice(0, 40));
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${primary}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#1a1a1a" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Arial,sans-serif" font-size="${Math.max(14, Math.min(28, width / 18))}" font-weight="600">${safe}</text>
</svg>`;
  return svgDataUrl(svg);
}
