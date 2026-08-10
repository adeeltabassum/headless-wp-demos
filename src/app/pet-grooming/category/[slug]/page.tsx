import { notFound } from "next/navigation";
import {
  NicheTemplateRoot,
  NicheTemplateHeader,
  NicheTemplateCategoryPage,
  NicheTemplateFooter,
} from "@/components/niche-template";
import { getCategoryBySlug } from "@/lib/niche-template/content";
import { PetGroomingTheme as theme } from "@/lib/sites/pet-grooming/theme";
import { PetGroomingContent as content } from "@/lib/sites/pet-grooming/content";

export function generateStaticParams() {
  return content.categories.map((category) => ({ slug: category.slug }));
}

export default async function PetGroomingCategory({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(content, slug);
  if (!category) notFound();

  return (
    <NicheTemplateRoot theme={theme}>
      <NicheTemplateHeader content={content} />
      <main>
        <NicheTemplateCategoryPage content={content} category={category} basePath="/pet-grooming/article" />
      </main>
      <NicheTemplateFooter content={content} />
    </NicheTemplateRoot>
  );
}
