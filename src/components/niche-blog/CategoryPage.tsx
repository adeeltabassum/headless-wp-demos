import type { NicheBlogPage } from "@/lib/niche-blog/pages";
import { NicheBlogCategoryHero } from "@/components/niche-blog/CategoryHero";
import { NicheBlogSidebar } from "@/components/niche-blog/Sidebar";

function getCategoryLabel(bannerTitle: string) {
  return bannerTitle.replace(/^Category:\s*/i, "");
}

export function NicheBlogCategoryPage({ page }: { page: NicheBlogPage }) {
  const categoryLabel = getCategoryLabel(page.bannerTitle);

  return (
    <section className="nb-category-page">
      <div className="nb-container">
        <div className="nb-category-hero-section">
          <NicheBlogCategoryHero page={page} />
        </div>
      </div>

      <div className="nb-container">
        <div className="nb-category-content-grid">
          <div className="nb-category-main">
            <div className="nb-category-heading">
              <h1>
                Category:{" "}
                <span className="nb-category-heading__name">{categoryLabel}</span>
              </h1>
            </div>
          </div>

          <NicheBlogSidebar />
        </div>
      </div>
    </section>
  );
}
