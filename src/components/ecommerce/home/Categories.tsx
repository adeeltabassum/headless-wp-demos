"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";

export function Categories() {
  const { home } = useEcommerceContent();
  const section = home.categories;

  return (
    <section className="ec-section ec-section--soft">
      <div className="ec-container">
        <div className="ec-section-head">
          <div>
            <h2>{section.heading}</h2>
            <p className="ec-section-head__sub">{section.subheading}</p>
          </div>
          <Link className="ec-text-link" href={section.viewAllHref}>
            {section.viewAllLabel}
          </Link>
        </div>
        <div className="ec-category-grid">
          {section.items.map((item, i) => (
            <article key={`${item.title}-${i}`} className="ec-category-card">
              <MediaPlaceholder className="ec-category-card__media" src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link className="ec-btn ec-btn--dark ec-btn--sm" href={item.href}>
                Read more
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
