import type { Metadata } from "next";
import { EcommerceShell } from "@/components/ecommerce/EcommerceShell";
import { ShopView } from "@/components/ecommerce/shop/ShopView";
import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";
import { defaultEcommerceTheme } from "@/lib/ecommerce/theme";

export const metadata: Metadata = {
  title: ecommerceSampleContent.shop.metadata.title,
  description: ecommerceSampleContent.shop.metadata.description,
  icons: {
    icon: ecommerceSampleContent.favicon,
  },
};

export default function EcommerceShopPage() {
  return (
    <EcommerceShell content={ecommerceSampleContent} theme={defaultEcommerceTheme}>
      <ShopView />
    </EcommerceShell>
  );
}
