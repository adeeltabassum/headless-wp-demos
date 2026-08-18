import type { Metadata } from "next";
import { EcommerceShell } from "@/components/ecommerce/EcommerceShell";
import { AboutView } from "@/components/ecommerce/about/AboutView";
import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";
import { defaultEcommerceTheme } from "@/lib/ecommerce/theme";

export const metadata: Metadata = {
  title: ecommerceSampleContent.about.metadata.title,
  description: ecommerceSampleContent.about.metadata.description,
  icons: { icon: ecommerceSampleContent.favicon },
};

export default function EcommerceAboutPage() {
  return (
    <EcommerceShell content={ecommerceSampleContent} theme={defaultEcommerceTheme}>
      <AboutView />
    </EcommerceShell>
  );
}
