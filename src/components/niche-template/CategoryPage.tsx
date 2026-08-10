import { NicheTemplatePageBanner } from "./PageBanner";
import { NicheTemplateArticleCard } from "./ArticleCard";
import { NicheTemplatePagination } from "./Pagination";
import { NicheTemplateSidebar } from "./Sidebar";
import { getArticlesByCategory, type NicheTemplateContent, type Category } from "@/lib/niche-template/content";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";

export function NicheTemplateCategoryPage({
  content,
  category,
  basePath,
}: {
  content: NicheTemplateContent;
  category: Category;
  basePath: string;
}) {
  const articles = getArticlesByCategory(content, category.slug);

  return (
    <>
      <NicheTemplatePageBanner
        title={`Category: ${category.label}`}
        background={category.background ?? IMAGE_SLOTS.pageBanner.placeholder}
      />

      <div className="nt-main">
        <div className="nt-container">
          <div className="nt-content-grid">
            <div>
              <div className="nt-category-heading">
                <h2>{category.description}</h2>
              </div>

              {articles.length > 0 ? (
                <>
                  <div className="nt-articles">
                    {articles.map((article) => (
                      <NicheTemplateArticleCard key={article.id} article={article} basePath={basePath} />
                    ))}
                  </div>
                  <NicheTemplatePagination previousHref="#" nextHref="#" />
                </>
              ) : (
                <div className="nt-no-articles">
                  <p>No articles published in this category yet.</p>
                </div>
              )}
            </div>

            <NicheTemplateSidebar content={content} basePath={basePath} />
          </div>
        </div>
      </div>
    </>
  );
}
