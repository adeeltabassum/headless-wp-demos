"use client";

import Image from "next/image";
import { useLocalContent } from "./LocalContentProvider";

export function GallerySection() {
  const content = useLocalContent();
  const { gallery, siteName } = content;

  return (
    <section id="gallery" className="fb-section fb-gallery">
      <div className="fb-section__inner">
        <div className="fb-section__header">
          <h2 className="fb-section__title">{gallery.heading}</h2>
          <p className="fb-section__subtitle fb-section__subtitle--narrow">{gallery.subheading}</p>
        </div>

        <div className="fb-gallery__grid">
          {gallery.images.map((src, index) => (
            <div key={`${src}-${index}`} className="fb-gallery__item">
              <Image
                src={src}
                alt={`${siteName} gallery image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized={src.endsWith(".svg")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
