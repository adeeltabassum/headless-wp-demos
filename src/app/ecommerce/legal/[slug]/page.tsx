import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EcommerceShell } from "@/components/ecommerce/EcommerceShell";
import { LegalPolicyView } from "@/components/ecommerce/legal/LegalPolicyView";
import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";
import { findLegalPage } from "@/lib/ecommerce/legal-sample";
import { defaultEcommerceTheme } from "@/lib/ecommerce/theme";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ecommerceSampleContent.legal.pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = findLegalPage(ecommerceSampleContent.legal, slug);
  if (!page) return { title: "Not found" };
  return {
    title: page.metadata.title,
    description: page.metadata.description,
    icons: { icon: ecommerceSampleContent.favicon },
  };
}

export default async function EcommerceLegalPage({ params }: Props) {
  const { slug } = await params;
  if (!findLegalPage(ecommerceSampleContent.legal, slug)) {
    notFound();
  }

  return (
    <EcommerceShell content={ecommerceSampleContent} theme={defaultEcommerceTheme}>
      <LegalPolicyView slug={slug} />
    </EcommerceShell>
  );
}
