"use client";

import Link from "next/link";
import { useLocalContent } from "./LocalContentProvider";
import { PremiumButton } from "./PremiumButton";
import { QuoteForm } from "./QuoteForm";

export function LocalHero() {
  const content = useLocalContent();
  const { hero, siteName, heroBackground } = content;

  return (
    <section
      className="fb-hero"
      style={{
        backgroundImage: `url("${heroBackground}")`,
      }}
    >
      <div className="fb-hero__inner">
        <div className="fb-hero__content">
          <h1 className="fb-hero__title">
            <span className="fb-hero__highlight">{hero.titleHighlight}</span> {hero.titleRest}
          </h1>
          <p className="fb-hero__subtitle">
            <strong>{siteName} </strong>
            {hero.subtitle}
          </p>
          <div className="fb-hero__actions">
            <PremiumButton href="#quote-form">{hero.cta}</PremiumButton>
            <Link href={hero.servicesHref} className="fb-hero__link">
              <span className="fb-hero__link-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </span>
              <span>{hero.servicesLabel}</span>
            </Link>
          </div>
        </div>

        <div className="fb-hero__aside">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
