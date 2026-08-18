"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";
import { BlogCard } from "./BlogCard";
import { findBlogArticle } from "@/lib/ecommerce/pages-sample";

export function BlogPostView({ slug }: { slug: string }) {
  const { blog, footer } = useEcommerceContent();
  const post = findBlogArticle(blog.posts, slug);
  const related = blog.posts.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <main className="ec-blog-post">
        <div className="ec-container ec-blog-post__inner">
          <p>Post not found.</p>
          <Link className="ec-btn ec-btn--dark" href={blog.posts[0]?.href || "#"}>
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="ec-blog-post">
      <article className="ec-container ec-blog-post__inner">
        <h1>{post.title}</h1>
        <MediaPlaceholder className="ec-blog-post__hero" src={post.image} alt={post.title} />
        <div className="ec-blog-post__meta">
          <time>{post.dateFull}</time>
          <div className="ec-blog-post__share" aria-label="Share">
            {footer.social.slice(0, 3).map((s) => (
              <Link key={s.network} href={s.href} aria-label={s.label} className="ec-blog-post__share-link">
                {s.network === "twitter" ? "X" : s.network[0].toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        <div className="ec-blog-post__body">
          {post.body.map((block, i) => {
            if (block.type === "heading") {
              return <h2 key={`${block.text}-${i}`}>{block.text}</h2>;
            }
            if (block.type === "paragraph") {
              return <p key={`p-${i}`}>{block.text}</p>;
            }
            if (block.type === "image") {
              return (
                <MediaPlaceholder
                  key={`img-${i}`}
                  className="ec-blog-post__inline-media"
                  src={block.src}
                  alt={block.alt || ""}
                />
              );
            }
            return (
              <aside key={`cta-${i}`} className="ec-blog-post__cta">
                <div>
                  <h3>{block.title}</h3>
                  <p>{block.body}</p>
                  <Link className="ec-btn ec-btn--dark" href={block.ctaHref}>
                    {block.ctaLabel}
                  </Link>
                </div>
                <MediaPlaceholder className="ec-blog-post__cta-media" src={block.image} alt="" />
              </aside>
            );
          })}
        </div>
      </article>

      <section className="ec-section ec-section--soft">
        <div className="ec-container">
          <div className="ec-section-head ec-section-head--center">
            <div>
              <h2>{blog.relatedHeading}</h2>
              <p className="ec-section-head__sub">{blog.relatedSubheading}</p>
            </div>
          </div>
          <div className="ec-blog-grid">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} readMoreLabel={blog.readMoreLabel} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
