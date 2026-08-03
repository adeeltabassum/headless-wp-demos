import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NicheBlogHeader } from "@/components/niche-blog/Header";
import { NicheBlogFooter } from "@/components/niche-blog/Footer";
import { NicheBlogCategoryPage } from "@/components/niche-blog/CategoryPage";
import { NicheBlogStaticPage } from "@/components/niche-blog/StaticPage";
import { NicheBlogContactPage } from "@/components/niche-blog/ContactPage";
import { getAllNicheBlogSlugs, getNicheBlogPage } from "@/lib/niche-blog/pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllNicheBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getNicheBlogPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function NicheBlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getNicheBlogPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <NicheBlogHeader />
      <main className={page.type === "category" ? "nb-main--category" : undefined}>
        {page.type === "category" && <NicheBlogCategoryPage page={page} />}
        {(page.type === "landing" || page.type === "static") && <NicheBlogStaticPage page={page} />}
        {page.type === "contact" && <NicheBlogContactPage page={page} />}
      </main>
      <NicheBlogFooter />
    </>
  );
}
