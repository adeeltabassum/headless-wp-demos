import { SlotImage } from "./SlotImage";
import { NicheTemplateSidebar } from "./Sidebar";
import { NicheTemplateRichContent } from "./RichContent";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
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
  const blocks = article.content ?? [article.excerpt];

  return (
    <div className="nt-main nt-main--article">
      <div className="nt-container">
        <div className="nt-content-grid">
          <article>
            <div className="nt-prose nt-prose--article">
              <h1 className="nt-article-title">{article.title}</h1>

              <div className="nt-prose__hero">
                <SlotImage
                  src={article.image}
                  alt={article.title}
                  width={IMAGE_SLOTS.articleHero.width}
                  height={IMAGE_SLOTS.articleHero.height}
                  priority
                />
              </div>

              <NicheTemplateRichContent blocks={blocks} />
            </div>
          </article>

          <NicheTemplateSidebar content={content} basePath={articleBase} />
        </div>
      </div>
    </div>
  );
}
