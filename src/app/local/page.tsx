import type { Metadata } from "next";
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
import { localSampleContent } from "@/lib/local/sample-content";
import { defaultLocalTheme } from "@/lib/local/theme";
import "@/styles/local/header-footer.css";
import "@/styles/local/hero.css";
import "@/styles/local/sections.css";

export const metadata: Metadata = {
  title: localSampleContent.metadata.title,
  description: localSampleContent.metadata.description,
  icons: {
    icon: localSampleContent.favicon,
  },
};

export default function LocalPage() {
  return (
    <LocalRoot theme={defaultLocalTheme}>
      <LocalContentProvider content={localSampleContent}>
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
  );
}
