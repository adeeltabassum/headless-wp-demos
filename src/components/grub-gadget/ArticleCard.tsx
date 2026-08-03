import Link from "next/link";
import type { Article } from "@/lib/grub-gadget/content";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/grub-gadget/${article.slug}`} className="gg-article-card">
      <div className="gg-article-card__image">
        <img src={article.image} alt={article.title} loading="lazy" />
      </div>
      <div className="gg-article-card__content">
        <h2 className="gg-article-card__title">
          {article.title}
        </h2>
        <p className="gg-article-card__excerpt">{article.excerpt}</p>
      </div>
    </Link>
  );
}
