import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GrubGadgetHeader } from "@/components/grub-gadget/Header";
import { GrubGadgetFooter } from "@/components/grub-gadget/Footer";
import { GrubGadgetSingleBlog } from "@/components/grub-gadget/SingleBlog";
import { articles } from "@/lib/grub-gadget/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) return {};

  return {
    title: `${article.title} - Grub Gadget`,
    description: article.excerpt,
  };
}

export default async function GrubGadgetArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <GrubGadgetHeader />
      <main>
        <GrubGadgetSingleBlog article={article} />
      </main>
      <GrubGadgetFooter />
    </>
  );
}
