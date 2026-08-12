import type { SocialIconKey } from "./images";
import type { ContentBlock } from "@/lib/builder/contentBlocks";

/**
 * Content contract for the niche blog master template.
 *
 * One shape, filled in differently per site. The skeleton components only
 * ever read from this interface — never hardcoded copy, links, or images.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: SocialIconKey;
  label: string;
  href: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  category: string;
  /** Preferred: typed blocks for the single-article page. */
  blocks?: ContentBlock[];
  /** Legacy flat strings — normalized to blocks at render time. */
  content?: string[];
}

export interface CategoryTile {
  label: string;
  href: string;
  background: string;
}

export interface Category {
  label: string;
  slug: string;
  description: string;
  background?: string;
  featuredPostTitle?: string;
}

export interface StaticPageData {
  slug: string;
  title: string;
  bannerTitle: string;
  description: string;
  banner?: string;
  intro?: string;
  /** Preferred: typed blocks. */
  blocks?: ContentBlock[];
  /** Legacy flat strings — normalized to blocks at render time. */
  content?: string[];
}

export interface NicheTemplateContent {
  siteName: string;
  /** Root URL for this site, e.g. `/pet-grooming`. Used for logo/home links. */
  siteBase: string;
  metadata: {
    title: string;
    description: string;
  };
  logo: string;
  favicon: string;
  social: SocialLink[];
  nav: NavLink[];
  /** Extra links shown only inside the mobile off-canvas drawer (above the main nav). */
  offcanvas?: NavLink[];
  hero: {
    title: string;
    subtitle?: string;
    button: string;
    href: string;
    background: string;
  };
  categoryTiles: CategoryTile[];
  categories: Category[];
  articles: Article[];
  sidebar: {
    about: string;
    legal: string;
    privacyHref: string;
    tags: string[];
  };
  footer: {
    featured: NavLink[];
    links: NavLink[];
    newsletter: {
      text: string;
      placeholder: string;
      submit: string;
    };
    copyright: string;
  };
  pages: StaticPageData[];
}

export function getArticlesByCategory(content: NicheTemplateContent, categorySlug: string) {
  return content.articles.filter((article) => article.category === categorySlug);
}

export function getCategoryBySlug(content: NicheTemplateContent, slug: string) {
  return content.categories.find((category) => category.slug === slug);
}

export function getPageBySlug(content: NicheTemplateContent, slug: string) {
  return content.pages.find((page) => page.slug === slug);
}
