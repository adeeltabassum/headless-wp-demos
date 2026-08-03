import type { NicheBlogPage } from "@/lib/niche-blog/pages";
import { NicheBlogPageBanner } from "@/components/niche-blog/PageBanner";
import { NicheBlogSidebar } from "@/components/niche-blog/Sidebar";

export function NicheBlogStaticPage({ page }: { page: NicheBlogPage }) {
  const paragraphs = page.content ?? (page.intro ? [page.intro] : []);

  return (
    <>
      <NicheBlogPageBanner page={page} />
      <section className="nb-inner-page">
        <div className="nb-container">
          <div className="nb-inner-page__grid">
            <div className="nb-prose">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <NicheBlogSidebar />
          </div>
        </div>
      </section>
    </>
  );
}
