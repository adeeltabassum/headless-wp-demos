import Link from "next/link";
import type { ReactNode } from "react";

type GalleryShellProps = {
  children: ReactNode;
  active?: "home" | "demos";
};

export default function GalleryShell({ children, active = "demos" }: GalleryShellProps) {
  return (
    <div className="scai scai-gallery">
      <header className="sg-header">
        <div className="wrap sg-header__inner">
          <Link href="/" className="sg-logo" aria-label="Headless WP home">
            <span className="sg-logo__mark">H</span>
            <span>Headless WP</span>
          </Link>

          <nav className="sg-nav" aria-label="Primary">
            <Link href="/" className={active === "home" ? "is-active" : undefined}>
              Home
            </Link>
            <Link href="/demos" className={active === "demos" ? "is-active" : undefined}>
              Demos
            </Link>
            <Link href="/studio">Studio</Link>
          </nav>

          <div className="sg-header__actions">
            <Link href="/demos" className="btn btn--primary btn--sm">
              View projects
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="sg-footer">
        <div className="wrap sg-footer__inner">
          <p>Headless WP · Next.js page recreations</p>
          <p>
            Share gallery: <code>/demos</code>
          </p>
        </div>
      </footer>
    </div>
  );
}
