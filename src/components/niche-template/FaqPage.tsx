"use client";

import { useState } from "react";
import { NicheTemplatePageBanner } from "./PageBanner";
import { NicheTemplateSidebar } from "./Sidebar";
import { ContentFaqItem } from "./ContentBlocks";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import { faqItemsFromBlocks, resolvePageBlocks } from "@/lib/builder/contentBlocks";
import { parseFaqItems } from "@/lib/niche-template/richContent";
import type { NicheTemplateContent, StaticPageData } from "@/lib/niche-template/content";

export function NicheTemplateFaqPage({
  content,
  page,
}: {
  content: NicheTemplateContent;
  page: StaticPageData;
}) {
  const blocks = resolvePageBlocks({
    blocks: page.blocks,
    content: page.content,
    intro: page.intro,
    title: page.title,
  });
  const fromBlocks = faqItemsFromBlocks(blocks);
  const items =
    fromBlocks.length > 0
      ? fromBlocks
      : parseFaqItems(page.content ?? (page.intro ? [page.intro] : []));
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <NicheTemplatePageBanner title={page.bannerTitle} background={page.banner ?? IMAGE_SLOTS.pageBanner.placeholder} />

      <div className="nt-main">
        <div className="nt-container">
          <div className="nt-content-grid">
            <div className="nt-prose">
              {items.length === 0 ? (
                <p className="nt-block-paragraph" style={{ color: "var(--nt-muted, #6b6b6b)" }}>
                  FAQ content is being drafted — check back soon.
                </p>
              ) : (
                <div className="nt-faq">
                  {items.map((item, i) => (
                    <ContentFaqItem
                      key={`${item.question}-${i}`}
                      question={item.question}
                      answer={item.answer}
                      open={openIndex === i}
                      onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                    />
                  ))}
                </div>
              )}
            </div>

            <NicheTemplateSidebar content={content} basePath={`${content.siteBase}/article`} />
          </div>
        </div>
      </div>
    </>
  );
}
