import type { Metadata } from "next";
import { EcommerceShell } from "@/components/ecommerce/EcommerceShell";
import { Hero } from "@/components/ecommerce/home/Hero";
import { TopProducts } from "@/components/ecommerce/home/TopProducts";
import { FeaturePrimary, FeatureSecondary } from "@/components/ecommerce/home/FeaturePrimary";
import { OurProducts } from "@/components/ecommerce/home/OurProducts";
import { Categories } from "@/components/ecommerce/home/Categories";
import { Blog } from "@/components/ecommerce/home/Blog";
import { FAQ } from "@/components/ecommerce/home/FAQ";
import { CTABanner } from "@/components/ecommerce/home/CTABanner";
import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";
import { defaultEcommerceTheme } from "@/lib/ecommerce/theme";

export const metadata: Metadata = {
  title: ecommerceSampleContent.metadata.title,
  description: ecommerceSampleContent.metadata.description,
  icons: {
    icon: ecommerceSampleContent.favicon,
  },
};

export default function EcommerceHomePage() {
  return (
    <EcommerceShell content={ecommerceSampleContent} theme={defaultEcommerceTheme}>
      <main>
        <Hero />
        <TopProducts />
        <FeaturePrimary />
        <OurProducts />
        <Categories />
        <FeatureSecondary />
        <Blog />
        <FAQ />
        <CTABanner />
      </main>
    </EcommerceShell>
  );
}
