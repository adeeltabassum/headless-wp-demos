import { NicheTemplatePageBanner } from "./PageBanner";
import { NicheTemplateArticleCard } from "./ArticleCard";
import { NicheTemplateSidebar } from "./Sidebar";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import type { Article, NicheTemplateContent } from "@/lib/niche-template/content";

export function NicheTemplateTagPage({
  content,
  tagLabel,
  articles,
  basePath,
}: {
  content: NicheTemplateContent;
  tagLabel: string;
  articles: Article[];
  basePath: string;
}) {
  return (
    <>
      <NicheTemplatePageBanner title={`Tag: ${tagLabel}`} background={IMAGE_SLOTS.pageBanner.placeholder} />

      <div className="nt-main">
        <div className="nt-container">
          <div className="nt-content-grid">
            <div>
              {articles.length > 0 ? (
                <div className="nt-articles">
                  {articles.map((article) => (
                    <NicheTemplateArticleCard key={article.id} article={article} basePath={basePath} />
                  ))}
                </div>
              ) : (
                <div className="nt-no-articles">
                  <p>No articles found for this tag yet.</p>
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
