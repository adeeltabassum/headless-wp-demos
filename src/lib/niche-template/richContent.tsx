import type { ReactNode } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

/** Split stored page/article copy into render blocks (paragraphs + headings). */
export function splitContentBlocks(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Parse FAQ copy into Q/A pairs from common AI output formats. */
export function parseFaqItems(raw: string | string[] | undefined): FaqItem[] {
  const text = Array.isArray(raw) ? raw.join("\n\n") : raw || "";
  if (!text.trim()) return [];

  const items: FaqItem[] = [];

  // Q: ... A: ... blocks
  const qaBlocks = text.split(/(?=\bQ:\s)/i).filter(Boolean);
  if (qaBlocks.length > 1 || /^Q:\s/i.test(text)) {
    for (const block of qaBlocks) {
      const match = block.match(/^Q:\s*(.+?)\s*(?:\n+)A:\s*([\s\S]+)$/i);
      if (match) {
        items.push({ question: match[1].trim(), answer: match[2].trim() });
      }
    }
    if (items.length) return items;
  }

  // **Question?** answer paragraphs
  const boldBlocks = text.split(/(?=\*\*[^*]+\*\*)/).filter(Boolean);
  if (boldBlocks.length > 1) {
    for (const block of boldBlocks) {
      const match = block.match(/^\*\*(.+?)\*\*\s*([\s\S]*)$/);
      if (match && match[1].trim()) {
        items.push({ question: match[1].trim(), answer: match[2].trim() });
      }
    }
    if (items.length) return items;
  }

  // Alternating paragraphs: odd = question, even = answer
  const paragraphs = splitContentBlocks(text);
  if (paragraphs.length >= 2) {
    for (let i = 0; i < paragraphs.length - 1; i += 2) {
      const q = paragraphs[i].replace(/^[Qq]:\s*/, "").replace(/\?$/, "?").trim();
      const a = paragraphs[i + 1].replace(/^[Aa]:\s*/, "").trim();
      if (q && a) items.push({ question: q.endsWith("?") ? q : `${q}?`, answer: a });
    }
    if (items.length) return items;
  }

  // Flowing prose: "Question? Answer. Question? Answer."
  const proseMatches = [...text.matchAll(/([^?]+\?)\s*([\s\S]*?)(?=(?:\s+[A-Z][^?]*\?)|$)/g)];
  if (proseMatches.length >= 2) {
    for (const match of proseMatches) {
      const q = match[1].trim();
      const a = match[2].trim();
      if (q && a) items.push({ question: q, answer: a });
    }
    if (items.length) return items;
  }

  return items;
}

function renderBlock(block: string, key: number): ReactNode {
  if (block.startsWith("### ")) {
    return <h3 key={key}>{block.slice(4)}</h3>;
  }
  if (block.startsWith("## ")) {
    return <h2 key={key}>{block.slice(3)}</h2>;
  }
  if (block.startsWith("# ")) {
    return <h2 key={key}>{block.slice(2)}</h2>;
  }
  return <p key={key}>{block}</p>;
}

export function RichContent({ blocks }: { blocks: string[] }) {
  if (!blocks.length) return null;
  return <>{blocks.map((block, i) => renderBlock(block, i))}</>;
}
