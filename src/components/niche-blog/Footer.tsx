"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nicheBlogContent } from "@/lib/niche-blog/content";

export function NicheBlogFooter() {
  const { footer, logo } = nicheBlogContent;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="nb-footer">
        <div className="nb-container">
          <div className="nb-footer__grid">
            <div className="nb-footer__brand">
              <Link href="/niche-blog" className="nb-footer__logo">
                <Image src={logo} alt="Arrow Awareness" width={5145} height={1483} />
              </Link>
            </div>
            <div>
              <h2 className="nb-footer__heading">Featured</h2>
              <div className="nb-footer__links-block">
                {footer.featured.map((item, index) => (
                  <span key={item.href}>
                    {index > 0 && <br />}
                    <Link href={item.href}>{item.label}</Link>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="nb-footer__heading">Links</h2>
              <div className="nb-footer__links-block">
                {footer.links.map((item, index) => (
                  <span key={item.href}>
                    {index > 0 && <br />}
                    <Link href={item.href}>{item.label}</Link>
                  </span>
                ))}
              </div>
            </div>
            <div className="nb-footer__newsletter">
              <p>{footer.newsletter.text}</p>
              <form className="nb-footer__form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder={footer.newsletter.placeholder} required />
                <button type="submit" className="nb-btn nb-footer__submit">
                  {footer.newsletter.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="nb-footer__legal">
          <div className="nb-container">
            <div className="nb-footer__divider" />
            <p>© Copyright 2025 Arrow Awareness. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <button
        type="button"
        className={`nb-scroll-top${showScrollTop ? " is-visible" : ""}`}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg viewBox="0 0 512 512" aria-hidden="true">
          <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
        </svg>
      </button>
    </>
  );
}
