"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/builder/draftStorage";

export function ChatPanel({
  history,
  onSend,
  sending,
  mockMode,
}: {
  history: ChatMessage[];
  onSend: (message: string) => void;
  sending: boolean;
  mockMode: boolean;
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history.length]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    onSend(text);
    setInput("");
  }

  return (
    <div className="builder-chat">
      <div className="builder-chat__messages" ref={scrollRef}>
        {history.length === 0 && (
          <p className="builder-chat__hint" style={{ padding: 0 }}>
            Tell me about the site you want to build — the name, what it&apos;s about, and who it&apos;s for. I&apos;ll
            fill in the draft as we go.
          </p>
        )}
        {history.map((m, i) => (
          <div key={i} className={`builder-msg builder-msg--${m.role}`}>
            {m.content}
          </div>
        ))}
        {sending && <div className="builder-msg builder-msg--assistant">Thinking…</div>}
      </div>
      {mockMode && (
        <p className="builder-chat__hint">
          Mock mode: set <code>GEMINI_API_KEY</code> in <code>.env.local</code> for real AI answers.
        </p>
      )}
      <form className="builder-chat__form" onSubmit={submit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your site…"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              submit(e);
            }
          }}
        />
        <button type="submit" className="builder-btn builder-btn--primary" disabled={sending || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
