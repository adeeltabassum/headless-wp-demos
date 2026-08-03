"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { localContent } from "@/lib/local/content";
import { PremiumButton } from "./PremiumButton";

export function LocalHeader() {
  const [open, setOpen] = useState(false);
  const { logo, nav, hero } = localContent;

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    document.body.classList.toggle("fb-menu-open", open);
    return () => document.body.classList.remove("fb-menu-open");
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1025) {
        closeMenu();
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header className="fb-header">
        <div className="fb-header__inner">
          <Link href="/local" className="fb-header__logo">
            <Image src={logo} alt="Flat Bid Moving" width={408} height={64} priority />
          </Link>

          <nav className="fb-header__nav" aria-label="Main navigation">
            <ul className="fb-header__menu">
              {nav.map((item) => (
                <li key={item.label} className="fb-header__menu-item">
                  <Link href={item.href} className="fb-header__menu-link">
                    {item.label}
                    {item.hasDropdown && (
                      <svg viewBox="0 0 320 512" aria-hidden="true">
                        <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="fb-header__cta">
              <PremiumButton href="#quote-form">{hero.cta}</PremiumButton>
            </div>
          </nav>

          <button
            type="button"
            className={`fb-header__toggle${open ? " is-active" : ""}`}
            aria-expanded={open}
            aria-controls="fb-mobile-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <span />
          </button>
        </div>
      </header>

      <button
        type="button"
        className={`fb-header__overlay${open ? " is-open" : ""}`}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={closeMenu}
      />

      <aside
        id="fb-mobile-drawer"
        className={`fb-header__drawer${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="fb-header__drawer-head">
          <Link href="/local" className="fb-header__drawer-logo" onClick={closeMenu}>
            <Image src={logo} alt="Flat Bid Moving" width={408} height={64} />
          </Link>
          <button
            type="button"
            className="fb-header__drawer-close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <span />
          </button>
        </div>

        <nav className="fb-header__drawer-nav" aria-label="Mobile navigation">
          <ul className="fb-header__drawer-menu">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="fb-header__drawer-link" onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="fb-header__drawer-cta">
          <PremiumButton href="#quote-form" onClick={closeMenu}>
            {hero.cta}
          </PremiumButton>
        </div>
      </aside>
    </>
  );
}
