import { NicheTemplatePageBanner } from "./PageBanner";
import { NicheTemplateSidebar } from "./Sidebar";
import { NicheTemplateFaqPage } from "./FaqPage";
import { ContentBlocks } from "./ContentBlocks";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import { resolvePageBlocks } from "@/lib/builder/contentBlocks";
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

  const blocks = resolvePageBlocks({
    blocks: page.blocks,
    content: page.content,
    intro: page.intro,
    title: page.title,
  });

  return (
    <>
      <NicheTemplatePageBanner title={page.bannerTitle} background={page.banner ?? IMAGE_SLOTS.pageBanner.placeholder} />

      <div className="nt-main">
        <div className="nt-container">
          <div className="nt-content-grid">
            <div className="nt-prose nt-prose--static">
              <ContentBlocks blocks={blocks} />
            </div>

            <NicheTemplateSidebar content={content} basePath={`${content.siteBase}/article`} />
          </div>
        </div>
      </div>
    </>
  );
}
