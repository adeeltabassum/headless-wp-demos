import Link from "next/link";
import GalleryShell from "@/components/gallery/GalleryShell";
import { demoProjects } from "@/lib/demos";
import "@/styles/scai/gallery.css";

export default function HomePage() {
  return (
    <GalleryShell active="home">
      <main className="sg-home">
        <div className="sg-home__main">
          <div className="sg-hero__glow" aria-hidden="true" />
          <div className="sg-hero__glow sg-hero__glow--left" aria-hidden="true" />
          <div className="wrap sg-home__panel">
            <div className="sg-hero__eyebrow">
              <span className="badge badge--solid">Headless WP</span>
              <span className="annot">
                <span className="annot__dot" />
                {demoProjects.length} live demos
              </span>
            </div>
            <h1>
              Website recreations, built for{" "}
              <span className="grad-text">client review</span>
            </h1>
            <p className="sg-hero__sub">
              Browse polished Next.js ports of HTML templates from one gallery —
              share a single public URL instead of temporary tunnels.
            </p>
            <div className="sg-hero__cta">
              <Link href="/demos" className="btn btn--primary btn--lg">
                Open project demos
              </Link>
              <Link href="/saas" className="btn btn--outline btn--lg">
                Latest: SAAS template
              </Link>
            </div>
            <ul className="sg-home__list">
              <li>Dark SCAI presentation shell for a professional first impression</li>
              <li>One gallery link covering every recreated site</li>
              <li>Fast static routes ready for Vercel sharing</li>
            </ul>
          </div>
        </div>
      </main>
    </GalleryShell>
  );
}
