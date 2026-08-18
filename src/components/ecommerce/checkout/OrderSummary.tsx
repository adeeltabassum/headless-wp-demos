"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { useEcommerceCart, type CartLine } from "../CartProvider";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";

function money(prefix: string, value: number) {
  return `${prefix}${value.toFixed(2)}`;
}

export function OrderSummary({
  items,
  shippingPrice,
}: {
  items: CartLine[];
  shippingPrice: number;
}) {
  const { checkout } = useEcommerceContent();
  const subtotal = items.reduce((sum, l) => sum + l.priceValue * l.quantity, 0);
  const taxes = checkout.taxAmount;
  const total = subtotal + shippingPrice + taxes;

  return (
    <aside className="ec-checkout-summary">
      <h2>{checkout.summaryTitle}</h2>
      <ul className="ec-checkout-summary__list">
        {items.map((line) => (
          <li key={line.id}>
            <MediaPlaceholder className="ec-checkout-summary__thumb" src={line.image} alt="" />
            <div>
              <p className="ec-checkout-summary__name">{line.title}</p>
              <p className="ec-checkout-summary__price">
                {line.quantity > 1 ? `${line.quantity} × ` : ""}
                {line.price}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="ec-checkout-summary__rows">
        <div>
          <span>{checkout.subtotalLabel}</span>
          <span>{money(checkout.currencyPrefix, subtotal)}</span>
        </div>
        <div>
          <span>{checkout.shippingLabel}</span>
          <span>{money(checkout.currencyPrefix, shippingPrice)}</span>
        </div>
        <div>
          <span>{checkout.taxesLabel}</span>
          <span>{money(checkout.currencyPrefix, taxes)}</span>
        </div>
      </div>
      <div className="ec-checkout-summary__total">
        <span>{checkout.totalLabel}</span>
        <strong>{money(checkout.currencyPrefix, total)}</strong>
      </div>
    </aside>
  );
}

export function CheckoutEmpty() {
  const { checkout, siteBase } = useEcommerceContent();
  return (
    <main className="ec-checkout">
      <div className="ec-container ec-checkout-empty">
        <h1>{checkout.emptyTitle}</h1>
        <Link className="ec-btn ec-btn--dark" href={checkout.emptyCtaHref || `${siteBase}/shop`}>
          {checkout.emptyCtaLabel}
        </Link>
      </div>
    </main>
  );
}
