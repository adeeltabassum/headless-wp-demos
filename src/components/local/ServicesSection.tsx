"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocalContent } from "./LocalContentProvider";
import { PremiumButton } from "./PremiumButton";

function ServiceCard({
  title,
  description,
  href,
  image,
  size,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
  size: "large" | "small";
}) {
  return (
    <Link
      href={href}
      className={`fb-service-card ${size === "large" ? "fb-service-card--large" : "fb-service-card--small"}`}
    >
      <div className="fb-service-card__image-wrap">
        <Image
          src={image}
          alt={title}
          width={size === "large" ? 260 : 175}
          height={size === "large" ? 250 : 220}
          className="fb-service-card__image"
          unoptimized={image.endsWith(".svg")}
        />
      </div>
      <h3 className="fb-service-card__title">{title}</h3>
      <p className="fb-service-card__desc">{description}</p>
      <div className="fb-service-card__link-wrap">
        <span className="fb-service-card__link">Learn More</span>
      </div>
    </Link>
  );
}

export function ServicesSection() {
  const localContent = useLocalContent();
  const { services } = localContent;

  return (
    <section id="services" className="fb-section fb-services">
      <div className="fb-section__inner">
        <div className="fb-section__header">
          <h2 className="fb-section__title">{services.heading}</h2>
          <p className="fb-section__subtitle">{services.subheading}</p>
        </div>

        <div className="fb-services__grid-row">
          {services.items.slice(0, 2).map((item) => (
            <ServiceCard key={item.title} {...item} size="large" />
          ))}
        </div>

        <div className="fb-services__grid-row fb-services__grid-row--three">
          {services.items.slice(2).map((item) => (
            <ServiceCard key={item.title} {...item} size="small" />
          ))}
        </div>

        <div className="fb-section__footer">
          <PremiumButton href="/services">{services.cta}</PremiumButton>
        </div>
      </div>
    </section>
  );
}
