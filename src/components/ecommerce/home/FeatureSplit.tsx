"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import type { EcommerceFeatureBlock } from "@/lib/ecommerce/content";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";

export function FeatureSplit({ feature }: { feature: EcommerceFeatureBlock }) {
  return (
    <section className={`ec-section${feature.reverse ? "" : " ec-section--soft"}`}>
      <div
        className={`ec-container ec-feature${feature.reverse ? " ec-feature--reverse" : ""}`}
      >
        {!feature.reverse ? (
          <>
            <div className="ec-feature__copy">
              <FeatureCopy feature={feature} />
            </div>
            <MediaPlaceholder className="ec-feature__media" src={feature.image} alt="" />
          </>
        ) : (
          <>
            <MediaPlaceholder className="ec-feature__media" src={feature.image} alt="" />
            <div className="ec-feature__copy">
              <FeatureCopy feature={feature} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function FeatureCopy({ feature }: { feature: EcommerceFeatureBlock }) {
  return (
    <>
      <h2>{feature.title}</h2>
      <p>{feature.body}</p>
      <ul className="ec-feature-list">
        {feature.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <Link className="ec-btn ec-btn--dark ec-btn--sm" href={feature.ctaHref}>
        {feature.ctaLabel}
      </Link>
    </>
  );
}
