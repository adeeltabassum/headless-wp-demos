import { notFound } from "next/navigation";
import {
  NicheTemplateRoot,
  NicheTemplateHeader,
  NicheTemplateStaticPage,
  NicheTemplateContactPage,
  NicheTemplateFooter,
} from "@/components/niche-template";
import { defaultNicheTheme } from "@/lib/niche-template/theme";
import { getPageBySlug } from "@/lib/niche-template/content";
import { nicheTemplateSampleContent as content } from "@/lib/niche-template/sample-content";

export function generateStaticParams() {
  return content.pages.map((page) => ({ slug: page.slug }));
}

export default async function NicheTemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageBySlug(content, slug);
  if (!page) notFound();

  return (
    <NicheTemplateRoot theme={defaultNicheTheme}>
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
