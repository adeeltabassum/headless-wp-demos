import { NicheTemplateArticleCard } from "./ArticleCard";
import { NicheTemplatePagination } from "./Pagination";
import { NicheTemplateSidebar } from "./Sidebar";
import type { NicheTemplateContent } from "@/lib/niche-template/content";

export function NicheTemplateArticleGrid({
  content,
  basePath,
}: {
  content: NicheTemplateContent;
  basePath: string;
}) {
  return (
    <div className="nt-main">
      <div className="nt-container">
        <div className="nt-content-grid">
          <div>
            <div className="nt-articles">
              {content.articles.map((article) => (
                <NicheTemplateArticleCard key={article.id} article={article} basePath={basePath} />
              ))}
            </div>
            <NicheTemplatePagination previousHref="#" nextHref="#" />
          </div>

          <NicheTemplateSidebar content={content} basePath={basePath} />
        </div>
      </div>
    </div>
  );
}
