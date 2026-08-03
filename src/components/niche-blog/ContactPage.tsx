"use client";

import type { NicheBlogPage } from "@/lib/niche-blog/pages";
import { NicheBlogPageBanner } from "@/components/niche-blog/PageBanner";
import { NicheBlogSidebar } from "@/components/niche-blog/Sidebar";

export function NicheBlogContactPage({ page }: { page: NicheBlogPage }) {
  return (
    <>
      <NicheBlogPageBanner page={page} />
      <section className="nb-inner-page">
        <div className="nb-container">
          <div className="nb-inner-page__grid">
            <div>
              {page.intro && <p className="nb-inner-page__intro">{page.intro}</p>}
              <form
                className="nb-contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="nb-contact-form__row">
                  <label htmlFor="contact-name">
                    Name
                    <input id="contact-name" type="text" name="name" placeholder="Name" required />
                  </label>
                  <label htmlFor="contact-email">
                    Email
                    <input id="contact-email" type="email" name="email" placeholder="Email" required />
                  </label>
                </div>
                <label htmlFor="contact-message">
                  Message
                  <textarea id="contact-message" name="message" rows={4} placeholder="Message" required />
                </label>
                <button type="submit" className="nb-btn">
                  Send
                </button>
              </form>
            </div>
            <NicheBlogSidebar />
          </div>
        </div>
      </section>
    </>
  );
}
