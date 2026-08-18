import type { Metadata } from "next";
import { EcommerceShell } from "@/components/ecommerce/EcommerceShell";
import { BlogIndexView } from "@/components/ecommerce/blog/BlogIndexView";
import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";
import { defaultEcommerceTheme } from "@/lib/ecommerce/theme";

export const metadata: Metadata = {
  title: ecommerceSampleContent.blog.metadata.title,
  description: ecommerceSampleContent.blog.metadata.description,
  icons: { icon: ecommerceSampleContent.favicon },
};

export default function EcommerceBlogPage() {
  return (
    <EcommerceShell content={ecommerceSampleContent} theme={defaultEcommerceTheme}>
      <BlogIndexView />
    </EcommerceShell>
  );
}
