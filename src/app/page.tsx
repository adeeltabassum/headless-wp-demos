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
              Website templates, built for{" "}
              <span className="grad-text">fast development</span>
            </h1>
            <p className="sg-hero__sub">
              Production-ready Next.js templates you can clone and ship — or open SCAI Studio to
              generate a fully branded niche site with AI and publish in minutes.
            </p>
            <div className="sg-hero__cta">
              <Link href="/templates" className="btn btn--primary btn--lg">
                Browse templates
              </Link>
              <Link href="/studio" className="btn btn--outline btn--lg">
                SCAI Studio
              </Link>
            </div>
          </div>
        </div>
      </main>
    </GalleryShell>
  );
}
