import type { Article, Category, NicheTemplateContent, StaticPageData } from "./content";
import { getArticlesByCategory, getCategoryBySlug, getPageBySlug } from "./content";

export type SiteRoute =
  | { type: "home" }
  | { type: "category"; category: Category }
  | { type: "article"; article: Article }
  | { type: "page"; page: StaticPageData }
  | { type: "contact"; page: StaticPageData }
  | { type: "tag"; tagLabel: string; articles: Article[] }
  | { type: "notFound" };

function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

function getArticlesByTag(content: NicheTemplateContent, slug: string): { tagLabel: string; articles: Article[] } | null {
  const tagLabel = content.sidebar.tags.find((t) => tagSlug(t) === slug);
  if (!tagLabel) return null;

  const category = content.categories.find((c) => tagSlug(c.label) === slug || c.slug === slug);
  const articles = category
    ? getArticlesByCategory(content, category.slug)
    : content.articles.filter(
        (a) =>
          tagSlug(a.title).includes(slug) ||
          a.title.toLowerCase().includes(tagLabel.toLowerCase())
      );

  return { tagLabel, articles };
}

/** Resolve a pathname under `siteBase` into a renderable site route. */
export function parseSitePath(
  siteBase: string,
  pathname: string,
  content: NicheTemplateContent
): SiteRoute {
  const base = siteBase.replace(/\/+$/, "");
  const normalized = pathname.replace(/\/+$/, "") || base;
  if (normalized === base) return { type: "home" };

  if (!normalized.startsWith(`${base}/`)) return { type: "notFound" };

  const parts = normalized.slice(base.length + 1).split("/").filter(Boolean);

  if (parts[0] === "category" && parts[1]) {
    const category = getCategoryBySlug(content, parts[1]);
    return category ? { type: "category", category } : { type: "notFound" };
  }

  if (parts[0] === "article") {
    if (parts[1] === "tag" && parts[2]) {
      const match = getArticlesByTag(content, parts[2]);
      return match ? { type: "tag", tagLabel: match.tagLabel, articles: match.articles } : { type: "notFound" };
    }
    if (parts[1]) {
      const article = content.articles.find((a) => a.slug === parts[1]);
      return article ? { type: "article", article } : { type: "notFound" };
    }
  }

  if (parts[0] === "page" && parts[1]) {
    const page = getPageBySlug(content, parts[1]);
    if (!page) return { type: "notFound" };
    return parts[1] === "contact" ? { type: "contact", page } : { type: "page", page };
  }

  return { type: "notFound" };
}

export function articleBasePath(siteBase: string): string {
  return `${siteBase.replace(/\/+$/, "")}/article`;
}
