import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GrubGadgetHeader } from "@/components/grub-gadget/Header";
import { GrubGadgetFooter } from "@/components/grub-gadget/Footer";
import { GrubGadgetCategoryPage } from "@/components/grub-gadget/CategoryPage";
import { categories, articles } from "@/lib/grub-gadget/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) return {};

  return {
    title: `${category.label} - Grub Gadget`,
    description: category.description,
  };
}

export default async function GrubGadgetCategoryPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Filter articles by category
  const categoryArticles = articles.filter((article) => article.category === slug);

  return (
    <>
      <GrubGadgetHeader />
      <main>
        <GrubGadgetCategoryPage category={category} articles={categoryArticles} />
      </main>
      <GrubGadgetFooter />
    </>
  );
}
