import { defaultNicheTheme, type NicheTheme } from "@/lib/niche-template/theme";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import type {
  Article,
  Category,
  CategoryTile,
  NicheTemplateContent,
  SocialLink,
  StaticPageData,
} from "@/lib/niche-template/content";
import { type BuilderDraft, slugify } from "./schema";

function splitPageParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const STATIC_PAGES: Array<{ key: keyof NonNullable<BuilderDraft["pages"]>; slug: string; title: string }> = [
  { key: "about", slug: "about", title: "About" },
  { key: "faq", slug: "faq", title: "FAQ" },
  { key: "privacy", slug: "privacy-policy", title: "Privacy Policy" },
  { key: "terms", slug: "terms", title: "Terms and Conditions" },
];

/**
 * Expands the small, human-friendly BuilderDraft into a complete, valid
 * NicheTemplateContent — deriving all the boilerplate (nav, offcanvas,
 * footer links, sidebar tags, category tiles) from the few real inputs a
 * non-technical user actually provides, so the chat/form never has to ask
 * about wiring, only content.
 */
export function deriveContent(draft: BuilderDraft): NicheTemplateContent {
  const base = `/${draft.slug}`;
  const categories: Category[] = (draft.categories?.length ? draft.categories : [
    { label: "Getting Started", slug: "getting-started" },
  ]).map((c) => {
    const slug = c.slug ? slugify(c.slug) : slugify(c.label);
    return {
      label: c.label,
      slug,
      description: c.description || `Everything about ${c.label.toLowerCase()}.`,
      background: c.background || IMAGE_SLOTS.pageBanner.placeholder,
    };
  });

  const categoryTiles: CategoryTile[] = categories.map((c) => ({
    label: c.label,
    href: `${base}/category/${c.slug}`,
    background: c.background || IMAGE_SLOTS.categoryTile.placeholder,
  }));

  const nav = categories.map((c) => ({
    label: c.label,
    href: `${base}/category/${c.slug}`,
  }));

  const offcanvas = STATIC_PAGES.map((p) => ({
    label: p.title,
    href: `${base}/page/${p.slug}`,
  })).concat([{ label: "Contact", href: `${base}/page/contact` }]);

  const articles: Article[] = (draft.articles?.length ? draft.articles : []).map((a, i) => {
    const slug = a.slug ? slugify(a.slug) : slugify(a.title);
    const categorySlug = categories.find(
      (c) => c.slug === a.category || c.label.toLowerCase() === a.category.toLowerCase()
    )?.slug || categories[0].slug;
    return {
      id: a.id || String(i + 1),
      title: a.title,
      excerpt: a.excerpt || a.title,
      image: a.image || IMAGE_SLOTS.articleThumbnail.placeholder,
      slug,
      category: categorySlug,
      content: a.content,
    };
  });

  const pages: StaticPageData[] = STATIC_PAGES.map(
    (p): StaticPageData => ({
      slug: p.slug,
      title: p.title,
      bannerTitle: p.title,
      description: `${p.title} — ${draft.siteName}`,
      banner: IMAGE_SLOTS.pageBanner.placeholder,
      content: draft.pages?.[p.key] ? splitPageParagraphs(draft.pages[p.key] as string) : [`${p.title} content coming soon.`],
    })
  ).concat([
    {
      slug: "contact",
      title: "Contact",
      bannerTitle: "Contact",
      description: `Get in touch with ${draft.siteName}.`,
      banner: IMAGE_SLOTS.pageBanner.placeholder,
      intro: draft.pages?.contactIntro || "Send us a message and we'll get back to you soon.",
    },
  ]);

  return {
    siteName: draft.siteName,
    siteBase: base,
    metadata: {
      title: draft.siteName,
      description: draft.description || `${draft.siteName} — ${draft.niche || "a niche resource"}.`,
    },
    logo: draft.logo || IMAGE_SLOTS.logo.placeholder,
    favicon: draft.favicon || IMAGE_SLOTS.favicon.placeholder,
    social: draft.social?.length
      ? draft.social
      : ([
          { icon: "facebook", label: "Facebook", href: "#" },
          { icon: "instagram", label: "Instagram", href: "#" },
        ] satisfies SocialLink[]),
    nav,
    offcanvas,
    hero: {
      title: draft.hero?.title || `Welcome to ${draft.siteName}`,
      subtitle: draft.hero?.subtitle,
      button: draft.hero?.button || "Start Here",
      href: `${base}/category/${categories[0].slug}`,
      background: draft.hero?.background || IMAGE_SLOTS.hero.placeholder,
    },
    categoryTiles,
    categories,
    articles,
    sidebar: {
      about: draft.sidebar?.about || `${draft.siteName} is your go-to resource for ${draft.niche || "this topic"}.`,
      legal: draft.sidebar?.legal || `${draft.siteName} participates in affiliate programs and may earn from qualifying purchases.`,
      privacyHref: `${base}/page/privacy-policy`,
      tags: draft.sidebar?.tags?.length ? draft.sidebar.tags : categories.map((c) => c.label),
    },
    footer: {
      featured: [
        { label: "FAQ", href: `${base}/page/faq` },
        { label: "Contact", href: `${base}/page/contact` },
      ],
      links: [
        { label: "About", href: `${base}/page/about` },
        { label: "Privacy Policy", href: `${base}/page/privacy-policy` },
        { label: "Terms and Conditions", href: `${base}/page/terms` },
      ],
      newsletter: {
        text: draft.footer?.newsletterText || "Subscribe for the latest updates.",
        placeholder: "Enter your email address",
        submit: "Subscribe",
      },
      copyright: draft.footer?.copyright || `© ${new Date().getFullYear()} ${draft.siteName}. All rights reserved.`,
    },
    pages,
  };
}

export function deriveTheme(draft: BuilderDraft): NicheTheme {
  return { ...defaultNicheTheme, ...(draft.theme || {}) };
}
