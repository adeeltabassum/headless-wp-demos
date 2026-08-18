"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";

type CardPost = {
  title: string;
  excerpt: string;
  href: string;
  image?: string;
  category?: string;
};

export function BlogCard({
  post,
  readMoreLabel = "Read more",
}: {
  post: CardPost;
  readMoreLabel?: string;
}) {
  return (
    <article className="ec-blog-card">
      <MediaPlaceholder className="ec-blog-card__media" src={post.image} alt={post.title}>
        {post.category ? <span className="ec-badge">{post.category}</span> : null}
      </MediaPlaceholder>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <Link className="ec-text-link" href={post.href}>
        {readMoreLabel} <span aria-hidden="true">›</span>
      </Link>
    </article>
  );
}
