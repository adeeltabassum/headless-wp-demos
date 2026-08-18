"use client";

import { useMemo, useState } from "react";
import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { resolveProductDetail } from "@/lib/ecommerce/product";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { useEcommerceCart } from "../CartProvider";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";
import { ProductCard } from "../ui/ProductCard";

type TabKey = "description" | "specifications" | "shipping";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="ec-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? "is-on" : undefined}>
          ★
        </span>
      ))}
    </span>
  );
}

export function ProductDetailView({ slug }: { slug: string }) {
  const content = useEcommerceContent();
  const { addItem } = useEcommerceCart();
  const detail = useMemo(() => resolveProductDetail(content, slug), [content, slug]);

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [colorIdx, setColorIdx] = useState(0);
  const [size, setSize] = useState("");
  const [tab, setTab] = useState<TabKey>("description");

  if (!detail) {
    return (
      <main className="ec-section">
        <div className="ec-container">
          <p>Product not found.</p>
          <Link className="ec-btn ec-btn--dark" href={`${content.siteBase}/shop`}>
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  const { product, page, related } = detail;
  const shopHref = `${content.siteBase}/shop`;
  const gallery = product.gallery.length ? product.gallery : ["", "", "", ""];

  const tabBody =
    tab === "description"
      ? product.descriptionParagraphs
      : tab === "specifications"
        ? product.specifications
        : product.shippingInfo;

  return (
    <main className="ec-pdp">
      <div className="ec-container">
        <nav className="ec-breadcrumb" aria-label="Breadcrumb">
          <Link href={content.siteBase}>{page.breadcrumbHome}</Link>
          <span aria-hidden="true">/</span>
          <Link href={shopHref}>{page.breadcrumbShop}</Link>
          <span aria-hidden="true">/</span>
          <span>{page.breadcrumbCurrent}</span>
        </nav>

        <section className="ec-pdp-hero">
          <div className="ec-pdp-gallery">
            <MediaPlaceholder
              className="ec-pdp-gallery__main"
              src={gallery[activeImage] || product.image}
              alt={product.title}
            />
            <div className="ec-pdp-gallery__thumbs">
              {gallery.slice(0, 5).map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className={`ec-pdp-gallery__thumb${i === activeImage ? " is-active" : ""}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <MediaPlaceholder src={src || product.image} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="ec-pdp-info">
            <h1>{product.title}</h1>
            <p className="ec-pdp-price">{product.price}</p>
            <div className="ec-pdp-rating">
              <Stars rating={product.rating} />
              <span>({product.reviewCount} reviews)</span>
            </div>
            <p className="ec-pdp-short">{product.shortDescription}</p>

            <div className="ec-pdp-field">
              <span className="ec-pdp-label">{page.quantityLabel}</span>
              <div className="ec-qty">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span aria-live="polite">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="ec-pdp-field">
              <span className="ec-pdp-label">{page.colorLabel}</span>
              <div className="ec-swatches">
                {product.colors.map((c, i) => (
                  <button
                    key={c.label}
                    type="button"
                    className={`ec-swatch${i === colorIdx ? " is-active" : ""}`}
                    style={{ background: c.hex }}
                    aria-label={c.label}
                    aria-pressed={i === colorIdx}
                    onClick={() => setColorIdx(i)}
                  />
                ))}
              </div>
            </div>

            <div className="ec-pdp-field">
              <span className="ec-pdp-label">{page.sizeLabel}</span>
              <select
                className="ec-select"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                aria-label={page.sizeLabel}
              >
                <option value="">{page.sizePlaceholder}</option>
                {product.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="ec-pdp-actions">
              <button
                type="button"
                className="ec-btn ec-btn--dark"
                onClick={() => addItem(product, qty)}
              >
                {page.addToCartLabel}
              </button>
              <button
                type="button"
                className="ec-btn ec-btn--outline"
                onClick={() => addItem(product, qty)}
              >
                {page.buyNowLabel}
              </button>
            </div>
          </div>
        </section>

        <section className="ec-pdp-tabs">
          <div className="ec-pdp-tabs__nav" role="tablist">
            {(
              [
                ["description", page.tabDescription],
                ["specifications", page.tabSpecifications],
                ["shipping", page.tabShipping],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                className={tab === key ? "is-active" : undefined}
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="ec-pdp-tabs__body" role="tabpanel">
            {tab === "specifications" || tab === "shipping" ? (
              <ul className="ec-pdp-list">
                {tabBody.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              tabBody.map((para) => <p key={para.slice(0, 24)}>{para}</p>)
            )}
          </div>
        </section>
      </div>

      <section className="ec-section">
        <div className="ec-container">
          <div className="ec-section-head ec-section-head--center">
            <div>
              <h2>{page.relatedHeading}</h2>
              <p className="ec-section-head__sub">{page.relatedSubheading}</p>
            </div>
          </div>
          <div className="ec-product-grid ec-product-grid--3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} badgeVariant="dark" />
            ))}
          </div>
        </div>
      </section>

      <section className="ec-section ec-section--soft">
        <div className="ec-container">
          <div className="ec-section-head ec-section-head--center">
            <div>
              <h2>{page.reviewsHeading}</h2>
              <p className="ec-section-head__sub">{page.reviewsSubheading}</p>
            </div>
          </div>
          <div className="ec-review-grid">
            {page.reviews.map((review) => (
              <article key={`${review.author}-${review.date}`} className="ec-review-card">
                <Stars rating={review.rating} />
                <h3>{review.title}</h3>
                <p>{review.body}</p>
                <p className="ec-review-card__meta">
                  {review.author} <span aria-hidden="true">|</span> {review.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ec-section">
        <div className="ec-container ec-container--narrow">
          <div className="ec-section-head ec-section-head--center">
            <div>
              <h2>{page.faqHeading}</h2>
              <p className="ec-section-head__sub">{page.faqSubheading}</p>
            </div>
          </div>
          <div className="ec-faq">
            {page.faq.map((item, i) => (
              <details key={item.question} className="ec-faq__item" open={i === 0}>
                <summary>
                  <span>{item.question}</span>
                  <span className="ec-faq__chevron" aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="ec-section">
        <div className="ec-container">
          <div className="ec-shop-promo">
            <div className="ec-shop-promo__copy">
              <h2>{page.cta.title}</h2>
              <p>{page.cta.body}</p>
              <Link className="ec-btn ec-btn--dark" href={page.cta.ctaHref}>
                {page.cta.ctaLabel}
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </Link>
            </div>
            <MediaPlaceholder className="ec-shop-promo__media" src={page.cta.image} alt="" />
          </div>
        </div>
      </section>
    </main>
  );
}
