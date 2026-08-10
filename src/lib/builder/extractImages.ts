import type { NicheTemplateContent } from "@/lib/niche-template/content";
import type { CommitFile } from "./github";
import { isStockPhotoUrl } from "./stockPhotos";

function parseDataUrl(url: string): { mime: string; base64: string } | null {
  const match = url.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  return { mime: match[1], base64: match[2] };
}

function parseSvgDataUrl(url: string): string | null {
  if (!url.startsWith("data:image/svg+xml")) return null;
  if (url.includes(";base64,")) {
    return Buffer.from(url.split(";base64,")[1], "base64").toString("utf-8");
  }
  return decodeURIComponent(url.replace(/^data:image\/svg\+xml(?:;charset=utf-8)?,/, ""));
}

function extForMime(mime: string): string {
  if (mime.includes("png")) return "png";
  if (mime.includes("jpeg") || mime.includes("jpg")) return "jpg";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("svg")) return "svg";
  return "jpg";
}

async function fetchRemoteAsBase64(url: string): Promise<{ base64: string; mime: string }> {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Failed to fetch image ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  return { base64: buffer.toString("base64"), mime: res.headers.get("content-type") || "image/jpeg" };
}

function shouldInlineImage(url: string): boolean {
  return url.startsWith("data:") || isStockPhotoUrl(url);
}

/** @deprecated Use extractDraftImages */
export function extractDataUrlImages(slug: string, content: NicheTemplateContent) {
  void slug;
  void content;
  throw new Error("Use extractDraftImages() — publish pipeline is async.");
}

export async function extractDraftImages(
  slug: string,
  content: NicheTemplateContent
): Promise<{ content: NicheTemplateContent; imageFiles: CommitFile[] }> {
  const mapping = new Map<string, string>();
  const files: CommitFile[] = [];
  let counter = 0;

  async function resolveUrl(url: string): Promise<string> {
    const cached = mapping.get(url);
    if (cached) return cached;

    counter += 1;
    let fileName: string;
    let fileContent: string;
    let encoding: "utf-8" | "base64" = "base64";

    if (url.startsWith("data:")) {
      const svg = parseSvgDataUrl(url);
      if (svg) {
        fileName = `image-${counter}.svg`;
        fileContent = svg;
        encoding = "utf-8";
      } else {
        const parsed = parseDataUrl(url);
        if (!parsed) return url;
        fileName = `image-${counter}.${extForMime(parsed.mime)}`;
        fileContent = parsed.base64;
      }
    } else if (isStockPhotoUrl(url)) {
      const remote = await fetchRemoteAsBase64(url);
      fileName = `image-${counter}.${extForMime(remote.mime)}`;
      fileContent = remote.base64;
    } else {
      return url;
    }

    const publicUrl = `/${slug}/images/${fileName}`;
    mapping.set(url, publicUrl);
    files.push({ path: `public/${slug}/images/${fileName}`, content: fileContent, encoding });
    return publicUrl;
  }

  const pending = new Set<string>();
  function collect(value: unknown): void {
    if (typeof value === "string" && shouldInlineImage(value)) pending.add(value);
    else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === "object") Object.values(value).forEach(collect);
  }
  collect(content);

  for (const url of pending) await resolveUrl(url);

  function remap(value: unknown): unknown {
    if (typeof value === "string" && mapping.has(value)) return mapping.get(value);
    if (Array.isArray(value)) return value.map(remap);
    if (value && typeof value === "object") {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value)) out[k] = remap(v);
      return out;
    }
    return value;
  }

  return { content: remap(content) as NicheTemplateContent, imageFiles: files };
}
