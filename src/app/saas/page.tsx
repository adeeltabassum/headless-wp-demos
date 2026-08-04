import SaasHeader from '@/components/saas/Header';
import SaasHero from '@/components/saas/Hero';
import ProductDescription from '@/components/saas/ProductDescription';
import Tools from '@/components/saas/Tools';
import Workflow from '@/components/saas/Workflow';
import Testimonials from '@/components/saas/Testimonials';
import Pricing from '@/components/saas/Pricing';
import Blog from '@/components/saas/Blog';
import FAQ from '@/components/saas/FAQ';
import FinalCTA from '@/components/saas/FinalCTA';
import SaasFooter from '@/components/saas/Footer';
import ElementorAnimations from '@/components/saas/ElementorAnimations';

export default function SaasPage() {
  return (
    <div className="saas-page">
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
    </div>
  );
}
