import type { NicheBlogPage } from "@/lib/niche-blog/pages";

export function NicheBlogCategoryHero({ page }: { page: NicheBlogPage }) {
  const featuredTitle =
    page.featuredPostTitle ?? page.posts?.[0]?.title ?? "Primary Category Post Title";

  return (
    <div className="nb-category-hero">
      <div className="nb-category-hero__placeholder" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="2" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <span className="nb-category-hero__badge">{featuredTitle}</span>
    </div>
  );
}
