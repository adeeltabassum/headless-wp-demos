"use client";

import { useState } from "react";
import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { useEcommerceContent } from "./EcommerceContentProvider";
import { useEcommerceCart } from "./CartProvider";

export function EcommerceHeader() {
  const { header, siteBase } = useEcommerceContent();
  const { itemCount, openCart } = useEcommerceCart();
  const [open, setOpen] = useState(false);

  return (
    <header className={`ec-header${open ? " ec-header--open" : ""}`}>
      <div className="ec-container ec-header__inner">
        <Link className="ec-logo" href={siteBase} onClick={() => setOpen(false)}>
          {header.logoLabel}
        </Link>

        <nav className="ec-nav" aria-label="Primary">
          {header.nav.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ec-header__actions">
          <button className="ec-icon-btn" type="button" aria-label={header.accountLabel}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 19.5c1.8-3.2 4.2-4.5 7-4.5s5.2 1.3 7 4.5" />
            </svg>
          </button>
          <button
            className="ec-icon-btn ec-icon-btn--cart"
            type="button"
            aria-label={header.cartLabel}
            onClick={openCart}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 8h12l-1 11H7L6 8z" />
              <path d="M9 8V7a3 3 0 0 1 6 0v1" />
            </svg>
            {itemCount > 0 ? <span className="ec-header-cart-count">{itemCount}</span> : null}
          </button>
          <button
            className="ec-icon-btn ec-menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="ec-container ec-nav-mobile">
        <nav aria-label="Mobile">
          {header.nav.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
