"use client";

import { useMemo, useState } from "react";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { BlogCard } from "./BlogCard";

export function BlogIndexView() {
  const { blog } = useEcommerceContent();
  const [category, setCategory] = useState<string>("all");
  const [visible, setVisible] = useState(blog.pageSize);

  const filtered = useMemo(() => {
    if (category === "all") return blog.posts;
    return blog.posts.filter((p) => p.category === category);
  }, [blog.posts, category]);

  const shown = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  return (
    <main className="ec-blog-page">
      <header className="ec-page-hero">
        <div className="ec-container">
          <h1>{blog.title}</h1>
          <p className="ec-page-hero__desc">{blog.description}</p>
        </div>
      </header>

      <div className="ec-container">
        <div className="ec-blog-tabs" role="tablist" aria-label="Blog categories">
          <button
            type="button"
            role="tab"
            aria-selected={category === "all"}
            className={category === "all" ? "is-active" : undefined}
            onClick={() => {
              setCategory("all");
              setVisible(blog.pageSize);
            }}
          >
            {blog.allPostsLabel}
          </button>
          {blog.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={category === cat}
              className={category === cat ? "is-active" : undefined}
              onClick={() => {
                setCategory(cat);
                setVisible(blog.pageSize);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="ec-blog-grid ec-blog-grid--page">
          {shown.map((post) => (
            <BlogCard key={post.slug} post={post} readMoreLabel={blog.readMoreLabel} />
          ))}
        </div>

        {canLoadMore ? (
          <div className="ec-section-cta">
            <button
              type="button"
              className="ec-btn ec-btn--dark"
              onClick={() => setVisible((n) => n + blog.pageSize)}
            >
              {blog.loadMoreLabel}
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
