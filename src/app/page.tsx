import Link from "next/link";
import GalleryShell from "@/components/gallery/GalleryShell";
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
              <span className="badge badge--solid">SCAI</span>
              <span className="annot">
                <span className="annot__dot" />
                SEO Content AI
              </span>
            </div>
            <h1>
              Website recreations, built for{" "}
              <span className="grad-text">client review</span>
            </h1>
            <p className="sg-hero__sub">
              Browse polished Next.js ports of HTML templates from one gallery — or open SCAI Studio to
              draft and publish niche sites with AI.
            </p>
            <div className="sg-hero__cta">
              <Link href="/demos" className="btn btn--primary btn--lg">
                Open project demos
              </Link>
              <Link href="/studio" className="btn btn--outline btn--lg">
                SCAI Studio
              </Link>
            </div>
            <ul className="sg-home__list">
              <li>Dark SCAI design system across gallery and studio</li>
              <li>AI-powered site builder at /studio</li>
              <li>One gallery link covering every recreated site</li>
            </ul>
          </div>
        </div>
      </main>
    </GalleryShell>
  );
}
