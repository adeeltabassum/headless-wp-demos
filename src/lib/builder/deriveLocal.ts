import { localContent, type LocalContent } from "@/lib/local/content";
import type { LocalTheme } from "@/lib/local/theme";
import { localTheme } from "@/lib/local/theme";
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
  return localContent.logo;
}

function resolveFavicon(draft: BuilderDraft): string {
  if (draft.favicon) return draft.favicon;
  if (draft.logoCustomization) return renderFaviconFromCustomization(draft.logoCustomization);
  return localContent.favicon;
}

export function deriveLocalContent(draft: BuilderDraft): LocalContent {
  const niche = getNicheLabel(draft.niche, draft.nicheCustom);
  const tone = getToneLabel(draft.tone).toLowerCase();

  const heroTitle = draft.hero?.title || draft.siteName;
  const titleParts = heroTitle.split(/\s+/);
  const mid = Math.ceil(titleParts.length / 2);

  return {
    ...localContent,
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
    hero: {
      ...localContent.hero,
      titleHighlight: titleParts.slice(0, mid).join(" ") || draft.siteName,
      titleRest: titleParts.slice(mid).join(" ") || niche,
      subtitle:
        draft.hero?.subtitle ||
        `${draft.siteName} specializes in ${niche.toLowerCase()} — professional, reliable service.`,
      cta: draft.hero?.button || localContent.hero.cta,
    },
    services: {
      ...localContent.services,
      heading: `${draft.siteName} Services`,
      subheading: `Trusted ${niche.toLowerCase()} solutions tailored to your needs.`,
      items: localContent.services.items.map((item, i) => ({
        ...item,
        title: draft.categories?.[i]?.label || item.title,
        description:
          draft.categories?.[i]?.description ||
          `Expert ${(draft.categories?.[i]?.label || item.title).toLowerCase()} services.`,
        image:
          draft.templateImages?.services?.[i] ||
          stockPhotoUrl(item.title, draft.niche, "categoryTile"),
      })) as unknown as LocalContent["services"]["items"],
    },
    gallery: {
      ...localContent.gallery,
      images: (draft.templateImages?.gallery?.length
        ? draft.templateImages.gallery
        : localContent.gallery.images) as LocalContent["gallery"]["images"],
    },
    footer: {
      ...localContent.footer,
      copyright: draft.footer?.copyright || `© ${new Date().getFullYear()} ${draft.siteName}. All rights reserved.`,
    },
  } as unknown as LocalContent;
}

export function deriveLocalTheme(draft: BuilderDraft): LocalTheme {
  const primary = draft.theme?.primary || localTheme.colors.primary;
  return {
    ...localTheme,
    colors: {
      ...localTheme.colors,
      primary,
      background: draft.theme?.background || localTheme.colors.background,
      text: draft.theme?.text || localTheme.colors.text,
      dark: draft.theme?.ink || localTheme.colors.dark,
    },
  } as LocalTheme;
}
