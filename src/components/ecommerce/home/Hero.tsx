"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";

export function Hero() {
  const { home } = useEcommerceContent();
  const { hero } = home;

  return (
    <section className="ec-hero">
      <MediaPlaceholder className="ec-hero__media" src={hero.image} alt="" />
      <div className="ec-hero__overlay" />
      <div className="ec-container ec-hero__content">
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
        <Link className="ec-btn ec-btn--light" href={hero.ctaHref}>
          {hero.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
