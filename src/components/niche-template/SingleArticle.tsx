import { SlotImage } from "./SlotImage";
import { NicheTemplateSidebar } from "./Sidebar";
import { ContentBlocks } from "./ContentBlocks";
import { NicheTemplateArticleCard } from "./ArticleCard";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import { resolveArticleBlocks } from "@/lib/builder/contentBlocks";
import type { Article, NicheTemplateContent } from "@/lib/niche-template/content";

export function NicheTemplateSingleArticle({
  content,
  article,
  basePath,
}: {
  content: NicheTemplateContent;
  article: Article;
  basePath?: string;
}) {
  const articleBase = basePath ?? `${content.siteBase}/article`;
  const blocks = resolveArticleBlocks({
    blocks: article.blocks,
    content: article.content,
    title: article.title,
    excerpt: article.excerpt,
  });

  const related = content.articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="nt-main nt-main--article">
      <div className="nt-container">
        <div className="nt-content-grid">
          <article>
            <div className="nt-prose nt-prose--article">
              <div className="nt-prose__hero">
                <SlotImage
                  src={article.image}
                  alt={article.title}
                  width={IMAGE_SLOTS.articleHero.width}
                  height={IMAGE_SLOTS.articleHero.height}
                  priority
                />
              </div>

              <h1 className="nt-article-title">{article.title}</h1>

              <div className="nt-article-meta">
                {article.category ? <span>{article.category}</span> : null}
                <span>{content.siteName}</span>
              </div>

              <ContentBlocks blocks={blocks} />

              {related.length > 0 ? (
                <aside className="nt-article-related">
                  <h2 className="nt-article-related__title">Related articles</h2>
                  <div className="nt-article-related__grid">
                    {related.map((item) => (
                      <NicheTemplateArticleCard key={item.id || item.slug} article={item} basePath={articleBase} />
                    ))}
                  </div>
                </aside>
              ) : null}
            </div>
          </article>

          <NicheTemplateSidebar content={content} basePath={articleBase} />
        </div>
      </div>
    </div>
  );
}
