import { z } from "zod";
import { ContentBlockSchema, fallbackBlocks } from "@/lib/builder/contentBlocks";

/**
 * Registry of the "draft this section" generation targets exposed by
 * /api/builder/generate-section. Each entry is self-contained: its Zod
 * output schema plus the prompt builder that turns the caller's context
 * into a model instruction. Adding a new one-click section later is just
 * one more registry entry — the route, UI, and mock fallback all stay
 * generic over this map.
 */

export const SectionSchemas = {
  hero: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    button: z.string().min(1),
  }),
  articles: z.object({
    articles: z
      .array(
        z.object({
          title: z.string().min(1),
          excerpt: z.string().min(1),
          blocks: z.array(ContentBlockSchema).min(3),
        })
      )
      .min(1),
  }),
  sidebar: z.object({
    about: z.string().min(1),
    legal: z.string().min(1),
    tags: z.array(z.string().min(1)).min(3),
  }),
  footer: z.object({
    newsletterText: z.string().min(1),
    copyright: z.string().min(1),
  }),
  page: z.object({
    blocks: z.array(ContentBlockSchema).min(1),
  }),
  categoryDescription: z.object({
    description: z.string().min(1),
  }),
} as const;

export type SectionKey = keyof typeof SectionSchemas;

export interface SectionContext {
  siteName: string;
  niche?: string;
  tone?: string;
  /** for "articles" */
  categoryLabel?: string;
  count?: number;
  /** for "categoryDescription" */
  label?: string;
  /** for "page" */
  pageKey?: "about" | "faq" | "privacy" | "terms" | "contactIntro";
}

const voice = (ctx: SectionContext) =>
  `Site: "${ctx.siteName}". Niche: ${ctx.niche || "general interest"}. Tone: ${ctx.tone || "friendly and helpful"}.`;

const BLOCK_SHAPE = `Each block is an object with a "type" field:
- { "type": "heading", "level": 2|3, "text": string }
- { "type": "paragraph", "text": string }
- { "type": "list", "items": string[] }
- { "type": "faqItem", "question": string, "answer": string }
- { "type": "cta", "text": string, "href": string }
Do NOT return markdown strings. Do NOT wrap JSON in code fences. ONLY return JSON matching the schema.`;

export function buildSectionPrompt(section: SectionKey, ctx: SectionContext): string {
  switch (section) {
    case "hero":
      return `${voice(ctx)}\nWrite homepage hero copy: a punchy title (max 8 words), a one-sentence subtitle, and a short CTA button label (max 3 words).\nRespond as JSON: { "title": string, "subtitle": string, "button": string }`;
    case "articles": {
      const count = ctx.count ?? 3;
      return `${voice(ctx)}\nWrite ${count} original blog article drafts for the category "${ctx.categoryLabel}".
Each article needs: title, 1-2 sentence excerpt, and a "blocks" array of 6-10 structured content blocks.
Include 2-3 heading blocks (level 2) and several paragraph blocks. Optionally one list block.
${BLOCK_SHAPE}
Respond as JSON: { "articles": [{ "title": string, "excerpt": string, "blocks": ContentBlock[] }] }`;
    }
    case "sidebar":
      return `${voice(ctx)}\nWrite sidebar widget copy: a 2-3 sentence "About us" blurb, a 1-2 sentence legal/affiliate-disclaimer blurb, and 4-6 short topic tags relevant to the niche.\nRespond as JSON: { "about": string, "legal": string, "tags": string[] }`;
    case "footer":
      return `${voice(ctx)}\nWrite a 1-sentence newsletter signup pitch and a copyright line for the current year.\nRespond as JSON: { "newsletterText": string, "copyright": string }`;
    case "categoryDescription":
      return `${voice(ctx)}\nWrite a 1-2 sentence description for the category "${ctx.label}".\nRespond as JSON: { "description": string }`;
    case "page": {
      const key = ctx.pageKey ?? "about";
      if (key === "faq") {
        return `${voice(ctx)}\nWrite an FAQ page as structured blocks: exactly 5 faqItem blocks (question + answer).
${BLOCK_SHAPE}
Respond as JSON: { "blocks": ContentBlock[] }`;
      }
      if (key === "contactIntro") {
        return `${voice(ctx)}\nWrite a short contact intro as 1-2 paragraph blocks inviting visitors to use the contact form.
${BLOCK_SHAPE}
Respond as JSON: { "blocks": ContentBlock[] }`;
      }
      const label =
        key === "privacy" ? "Privacy Policy" : key === "terms" ? "Terms and Conditions" : "About";
      return `${voice(ctx)}\nWrite a ${label} page as structured blocks: 3-4 heading (level 2) blocks each followed by 1-2 paragraph blocks.
${BLOCK_SHAPE}
Respond as JSON: { "blocks": ContentBlock[] }`;
    }
    default:
      throw new Error(`Unknown section: ${section}`);
  }
}

/** Safe stand-in when articles validation fails after retry. */
export function fallbackArticlesPayload(ctx: SectionContext) {
  const count = ctx.count ?? 3;
  const label = ctx.categoryLabel || "General";
  return {
    articles: Array.from({ length: count }).map((_, i) => ({
      title: `${label} Guide ${i + 1}`,
      excerpt: `A short overview of ${label.toLowerCase()}, part ${i + 1}.`,
      blocks: fallbackBlocks(`${label} Guide ${i + 1}`),
    })),
  };
}

export function fallbackPagePayload(ctx: SectionContext) {
  return {
    blocks: fallbackBlocks(ctx.pageKey || "Page"),
  };
}
