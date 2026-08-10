import { NicheTemplatePageBanner } from "./PageBanner";
import { NicheTemplateSidebar } from "./Sidebar";
import { NicheTemplateFaqPage } from "./FaqPage";
import { NicheTemplateRichContent } from "./RichContent";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import type { NicheTemplateContent, StaticPageData } from "@/lib/niche-template/content";

export function NicheTemplateStaticPage({
  content,
  page,
}: {
  content: NicheTemplateContent;
  page: StaticPageData;
}) {
  if (page.slug === "faq") {
    return <NicheTemplateFaqPage content={content} page={page} />;
  }

  const paragraphs = page.content ?? (page.intro ? [page.intro] : []);

  return (
    <>
      <NicheTemplatePageBanner title={page.bannerTitle} background={page.banner ?? IMAGE_SLOTS.pageBanner.placeholder} />

      <div className="nt-main">
        <div className="nt-container">
          <div className="nt-content-grid">
            <div className="nt-prose nt-prose--static">
              <NicheTemplateRichContent blocks={paragraphs} />
            </div>

            <NicheTemplateSidebar content={content} basePath={`${content.siteBase}/article`} />
          </div>
        </div>
      </div>
    </>
  );
}
