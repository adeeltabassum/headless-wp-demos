import type { BuilderDraft } from "./schema";
import { getNicheLabel } from "./presets";
import {
  defaultLogoCustomization,
  renderFaviconFromCustomization,
  renderLogoFromCustomization,
} from "./logoCustomization";
import { siteConfig } from "@/lib/saas/content";
import { stockPhotoUrl } from "./stockPhotos";

export type SaasDraftContent = {
  siteName: string;
  tagline: string;
  heroSubtitle: string;
  logo: string;
  favicon: string;
  heroImage: string;
  primaryColor: string;
  metadata: { title: string; description: string };
};

export function deriveSaasContent(draft: BuilderDraft): SaasDraftContent {
  const niche = getNicheLabel(draft.niche, draft.nicheCustom);
  const primary = draft.theme?.primary || "#40edc3";

  return {
    siteName: draft.siteName,
    tagline: draft.hero?.title || `${draft.siteName} — ${niche}`,
    heroSubtitle:
      draft.hero?.subtitle ||
      siteConfig.heroSubtitle.replace("Lorem ipsum dolor sit amet", niche),
    logo: draft.logo || (draft.logoCustomization ? renderLogoFromCustomization(draft.logoCustomization) : "/saas/images/logo.png"),
    favicon:
      draft.favicon ||
      (draft.logoCustomization ? renderFaviconFromCustomization(draft.logoCustomization) : "/saas/images/logo.png"),
    heroImage:
      draft.templateImages?.hero ||
      draft.hero?.background ||
      stockPhotoUrl(draft.siteName, draft.niche, "hero"),
    primaryColor: primary,
    metadata: {
      title: `${draft.siteName} | ${niche}`,
      description: draft.description || `${draft.siteName} — modern ${niche.toLowerCase()} software.`,
    },
  };
}

export function defaultSaasLogoCustomization(draft: BuilderDraft) {
  return defaultLogoCustomization(draft.siteName, draft.theme?.primary || "#40edc3");
}
