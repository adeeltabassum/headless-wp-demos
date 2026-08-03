import { localContent } from "@/lib/local/content";

function PlusIcon() {
  return (
    <svg className="fb-faq__icon fb-faq__icon--plus" viewBox="0 0 448 512" aria-hidden="true">
      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" fill="currentColor" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg className="fb-faq__icon fb-faq__icon--minus" viewBox="0 0 448 512" aria-hidden="true">
      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" fill="currentColor" />
    </svg>
  );
}

export function FAQSection() {
  const { faq } = localContent;

  return (
    <section className="fb-section fb-faq">
      <div className="fb-section__inner">
        <div className="fb-section__header">
          <h2 className="fb-section__title">{faq.heading}</h2>
        </div>

        <div className="fb-faq__accordion">
          {faq.items.map((item, index) => (
            <details key={item.question} className="fb-faq__item" open={index === 0}>
              <summary className="fb-faq__question">
                <span>{item.question}</span>
                <span>
                  <PlusIcon />
                  <MinusIcon />
                </span>
              </summary>
              <div className="fb-faq__answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
