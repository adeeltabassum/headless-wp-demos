import type { NicheBlogPage } from "@/lib/niche-blog/pages";

export function NicheBlogPageBanner({ page }: { page: NicheBlogPage }) {
  return (
    <section className="nb-page-banner">
      <div className="nb-container">
        <h1 className="nb-page-banner__title">{page.bannerTitle}</h1>
      </div>
    </section>
  );
}
