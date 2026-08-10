import { SlotImage } from "./SlotImage";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";

export function NicheTemplatePageBanner({ title, background }: { title: string; background: string }) {
  return (
    <section className="nt-banner">
      <SlotImage
        src={background}
        alt=""
        width={IMAGE_SLOTS.pageBanner.width}
        height={IMAGE_SLOTS.pageBanner.height}
      />
      <div className="nt-banner__overlay" />
      <div className="nt-container">
        <h1 className="nt-banner__title">{title}</h1>
      </div>
    </section>
  );
}
