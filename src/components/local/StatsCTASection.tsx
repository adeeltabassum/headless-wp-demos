"use client";

import { useLocalContent } from "./LocalContentProvider";
import { PremiumButton } from "./PremiumButton";

export function StatsCTASection() {
  const localContent = useLocalContent();
  const { statsCta, phone, phoneHref } = localContent;

  return (
    <section id="stats" className="fb-section fb-stats-cta">
      <div className="fb-section__inner">
        <div className="fb-stats-cta__top">
          <div className="fb-stats-cta__copy">
            <h2 className="fb-stats-cta__heading">{statsCta.heading}</h2>
            <p className="fb-stats-cta__subheading">{statsCta.subheading}</p>
          </div>
          <div className="fb-stats-cta__actions">
            <PremiumButton href="#quote-form">{statsCta.button}</PremiumButton>
            <p className="fb-stats-cta__phone">
              <a href={phoneHref}>{phone}</a>
            </p>
          </div>
        </div>

        <div className="fb-stats-cta__grid">
          {statsCta.stats.map((stat) => (
            <div key={stat.label} className="fb-stat-box">
              <p className="fb-stat-box__label">{stat.label}</p>
              <p className="fb-stat-box__value">
                {stat.value}
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
