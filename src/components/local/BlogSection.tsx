"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocalContent } from "./LocalContentProvider";
import { PremiumButton } from "./PremiumButton";

function ChevronRight() {
  return (
    <svg viewBox="0 0 320 512" aria-hidden="true">
      <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568 0 33.941z" fill="currentColor" />
    </svg>
  );
}

export function BlogSection() {
  const localContent = useLocalContent();
  const { blog, phone, phoneHref } = localContent;

  return (
    <section id="blog" className="fb-section fb-blog">
      <div className="fb-section__inner">
        <div className="fb-section__header">
          <h2 className="fb-section__title">{blog.heading}</h2>
          <p className="fb-section__subtitle">{blog.subheading}</p>
        </div>

        <div className="fb-blog__grid">
          {blog.posts.map((post, index) => (
            <article key={`${post.title}-${index}`} className="fb-blog-card">
              <div className="fb-blog-card__media">
                <span className="fb-blog-card__tag">{post.category}</span>
                <Link href={post.href}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="fb-blog-card__image"
                    unoptimized={post.image.endsWith(".svg")}
                  />
                </Link>
              </div>
              <div className="fb-blog-card__body">
                <h3 className="fb-blog-card__title">
                  <Link href={post.href}>{post.title}</Link>
                </h3>
                <p className="fb-blog-card__excerpt">{post.excerpt}</p>
                <Link href={post.href} className="fb-blog-card__read-more">
                  <ChevronRight />
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="fb-blog__footer">
          <PremiumButton href="/blog">{blog.cta}</PremiumButton>
          <p className="fb-blog__phone">
            <a href={phoneHref}>{phone}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
