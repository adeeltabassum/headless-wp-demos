import { z } from "zod";
import { SOCIAL_ICON_KEYS } from "@/lib/niche-template/images";

/**
 * Zod mirrors of the niche-template content contract
 * (src/lib/niche-template/content.ts + theme.ts). These are the single
 * source of truth the builder validates against — every LLM patch, every
 * manual edit, and the final publish payload all pass through these
 * schemas before they're allowed to become real files.
 */

export const SocialIconKeySchema = z.enum(SOCIAL_ICON_KEYS);

export const NavLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const SocialLinkSchema = z.object({
  icon: SocialIconKeySchema,
  label: z.string().min(1),
  href: z.string().min(1),
});

export const ArticleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  image: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  content: z.array(z.string()).optional(),
});

export const CategoryTileSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  background: z.string().min(1),
});

export const CategorySchema = z.object({
  label: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  background: z.string().optional(),
  featuredPostTitle: z.string().optional(),
});

export const StaticPageDataSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  bannerTitle: z.string().min(1),
  description: z.string().min(1),
  banner: z.string().optional(),
  intro: z.string().optional(),
  content: z.array(z.string()).optional(),
});

export const NicheTemplateContentSchema = z.object({
  siteName: z.string().min(1),
  metadata: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  logo: z.string().min(1),
  favicon: z.string().min(1),
  social: z.array(SocialLinkSchema),
  nav: z.array(NavLinkSchema),
  offcanvas: z.array(NavLinkSchema).optional(),
  hero: z.object({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    button: z.string().min(1),
    href: z.string().min(1),
    background: z.string().min(1),
  }),
  categoryTiles: z.array(CategoryTileSchema),
  categories: z.array(CategorySchema),
  articles: z.array(ArticleSchema),
  sidebar: z.object({
    about: z.string().min(1),
    legal: z.string().min(1),
    privacyHref: z.string().min(1),
    tags: z.array(z.string()),
  }),
  footer: z.object({
    featured: z.array(NavLinkSchema),
    links: z.array(NavLinkSchema),
    newsletter: z.object({
      text: z.string().min(1),
      placeholder: z.string().min(1),
      submit: z.string().min(1),
    }),
    copyright: z.string().min(1),
  }),
  pages: z.array(StaticPageDataSchema),
});

export type NicheTemplateContentInput = z.infer<typeof NicheTemplateContentSchema>;

export const NicheThemeSchema = z.object({
  primary: z.string().min(1),
  onPrimary: z.string().min(1),
  text: z.string().min(1),
  muted: z.string().min(1),
  border: z.string().min(1),
  background: z.string().min(1),
  surface: z.string().min(1),
  ink: z.string().min(1),
  onInk: z.string().min(1),
  fontBody: z.string().min(1),
  fontHeading: z.string().optional(),
  radiusSm: z.string().min(1),
  radiusMd: z.string().min(1),
  radiusLg: z.string().min(1),
  containerWidth: z.string().min(1),
});

export type NicheThemeInput = z.infer<typeof NicheThemeSchema>;

/**
 * The minimal, human-friendly shape the builder UI actually collects —
 * expanded into a full NicheTemplateContent by src/lib/builder/derive.ts.
 * Keeping this small is what makes the chat/form usable by a
 * non-technical person instead of requiring every one of the ~15 content
 * fields to be filled in by hand.
 */
export const TEMPLATE_IDS = ["niche-template", "local", "saas"] as const;
export type TemplateId = (typeof TEMPLATE_IDS)[number];

export const EnabledPagesSchema = z.object({
  about: z.boolean().default(true),
  faq: z.boolean().default(false),
  privacy: z.boolean().default(true),
  terms: z.boolean().default(true),
  contact: z.boolean().default(true),
});

export const BuilderCategorySchema = z.object({
  label: z.string().min(1),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  background: z.string().optional(),
});

export const BuilderArticleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  excerpt: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  category: z.string().min(1),
  image: z.string().optional(),
  content: z.array(z.string()).optional(),
});

export const BuilderDraftSchema = z.object({
  /** Publish path identifier (derived from domain). */
  slug: z.string().regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, hyphens only"),
  /** User-facing domain label, e.g. mybrand.com */
  domain: z.string().optional(),
  siteName: z.string().min(1),
  templateId: z.enum(TEMPLATE_IDS).default("niche-template"),
  /** Preset niche key or "other". */
  niche: z.string().optional(),
  nicheCustom: z.string().optional(),
  tone: z.string().optional(),
  /** Selected design system preset id, or "custom". */
  designSystemId: z.string().optional(),
  /** Whether user uploaded/provided a logo (affects branding flow). */
  hasLogo: z.boolean().optional(),
  /** Generated at build time — not a wizard input. */
  description: z.string().optional(),
  theme: NicheThemeSchema.partial().optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  social: z.array(SocialLinkSchema).optional(),
  /** Generated content — populated by derive / generate-site, not wizard inputs. */
  hero: z
    .object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      button: z.string().optional(),
      background: z.string().optional(),
    })
    .optional(),
  categories: z.array(BuilderCategorySchema).optional(),
  articles: z.array(BuilderArticleSchema).optional(),
  enabledPages: EnabledPagesSchema.optional(),
  sidebar: z
    .object({
      about: z.string().optional(),
      legal: z.string().optional(),
      tags: z.array(z.string()).optional(),
    })
    .optional(),
  footer: z
    .object({
      newsletterText: z.string().optional(),
      copyright: z.string().optional(),
    })
    .optional(),
  /** Generated page copy — keyed by page id. */
  pages: z
    .object({
      about: z.string().optional(),
      faq: z.string().optional(),
      privacy: z.string().optional(),
      terms: z.string().optional(),
      contactIntro: z.string().optional(),
    })
    .optional(),
});

export type BuilderDraft = z.infer<typeof BuilderDraftSchema>;

/** Shallow-partial of BuilderDraft — every nested object inside it is already all-optional, so a shallow `.partial()` is enough for a chat/section "patch" that only fills in a few fields at a time. */
export const BuilderDraftPatchSchema = BuilderDraftSchema.partial();
export type BuilderDraftPatch = z.infer<typeof BuilderDraftPatchSchema>;

/** What /api/builder/chat returns on every turn. */
export const ChatResponseSchema = z.object({
  reply: z.string().min(1),
  missingFields: z.array(z.string()).optional(),
  patch: BuilderDraftPatchSchema.optional(),
});
export type ChatResponse = z.infer<typeof ChatResponseSchema>;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60) || "site";
}

export const DEFAULT_ENABLED_PAGES = {
  about: true,
  faq: false,
  privacy: true,
  terms: true,
  contact: true,
} as const;

export function createDefaultDraft(): Partial<BuilderDraft> {
  return {
    templateId: "niche-template",
    tone: "professional",
    designSystemId: "forest",
    enabledPages: { ...DEFAULT_ENABLED_PAGES },
    categories: [],
  };
}

export function pascalCase(slug: string): string {
  return slug.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase());
}
