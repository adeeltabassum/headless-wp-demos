import { z } from "zod";

/**
 * Structured content blocks — the contract between Gemini output and
 * template renderers. Flat strings can no longer inject layout.
 */

export const ContentBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("heading"),
    level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    text: z.string().min(1),
  }),
  z.object({
    type: z.literal("paragraph"),
    text: z.string().min(1),
  }),
  z.object({
    type: z.literal("list"),
    items: z.array(z.string().min(1)).min(1),
  }),
  z.object({
    type: z.literal("faqItem"),
    question: z.string().min(1),
    answer: z.string().min(1),
  }),
  z.object({
    type: z.literal("cta"),
    text: z.string().min(1),
    href: z.string().min(1),
  }),
]);

export type ContentBlock = z.infer<typeof ContentBlockSchema>;

export const PageContentSchema = z.object({
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  blocks: z.array(ContentBlockSchema).min(1),
});

export type PageContent = z.infer<typeof PageContentSchema>;

export const ContentBlocksArraySchema = z.array(ContentBlockSchema).min(1);

/** Minimal safe fallback when generation/validation fails. */
export function fallbackBlocks(topic: string): ContentBlock[] {
  return [
    { type: "heading", level: 2, text: topic },
    {
      type: "paragraph",
      text: `We're still drafting this section about ${topic.toLowerCase()}. Check back soon for the full guide.`,
    },
  ];
}

/**
 * Convert legacy string[] body copy (including "## Heading" markdown lines)
 * into typed blocks so older drafts still render through the block system.
 */
export function legacyStringsToBlocks(raw: string[] | undefined): ContentBlock[] {
  if (!raw?.length) return [];

  const blocks: ContentBlock[] = [];

  for (const entry of raw) {
    const chunks = entry
      .split(/\n\n+/)
      .map((s) => s.trim())
      .filter(Boolean);

    for (const chunk of chunks) {
      if (chunk.startsWith("### ")) {
        blocks.push({ type: "heading", level: 3, text: chunk.slice(4).trim() });
        continue;
      }
      if (chunk.startsWith("## ")) {
        blocks.push({ type: "heading", level: 2, text: chunk.slice(3).trim() });
        continue;
      }
      if (chunk.startsWith("# ")) {
        blocks.push({ type: "heading", level: 2, text: chunk.slice(2).trim() });
        continue;
      }

      const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
      const bulletLines = lines.filter((l) => /^[-*•]\s+/.test(l) || /^\d+\.\s+/.test(l));
      if (bulletLines.length >= 2 && bulletLines.length === lines.length) {
        blocks.push({
          type: "list",
          items: bulletLines.map((l) => l.replace(/^[-*•]\s+/, "").replace(/^\d+\.\s+/, "").trim()),
        });
        continue;
      }

      blocks.push({ type: "paragraph", text: chunk });
    }
  }

  return blocks;
}

/** Prefer typed blocks; fall back to normalizing legacy string content. */
export function resolveArticleBlocks(input: {
  blocks?: ContentBlock[];
  content?: string[];
  title?: string;
  excerpt?: string;
}): ContentBlock[] {
  if (input.blocks?.length) {
    const parsed = ContentBlocksArraySchema.safeParse(input.blocks);
    if (parsed.success) return parsed.data;
  }

  const fromLegacy = legacyStringsToBlocks(input.content);
  if (fromLegacy.length) return fromLegacy;

  if (input.excerpt?.trim()) {
    return [{ type: "paragraph", text: input.excerpt.trim() }];
  }

  return fallbackBlocks(input.title || "Article");
}

export function resolvePageBlocks(input: {
  blocks?: ContentBlock[];
  content?: string[];
  intro?: string;
  title?: string;
}): ContentBlock[] {
  if (input.blocks?.length) {
    const parsed = ContentBlocksArraySchema.safeParse(input.blocks);
    if (parsed.success) return parsed.data;
  }

  const fromLegacy = legacyStringsToBlocks(input.content);
  if (fromLegacy.length) return fromLegacy;

  if (input.intro?.trim()) {
    return [{ type: "paragraph", text: input.intro.trim() }];
  }

  return fallbackBlocks(input.title || "Page");
}

/** Pull FAQ pairs from a block list (or empty). */
export function faqItemsFromBlocks(blocks: ContentBlock[]): Array<{ question: string; answer: string }> {
  return blocks
    .filter((b): b is Extract<ContentBlock, { type: "faqItem" }> => b.type === "faqItem")
    .map((b) => ({ question: b.question, answer: b.answer }));
}
