"use client";

import { useEcommerceContent } from "../EcommerceContentProvider";

export function FAQ() {
  const { home } = useEcommerceContent();
  const section = home.faq;

  return (
    <section className="ec-section" id="faq">
      <div className="ec-container ec-container--narrow">
        <div className="ec-section-head ec-section-head--center">
          <div>
            <h2>{section.heading}</h2>
            <p className="ec-section-head__sub">{section.subheading}</p>
          </div>
        </div>
        <div className="ec-faq">
          {section.items.map((item, i) => (
            <details key={item.question} className="ec-faq__item" open={i === 0}>
              <summary>
                <span>{item.question}</span>
                <span className="ec-faq__chevron" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
