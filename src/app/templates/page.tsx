import Image from "next/image";
import Link from "next/link";
import GalleryShell from "@/components/gallery/GalleryShell";
import { siteTemplates } from "@/lib/templates";

const totalPages = siteTemplates.reduce((sum, t) => sum + t.pages, 0);
const liveCount = siteTemplates.filter((t) => t.status === "Live").length;
const categories = new Set(siteTemplates.map((t) => t.tag)).size;

export default function TemplatesPage() {
  return (
    <GalleryShell active="templates">
      <section className="sg-hero">
        <div className="sg-hero__glow" aria-hidden="true" />
        <div className="sg-hero__glow sg-hero__glow--left" aria-hidden="true" />
        <div className="wrap sg-hero__inner">
          <div className="sg-hero__eyebrow">
            <span className="badge badge--soft">Starter templates</span>
            <span className="annot">
              <span className="annot__dot" />
              Ship sites faster
            </span>
          </div>
          <h1>
            Template <span className="grad-text">library</span>
          </h1>
          <p className="sg-hero__sub">
            Production-ready Next.js layouts you can clone, customize in SCAI Studio, and publish —
            without rebuilding from scratch every time.
          </p>
          <div className="sg-hero__cta">
            <a href="#templates" className="btn btn--primary btn--lg">
              Browse templates
            </a>
            <Link href="/studio" className="btn btn--outline btn--lg">
              SCAI Studio
            </Link>
          </div>
        </div>
      </section>

      <section className="sg-section" style={{ paddingTop: 48, paddingBottom: 0 }}>
        <div className="wrap">
          <div className="kpi-grid">
            <article className="kpi">
              <div className="kpi__label">Templates</div>
              <div className="kpi__value grad-text">{siteTemplates.length}</div>
              <p className="kpi__foot">Ready to use</p>
            </article>
            <article className="kpi">
              <div className="kpi__label">Pages</div>
              <div className="kpi__value">{totalPages}</div>
              <p className="kpi__foot">Routes per library</p>
            </article>
            <article className="kpi">
              <div className="kpi__label">Categories</div>
              <div className="kpi__value">{categories}</div>
              <p className="kpi__foot">Site types covered</p>
            </article>
            <article className="kpi">
              <div className="kpi__label">Status</div>
              <div className="kpi__value">{liveCount}</div>
              <p className="kpi__foot">Live in production</p>
            </article>
          </div>
        </div>
      </section>

      <section className="sg-section" id="templates">
        <div className="wrap">
          <div className="sg-section__head">
            <div>
              <h2>
                Featured <span className="grad-text">templates</span>
              </h2>
              <p>
                Open any template to preview layout and components. Use SCAI Studio to generate a
                branded site from the niche master template.
              </p>
            </div>
            <span className="badge badge--outline">{siteTemplates.length} available</span>
          </div>

          <ul className="project-grid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {siteTemplates.map((template) => (
              <li key={template.id}>
                <article className="project-card">
                  <Link href={template.href} className="project-card__media" tabIndex={-1}>
                    <div className="project-card__chrome" aria-hidden="true">
                      <span className="project-card__dot" />
                      <span className="project-card__dot" />
                      <span className="project-card__dot" />
                      <span className="project-card__url">{template.href}</span>
                    </div>
                    <div className="project-card__shot">
                      <Image
                        src={template.screenshot}
                        alt={`${template.name} preview`}
                        fill
                        className="project-card__img"
                        sizes="(max-width: 900px) 100vw, 50vw"
                        priority={template.id === "niche-template"}
                      />
                    </div>
                  </Link>

                  <div className="project-card__body">
                    <div className="project-card__meta">
                      <span className="badge badge--outline">{template.tag}</span>
                      <span className="badge badge--success">{template.status}</span>
                    </div>

                    <h3>
                      <Link href={template.href}>{template.name}</Link>
                    </h3>
                    <p className="project-card__desc">{template.description}</p>

                    <div className="project-card__stats">
                      <span className="project-card__stat">
                        <strong>{template.pages}</strong>
                        {template.pages === 1 ? "page" : "pages"}
                      </span>
                      <span className="project-card__stat">
                        <strong>Stack</strong>
                        {template.stack}
                      </span>
                    </div>

                    <div className="project-card__footer">
                      <Link href={template.href} className="btn btn--primary btn--sm">
                        Open template
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </GalleryShell>
  );
}
