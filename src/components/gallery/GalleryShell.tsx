import Link from "next/link";
import type { ReactNode } from "react";

type GalleryShellProps = {
  children: ReactNode;
  active?: "home" | "templates";
};

export default function GalleryShell({ children, active = "templates" }: GalleryShellProps) {
  return (
    <div className="scai scai-gallery">
      <header className="sg-header">
        <div className="wrap sg-header__inner">
          <Link href="/" className="sg-logo" aria-label="SCAI home">
            <span className="sg-logo__mark">S</span>
            <span>
              SCAI <span className="grad-text">Templates</span>
            </span>
          </Link>

          <nav className="sg-nav" aria-label="Primary">
            <Link href="/" className={active === "home" ? "is-active" : undefined}>
              Home
            </Link>
            <Link href="/templates" className={active === "templates" ? "is-active" : undefined}>
              Templates
            </Link>
            <Link href="/studio">Studio</Link>
          </nav>

          <div className="sg-header__actions">
            <Link href="/templates" className="btn btn--primary btn--sm">
              Browse templates
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="sg-footer">
        <div className="wrap sg-footer__inner">
          <p>SCAI · SEO Content AI template library</p>
          <p>
            Template index: <code>/templates</code>
          </p>
        </div>
      </footer>
    </div>
  );
}
