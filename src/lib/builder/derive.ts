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
import type { ContentBlock } from "./contentBlocks";
import { type BuilderDraft, slugify, DEFAULT_ENABLED_PAGES } from "./schema";
import { getNicheLabel, getToneLabel } from "./presets";
import {
  renderFaviconFromCustomization,
  renderLogoFromCustomization,
} from "./logoCustomization";

function splitPageParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

type PageCopy = string | { blocks: ContentBlock[] } | undefined;

function resolveDraftPageCopy(raw: PageCopy): Pick<StaticPageData, "blocks" | "content" | "intro"> {
  if (!raw) return {};
  if (typeof raw === "string") {
    return { content: splitPageParagraphs(raw) };
  }
  if (raw.blocks?.length) {
    return { blocks: raw.blocks };
  }
  return {};
}

const STATIC_PAGE_DEFS: Array<{
  key: keyof NonNullable<BuilderDraft["pages"]>;
  enabledKey: keyof typeof DEFAULT_ENABLED_PAGES;
  slug: string;
  title: string;
}> = [
  { key: "about", enabledKey: "about", slug: "about", title: "About" },
  { key: "faq", enabledKey: "faq", slug: "faq", title: "FAQ" },
  { key: "privacy", enabledKey: "privacy", slug: "privacy-policy", title: "Privacy Policy" },
  { key: "terms", enabledKey: "terms", slug: "terms", title: "Terms and Conditions" },
];

function buildMetaDescription(draft: BuilderDraft): string {
  const niche = getNicheLabel(draft.niche, draft.nicheCustom);
  const tone = getToneLabel(draft.tone).toLowerCase();
  return `${draft.siteName} — your ${tone} guide to ${niche.toLowerCase()}. Expert tips, guides, and resources.`;
}

function resolveLogo(draft: BuilderDraft): string {
  if (draft.logo) return draft.logo;
  if (draft.logoCustomization) return renderLogoFromCustomization(draft.logoCustomization);
  return IMAGE_SLOTS.logo.placeholder;
}

function resolveFavicon(draft: BuilderDraft): string {
  if (draft.favicon) return draft.favicon;
  if (draft.logoCustomization) return renderFaviconFromCustomization(draft.logoCustomization);
  return IMAGE_SLOTS.favicon.placeholder;
}
function buildHeroCopy(draft: BuilderDraft) {
  const niche = getNicheLabel(draft.niche, draft.nicheCustom);
  return {
    title: draft.hero?.title || `Welcome to ${draft.siteName}`,
    subtitle:
      draft.hero?.subtitle ||
      `Your trusted resource for ${niche.toLowerCase()} — guides, tips, and expert advice.`,
    button: draft.hero?.button || "Start Here",
  };
}

/**
 * Expands the wizard configuration into full NicheTemplateContent.
 * Text, meta, hero, and page copy are generated here when not already present.
 */
export function deriveContent(draft: BuilderDraft): NicheTemplateContent {
  const base = `/${draft.slug}`;
  const enabled = { ...DEFAULT_ENABLED_PAGES, ...draft.enabledPages };
  const nicheLabel = getNicheLabel(draft.niche, draft.nicheCustom);

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

  const offcanvasLinks: Array<{ label: string; href: string }> = [];
  for (const p of STATIC_PAGE_DEFS) {
    if (enabled[p.enabledKey]) {
      offcanvasLinks.push({ label: p.title, href: `${base}/page/${p.slug}` });
    }
  }
  if (enabled.contact) {
    offcanvasLinks.push({ label: "Contact", href: `${base}/page/contact` });
  }

  const articles: Article[] = (draft.articles?.length ? draft.articles : []).map((a, i) => {
    const slug = a.slug ? slugify(a.slug) : slugify(a.title);
    const categorySlug =
      categories.find(
        (c) => c.slug === a.category || c.label.toLowerCase() === a.category.toLowerCase()
      )?.slug || categories[0].slug;
    return {
      id: a.id || String(i + 1),
      title: a.title,
      excerpt: a.excerpt || a.title,
      image: a.image || IMAGE_SLOTS.articleThumbnail.placeholder,
      slug,
      category: categorySlug,
      blocks: a.blocks,
      content: a.content,
    };
  });

  const pages: StaticPageData[] = STATIC_PAGE_DEFS.filter((p) => enabled[p.enabledKey]).map(
    (p): StaticPageData => {
      const copy = resolveDraftPageCopy(draft.pages?.[p.key] as PageCopy);
      const hasCopy = !!(copy.blocks?.length || copy.content?.length);
      return {
        slug: p.slug,
        title: p.title,
        bannerTitle: p.title,
        description: `${p.title} — ${draft.siteName}`,
        banner: IMAGE_SLOTS.pageBanner.placeholder,
        blocks: copy.blocks,
        content: hasCopy
          ? copy.content
          : [
              `${draft.siteName} is dedicated to ${nicheLabel.toLowerCase()}. This ${p.title.toLowerCase()} page will be expanded with full content at publish time.`,
            ],
      };
    }
  );

  if (enabled.contact) {
    const contactCopy = resolveDraftPageCopy(draft.pages?.contactIntro as PageCopy);
    pages.push({
      slug: "contact",
      title: "Contact",
      bannerTitle: "Contact",
      description: `Get in touch with ${draft.siteName}.`,
      banner: IMAGE_SLOTS.pageBanner.placeholder,
      blocks: contactCopy.blocks,
      intro:
        contactCopy.content?.[0] ||
        (typeof draft.pages?.contactIntro === "string"
          ? draft.pages.contactIntro
          : undefined) ||
        `Have a question about ${nicheLabel.toLowerCase()}? Send us a message and we'll get back to you soon.`,
    });
  }

  const heroCopy = buildHeroCopy(draft);
  const footerLinks: Array<{ label: string; href: string }> = [];
  if (enabled.about) footerLinks.push({ label: "About", href: `${base}/page/about` });
  if (enabled.privacy) footerLinks.push({ label: "Privacy Policy", href: `${base}/page/privacy-policy` });
  if (enabled.terms) footerLinks.push({ label: "Terms and Conditions", href: `${base}/page/terms` });

  const featuredLinks: Array<{ label: string; href: string }> = [];
  if (enabled.faq) featuredLinks.push({ label: "FAQ", href: `${base}/page/faq` });
  if (enabled.contact) featuredLinks.push({ label: "Contact", href: `${base}/page/contact` });

  return {
    siteName: draft.siteName,
    siteBase: base,
    metadata: {
      title: `${draft.siteName} | ${nicheLabel}`,
      description: draft.description || buildMetaDescription(draft),
    },
    logo: resolveLogo(draft),
    favicon: resolveFavicon(draft),
    social: draft.social?.length
      ? draft.social
      : ([
          { icon: "facebook", label: "Facebook", href: "#" },
          { icon: "instagram", label: "Instagram", href: "#" },
        ] satisfies SocialLink[]),
    nav,
    offcanvas: offcanvasLinks,
    hero: {
      ...heroCopy,
      href: `${base}/category/${categories[0].slug}`,
      background: draft.hero?.background || IMAGE_SLOTS.hero.placeholder,
    },
    categoryTiles,
    categories,
    articles,
    sidebar: {
      about:
        draft.sidebar?.about ||
        `${draft.siteName} is your go-to resource for ${nicheLabel.toLowerCase()}.`,
      legal:
        draft.sidebar?.legal ||
        `${draft.siteName} participates in affiliate programs and may earn from qualifying purchases.`,
      privacyHref: `${base}/page/privacy-policy`,
      tags: draft.sidebar?.tags?.length ? draft.sidebar.tags : categories.map((c) => c.label),
    },
    footer: {
      featured: featuredLinks.length ? featuredLinks : [{ label: "Contact", href: `${base}/page/contact` }],
      links: footerLinks,
      newsletter: {
        text: draft.footer?.newsletterText || "Subscribe for the latest updates.",
        placeholder: "Enter your email address",
        submit: "Subscribe",
      },
      copyright:
        draft.footer?.copyright ||
        `© ${new Date().getFullYear()} ${draft.siteName}. All rights reserved.`,
    },
    pages,
  };
}

export function deriveTheme(draft: BuilderDraft): NicheTheme {
  return { ...defaultNicheTheme, ...(draft.theme || {}) };
}
