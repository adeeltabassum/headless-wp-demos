import type { BuilderDraft, BuilderDraftPatch, ChatResponse } from "./schema";
import { slugify } from "./schema";

/**
 * Deterministic stand-ins for the Gemini calls, used whenever
 * GEMINI_API_KEY isn't set. This keeps the whole chat → draft → preview →
 * publish loop demoable and testable with zero external credentials — every
 * generation endpoint automatically upgrades to the real model the moment a
 * key is added, no code changes required.
 */

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Small deterministic state machine — good enough to unblock local
 * testing/demoing without an API key. Since the mock always asks about
 * exactly one missing field at a time (see the `reply` logic below), it
 * can safely treat the *entire* incoming message as the answer to
 * whichever field is still missing, in the same fixed order, rather than
 * trying to guess field types via regex (which is both fragile and wrong
 * whenever an answer happens to also look like a name).
 */
export function mockChatTurn(message: string, draft: Partial<BuilderDraft>): ChatResponse {
  const patch: BuilderDraftPatch = {};

  const nameMatch = message.match(/call(?:ed)?(?: it)? ([\w\s]+?)(?:[.!]|$)|named ([\w\s]+?)(?:[.!]|$)|"([^"]+)"/i);
  const explicitName = nameMatch?.[1] || nameMatch?.[2] || nameMatch?.[3];

  if (!draft.siteName) {
    const guess = explicitName || message;
    patch.siteName = titleCase(guess.trim());
    patch.slug = slugify(guess);
  } else if (!draft.niche) {
    patch.niche = message.trim();
  } else if (!draft.categories?.length) {
    const parts = message
      .split(/,|\band\b/i)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 6);
    if (parts.length) {
      patch.categories = parts.map((label) => ({ label: titleCase(label) }));
    }
  } else if (!draft.tone) {
    patch.tone = message.trim();
  }

  const missing: string[] = [];
  const merged = { ...draft, ...patch };
  if (!merged.siteName) missing.push("siteName");
  if (!merged.niche) missing.push("niche");
  if (!merged.categories?.length) missing.push("categories");
  if (!merged.tone) missing.push("tone");

  let reply: string;
  if (!merged.siteName) {
    reply = "[Mock mode — set GEMINI_API_KEY for real answers] What should we name your site?";
  } else if (!merged.niche) {
    reply = `Great, "${merged.siteName}" it is. What's the site about (its niche)?`;
  } else if (!merged.categories?.length) {
    reply = `Got it — ${merged.niche}. What are 2-6 main topics/categories the site should cover? (comma-separated)`;
  } else if (!merged.tone) {
    reply = `Nice, categories set: ${merged.categories.map((c) => c.label).join(", ")}. Last one — what tone should the writing have (e.g. friendly, expert, playful)?`;
  } else {
    reply = `That's everything I need for a first draft. Use "Draft this section" on any card to write real copy, or fill in fields directly, then hit Publish when you're ready.`;
  }

  return { reply, missingFields: missing, patch: Object.keys(patch).length ? patch : undefined };
}

export function mockText(label: string): string {
  return `[Mock mode — set GEMINI_API_KEY for real copy] Placeholder text for "${label}".`;
}

const MOCK_TAG = "[Mock mode — set GEMINI_API_KEY for real copy]";

/** Mirrors SectionSchemas in ./sections.ts — one deterministic stand-in per section key. */
export function mockSection(section: import("./sections").SectionKey, ctx: import("./sections").SectionContext) {
  switch (section) {
    case "hero":
      return {
        title: `Welcome to ${ctx.siteName}`,
        subtitle: `${MOCK_TAG} your go-to resource for ${ctx.niche || "this topic"}.`,
        button: "Start Here",
      };
    case "articles": {
      const count = ctx.count ?? 3;
      const label = ctx.categoryLabel || "General";
      return {
        articles: Array.from({ length: count }).map((_, i) => ({
          title: `${label} Guide ${i + 1}`,
          excerpt: `${MOCK_TAG} a short excerpt about ${label.toLowerCase()}, point ${i + 1}.`,
          content: [
            `${MOCK_TAG} introductory paragraph about ${label.toLowerCase()}.`,
            `${MOCK_TAG} supporting details and practical tips, part ${i + 1}.`,
          ],
        })),
      };
    }
    case "sidebar":
      return {
        about: `${MOCK_TAG} ${ctx.siteName} is your go-to resource for ${ctx.niche || "this topic"}.`,
        legal: `${MOCK_TAG} ${ctx.siteName} participates in affiliate programs and may earn from qualifying purchases.`,
        tags: ["Guides", "Tips", "Reviews", "How-To"],
      };
    case "footer":
      return {
        newsletterText: `${MOCK_TAG} Subscribe for the latest from ${ctx.siteName}.`,
        copyright: `© ${new Date().getFullYear()} ${ctx.siteName}. All rights reserved.`,
      };
    case "categoryDescription":
      return { description: `${MOCK_TAG} everything about ${(ctx.label || "this topic").toLowerCase()}.` };
    case "page":
      return { text: `${MOCK_TAG} placeholder ${ctx.pageKey || "page"} copy for ${ctx.siteName}.` };
    default:
      throw new Error(`Unknown section: ${section}`);
  }
}
