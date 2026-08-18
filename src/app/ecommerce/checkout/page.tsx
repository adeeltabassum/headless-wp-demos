import type { Metadata } from "next";
import { EcommerceShell } from "@/components/ecommerce/EcommerceShell";
import { CheckoutView } from "@/components/ecommerce/checkout/CheckoutView";
import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";
import { defaultEcommerceTheme } from "@/lib/ecommerce/theme";
import type { CartLine } from "@/components/ecommerce/CartProvider";

const demoCart: CartLine[] = ecommerceSampleContent.shop.products.slice(0, 4).map((p) => ({
  id: p.slug,
  slug: p.slug,
  title: p.title,
  price: p.price,
  priceValue: p.priceValue,
  image: p.image,
  quantity: 1,
}));

export const metadata: Metadata = {
  title: `Checkout — ${ecommerceSampleContent.siteName}`,
  description: "Complete your order — shipping, payment, and review.",
  icons: { icon: ecommerceSampleContent.favicon },
};

export default function EcommerceCheckoutPage() {
  return (
    <EcommerceShell
      content={ecommerceSampleContent}
      theme={defaultEcommerceTheme}
      cartInitialItems={demoCart}
    >
      <CheckoutView />
    </EcommerceShell>
  );
}
