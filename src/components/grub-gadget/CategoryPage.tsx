import { ArticleCard } from "./ArticleCard";
import { GrubGadgetSidebar } from "./Sidebar";
import type { Category, Article } from "@/lib/grub-gadget/content";

export function GrubGadgetCategoryPage({ 
  category, 
  articles 
}: { 
  category: Category; 
  articles: Article[];
}) {
  return (
    <div className="gg-main">
      <div className="gg-container">
        <div className="gg-category-header">
          <h1 className="gg-category-title">{category.label}</h1>
          <p className="gg-category-description">{category.description}</p>
        </div>

        <div className="gg-content-grid">
          <div>
            {articles.length > 0 ? (
              <>
                <div className="gg-articles">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>

                <div className="gg-pagination">
                  <a href="#">« Previous</a>
                  <a href="#" className="next">Next »</a>
                </div>
              </>
            ) : (
              <div className="gg-no-articles">
                <p>No articles found in this category yet.</p>
              </div>
            )}
          </div>

          <GrubGadgetSidebar />
        </div>
      </div>
    </div>
  );
}
