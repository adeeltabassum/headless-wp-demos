import { localSampleContent } from "@/lib/local/sample-content";
import type { LocalContent } from "@/lib/local/content";
import { defaultLocalTheme, type LocalTheme } from "@/lib/local/theme";
import type { BuilderDraft } from "./schema";
import { getNicheLabel, getToneLabel } from "./presets";
import {
  renderFaviconFromCustomization,
  renderLogoFromCustomization,
} from "./logoCustomization";
import { stockPhotoUrl } from "./stockPhotos";

function resolveLogo(draft: BuilderDraft): string {
  if (draft.logo) return draft.logo;
  if (draft.logoCustomization) return renderLogoFromCustomization(draft.logoCustomization);
  return localSampleContent.logo;
}

function resolveFavicon(draft: BuilderDraft): string {
  if (draft.favicon) return draft.favicon;
  if (draft.logoCustomization) return renderFaviconFromCustomization(draft.logoCustomization);
  return localSampleContent.favicon;
}

export function deriveLocalContent(draft: BuilderDraft): LocalContent {
  const niche = getNicheLabel(draft.niche, draft.nicheCustom);
  const tone = getToneLabel(draft.tone).toLowerCase();
  const base = `/${draft.slug}`;

  const heroTitle = draft.hero?.title || draft.siteName;
  const titleParts = heroTitle.split(/\s+/);
  const mid = Math.ceil(titleParts.length / 2);

  return {
    ...localSampleContent,
    siteName: draft.siteName,
    siteBase: base,
    metadata: {
      title: `${draft.siteName} | ${niche}`,
      description:
        draft.description ||
        `${draft.siteName} — ${tone} ${niche.toLowerCase()} services you can trust.`,
    },
    logo: resolveLogo(draft),
    favicon: resolveFavicon(draft),
    heroBackground:
      draft.templateImages?.heroBackground ||
      draft.hero?.background ||
      draft.templateImages?.hero ||
      stockPhotoUrl(draft.siteName, draft.niche, "hero"),
    aboutBlurb:
      draft.sidebar?.about ||
      `${draft.siteName} provides professional ${niche.toLowerCase()} services you can trust.`,
    hero: {
      ...localSampleContent.hero,
      titleHighlight: titleParts.slice(0, mid).join(" ") || draft.siteName,
      titleRest: titleParts.slice(mid).join(" ") || niche,
      subtitle:
        draft.hero?.subtitle ||
        `specializes in ${niche.toLowerCase()} — professional, reliable service for residential and commercial clients.`,
      cta: draft.hero?.button || localSampleContent.hero.cta,
    },
    services: {
      ...localSampleContent.services,
      heading: `${draft.siteName} Services`,
      subheading: `Trusted ${niche.toLowerCase()} solutions tailored to your needs.`,
      items: localSampleContent.services.items.map((item, i) => ({
        ...item,
        title: draft.categories?.[i]?.label || item.title,
        description:
          draft.categories?.[i]?.description ||
          `Expert ${(draft.categories?.[i]?.label || item.title).toLowerCase()} services.`,
        image:
          draft.templateImages?.services?.[i] ||
          stockPhotoUrl(draft.categories?.[i]?.label || item.title, draft.niche, "categoryTile"),
      })),
    },
    gallery: {
      ...localSampleContent.gallery,
      images: draft.templateImages?.gallery?.length
        ? draft.templateImages.gallery
        : localSampleContent.gallery.images,
    },
    footer: {
      ...localSampleContent.footer,
      copyright: draft.footer?.copyright || `${draft.siteName}. All Rights Reserved.`,
    },
  };
}

export function deriveLocalTheme(draft: BuilderDraft): LocalTheme {
  return {
    ...defaultLocalTheme,
    primary: draft.theme?.primary || defaultLocalTheme.primary,
    onPrimary: draft.theme?.onPrimary || defaultLocalTheme.onPrimary,
    background: draft.theme?.background || defaultLocalTheme.background,
    surface: draft.theme?.surface || defaultLocalTheme.surface,
    text: draft.theme?.muted || draft.theme?.text || defaultLocalTheme.text,
    heading: draft.theme?.text || defaultLocalTheme.heading,
    dark: draft.theme?.ink || defaultLocalTheme.dark,
    border: draft.theme?.border || defaultLocalTheme.border,
  };
}
