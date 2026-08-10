"use client";

import { NicheTemplatePageBanner } from "./PageBanner";
import { NicheTemplateSidebar } from "./Sidebar";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import type { NicheTemplateContent, StaticPageData } from "@/lib/niche-template/content";

export function NicheTemplateContactPage({
  content,
  page,
}: {
  content: NicheTemplateContent;
  page: StaticPageData;
}) {
  return (
    <>
      <NicheTemplatePageBanner title={page.bannerTitle} background={page.banner ?? IMAGE_SLOTS.pageBanner.placeholder} />

      <div className="nt-main">
        <div className="nt-container">
          <div className="nt-content-grid">
            <div>
              {page.intro && <p style={{ marginBottom: 24, color: "var(--nt-muted)" }}>{page.intro}</p>}
              <form className="nt-form" onSubmit={(e) => e.preventDefault()}>
                <div className="nt-form__row">
                  <label htmlFor="contact-name">
                    Name
                    <input id="contact-name" type="text" name="name" placeholder="Your name" required />
                  </label>
                  <label htmlFor="contact-email">
                    Email
                    <input id="contact-email" type="email" name="email" placeholder="you@example.com" required />
                  </label>
                </div>
                <label htmlFor="contact-message">
                  Message
                  <textarea id="contact-message" name="message" rows={5} placeholder="How can we help?" required />
                </label>
                <button type="submit" className="nt-btn" style={{ justifySelf: "start" }}>
                  Send message
                </button>
              </form>
            </div>

            <NicheTemplateSidebar content={content} basePath={`${content.siteBase}/article`} />
          </div>
        </div>
      </div>
    </>
  );
}
