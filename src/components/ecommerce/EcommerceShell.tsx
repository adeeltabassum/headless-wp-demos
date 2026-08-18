"use client";

import type { ReactNode } from "react";
import type { EcommerceContent } from "@/lib/ecommerce/content";
import type { EcommerceTheme } from "@/lib/ecommerce/theme";
import { EcommerceRoot } from "./EcommerceRoot";
import { EcommerceContentProvider } from "./EcommerceContentProvider";
import { EcommerceCartProvider, type CartLine } from "./CartProvider";
import { EcommerceHeader } from "./Header";
import { EcommerceFooter } from "./Footer";
import { CartDrawer } from "./cart/CartDrawer";

/** Shared chrome for all ecommerce template pages (home, shop, product, cart). */
export function EcommerceShell({
  content,
  theme,
  children,
  cartInitialItems,
  cartInitiallyOpen,
  persistCart = true,
}: {
  content: EcommerceContent;
  theme: EcommerceTheme;
  children: ReactNode;
  cartInitialItems?: CartLine[];
  cartInitiallyOpen?: boolean;
  /** Persist cart across navigations (disable in Studio preview). */
  persistCart?: boolean;
}) {
  return (
    <EcommerceRoot theme={theme}>
      <EcommerceContentProvider content={content}>
        <EcommerceCartProvider
          initialItems={cartInitialItems}
          initiallyOpen={cartInitiallyOpen}
          storageKey={persistCart ? `ec-cart:${content.siteBase}` : undefined}
        >
          <EcommerceHeader />
          {children}
          <EcommerceFooter />
          <CartDrawer />
        </EcommerceCartProvider>
      </EcommerceContentProvider>
    </EcommerceRoot>
  );
}
