"use client";

import { useEffect } from "react";
import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { useEcommerceCart } from "../CartProvider";

/** Deep-link target: opens the cart drawer and shows a light page behind it. */
export function CartPageView() {
  const { siteBase, cart } = useEcommerceContent();
  const { openCart, itemCount } = useEcommerceCart();

  useEffect(() => {
    openCart();
  }, [openCart]);

  return (
    <main className="ec-section ec-cart-page">
      <div className="ec-container ec-cart-page__inner">
        <h1>{cart.title}</h1>
        <p>
          {itemCount > 0
            ? `You have ${itemCount} item${itemCount === 1 ? "" : "s"} in your cart.`
            : cart.emptyTitle}
        </p>
        <div className="ec-cart-page__actions">
          <button type="button" className="ec-btn ec-btn--dark" onClick={openCart}>
            View cart
          </button>
          <Link className="ec-btn ec-btn--outline" href={`${siteBase}/shop`}>
            {cart.emptyCtaLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
