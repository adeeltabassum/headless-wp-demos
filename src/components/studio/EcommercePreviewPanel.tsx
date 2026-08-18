"use client";

import "@/styles/ecommerce/ecommerce.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EcommerceShell } from "@/components/ecommerce/EcommerceShell";
import { Hero } from "@/components/ecommerce/home/Hero";
import { TopProducts } from "@/components/ecommerce/home/TopProducts";
import { FeaturePrimary, FeatureSecondary } from "@/components/ecommerce/home/FeaturePrimary";
import { OurProducts } from "@/components/ecommerce/home/OurProducts";
import { Categories } from "@/components/ecommerce/home/Categories";
import { Blog } from "@/components/ecommerce/home/Blog";
import { FAQ } from "@/components/ecommerce/home/FAQ";
import { CTABanner } from "@/components/ecommerce/home/CTABanner";
import { ShopView } from "@/components/ecommerce/shop/ShopView";
import { ProductDetailView } from "@/components/ecommerce/product/ProductDetailView";
import { CartPageView } from "@/components/ecommerce/cart/CartPageView";
import { CheckoutView } from "@/components/ecommerce/checkout/CheckoutView";
import { TrackView } from "@/components/ecommerce/track/TrackView";
import { LegalPolicyView } from "@/components/ecommerce/legal/LegalPolicyView";
import { AboutView } from "@/components/ecommerce/about/AboutView";
import { BlogIndexView } from "@/components/ecommerce/blog/BlogIndexView";
import { BlogPostView } from "@/components/ecommerce/blog/BlogPostView";
import { ContactView } from "@/components/ecommerce/contact/ContactView";
import type { CartLine } from "@/components/ecommerce/CartProvider";
import { PreviewNavigationProvider } from "@/components/niche-template/PreviewNavigation";
import { deriveEcommerceContent, deriveEcommerceTheme } from "@/lib/builder/deriveEcommerce";
import type { WorkingDraft } from "@/lib/builder/mergePatch";
import type { BuilderDraft } from "@/lib/builder/schema";
import type { EcommerceLegalSlug } from "@/lib/ecommerce/content";
import {
  parseEcommercePreviewPath,
  previewPageToPath,
} from "@/lib/ecommerce/preview-routes";
import type { PreviewPage } from "./ecommerce-preview-types";

const PRIMARY_TABS: { id: PreviewPage; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "shop", label: "Shop" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
  { id: "about", label: "About" },
];

const MORE_PAGES: { id: PreviewPage; label: string }[] = [
  { id: "product", label: "Product detail" },
  { id: "cart", label: "Cart drawer" },
  { id: "cart-empty", label: "Empty cart" },
  { id: "checkout", label: "Checkout" },
  { id: "checkout-pay", label: "Payment" },
  { id: "checkout-review", label: "Review" },
  { id: "checkout-success", label: "Thank you" },
  { id: "checkout-failed", label: "Failed" },
  { id: "track", label: "Track order" },
  { id: "track-detail", label: "Track detail" },
  { id: "track-missing", label: "Order not found" },
  { id: "blog-post", label: "Blog post" },
  { id: "legal-shipping", label: "Shipping policy" },
  { id: "legal-refund", label: "Refund policy" },
  { id: "legal-terms", label: "Terms" },
  { id: "legal-privacy", label: "Privacy" },
  { id: "legal-disclaimer", label: "Disclaimer" },
];

const LEGAL_TAB_SLUG: Record<
  "legal-shipping" | "legal-refund" | "legal-terms" | "legal-privacy" | "legal-disclaimer",
  EcommerceLegalSlug
> = {
  "legal-shipping": "shipping-policy",
  "legal-refund": "refund-policy",
  "legal-terms": "terms",
  "legal-privacy": "privacy-policy",
  "legal-disclaimer": "disclaimer",
};

/**
 * Live ecommerce preview for Studio. Uses an in-panel router so header/footer
 * links work before publish (draft slugs have no real Next.js routes yet).
 */
export function EcommercePreviewPanel({ draft }: { draft: WorkingDraft }) {
  const frameRef = useRef<HTMLDivElement>(null);

  const parsed = useMemo((): BuilderDraft | null => {
    if (!draft.siteName) return null;
    return {
      slug: draft.slug || "preview",
      siteName: draft.siteName,
      templateId: "ecommerce",
      ...draft,
    } as BuilderDraft;
  }, [draft]);

  const content = useMemo(() => (parsed ? deriveEcommerceContent(parsed) : null), [parsed]);
  const theme = useMemo(() => (parsed ? deriveEcommerceTheme(parsed) : null), [parsed]);
  const siteBase = content?.siteBase || `/${parsed?.slug || "preview"}`;

  const [previewPath, setPreviewPath] = useState(siteBase);
  const [studioPage, setStudioPage] = useState<PreviewPage | null>(null);

  useEffect(() => {
    setPreviewPath(siteBase);
    setStudioPage(null);
  }, [siteBase]);

  const navigate = useCallback(
    (href: string) => {
      setPreviewPath(href);
      setStudioPage(null);
      frameRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  const previewNav = useMemo(
    () => ({
      enabled: true as const,
      siteBase,
      pathname: previewPath,
      navigate,
    }),
    [siteBase, previewPath, navigate]
  );

  const filledCartItems: CartLine[] = useMemo(() => {
    if (!content) return [];
    return content.shop.products.slice(0, 4).map((p) => ({
      id: p.slug,
      slug: p.slug,
      title: p.title,
      price: p.price,
      priceValue: p.priceValue,
      image: p.image,
      quantity: 1,
    }));
  }, [content]);

  const parsedPath = useMemo(
    () => parseEcommercePreviewPath(siteBase, previewPath),
    [siteBase, previewPath]
  );

  const page: PreviewPage = studioPage || parsedPath.page;
  const previewProductSlug =
    parsedPath.productSlug || content?.shop.products[0]?.slug || "product-1";
  const previewPostSlug =
    parsedPath.postSlug || content?.blog.posts[0]?.slug || "post-1";

  if (!content || !theme) {
    return (
      <div className="builder-preview-frame">
        <div className="builder-empty">Fill in the site name to preview the ecommerce template.</div>
      </div>
    );
  }

  function selectStudioPage(id: PreviewPage) {
    setStudioPage(id);
    setPreviewPath(
      previewPageToPath(siteBase, id, {
        productSlug: previewProductSlug,
        postSlug: previewPostSlug,
      })
    );
    frameRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  const cartOpen = page === "cart" || page === "cart-empty";
  const needsCart =
    page === "cart" ||
    page === "checkout" ||
    page === "checkout-pay" ||
    page === "checkout-review" ||
    page === "checkout-success" ||
    page === "checkout-failed";
  const cartItems = needsCart ? filledCartItems : page === "cart-empty" ? [] : [];
  const checkoutStep =
    page === "checkout-pay"
      ? 2
      : page === "checkout-review" ||
          page === "checkout-success" ||
          page === "checkout-failed"
        ? 3
        : 1;
  const checkoutResult =
    page === "checkout-success" ? "success" : page === "checkout-failed" ? "failed" : null;

  const moreValue = MORE_PAGES.some((p) => p.id === page) ? page : "";

  return (
    <div className="builder-preview-frame builder-preview-frame--ecommerce" ref={frameRef}>
      <div className="builder-preview-toolbar" role="tablist" aria-label="Studio page preview">
        <span className="builder-preview-toolbar__label">Studio preview</span>
        {PRIMARY_TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={page === id}
            className={`builder-preview-tab${page === id ? " is-active" : ""}`}
            onClick={() => selectStudioPage(id)}
          >
            {label}
          </button>
        ))}
        <label className="builder-preview-more">
          <span className="visually-hidden">Other pages</span>
          <select
            value={moreValue}
            aria-label="Other pages"
            onChange={(e) => {
              const next = e.target.value as PreviewPage;
              if (next) selectStudioPage(next);
            }}
          >
            <option value="">Other pages…</option>
            {MORE_PAGES.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <PreviewNavigationProvider value={previewNav}>
        <EcommerceShell
          key={`${page}-${previewProductSlug}-${previewPostSlug}-${cartOpen}`}
          content={content}
          theme={theme}
          cartInitialItems={cartItems}
          cartInitiallyOpen={cartOpen}
          persistCart={false}
        >
          {page === "home" ? (
            <main>
              <Hero />
              <TopProducts />
              <FeaturePrimary />
              <OurProducts />
              <Categories />
              <FeatureSecondary />
              <Blog />
              <FAQ />
              <CTABanner />
            </main>
          ) : page === "shop" ? (
            <ShopView />
          ) : page === "product" ? (
            <ProductDetailView slug={previewProductSlug} />
          ) : page === "cart" || page === "cart-empty" ? (
            <CartPageView />
          ) : page === "track" ? (
            <TrackView initialMode="form" />
          ) : page === "track-detail" ? (
            <TrackView initialMode="detail" />
          ) : page === "track-missing" ? (
            <TrackView initialMode="not-found" />
          ) : page in LEGAL_TAB_SLUG ? (
            <LegalPolicyView slug={LEGAL_TAB_SLUG[page as keyof typeof LEGAL_TAB_SLUG]} />
          ) : page === "about" ? (
            <AboutView />
          ) : page === "blog" ? (
            <BlogIndexView />
          ) : page === "blog-post" ? (
            <BlogPostView slug={previewPostSlug} />
          ) : page === "contact" ? (
            <ContactView />
          ) : (
            <CheckoutView
              initialStep={checkoutStep as 1 | 2 | 3}
              initialResult={checkoutResult}
            />
          )}
        </EcommerceShell>
      </PreviewNavigationProvider>
    </div>
  );
}
