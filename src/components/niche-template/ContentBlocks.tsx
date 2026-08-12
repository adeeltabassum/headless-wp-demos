import type { ContentBlock } from "@/lib/builder/contentBlocks";
import { NicheLink } from "./NicheLink";

/** Each block owns its own vertical rhythm via `.nt-block-*` CSS. */

export function ContentHeading({ level, text }: { level: 1 | 2 | 3; text: string }) {
  if (level === 1) return <h1 className="nt-block-heading nt-block-heading--1">{text}</h1>;
  if (level === 3) return <h3 className="nt-block-heading nt-block-heading--3">{text}</h3>;
  return <h2 className="nt-block-heading nt-block-heading--2">{text}</h2>;
}

export function ContentParagraph({ text }: { text: string }) {
  return <p className="nt-block-paragraph">{text}</p>;
}

export function ContentList({ items }: { items: string[] }) {
  return (
    <ul className="nt-block-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ContentFaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open?: boolean;
  onToggle?: () => void;
}) {
  if (onToggle) {
    return (
      <div className={`nt-faq__item nt-block-faq${open ? " is-open" : ""}`}>
        <button type="button" className="nt-faq__question" aria-expanded={!!open} onClick={onToggle}>
          <span>{question}</span>
          <span className="nt-faq__icon" aria-hidden="true">
            {open ? "−" : "+"}
          </span>
        </button>
        {open && (
          <div className="nt-faq__answer">
            <p>{answer}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="nt-block-faq">
      <h3 className="nt-block-heading nt-block-heading--3">{question}</h3>
      <p className="nt-block-paragraph">{answer}</p>
    </div>
  );
}

export function ContentCta({ text, href }: { text: string; href: string }) {
  return (
    <p className="nt-block-cta">
      <NicheLink href={href} className="nt-btn">
        {text}
      </NicheLink>
    </p>
  );
}

export function renderContentBlock(block: ContentBlock, key: number | string) {
  switch (block.type) {
    case "heading":
      return <ContentHeading key={key} level={block.level} text={block.text} />;
    case "paragraph":
      return <ContentParagraph key={key} text={block.text} />;
    case "list":
      return <ContentList key={key} items={block.items} />;
    case "faqItem":
      return <ContentFaqItem key={key} question={block.question} answer={block.answer} />;
    case "cta":
      return <ContentCta key={key} text={block.text} href={block.href} />;
    default:
      return null;
  }
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks.length) return null;
  return <div className="nt-blocks">{blocks.map((block, i) => renderContentBlock(block, i))}</div>;
}
