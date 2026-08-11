"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { WizardPanel } from "./WizardPanel";
import { PreviewPanel } from "./PreviewPanel";
import { createDraft, loadDraft, saveDraft, type DraftRecord } from "@/lib/builder/draftStorage";
import { mergeDraftPatch, type WorkingDraft } from "@/lib/builder/mergePatch";
import type { ImagePromptContext } from "@/lib/builder/geminiImage";
import type { ImageGenOptions, ImageGenResult } from "@/lib/builder/imageGenTypes";
import type { ImageSlotKey } from "@/lib/niche-template/images";
import {
  DESIGN_SYSTEM_PRESETS,
  domainToSlug,
} from "@/lib/builder/presets";

const LAST_DRAFT_KEY = "builder:last-draft-id";

type PublishState = { state: "idle" | "loading" | "success" | "error"; message?: string };

/** Apply default theme from designSystemId if theme is empty. */
function ensureTheme(draft: WorkingDraft): WorkingDraft {
  if (draft.theme?.primary) return draft;
  const preset = DESIGN_SYSTEM_PRESETS.find((p) => p.id === (draft.designSystemId || "forest"));
  if (!preset) return draft;
  return { ...draft, theme: { ...draft.theme, ...preset.theme } };
}

export function StudioApp() {
  const [record, setRecord] = useState<DraftRecord | null>(null);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [publishStatus, setPublishStatus] = useState<PublishState>({ state: "idle" });
  const [imageStatus, setImageStatus] = useState<PublishState>({ state: "idle" });

  useEffect(() => {
    const lastId = window.localStorage.getItem(LAST_DRAFT_KEY);
    let rec = lastId ? loadDraft(lastId) : null;
    if (!rec) rec = createDraft();
    window.localStorage.setItem(LAST_DRAFT_KEY, rec.id);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration
    setRecord(rec);
  }, []);

  const persist = useCallback((updated: DraftRecord) => {
    setRecord(updated);
    saveDraft(updated);
  }, []);

  function updateDraft(patch: Partial<WorkingDraft>) {
    if (!record) return;
    const merged = mergeDraftPatch(record.draft, patch);
    persist({ ...record, draft: ensureTheme(merged) });
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
      if (data.warning || data.note) {
        setImageStatus({ state: "success", message: (data.warning || data.note) as string });
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

  async function publish() {
    if (!record) return;
    const draft = ensureTheme(record.draft);
    if (!draft.siteName?.trim()) {
      setPublishStatus({ state: "error", message: "Enter a site name before publishing." });
      return;
    }
    const slug = draft.slug || domainToSlug(draft.domain || draft.siteName);
    if (!slug) {
      setPublishStatus({ state: "error", message: "Enter a domain before publishing." });
      return;
    }

    setPublishStatus({ state: "loading" });
    try {
      const res = await fetch("/api/builder/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft: { ...draft, slug } }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Publish failed.");
      if (data.dryRun) {
        setPublishStatus({
          state: "success",
          message: `Dry run only (GITHUB_TOKEN not configured): ${data.files.length} files validated.`,
        });
      } else {
        persist({ ...record, draft: { ...draft, slug }, publishedPrUrl: data.prUrl });
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

  const draft = ensureTheme(record.draft);
  const previewSupported = (draft.templateId || "niche-template") === "niche-template";

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
            value={draft.siteName || ""}
            placeholder="Untitled site"
            onChange={(e) => updateDraft({ siteName: e.target.value })}
          />
          <span className="builder-topbar__slug">
            {draft.domain || (draft.slug ? `/${draft.slug}` : "Set domain in wizard")}
          </span>
        </div>
        <div className="builder-topbar__actions">
          <button
            className="builder-btn builder-btn--ghost builder-btn--sm"
            onClick={() => setMobilePreview((v) => !v)}
            aria-pressed={mobilePreview}
          >
            {mobilePreview ? "Hide preview" : "Preview"}
          </button>
          <a className="builder-btn builder-btn--ghost builder-btn--sm" href="/studio/sites">
            Your sites
          </a>
          <button className="builder-btn builder-btn--ghost builder-btn--sm" onClick={startNewSite}>
            New site
          </button>
          <button
            className="builder-btn builder-btn--primary builder-btn--sm"
            onClick={publish}
            disabled={publishStatus.state === "loading"}
          >
            {publishStatus.state === "loading" ? "Publishing…" : "Publish"}
          </button>
        </div>
      </header>

      {imageStatus.state !== "idle" && (
        <div
          className={`builder-status ${imageStatus.state === "error" ? "builder-status--error" : "builder-status--success"}`}
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

      <div className="builder-main builder-main--wizard">
        <div className="builder-wizard-col">
          <WizardPanel draft={draft} onChange={updateDraft} onGenerateImage={generateImage} busyKey={busyKey} />
        </div>
        <div className={`builder-preview-col${mobilePreview ? " is-open" : ""}`}>
          <div className="builder-preview-col__head">
            <span className="badge badge--soft">Live Preview</span>
            {!previewSupported && (
              <span className="hint">Preview available for Niche Blog template. Publish to deploy other templates.</span>
            )}
          </div>
          <div className="builder-panel builder-panel--preview">
            {previewSupported ? (
              <PreviewPanel draft={draft} />
            ) : (
              <div className="builder-preview-placeholder">
                <p>
                  <strong>{draft.templateId === "local" ? "Flat Bid Moving" : "SAAS Template"}</strong> selected.
                </p>
                <p className="hint">
                  Live preview is available for the Niche Blog master template. Switch to Niche Blog in step 1 to
                  preview, or publish to generate this template.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
