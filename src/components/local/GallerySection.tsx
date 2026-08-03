import Image from "next/image";
import { localContent } from "@/lib/local/content";

export function GallerySection() {
  const { gallery } = localContent;

  return (
    <section className="fb-section fb-gallery">
      <div className="fb-section__inner">
        <div className="fb-section__header">
          <h2 className="fb-section__title">{gallery.heading}</h2>
          <p className="fb-section__subtitle fb-section__subtitle--narrow">{gallery.subheading}</p>
        </div>

        <div className="fb-gallery__grid">
          {gallery.images.map((src, index) => (
            <div key={src} className="fb-gallery__item">
              <Image
                src={src}
                alt={`Flat Bid Moving gallery image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
