/** Shared Gemini error parsing for text + image APIs. */

export function parseGeminiRetrySeconds(raw: string): number | null {
  const match = raw.match(/retry in ([0-9.]+)s/i) || raw.match(/"retryDelay":\s*"([0-9.]+)s"/i);
  if (!match) return null;
  return Math.ceil(parseFloat(match[1]));
}

export function friendlyGeminiQuotaError(raw: string, kind: "text" | "image" = "text"): string {
  const retry = parseGeminiRetrySeconds(raw);
  const wait = retry ? ` Wait about ${retry} seconds and try again.` : " Wait a minute and try again.";

  if (raw.includes("429") || raw.includes("RESOURCE_EXHAUSTED") || raw.includes("quota")) {
    if (kind === "image") {
      return `Gemini image quota exceeded (free tier). Using a real stock photo instead.${wait} For AI-generated photos, enable billing at Google AI Studio.`;
    }
    return `Gemini rate limit hit (free tier allows ~5 requests/minute).${wait} Tip: draft one section at a time, not all at once.`;
  }
  if (raw.includes("403") || raw.includes("PERMISSION_DENIED")) {
    return "Your API key lacks permission for this Gemini model. Check Google AI Studio settings.";
  }
  if (raw.includes("404") || raw.includes("NOT_FOUND")) {
    return "This Gemini model is not available on your API key. Set GEMINI_TEXT_MODEL or GEMINI_IMAGE_MODEL in .env.local.";
  }
  return raw.length > 220 ? `${raw.slice(0, 220)}…` : raw;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
