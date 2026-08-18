"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { useEcommerceCart } from "../CartProvider";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";

function formatMoney(prefix: string, value: number) {
  return `${prefix}${value.toFixed(2)}`;
}

export function CartDrawer() {
  const { cart, siteBase } = useEcommerceContent();
  const {
    items,
    itemCount,
    totalValue,
    isOpen,
    closeCart,
    removeItem,
    setQuantity,
  } = useEcommerceCart();

  const emptyHref = cart.emptyCtaHref || `${siteBase}/shop`;
  const isEmpty = items.length === 0;

  return (
    <div className={`ec-cart${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen}>
      <button
        type="button"
        className="ec-cart__backdrop"
        aria-label="Close cart"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeCart}
      />
      <aside
        className="ec-cart__panel"
        role="dialog"
        aria-modal="true"
        aria-label={cart.title}
      >
        <div className="ec-cart__head">
          <div className="ec-cart__title-row">
            <h2>{cart.title}</h2>
            <span className="ec-cart__badge" aria-label={`${itemCount} items`}>
              {itemCount}
            </span>
          </div>
          <button type="button" className="ec-cart__close" aria-label="Close" onClick={closeCart}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="ec-cart__body">
          {isEmpty ? (
            <div className="ec-cart-empty">
              <div className="ec-cart-empty__icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 20h32l-3 28H19L16 20z" />
                  <path d="M24 20V16a8 8 0 0 1 16 0v4" />
                </svg>
              </div>
              <p>{cart.emptyTitle}</p>
              <Link className="ec-btn ec-btn--dark" href={emptyHref} onClick={closeCart}>
                {cart.emptyCtaLabel}
              </Link>
            </div>
          ) : (
            <ul className="ec-cart-list">
              {items.map((line) => (
                <li key={line.id} className="ec-cart-line">
                  <MediaPlaceholder className="ec-cart-line__media" src={line.image} alt={line.title} />
                  <div className="ec-cart-line__info">
                    <div className="ec-cart-line__top">
                      <div>
                        <h3>{line.title}</h3>
                        <p className="ec-cart-line__price">{line.price}</p>
                      </div>
                      <button
                        type="button"
                        className="ec-cart-line__remove"
                        aria-label={`Remove ${line.title}`}
                        onClick={() => removeItem(line.id)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M5 7h14M10 7V5h4v2M8 7l1 12h6l1-12" />
                        </svg>
                      </button>
                    </div>
                    <div className="ec-qty ec-qty--sm">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity(line.id, line.quantity - 1)}
                      >
                        −
                      </button>
                      <span aria-live="polite">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQuantity(line.id, line.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="ec-cart__foot">
          <div className="ec-cart__total">
            <span>{cart.totalLabel}</span>
            <strong>{formatMoney(cart.currencyPrefix, totalValue)}</strong>
          </div>
          {isEmpty ? (
            <button type="button" className="ec-btn ec-btn--outline ec-btn--block">
              {cart.checkoutLabel}
            </button>
          ) : (
            <Link
              className="ec-btn ec-btn--dark ec-btn--block"
              href={`${siteBase}/checkout`}
              onClick={closeCart}
            >
              {cart.checkoutLabel}
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
}
