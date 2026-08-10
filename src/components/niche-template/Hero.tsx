import { NicheLink } from "./NicheLink";
import { SlotImage } from "./SlotImage";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import type { NicheTemplateContent } from "@/lib/niche-template/content";

export function NicheTemplateHero({ content }: { content: NicheTemplateContent }) {
  const { hero } = content;

  return (
    <section className="nt-hero">
      <div className="nt-container">
        <div className="nt-hero__card">
          <SlotImage
            src={hero.background}
            alt=""
            width={IMAGE_SLOTS.hero.width}
            height={IMAGE_SLOTS.hero.height}
            priority
          />
          <div className="nt-hero__overlay" />
          <div className="nt-hero__content">
            <h1 className="nt-hero__title">{hero.title}</h1>
            {hero.subtitle && <p className="nt-hero__subtitle">{hero.subtitle}</p>}
            <NicheLink href={hero.href} className="nt-btn">
              {hero.button}
            </NicheLink>
          </div>
        </div>
      </div>
    </section>
  );
}
