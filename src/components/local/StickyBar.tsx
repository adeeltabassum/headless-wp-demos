"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocalContent } from "./LocalContentProvider";
import { PremiumButton } from "./PremiumButton";

const STICKY_OFFSET = 60;
const DEFAULT_BAR_HEIGHT = 64;

function StickyBarContent({ content }: { content: ReturnType<typeof useLocalContent> }) {
  const { licenses, phone, phoneHref, hero } = content;

  return (
    <div className="fb-sticky-bar__inner">
      <ul className="fb-sticky-bar__licenses">
        <li>
          <b>Licensed</b>
        </li>
        {licenses.map((license) => (
          <li key={license.label}>
            <b>{license.label}</b>:{license.value.replace("#", "")}
          </li>
        ))}
      </ul>
      <div className="fb-sticky-bar__right">
        <p className="fb-sticky-bar__phone">
          Call us at <a href={phoneHref}>{phone}</a>
        </p>
        <PremiumButton href="#quote-form" className="fb-sticky-bar__cta">
          {hero.cta}
        </PremiumButton>
      </div>
    </div>
  );
}

export function StickyBar() {
  const localContent = useLocalContent();
  const anchorRef = useRef<HTMLDivElement>(null);
  const [docked, setDocked] = useState(true);
  const [jsReady, setJsReady] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.classList.add("fb-sticky-js");
    setJsReady(true);
  }, []);

  useEffect(() => {
    const footerWrap = document.getElementById("fb-footer-wrap");
    const anchor = anchorRef.current;

    if (!footerWrap || !anchor) {
      return;
    }

    const getBarHeight = () =>
      anchor.offsetHeight || anchor.getBoundingClientRect().height || DEFAULT_BAR_HEIGHT;

    const update = () => {
      const barHeight = getBarHeight();
      const footerTop = footerWrap.getBoundingClientRect().top;
      const dockLine = window.innerHeight - STICKY_OFFSET - barHeight;

      setDocked(footerTop <= dockLine);
      document.documentElement.style.setProperty("--fb-sticky-bar-height", `${barHeight}px`);
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const observer = new IntersectionObserver(() => update(), {
      threshold: [0, 0.01, 0.1, 0.25, 0.5, 1],
    });
    observer.observe(footerWrap);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [jsReady]);

  const showFloat = jsReady && !docked;
  const showAnchor = !jsReady || docked;

  return (
    <>
      <div
        id="sticky_nav"
        className={`fb-sticky-bar fb-sticky-bar--float${showFloat ? " is-fixed" : " is-hidden"}`}
        aria-hidden={!showFloat}
      >
        <StickyBarContent content={localContent} />
      </div>
      <div
        ref={anchorRef}
        className={`fb-sticky-bar fb-sticky-bar--anchor${showAnchor ? "" : " is-hidden"}`}
        aria-hidden={!showAnchor}
      >
        <StickyBarContent content={localContent} />
      </div>
    </>
  );
}
