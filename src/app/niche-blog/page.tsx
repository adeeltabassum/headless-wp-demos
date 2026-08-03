import type { Metadata } from "next";
import { NicheBlogHeader } from "@/components/niche-blog/Header";
import { NicheBlogHero, NicheBlogCategories } from "@/components/niche-blog/HeroSections";
import { NicheBlogContentArea } from "@/components/niche-blog/ContentArea";
import { NicheBlogFooter } from "@/components/niche-blog/Footer";
import { nicheBlogContent } from "@/lib/niche-blog/content";

export const metadata: Metadata = {
  title: nicheBlogContent.metadata.title,
  description: nicheBlogContent.metadata.description,
};

export default function NicheBlogPage() {
  return (
    <>
      <NicheBlogHeader />
      <main>
        <NicheBlogHero />
        <NicheBlogCategories />
        <NicheBlogContentArea />
      </main>
      <NicheBlogFooter />
    </>
  );
}
