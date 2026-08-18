import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EcommerceShell } from "@/components/ecommerce/EcommerceShell";
import { BlogPostView } from "@/components/ecommerce/blog/BlogPostView";
import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";
import { findBlogArticle } from "@/lib/ecommerce/pages-sample";
import { defaultEcommerceTheme } from "@/lib/ecommerce/theme";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ecommerceSampleContent.blog.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogArticle(ecommerceSampleContent.blog.posts, slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — ${ecommerceSampleContent.siteName}`,
    description: post.excerpt,
    icons: { icon: ecommerceSampleContent.favicon },
  };
}

export default async function EcommerceBlogPostPage({ params }: Props) {
  const { slug } = await params;
  if (!findBlogArticle(ecommerceSampleContent.blog.posts, slug)) {
    notFound();
  }

  return (
    <EcommerceShell content={ecommerceSampleContent} theme={defaultEcommerceTheme}>
      <BlogPostView slug={slug} />
    </EcommerceShell>
  );
}
