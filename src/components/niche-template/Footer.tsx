"use client";

import { NicheLink } from "./NicheLink";
import { useEffect, useState } from "react";
import { Icon } from "./Icons";
import { SlotImage } from "./SlotImage";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import type { NicheTemplateContent } from "@/lib/niche-template/content";

export function NicheTemplateFooter({ content }: { content: NicheTemplateContent }) {
  const { footer, logo, siteName, siteBase } = content;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="nt-footer">
        <div className="nt-container">
          <div className="nt-footer__grid">
            <div>
              <NicheLink href={siteBase} className="nt-footer__logo">
                <SlotImage src={logo} alt={siteName} width={IMAGE_SLOTS.logo.width} height={IMAGE_SLOTS.logo.height} />
              </NicheLink>
            </div>

            <div>
              <h2 className="nt-footer__heading">Featured</h2>
              <div className="nt-footer__links">
                {footer.featured.map((item) => (
                  <NicheLink key={item.href} href={item.href}>
                    {item.label}
                  </NicheLink>
                ))}
              </div>
            </div>

            <div>
              <h2 className="nt-footer__heading">Links</h2>
              <div className="nt-footer__links">
                {footer.links.map((item) => (
                  <NicheLink key={item.href} href={item.href}>
                    {item.label}
                  </NicheLink>
                ))}
              </div>
            </div>

            <div className="nt-footer__newsletter">
              <h2 className="nt-footer__heading">Newsletter</h2>
              <p>{footer.newsletter.text}</p>
              <form className="nt-footer__form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder={footer.newsletter.placeholder} required />
                <button type="submit" className="nt-btn">
                  {footer.newsletter.submit}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="nt-footer__legal">
          <div className="nt-container">
            <p>{footer.copyright}</p>
          </div>
        </div>
      </footer>

      <button
        type="button"
        className={`nt-scroll-top${showScrollTop ? " is-visible" : ""}`}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Icon name="arrow-up" />
      </button>
    </>
  );
}
