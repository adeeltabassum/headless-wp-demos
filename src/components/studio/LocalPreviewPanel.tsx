"use client";

import "@/styles/local/header-footer.css";
import "@/styles/local/hero.css";
import "@/styles/local/sections.css";
import { LocalHeader } from "@/components/local/Header";
import { LocalHero } from "@/components/local/Hero";
import { ServicesSection } from "@/components/local/ServicesSection";
import { ReviewsSection } from "@/components/local/ReviewsSection";
import { GallerySection } from "@/components/local/GallerySection";
import { BlogSection } from "@/components/local/BlogSection";
import { FAQSection } from "@/components/local/FAQSection";
import { StatsCTASection } from "@/components/local/StatsCTASection";
import { LocalFooter } from "@/components/local/Footer";
import { LocalContentProvider } from "@/components/local/LocalContentProvider";
import { LocalRoot } from "@/components/local/LocalRoot";
import { deriveLocalContent, deriveLocalTheme } from "@/lib/builder/deriveLocal";
import type { WorkingDraft } from "@/lib/builder/mergePatch";
import type { BuilderDraft } from "@/lib/builder/schema";
import { useMemo } from "react";

export function LocalPreviewPanel({ draft }: { draft: WorkingDraft }) {
  const parsed = useMemo((): BuilderDraft | null => {
    if (!draft.siteName) return null;
    return {
      slug: draft.slug || "preview",
      siteName: draft.siteName,
      templateId: "local",
      ...draft,
    } as BuilderDraft;
  }, [draft]);

  const content = useMemo(() => (parsed ? deriveLocalContent(parsed) : null), [parsed]);
  const theme = useMemo(() => (parsed ? deriveLocalTheme(parsed) : null), [parsed]);

  if (!content || !theme) {
    return (
      <div className="builder-preview-frame">
        <div className="builder-empty">Fill in the site name to preview the local business template.</div>
      </div>
    );
  }

  return (
    <div className="builder-preview-frame builder-preview-frame--local">
      <LocalRoot theme={theme}>
        <LocalContentProvider content={content}>
          <div className="fb-has-sticky-bar">
            <LocalHeader />
            <main>
              <LocalHero />
              <ServicesSection />
              <ReviewsSection />
              <GallerySection />
              <BlogSection />
              <FAQSection />
              <StatsCTASection />
            </main>
            <LocalFooter />
          </div>
        </LocalContentProvider>
      </LocalRoot>
    </div>
  );
}
