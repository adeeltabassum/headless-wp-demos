import { NicheLink } from "./NicheLink";
import { SlotImage } from "./SlotImage";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import type { Article } from "@/lib/niche-template/content";

export function NicheTemplateArticleCard({ article, basePath }: { article: Article; basePath: string }) {
  return (
    <NicheLink href={`${basePath}/${article.slug}`} className="nt-article-card">
      <div className="nt-article-card__image">
        <SlotImage
          src={article.image}
          alt={article.title}
          width={IMAGE_SLOTS.articleThumbnail.width}
          height={IMAGE_SLOTS.articleThumbnail.height}
          loading="lazy"
        />
      </div>
      <div>
        <h2 className="nt-article-card__title">{article.title}</h2>
        <p className="nt-article-card__excerpt">{article.excerpt}</p>
      </div>
    </NicheLink>
  );
}
