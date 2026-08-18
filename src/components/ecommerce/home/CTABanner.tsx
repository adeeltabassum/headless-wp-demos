"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";

export function CTABanner() {
  const { home } = useEcommerceContent();
  const { cta } = home;

  return (
    <section className="ec-section">
      <div className="ec-container">
        <div className="ec-cta-banner">
          <div className="ec-cta-banner__copy">
            <h2>{cta.title}</h2>
            <p>{cta.body}</p>
            <Link className="ec-btn ec-btn--dark" href={cta.ctaHref}>
              {cta.ctaLabel}
            </Link>
          </div>
          <MediaPlaceholder className="ec-cta-banner__media" src={cta.image} alt="" />
        </div>
      </div>
    </section>
  );
}
