import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EcommerceShell } from "@/components/ecommerce/EcommerceShell";
import { ProductDetailView } from "@/components/ecommerce/product/ProductDetailView";
import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";
import { getProductBySlug } from "@/lib/ecommerce/product";
import { defaultEcommerceTheme } from "@/lib/ecommerce/theme";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ecommerceSampleContent.shop.products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(ecommerceSampleContent, slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.title} — ${ecommerceSampleContent.siteName}`,
    description: product.shortDescription || ecommerceSampleContent.metadata.description,
    icons: { icon: ecommerceSampleContent.favicon },
  };
}

export default async function EcommerceProductPage({ params }: Props) {
  const { slug } = await params;
  if (!getProductBySlug(ecommerceSampleContent, slug)) notFound();

  return (
    <EcommerceShell content={ecommerceSampleContent} theme={defaultEcommerceTheme}>
      <ProductDetailView slug={slug} />
    </EcommerceShell>
  );
}
