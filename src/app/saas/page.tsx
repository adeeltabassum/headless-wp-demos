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
import SaasFooter from "@/components/saas/Footer";
import ElementorAnimations from "@/components/saas/ElementorAnimations";
import { SaasContentProvider } from "@/components/saas/SaasPreviewProvider";
import { SaasRoot } from "@/components/saas/SaasRoot";
import { saasSampleContent } from "@/lib/saas/content";
import { defaultSaasTheme } from "@/lib/saas/theme";

export default function SaasPage() {
  return (
    <SaasRoot theme={defaultSaasTheme}>
      <SaasContentProvider content={saasSampleContent}>
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
        <SaasFooter />
      </SaasContentProvider>
    </SaasRoot>
  );
}
