"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  NicheTemplateRoot,
  NicheTemplateHeader,
  NicheTemplateHero,
  NicheTemplateCategoryTiles,
  NicheTemplateArticleGrid,
  NicheTemplateCategoryPage,
  NicheTemplateSingleArticle,
  NicheTemplateStaticPage,
  NicheTemplateContactPage,
  NicheTemplateTagPage,
  NicheTemplateFooter,
} from "@/components/niche-template";
import { PreviewNavigationProvider } from "@/components/niche-template/PreviewNavigation";
import { deriveContent, deriveTheme } from "@/lib/builder/derive";
import { BuilderDraftSchema, type BuilderDraft } from "@/lib/builder/schema";
import type { WorkingDraft } from "@/lib/builder/mergePatch";
import { articleBasePath, parseSitePath } from "@/lib/niche-template/routes";

/**
 * Renders the actual production niche-template components fed by the
 * in-progress draft — not a mockup. Includes an in-panel router so links
 * work before publish (no real Next.js routes exist for draft slugs yet).
 */
export function PreviewPanel({ draft }: { draft: WorkingDraft }) {
  const parsed = useMemo(() => {
    const withDefaults: BuilderDraft = {
      slug: draft.slug || "preview",
      siteName: draft.siteName || "",
      ...draft,
    } as BuilderDraft;
    const result = BuilderDraftSchema.safeParse(withDefaults);
    return result.success ? result.data : null;
  }, [draft]);

  const siteBase = `/${parsed?.slug || "preview"}`;
  const [previewPath, setPreviewPath] = useState(siteBase);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPreviewPath(siteBase);
  }, [siteBase]);

  const navigate = useCallback((href: string) => {
    setPreviewPath(href);
    frameRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const previewNav = useMemo(
    () => ({
      enabled: true as const,
      siteBase,
      pathname: previewPath,
      navigate,
    }),
    [siteBase, previewPath, navigate]
  );

  if (!parsed || !parsed.siteName) {
    return (
      <div className="builder-preview-frame">
        <div className="builder-empty">
          Fill in the site name under Business information to see a live preview here.
        </div>
      </div>
    );
  }

  const content = deriveContent(parsed);
  const theme = deriveTheme(parsed);
  const route = parseSitePath(siteBase, previewPath, content);
  const articlesPath = articleBasePath(siteBase);

  function renderMain() {
    switch (route.type) {
      case "home":
        return (
          <>
            <NicheTemplateHero content={content} />
            <NicheTemplateCategoryTiles content={content} />
            <NicheTemplateArticleGrid content={content} basePath={articlesPath} />
          </>
        );
      case "category":
        return (
          <NicheTemplateCategoryPage content={content} category={route.category} basePath={articlesPath} />
        );
      case "article":
        return <NicheTemplateSingleArticle content={content} article={route.article} basePath={articlesPath} />;
      case "page":
        return <NicheTemplateStaticPage content={content} page={route.page} />;
      case "contact":
        return <NicheTemplateContactPage content={content} page={route.page} />;
      case "tag":
        return (
          <NicheTemplateTagPage
            content={content}
            tagLabel={route.tagLabel}
            articles={route.articles}
            basePath={articlesPath}
          />
        );
      case "notFound":
        return (
          <div className="nt-main">
            <div className="nt-container">
              <div className="nt-no-articles" style={{ padding: "48px 0" }}>
                <h2>Page not found in preview</h2>
                <p>This page will exist after you publish. Use Home below to return to the homepage.</p>
              </div>
            </div>
          </div>
        );
    }
  }

  const pageLabel =
    route.type === "home"
      ? "Homepage"
      : route.type === "category"
        ? `Category: ${route.category.label}`
        : route.type === "article"
          ? route.article.title
          : route.type === "page" || route.type === "contact"
            ? route.page.title
            : route.type === "tag"
              ? `Tag: ${route.tagLabel}`
              : "Not found";

  return (
    <div className="builder-preview-frame" ref={frameRef}>
      <PreviewNavigationProvider value={previewNav}>
        <div className="builder-preview-chrome">
          <span className="builder-preview-chrome__label">Preview: {pageLabel}</span>
          <button type="button" className="builder-preview-chrome__home" onClick={() => navigate(siteBase)}>
            Home
          </button>
        </div>
        <div className="builder-preview-inner">
          <NicheTemplateRoot theme={theme}>
            <NicheTemplateHeader content={content} />
            <main>{renderMain()}</main>
            <NicheTemplateFooter content={content} />
          </NicheTemplateRoot>
        </div>
      </PreviewNavigationProvider>
    </div>
  );
}
