import { z } from "zod";

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
          content: z.array(z.string().min(1)).min(2),
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
    text: z.string().min(1),
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

export function buildSectionPrompt(section: SectionKey, ctx: SectionContext): string {
  switch (section) {
    case "hero":
      return `${voice(ctx)}\nWrite homepage hero copy: a punchy title (max 8 words), a one-sentence subtitle, and a short CTA button label (max 3 words).\nRespond as JSON: { "title": string, "subtitle": string, "button": string }`;
    case "articles": {
      const count = ctx.count ?? 3;
      return `${voice(ctx)}\nWrite ${count} original blog article drafts for the category "${ctx.categoryLabel}". Each needs: a compelling title, a 1-2 sentence excerpt, and a "content" array of 6-10 blocks mixing section headings and paragraphs. Use "## Section Title" for h2 headings (as plain strings starting with ## ) and normal strings for paragraphs. Include 2-3 headings per article for clear hierarchy.\nRespond as JSON: { "articles": [{ "title": string, "excerpt": string, "content": string[] }] }`;
    }
    case "sidebar":
      return `${voice(ctx)}\nWrite sidebar widget copy: a 2-3 sentence "About us" blurb, a 1-2 sentence legal/affiliate-disclaimer blurb, and 4-6 short topic tags relevant to the niche.\nRespond as JSON: { "about": string, "legal": string, "tags": string[] }`;
    case "footer":
      return `${voice(ctx)}\nWrite a 1-sentence newsletter signup pitch and a copyright line for the current year.\nRespond as JSON: { "newsletterText": string, "copyright": string }`;
    case "categoryDescription":
      return `${voice(ctx)}\nWrite a 1-2 sentence description for the category "${ctx.label}".\nRespond as JSON: { "description": string }`;
    case "page": {
      const titles: Record<NonNullable<SectionContext["pageKey"]>, string> = {
        faq: "an FAQ page with exactly 5 question-and-answer pairs. Format EXACTLY like this (use Q: and A: prefixes, blank line between pairs): Q: First question here?\\nA: Answer here.\\n\\nQ: Second question?",
        privacy: "a Privacy Policy with 3-4 sections. Use ## Section Title for each section heading on its own line, followed by 1-2 paragraphs per section. Separate blocks with blank lines.",
        terms: "Terms and Conditions with 3-4 sections. Use ## Section Title for each section heading on its own line, followed by 1-2 paragraphs per section.",
        about: "About page body copy with 3 sections. Use ## Section Title for headings and separate paragraphs with blank lines.",
        contactIntro: "a 1-2 sentence intro inviting visitors to use the contact form below",
      };
      const key = ctx.pageKey ?? "about";
      return `${voice(ctx)}\nWrite ${titles[key]}. Return the copy as a single string (use \\n\\n between paragraphs if there are multiple).\nRespond as JSON: { "text": string }`;
    }
    default:
      throw new Error(`Unknown section: ${section}`);
  }
}
