import { NicheLink } from "./NicheLink";
import { SlotImage } from "./SlotImage";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import type { NicheTemplateContent } from "@/lib/niche-template/content";

export function NicheTemplateCategoryTiles({ content }: { content: NicheTemplateContent }) {
  if (!content.categoryTiles.length) return null;

  return (
    <section className="nt-tiles">
      <div className="nt-container">
        <div className="nt-tiles__grid">
          {content.categoryTiles.map((tile) => (
            <NicheLink key={tile.label} href={tile.href} className="nt-tile">
              <SlotImage
                src={tile.background}
                alt=""
                width={IMAGE_SLOTS.categoryTile.width}
                height={IMAGE_SLOTS.categoryTile.height}
              />
              <div className="nt-tile__overlay" />
              <span className="nt-btn nt-tile__label">{tile.label}</span>
            </NicheLink>
          ))}
        </div>
      </div>
    </section>
  );
}
