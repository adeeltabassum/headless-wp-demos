"use client";

import "@/styles/saas/saas.css";
import SaasHeader from "@/components/saas/Header";
import SaasHero from "@/components/saas/Hero";
import ProductDescription from "@/components/saas/ProductDescription";
import Tools from "@/components/saas/Tools";
import Workflow from "@/components/saas/Workflow";
import Features from "@/components/saas/Features";
import Testimonials from "@/components/saas/Testimonials";
import Pricing from "@/components/saas/Pricing";
import Blog from "@/components/saas/Blog";
import FAQ from "@/components/saas/FAQ";
import FinalCTA from "@/components/saas/FinalCTA";
import Footer from "@/components/saas/Footer";
import { SaasPreviewProvider } from "@/components/saas/SaasPreviewProvider";
import { deriveSaasContent } from "@/lib/builder/deriveSaas";
import type { WorkingDraft } from "@/lib/builder/mergePatch";
import type { BuilderDraft } from "@/lib/builder/schema";
import { useMemo } from "react";

export function SaasPreviewPanel({ draft }: { draft: WorkingDraft }) {
  const parsed = useMemo((): BuilderDraft | null => {
    if (!draft.siteName) return null;
    return { slug: draft.slug || "preview", siteName: draft.siteName, templateId: "saas", ...draft } as BuilderDraft;
  }, [draft]);

  const content = useMemo(() => (parsed ? deriveSaasContent(parsed) : null), [parsed]);

  if (!content) {
    return (
      <div className="builder-preview-frame">
        <div className="builder-empty">Fill in the site name to preview the SAAS template.</div>
      </div>
    );
  }

  return (
    <div
      className="builder-preview-frame builder-preview-frame--saas"
      style={{ ["--saas-primary" as string]: content.primaryColor } as React.CSSProperties}
    >
      <SaasPreviewProvider content={content}>
        <SaasHeader />
        <main>
          <SaasHero />
          <ProductDescription />
          <Tools />
          <Workflow />
          <Features />
          <Testimonials />
          <Pricing />
          <Blog />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </SaasPreviewProvider>
    </div>
  );
}
