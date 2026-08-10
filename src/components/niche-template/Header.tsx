"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "./Icons";
import { NicheLink } from "./NicheLink";
import { usePreviewNavigation } from "./PreviewNavigation";
import { SlotImage } from "./SlotImage";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import type { Article, NicheTemplateContent } from "@/lib/niche-template/content";

function articleBase(content: NicheTemplateContent): string {
  return `${content.siteBase}/article`;
}

export function NicheTemplateHeader({ content }: { content: NicheTemplateContent }) {
  const { logo, siteName, nav, offcanvas, social, siteBase, articles } = content;
  const pathname = usePathname();
  const preview = usePreviewNavigation();
  const activePath = preview?.enabled ? preview.pathname : pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const basePath = articleBase(content);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Article[];
    return articles.filter((a) => {
      const haystack = [a.title, a.excerpt, ...(a.content || [])].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [query, articles]);

  useEffect(() => {
    document.body.classList.toggle("nt-menu-open", menuOpen);
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.classList.remove("nt-menu-open");
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results.length === 1) {
      closeSearch();
      if (preview?.enabled) {
        preview.navigate(`${basePath}/${results[0].slug}`);
      } else {
        window.location.href = `${basePath}/${results[0].slug}`;
      }
    }
  }

  return (
    <>
      <div className="nt-topbar">
        <div className="nt-container nt-topbar__inner">
          <button
            type="button"
            className="nt-topbar__search"
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
          >
            <Icon name="search" />
          </button>
          <div className="nt-social">
            {social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <header className="nt-header">
        <div className="nt-container nt-header__row">
          <NicheLink href={siteBase} className="nt-logo">
            <SlotImage
              src={logo}
              alt={siteName}
              width={IMAGE_SLOTS.logo.width}
              height={IMAGE_SLOTS.logo.height}
              priority
            />
          </NicheLink>

          <nav aria-label="Primary" className="nt-nav-wrap">
            <ul className="nt-nav">
              {nav.map((item) => (
                <li key={item.label}>
                  <NicheLink href={item.href} className={activePath === item.href ? "is-active" : undefined}>
                    {item.label}
                  </NicheLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="nt-menu-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>

      <button
        type="button"
        className={`nt-overlay${menuOpen ? " is-open" : ""}`}
        aria-label="Close menu"
        onClick={() => setMenuOpen(false)}
      />
      <aside className={`nt-drawer${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="nt-drawer__head">
          <strong>Menu</strong>
          <button type="button" className="nt-drawer__close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <ul className="nt-drawer__menu">
          {[...(offcanvas ?? []), ...nav].map((item) => (
            <li key={item.label}>
              <NicheLink href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </NicheLink>
            </li>
          ))}
        </ul>
      </aside>

      <div className={`nt-search-overlay${searchOpen ? " is-open" : ""}`}>
        <button type="button" className="nt-search-close" aria-label="Close search" onClick={closeSearch}>
          <Icon name="close" />
        </button>
        <div className="nt-search-panel">
          <form role="search" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              placeholder="Search articles…"
              aria-label="Search"
              autoFocus={searchOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          {query.trim() && (
            <div className="nt-search-results">
              {results.length === 0 ? (
                <p className="nt-search-results__empty">No articles match &ldquo;{query.trim()}&rdquo;</p>
              ) : (
                <ul>
                  {results.slice(0, 8).map((article) => (
                    <li key={article.id}>
                      <NicheLink
                        href={`${basePath}/${article.slug}`}
                        className="nt-search-results__link"
                        onClick={closeSearch}
                      >
                        <strong>{article.title}</strong>
                        <span>{article.excerpt}</span>
                      </NicheLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
