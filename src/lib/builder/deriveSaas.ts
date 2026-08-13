import { saasSampleContent, type SaasContent } from "@/lib/saas/content";
import { defaultSaasTheme, onBrandFor, type SaasTheme } from "@/lib/saas/theme";
import type { BuilderDraft } from "./schema";
import { getNicheLabel, getToneLabel } from "./presets";
import {
  defaultLogoCustomization,
  renderFaviconFromCustomization,
  renderLogoFromCustomization,
} from "./logoCustomization";
import { stockPhotoUrl } from "./stockPhotos";
import type { ContentBlock } from "./contentBlocks";

function resolveLogo(draft: BuilderDraft): string {
  if (draft.logo) return draft.logo;
  if (draft.logoCustomization) return renderLogoFromCustomization(draft.logoCustomization);
  return saasSampleContent.logo;
}

function resolveFavicon(draft: BuilderDraft): string {
  if (draft.favicon) return draft.favicon;
  if (draft.logoCustomization) return renderFaviconFromCustomization(draft.logoCustomization);
  return saasSampleContent.favicon;
}

function faqFromBlocks(blocks: ContentBlock[] | undefined): SaasContent["faqs"] | null {
  if (!blocks?.length) return null;
  const items = blocks
    .filter((b): b is Extract<ContentBlock, { type: "faqItem" }> => b.type === "faqItem")
    .map((b) => ({ question: b.question, answer: b.answer }));
  return items.length ? items : null;
}

const TOOL_ICONS = ["🤖", "🔧", "⚡", "🎯", "💡", "🚀"];

/**
 * Map a Studio draft onto the full SaaS skeleton content.
 * Unset fields keep sample placeholders so the page never collapses.
 */
export function deriveSaasContent(draft: BuilderDraft): SaasContent {
  const niche = getNicheLabel(draft.niche, draft.nicheCustom);
  const tone = getToneLabel(draft.tone).toLowerCase();
  const base = `/${draft.slug}`;
  const heroTitle = draft.hero?.title || `${draft.siteName} — ${niche}`;
  const heroSubtitle =
    draft.hero?.subtitle ||
    `${draft.siteName} helps teams ship ${niche.toLowerCase()} faster with a ${tone} product experience.`;
  const primaryCta = draft.hero?.button || saasSampleContent.hero.primaryCta;
  const price = saasSampleContent.pricing.price;

  const categories = draft.categories?.length ? draft.categories : null;
  const tools = (categories || saasSampleContent.tools).slice(0, 6).map((item, i) => {
    if ("label" in item) {
      return {
        title: item.label,
        description:
          item.description ||
          `Powerful ${item.label.toLowerCase()} capabilities built into ${draft.siteName}.`,
        icon: TOOL_ICONS[i % TOOL_ICONS.length],
      };
    }
    return {
      title: item.title,
      description: item.description,
      icon: item.icon || TOOL_ICONS[i % TOOL_ICONS.length],
    };
  });

  while (tools.length < 6) {
    const sample = saasSampleContent.tools[tools.length];
    tools.push({ ...sample, title: sample.title });
  }

  const faqPage = draft.pages?.faq;
  const faqBlocks = faqFromBlocks(
    typeof faqPage === "object" && faqPage && "blocks" in faqPage
      ? (faqPage.blocks as ContentBlock[] | undefined)
      : undefined
  );
  const faqs =
    faqBlocks ||
    saasSampleContent.faqs.map((f, i) =>
      i === 0
        ? {
            question: `What is ${draft.siteName}?`,
            answer:
              draft.description ||
              `${draft.siteName} is a ${tone} ${niche.toLowerCase()} product designed to help your team move faster.`,
          }
        : f
    );

  const blogPosts =
    draft.articles?.length
      ? draft.articles.slice(0, 3).map((a, i) => ({
          id: `post-${i + 1}`,
          title: a.title,
          excerpt: a.excerpt || "",
          image: a.image || stockPhotoUrl(a.title, draft.niche, "articleThumbnail"),
          category: a.category || niche,
          href: "#",
        }))
      : saasSampleContent.blogPosts;

  const featureSeed = categories?.slice(0, 4) || null;
  const features = (featureSeed || saasSampleContent.features).map((item, i) => {
    if ("label" in item) {
      return {
        title: item.label,
        description:
          item.description ||
          `Use ${draft.siteName} for ${item.label.toLowerCase()} with a clear, guided workflow.`,
        imagePosition: (i % 2 === 0 ? "left" : "right") as "left" | "right",
        image:
          draft.templateImages?.services?.[i] ||
          stockPhotoUrl(item.label, draft.niche, "categoryTile"),
      };
    }
    return {
      ...item,
      image:
        draft.templateImages?.services?.[i] ||
        item.image ||
        saasSampleContent.productImage,
    };
  });

  return {
    ...saasSampleContent,
    siteName: draft.siteName,
    siteBase: base,
    metadata: {
      title: `${draft.siteName} | ${niche}`,
      description:
        draft.description ||
        `${draft.siteName} — modern ${niche.toLowerCase()} software for growing teams.`,
    },
    logo: resolveLogo(draft),
    favicon: resolveFavicon(draft),
    heroImage:
      draft.templateImages?.hero ||
      draft.hero?.background ||
      stockPhotoUrl(draft.siteName, draft.niche, "hero"),
    productImage:
      draft.templateImages?.heroBackground ||
      draft.templateImages?.hero ||
      draft.hero?.background ||
      saasSampleContent.productImage,
    nav: [
      { label: "Product", href: `${base}#product` },
      { label: "Tools", href: `${base}#tools` },
      { label: "Use Case", href: `${base}#use-case` },
      { label: "FAQ", href: `${base}#faq` },
    ],
    hero: {
      title: heroTitle,
      subtitle: heroSubtitle,
      primaryCta,
      secondaryCta: saasSampleContent.hero.secondaryCta,
      priceLine: `One time purchase - ${price}`,
    },
    product: {
      ...saasSampleContent.product,
      title: `Why ${draft.siteName}`,
      description:
        draft.sidebar?.about ||
        `${draft.siteName} delivers ${niche.toLowerCase()} tools your team will actually use.`,
      subtitle: draft.siteName,
      subdescription:
        draft.description ||
        `Built for ${tone} teams who need reliable ${niche.toLowerCase()} workflows.`,
      features: tools.slice(0, 5).map((t) => t.title),
    },
    toolsHeading: "Tools",
    toolsSubheading: `Everything you need for ${niche.toLowerCase()} — in one place.`,
    tools,
    workflow: {
      title: "Simple Workflow, Powerful Results",
      description: `See how ${draft.siteName} turns ${niche.toLowerCase()} work into a clear, repeatable process.`,
    },
    features,
    pricing: {
      ...saasSampleContent.pricing,
      title: "Simple Pricing",
      description: `Get ${draft.siteName} with a straightforward one-time purchase.`,
      productName: draft.siteName,
      price,
      cta: primaryCta,
      features: tools.slice(0, 3).map((t) => t.title),
      additionalFeatures: tools.slice(3, 6).map((t) => t.title),
    },
    blogHeading: "From the blog",
    blogSubheading: `Tips and updates from the ${draft.siteName} team.`,
    blogPosts,
    faqHeading: "Frequently Asked Questions",
    faqSubheading: `Answers to common questions about ${draft.siteName}.`,
    faqs: faqs.slice(0, 5),
    finalCta: {
      title: `Ready for ${draft.siteName}?`,
      subtitle: `Start with a simple purchase and ship faster.`,
      buttonText: `${primaryCta} — ${price}`,
      buttonHref: `${base}#pricing`,
    },
    footer: {
      blurb:
        draft.footer?.newsletterText ||
        draft.sidebar?.about ||
        `${draft.siteName} — ${niche.toLowerCase()} for modern teams.`,
      copyright: draft.footer?.copyright || `${draft.siteName}. All Rights Reserved.`,
    },
    headerCta: {
      demo: "See Demo",
      purchase: primaryCta,
    },
  };
}

export function deriveSaasTheme(draft: BuilderDraft): SaasTheme {
  // Brand tint for CTAs only — never overwrite Elementor primary/heading tokens.
  const brand = draft.theme?.primary || defaultSaasTheme.brand;
  return {
    ...defaultSaasTheme,
    brand,
    onBrand: onBrandFor(brand),
  };
}

export function defaultSaasLogoCustomization(draft: BuilderDraft) {
  return defaultLogoCustomization(draft.siteName, draft.theme?.primary || "#40edc3");
}

/** @deprecated Use SaasContent from deriveSaasContent */
export type SaasDraftContent = SaasContent;
