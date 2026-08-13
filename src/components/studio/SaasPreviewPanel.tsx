"use client";

import "@/styles/saas/saas.css";
import SaasHeader from "@/components/saas/Header";
import SaasHero from "@/components/saas/Hero";
import ProductDescription from "@/components/saas/ProductDescription";
import Tools from "@/components/saas/Tools";
import Workflow from "@/components/saas/Workflow";
import Testimonials from "@/components/saas/Testimonials";
import Pricing from "@/components/saas/Pricing";
import Blog from "@/components/saas/Blog";
import FAQ from "@/components/saas/FAQ";
import FinalCTA from "@/components/saas/FinalCTA";
import Footer from "@/components/saas/Footer";
import ElementorAnimations from "@/components/saas/ElementorAnimations";
import { SaasStyles } from "@/components/saas/SaasStyles";
import { SaasContentProvider } from "@/components/saas/SaasPreviewProvider";
import { SaasRoot } from "@/components/saas/SaasRoot";
import { deriveSaasContent, deriveSaasTheme } from "@/lib/builder/deriveSaas";
import type { WorkingDraft } from "@/lib/builder/mergePatch";
import type { BuilderDraft } from "@/lib/builder/schema";
import { useMemo } from "react";

export function SaasPreviewPanel({ draft }: { draft: WorkingDraft }) {
  const parsed = useMemo((): BuilderDraft | null => {
    if (!draft.siteName) return null;
    return {
      slug: draft.slug || "preview",
      siteName: draft.siteName,
      templateId: "saas",
      ...draft,
    } as BuilderDraft;
  }, [draft]);

  const content = useMemo(() => (parsed ? deriveSaasContent(parsed) : null), [parsed]);
  const theme = useMemo(() => (parsed ? deriveSaasTheme(parsed) : null), [parsed]);

  if (!content || !theme) {
    return (
      <div className="builder-preview-frame">
        <div className="builder-empty">Fill in the site name to preview the SAAS template.</div>
      </div>
    );
  }

  return (
    <div className="builder-preview-frame builder-preview-frame--saas">
      <SaasStyles />
      <SaasRoot theme={theme}>
        <SaasContentProvider content={content}>
          <ElementorAnimations />
          <SaasHeader />
          <main>
            <div
              data-elementor-type="wp-page"
              data-elementor-id="4837"
              className="elementor elementor-4837"
              data-elementor-post-type="page"
            >
              <SaasHero />
              <ProductDescription />
              <Tools />
              <Workflow />
              <Testimonials />
              <Pricing />
              <Blog />
              <FAQ />
              <FinalCTA />
            </div>
          </main>
          <Footer />
        </SaasContentProvider>
      </SaasRoot>
    </div>
  );
}
