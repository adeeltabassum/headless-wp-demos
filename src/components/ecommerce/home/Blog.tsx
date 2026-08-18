"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { BlogCard } from "../blog/BlogCard";

export function Blog() {
  const { home, blog } = useEcommerceContent();
  const section = home.blog;

  return (
    <section className="ec-section ec-section--soft" id="blog">
      <div className="ec-container">
        <div className="ec-section-head ec-section-head--center">
          <div>
            <h2>{section.heading}</h2>
            <p className="ec-section-head__sub">{section.subheading}</p>
          </div>
        </div>
        <div className="ec-blog-grid">
          {section.posts.map((post, i) => (
            <BlogCard
              key={`${post.title}-${i}`}
              post={post}
              readMoreLabel={blog.readMoreLabel}
            />
          ))}
        </div>
        <div className="ec-section-cta">
          <Link className="ec-btn ec-btn--dark" href={section.viewAllHref}>
            {section.viewAllLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
