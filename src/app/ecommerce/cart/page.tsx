import type { Metadata } from "next";
import { EcommerceShell } from "@/components/ecommerce/EcommerceShell";
import { CartPageView } from "@/components/ecommerce/cart/CartPageView";
import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";
import { defaultEcommerceTheme } from "@/lib/ecommerce/theme";

export const metadata: Metadata = {
  title: `Cart — ${ecommerceSampleContent.siteName}`,
  description: "Review items in your shopping cart.",
  icons: { icon: ecommerceSampleContent.favicon },
};

export default function EcommerceCartPage() {
  return (
    <EcommerceShell
      content={ecommerceSampleContent}
      theme={defaultEcommerceTheme}
      cartInitiallyOpen
    >
      <CartPageView />
    </EcommerceShell>
  );
}
