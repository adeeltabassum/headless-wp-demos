"use client";

import { useEcommerceContent } from "../EcommerceContentProvider";
import { findLegalPage } from "@/lib/ecommerce/legal-sample";

export function LegalPolicyView({ slug }: { slug: string }) {
  const { legal } = useEcommerceContent();
  const page = findLegalPage(legal, slug);

  if (!page) {
    return (
      <main className="ec-legal">
        <div className="ec-container ec-legal-body">
          <p>Page not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="ec-legal">
      <header className="ec-legal-hero">
        <div className="ec-container">
          <h1>{page.title}</h1>
          <p className="ec-legal-hero__updated">
            {legal.lastUpdatedPrefix} {page.lastUpdated}
          </p>
        </div>
      </header>

      <div className="ec-container ec-legal-body">
        {page.intro ? <p className="ec-legal-intro">{page.intro}</p> : null}

        {page.sections.map((section) => {
          const ListTag = section.listStyle === "ol" ? "ol" : "ul";
          return (
            <section key={section.heading} className="ec-legal-section">
              <h2>{section.heading}</h2>
              <ListTag>
                {section.items.map((item) => (
                  <li key={item.slice(0, 48)}>{item}</li>
                ))}
              </ListTag>
            </section>
          );
        })}
      </div>
    </main>
  );
}
