"use client";

import { useState } from "react";
import { NicheTemplatePageBanner } from "./PageBanner";
import { NicheTemplateSidebar } from "./Sidebar";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import { parseFaqItems } from "@/lib/niche-template/richContent";
import type { NicheTemplateContent, StaticPageData } from "@/lib/niche-template/content";

export function NicheTemplateFaqPage({
  content,
  page,
}: {
  content: NicheTemplateContent;
  page: StaticPageData;
}) {
  const items = parseFaqItems(page.content ?? (page.intro ? [page.intro] : []));
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <NicheTemplatePageBanner title={page.bannerTitle} background={page.banner ?? IMAGE_SLOTS.pageBanner.placeholder} />

      <div className="nt-main">
        <div className="nt-container">
          <div className="nt-content-grid">
            <div className="nt-prose">
              {items.length === 0 ? (
                <p style={{ color: "var(--nt-muted)" }}>FAQ content is being drafted — check back soon.</p>
              ) : (
                <div className="nt-faq">
                  {items.map((item, i) => {
                    const isOpen = openIndex === i;
                    return (
                      <div key={item.question} className={`nt-faq__item${isOpen ? " is-open" : ""}`}>
                        <button
                          type="button"
                          className="nt-faq__question"
                          aria-expanded={isOpen}
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                        >
                          <span>{item.question}</span>
                          <span className="nt-faq__icon" aria-hidden="true">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="nt-faq__answer">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
