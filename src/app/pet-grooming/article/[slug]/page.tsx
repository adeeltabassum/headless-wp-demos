import { notFound } from "next/navigation";
import {
  NicheTemplateRoot,
  NicheTemplateHeader,
  NicheTemplateSingleArticle,
  NicheTemplateFooter,
} from "@/components/niche-template";
import { PetGroomingTheme as theme } from "@/lib/sites/pet-grooming/theme";
import { PetGroomingContent as content } from "@/lib/sites/pet-grooming/content";

export function generateStaticParams() {
  return content.articles.map((article) => ({ slug: article.slug }));
}

export default async function PetGroomingArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = content.articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <NicheTemplateRoot theme={theme}>
      <NicheTemplateHeader content={content} />
      <main>
        <NicheTemplateSingleArticle content={content} article={article} />
      </main>
      <NicheTemplateFooter content={content} />
    </NicheTemplateRoot>
  );
}
