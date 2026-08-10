import { notFound } from "next/navigation";
import {
  NicheTemplateRoot,
  NicheTemplateHeader,
  NicheTemplateSingleArticle,
  NicheTemplateFooter,
} from "@/components/niche-template";
import { defaultNicheTheme } from "@/lib/niche-template/theme";
import { nicheTemplateSampleContent as content } from "@/lib/niche-template/sample-content";

export function generateStaticParams() {
  return content.articles.map((article) => ({ slug: article.slug }));
}

export default async function NicheTemplateArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = content.articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <NicheTemplateRoot theme={defaultNicheTheme}>
      <NicheTemplateHeader content={content} />
      <main>
        <NicheTemplateSingleArticle content={content} article={article} />
      </main>
      <NicheTemplateFooter content={content} />
    </NicheTemplateRoot>
  );
}
