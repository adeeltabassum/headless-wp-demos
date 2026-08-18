"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";
import { BlogCard } from "../blog/BlogCard";

export function AboutView() {
  const { about, blog, siteBase } = useEcommerceContent();
  const teaserPosts = blog.posts.slice(0, 3);

  return (
    <main className="ec-about">
      <header className="ec-page-hero">
        <div className="ec-container">
          <h1>{about.title}</h1>
          <p className="ec-page-hero__desc">{about.description}</p>
        </div>
      </header>

      {about.sections.map((section) => (
        <section
          key={section.title}
          className={`ec-section ec-about-block${section.reverse ? " ec-about-block--reverse" : ""}`}
        >
          <div className="ec-container ec-about-block__grid">
            <div className="ec-about-block__copy">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <ul
                className={
                  section.checkStyle ? "ec-about-list ec-about-list--checks" : "ec-about-list"
                }
              >
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <MediaPlaceholder className="ec-about-block__media" src={section.image} alt="" />
          </div>
        </section>
      ))}

      <section className="ec-section ec-section--soft">
        <div className="ec-container">
          <div className="ec-section-head ec-section-head--center">
            <div>
              <h2>{about.blogHeading}</h2>
              <p className="ec-section-head__sub">{about.blogSubheading}</p>
            </div>
          </div>
          <div className="ec-blog-grid">
            {teaserPosts.map((post) => (
              <BlogCard key={post.slug} post={post} readMoreLabel={blog.readMoreLabel} />
            ))}
          </div>
          <div className="ec-section-cta">
            <Link className="ec-btn ec-btn--dark" href={`${siteBase}/blog`}>
              {about.blogViewMoreLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
