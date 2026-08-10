"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChatPanel } from "./ChatPanel";
import { DraftPanel } from "./DraftPanel";
import { PreviewPanel } from "./PreviewPanel";
import { createDraft, loadDraft, saveDraft, type DraftRecord, type ChatMessage } from "@/lib/builder/draftStorage";
import { mergeDraftPatch, type WorkingDraft } from "@/lib/builder/mergePatch";
import type { SectionContext, SectionKey } from "@/lib/builder/sections";
import type { ImagePromptContext } from "@/lib/builder/geminiImage";
import type { ImageGenOptions, ImageGenResult } from "@/lib/builder/imageGenTypes";
import { defaultNicheTheme } from "@/lib/niche-template/theme";
import type { ImageSlotKey } from "@/lib/niche-template/images";

const LAST_DRAFT_KEY = "builder:last-draft-id";

type PublishState = { state: "idle" | "loading" | "success" | "error"; message?: string };

export function StudioApp() {
  const [record, setRecord] = useState<DraftRecord | null>(null);
  const [tab, setTab] = useState<"draft" | "preview">("draft");
  const [chatSending, setChatSending] = useState(false);
  const [chatMock, setChatMock] = useState(false);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [publishStatus, setPublishStatus] = useState<PublishState>({ state: "idle" });
  const [imageStatus, setImageStatus] = useState<PublishState>({ state: "idle" });
  const [contentStatus, setContentStatus] = useState<PublishState>({ state: "idle" });
  const [chatOpenMobile, setChatOpenMobile] = useState(false);

  useEffect(() => {
    // Must run post-mount, not as a lazy useState initializer: localStorage
    // is unavailable during SSR, and returning non-null state on the
    // client's first render (but null on the server's) would be a
    // hydration mismatch. Deferring to an effect keeps the first paint
    // identical on both, then swaps in the real draft right after.
    const lastId = window.localStorage.getItem(LAST_DRAFT_KEY);
    let rec = lastId ? loadDraft(lastId) : null;
    if (!rec) rec = createDraft();
    window.localStorage.setItem(LAST_DRAFT_KEY, rec.id);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time client-only hydration from localStorage, see comment above
    setRecord(rec);
  }, []);

  const persist = useCallback((updated: DraftRecord) => {
    setRecord(updated);
    saveDraft(updated);
  }, []);

  function updateDraft(patch: Partial<WorkingDraft>) {
    if (!record) return;
    persist({ ...record, draft: mergeDraftPatch(record.draft, patch) });
  }

  async function sendChatMessage(message: string) {
    if (!record) return;
    const withUserMsg: ChatMessage[] = [...record.chatHistory, { role: "user", content: message }];
    persist({ ...record, chatHistory: withUserMsg });
    setChatSending(true);
    try {
      const res = await fetch("/api/builder/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, draft: record.draft, history: record.chatHistory.slice(-12) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chat request failed.");
      setChatMock(!!data.mock);
      const nextDraft = data.patch ? mergeDraftPatch(record.draft, data.patch) : record.draft;
      const nextHistory: ChatMessage[] = [...withUserMsg, { role: "assistant", content: data.reply }];
      persist({ ...record, draft: nextDraft, chatHistory: nextHistory });
    } catch (err) {
      const nextHistory: ChatMessage[] = [
        ...withUserMsg,
        { role: "assistant", content: `Sorry, something went wrong: ${err instanceof Error ? err.message : "unknown error"}` },
      ];
      persist({ ...record, chatHistory: nextHistory });
    } finally {
      setChatSending(false);
    }
  }

  async function generateSection(section: SectionKey, context: SectionContext, key: string) {
    setBusyKey(key);
    try {
      const res = await fetch("/api/builder/generate-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, context }),
      });
      const data = await res.json();
      if (!res.ok) {
        const message = (data.error as string) || "Generation failed.";
        setContentStatus({ state: "error", message });
        return null;
      }
      setContentStatus({ state: "success", message: "Section drafted successfully." });
      return data.data as Record<string, unknown>;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Generation failed.";
      setContentStatus({ state: "error", message });
      return null;
    } finally {
      setBusyKey(null);
    }
  }

  async function generateImage(
    slot: ImageSlotKey,
    context: ImagePromptContext,
    key: string,
    options?: ImageGenOptions
  ): Promise<ImageGenResult> {
    setBusyKey(key);
    try {
      const res = await fetch("/api/builder/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot, context, localOnly: options?.localOnly ?? false }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Image generation failed.");

      const result: ImageGenResult = {
        url: data.url as string,
        warning: data.warning,
        note: data.note,
        source: data.source,
      };

      if (data.warning) {
        setImageStatus({ state: "success", message: data.warning as string });
      } else if (data.note) {
        setImageStatus({ state: "success", message: data.note as string });
      } else {
        setImageStatus({
          state: "success",
          message: `Image ready (${(data.source as string) || "generated"}).`,
        });
      }

      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Image generation failed.";
      setImageStatus({ state: "error", message });
      throw err;
    } finally {
      setBusyKey(null);
    }
  }

  async function generateAllImages() {
    if (!record?.draft.siteName) {
      setImageStatus({ state: "error", message: "Set a site name first, then generate images." });
      return;
    }

    setImageStatus({ state: "loading", message: "Generating all image slots…" });
    const theme = { ...defaultNicheTheme, ...(record.draft.theme || {}) };
    const ctx = {
      siteName: record.draft.siteName,
      niche: record.draft.niche,
      tone: record.draft.tone,
      primaryColor: theme.primary,
    };

    let working = { ...record.draft };

    const apply = (patch: Partial<typeof working>) => {
      working = mergeDraftPatch(working, patch);
      persist({ ...record, draft: working });
    };

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    try {
      const logo = await generateImage("logo", { ...ctx, label: "logo" }, "image:logo", { localOnly: true });
      apply({ logo: logo.url });
      await sleep(200);

      const favicon = await generateImage("favicon", { ...ctx, label: "favicon" }, "image:favicon", {
        localOnly: true,
      });
      apply({ favicon: favicon.url });
      await sleep(200);

      const hero = await generateImage("hero", { ...ctx, label: "hero background" }, "image:hero", {
        localOnly: true,
      });
      apply({ hero: { ...working.hero, background: hero.url } });
      await sleep(200);

      for (let i = 0; i < (working.categories?.length || 0); i++) {
        const cat = working.categories![i];
        const tile = await generateImage(
          "categoryTile",
          { ...ctx, label: cat.label },
          `image:tile:${i}`,
          { localOnly: true }
        );
        const nextCats = (working.categories || []).slice();
        nextCats[i] = { ...nextCats[i], background: tile.url };
        apply({ categories: nextCats });
        await sleep(200);
      }

      for (let i = 0; i < (working.articles?.length || 0); i++) {
        const art = working.articles![i];
        const thumb = await generateImage(
          "articleThumbnail",
          { ...ctx, label: art.title },
          `image:thumb:${i}`,
          { localOnly: true }
        );
        const nextArts = (working.articles || []).slice();
        nextArts[i] = { ...nextArts[i], image: thumb.url };
        apply({ articles: nextArts });
        await sleep(200);
      }

      setImageStatus({
        state: "success",
        message: "All image slots populated with SVG logos and stock photos. Use per-slot Generate for AI images when quota allows.",
      });
    } catch {
      // generateImage already set imageStatus on hard failure
    }
  }

  async function publish() {
    if (!record) return;
    setPublishStatus({ state: "loading" });
    try {
      const res = await fetch("/api/builder/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft: record.draft }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Publish failed.");
      if (data.dryRun) {
        setPublishStatus({
          state: "success",
          message: `Dry run only (GITHUB_TOKEN not configured): ${data.files.length} files were generated and validated but not committed.`,
        });
      } else {
        persist({ ...record, publishedPrUrl: data.prUrl });
        setPublishStatus({ state: "success", message: `Pull request opened: ${data.prUrl}` });
      }
    } catch (err) {
      setPublishStatus({ state: "error", message: err instanceof Error ? err.message : "Publish failed." });
    }
  }

  function startNewSite() {
    const rec = createDraft();
    window.localStorage.setItem(LAST_DRAFT_KEY, rec.id);
    setRecord(rec);
    setPublishStatus({ state: "idle" });
  }

  if (!record) return null;

  return (
    <div className="scai scai-studio builder-app">
      <header className="builder-topbar">
        <Link href="/studio" className="scai-logo" aria-label="SCAI Studio home">
          <span className="scai-logo__mark">S</span>
          <span>
            SCAI <span className="grad-text">Studio</span>
          </span>
        </Link>
        <div className="builder-topbar__meta">
          <input
            value={record.draft.siteName || ""}
            placeholder="Untitled site"
            onChange={(e) => updateDraft({ siteName: e.target.value })}
          />
          <span className="builder-topbar__slug">/{record.draft.slug || "…"}</span>
        </div>
        <div className="builder-topbar__actions">
          <button className="builder-btn builder-btn--ghost" onClick={() => setChatOpenMobile((v) => !v)}>
            {chatOpenMobile ? "Close chat" : "Chat"}
          </button>
          <a className="builder-btn builder-btn--ghost" href="/studio/sites">
            Your sites
          </a>
          <button className="builder-btn builder-btn--ghost" onClick={startNewSite}>
            New site
          </button>
          <button className="builder-btn builder-btn--primary" onClick={publish} disabled={publishStatus.state === "loading"}>
            {publishStatus.state === "loading" ? "Publishing…" : "Publish"}
          </button>
        </div>
      </header>

      {contentStatus.state !== "idle" && (
        <div
          className={`builder-status ${
            contentStatus.state === "error" ? "builder-status--error" : "builder-status--success"
          }`}
        >
          {contentStatus.message}
        </div>
      )}

      {imageStatus.state !== "idle" && (
        <div
          className={`builder-status ${
            imageStatus.state === "error"
              ? "builder-status--error"
              : imageStatus.state === "loading"
                ? ""
                : "builder-status--success"
          }`}
        >
          {imageStatus.message}
        </div>
      )}

      {publishStatus.state !== "idle" && (
        <div
          className={`builder-status ${publishStatus.state === "error" ? "builder-status--error" : "builder-status--success"}`}
        >
          {publishStatus.message}
        </div>
      )}

      <div className="builder-main">
        <div className={`builder-chat${chatOpenMobile ? " is-open" : ""}`}>
          <div className="builder-chat__head">
            <span className="badge badge--soft">AI Chat</span>
            <span className="hint">Describe your site — I&apos;ll fill the draft</span>
          </div>
          <ChatPanel history={record.chatHistory} onSend={sendChatMessage} sending={chatSending} mockMode={chatMock} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div className="builder-tabs">
            <button className={tab === "draft" ? "is-active" : ""} onClick={() => setTab("draft")}>
              Draft
            </button>
            <button className={tab === "preview" ? "is-active" : ""} onClick={() => setTab("preview")}>
              Live Preview
            </button>
            <div className="builder-tabs__spacer" />
          </div>
          <div className="builder-panel">
            {tab === "draft" ? (
              <DraftPanel
                draft={record.draft}
                onChange={updateDraft}
                onGenerateSection={generateSection}
                onGenerateImage={generateImage}
                onGenerateAllImages={generateAllImages}
                busyKey={busyKey}
                allImagesBusy={imageStatus.state === "loading"}
              />
            ) : (
              <PreviewPanel draft={record.draft} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
