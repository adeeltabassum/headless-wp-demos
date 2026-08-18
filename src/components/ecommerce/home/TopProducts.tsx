"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { ProductCard } from "../ui/ProductCard";

export function TopProducts() {
  const { home } = useEcommerceContent();
  const section = home.topProducts;

  return (
    <section className="ec-section">
      <div className="ec-container">
        <div className="ec-section-head">
          <div>
            <h2>{section.heading}</h2>
            <p className="ec-section-head__sub">{section.subheading}</p>
          </div>
          <Link className="ec-btn ec-btn--dark" href={section.viewAllHref}>
            {section.viewAllLabel}
          </Link>
        </div>
        <div className="ec-product-grid ec-product-grid--3">
          {section.items.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
