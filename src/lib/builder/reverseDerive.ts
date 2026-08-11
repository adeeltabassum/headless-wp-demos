import type { NicheTemplateContent } from "@/lib/niche-template/content";
import type { NicheTheme } from "@/lib/niche-template/theme";
import type { BuilderDraft } from "./schema";

/**
 * Best-effort inverse of derive.ts, for the "edit a published site" flow —
 * turns a site's committed content.json sidecar back into a BuilderDraft
 * so it can be reloaded into the Studio UI. Lossy on purpose: derived-only
 * wiring (nav, offcanvas, categoryTiles, hrefs) isn't reconstructed since
 * deriveContent() regenerates it fresh from the smaller draft shape.
 */
export function contentToBuilderDraft(
  slug: string,
  content: NicheTemplateContent,
  theme: NicheTheme
): BuilderDraft {
  const categorySlugToLabel = new Map(content.categories.map((c) => [c.slug, c.label]));

  return {
    slug,
    domain: `${slug}.com`,
    siteName: content.siteName,
    templateId: "niche-template",
    description: content.metadata.description,
    designSystemId: "custom",
    enabledPages: {
      about: content.pages.some((p) => p.slug === "about"),
      faq: content.pages.some((p) => p.slug === "faq"),
      privacy: content.pages.some((p) => p.slug === "privacy-policy"),
      terms: content.pages.some((p) => p.slug === "terms"),
      contact: content.pages.some((p) => p.slug === "contact"),
    },
    theme,
    logo: content.logo,
    favicon: content.favicon,
    social: content.social,
    hero: {
      title: content.hero.title,
      subtitle: content.hero.subtitle,
      button: content.hero.button,
      background: content.hero.background,
    },
    categories: content.categories.map((c) => ({
      label: c.label,
      slug: c.slug,
      description: c.description,
      background: c.background,
    })),
    articles: content.articles.map((a) => ({
      id: a.id,
      title: a.title,
      excerpt: a.excerpt,
      slug: a.slug,
      category: categorySlugToLabel.get(a.category) || a.category,
      image: a.image,
      content: a.content,
    })),
    sidebar: {
      about: content.sidebar.about,
      legal: content.sidebar.legal,
      tags: content.sidebar.tags,
    },
    footer: {
      newsletterText: content.footer.newsletter.text,
      copyright: content.footer.copyright,
    },
    pages: {
      about: content.pages.find((p) => p.slug === "about")?.content?.join("\n\n"),
      faq: content.pages.find((p) => p.slug === "faq")?.content?.join("\n\n"),
      privacy: content.pages.find((p) => p.slug === "privacy-policy")?.content?.join("\n\n"),
      terms: content.pages.find((p) => p.slug === "terms")?.content?.join("\n\n"),
      contactIntro: content.pages.find((p) => p.slug === "contact")?.intro,
    },
  };
}
