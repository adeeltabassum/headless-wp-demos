import Image from "next/image";
import Link from "next/link";
import GalleryShell from "@/components/gallery/GalleryShell";
import { demoProjects } from "@/lib/demos";

const totalPages = demoProjects.reduce((sum, project) => sum + project.pages, 0);
const liveCount = demoProjects.filter((project) => project.status === "Live").length;
const categories = new Set(demoProjects.map((project) => project.tag)).size;

export default function DemosPage() {
  return (
    <GalleryShell active="demos">
      <section className="sg-hero">
        <div className="sg-hero__glow" aria-hidden="true" />
        <div className="sg-hero__glow sg-hero__glow--left" aria-hidden="true" />
        <div className="wrap sg-hero__inner">
          <div className="sg-hero__eyebrow">
            <span className="badge badge--soft">Client demos</span>
            <span className="annot">
              <span className="annot__dot" />
              Production-ready previews
            </span>
          </div>
          <h1>
            Project <span className="grad-text">gallery</span>
          </h1>
          <p className="sg-hero__sub">
            Open any recreation below. One public link for everything — no temporary
            tunnels needed after this site is deployed.
          </p>
          <div className="sg-hero__cta">
            <a href="#projects" className="btn btn--primary btn--lg">
              Browse projects
            </a>
            <Link href="/" className="btn btn--secondary btn--lg">
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <section className="sg-section" style={{ paddingTop: 48, paddingBottom: 0 }}>
        <div className="wrap">
          <div className="kpi-grid">
            <article className="kpi">
              <div className="kpi__label">Projects</div>
              <div className="kpi__value grad-text">{demoProjects.length}</div>
              <p className="kpi__foot">Live demo sites</p>
            </article>
            <article className="kpi">
              <div className="kpi__label">Pages</div>
              <div className="kpi__value">{totalPages}</div>
              <p className="kpi__foot">Static routes generated</p>
            </article>
            <article className="kpi">
              <div className="kpi__label">Categories</div>
              <div className="kpi__value">{categories}</div>
              <p className="kpi__foot">Business types covered</p>
            </article>
            <article className="kpi">
              <div className="kpi__label">Status</div>
              <div className="kpi__value">{liveCount}</div>
              <p className="kpi__foot">Ready to share</p>
            </article>
          </div>
        </div>
      </section>

      <section className="sg-section" id="projects">
        <div className="wrap">
          <div className="sg-section__head">
            <div>
              <h2>
                Featured <span className="grad-text">sites</span>
              </h2>
              <p>
                Each card opens a full Next.js recreation. Hover for depth, then click
                through to review layout, content, and responsiveness.
              </p>
            </div>
            <span className="badge badge--outline">{demoProjects.length} available</span>
          </div>

          <ul className="project-grid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {demoProjects.map((project) => (
              <li key={project.id}>
                <article className="project-card">
                  <Link href={project.href} className="project-card__media" tabIndex={-1}>
                    <div className="project-card__chrome" aria-hidden="true">
                      <span className="project-card__dot" />
                      <span className="project-card__dot" />
                      <span className="project-card__dot" />
                      <span className="project-card__url">{project.href}</span>
                    </div>
                    <div className="project-card__shot">
                      <Image
                        src={project.screenshot}
                        alt={`${project.name} preview`}
                        fill
                        className="project-card__img"
                        sizes="(max-width: 900px) 100vw, 50vw"
                        priority={project.id === "local"}
                      />
                    </div>
                  </Link>

                  <div className="project-card__body">
                    <div className="project-card__meta">
                      <span className="badge badge--outline">{project.tag}</span>
                      <span className="badge badge--success">{project.status}</span>
                    </div>

                    <h3>
                      <Link href={project.href}>{project.name}</Link>
                    </h3>
                    <p className="project-card__desc">{project.description}</p>

                    <div className="project-card__stats">
                      <span className="project-card__stat">
                        <strong>{project.pages}</strong>
                        {project.pages === 1 ? "page" : "pages"}
                      </span>
                      <span className="project-card__stat">
                        <strong>Stack</strong>
                        {project.stack}
                      </span>
                    </div>

                    <div className="project-card__footer">
                      <Link href={project.href} className="btn btn--primary btn--sm">
                        View demo
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
