import { notFound } from "next/navigation";
import {
  NicheTemplateRoot,
  NicheTemplateHeader,
  NicheTemplateStaticPage,
  NicheTemplateContactPage,
  NicheTemplateFooter,
} from "@/components/niche-template";
import { getPageBySlug } from "@/lib/niche-template/content";
import { PetGroomingTheme as theme } from "@/lib/sites/pet-grooming/theme";
import { PetGroomingContent as content } from "@/lib/sites/pet-grooming/content";

export function generateStaticParams() {
  return content.pages.map((page) => ({ slug: page.slug }));
}

export default async function PetGroomingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageBySlug(content, slug);
  if (!page) notFound();

  return (
    <NicheTemplateRoot theme={theme}>
      <NicheTemplateHeader content={content} />
      <main>
        {slug === "contact" ? (
          <NicheTemplateContactPage content={content} page={page} />
        ) : (
          <NicheTemplateStaticPage content={content} page={page} />
        )}
      </main>
      <NicheTemplateFooter content={content} />
    </NicheTemplateRoot>
  );
}
