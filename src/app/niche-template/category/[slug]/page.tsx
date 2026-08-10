import { notFound } from "next/navigation";
import {
  NicheTemplateRoot,
  NicheTemplateHeader,
  NicheTemplateCategoryPage,
  NicheTemplateFooter,
} from "@/components/niche-template";
import { defaultNicheTheme } from "@/lib/niche-template/theme";
import { getCategoryBySlug } from "@/lib/niche-template/content";
import { nicheTemplateSampleContent as content } from "@/lib/niche-template/sample-content";

export function generateStaticParams() {
  return content.categories.map((category) => ({ slug: category.slug }));
}

export default async function NicheTemplateCategory({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(content, slug);
  if (!category) notFound();

  return (
    <NicheTemplateRoot theme={defaultNicheTheme}>
      <NicheTemplateHeader content={content} />
      <main>
        <NicheTemplateCategoryPage content={content} category={category} basePath="/niche-template/article" />
      </main>
      <NicheTemplateFooter content={content} />
    </NicheTemplateRoot>
  );
}
