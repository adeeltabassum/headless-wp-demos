"use client";

import { useEffect, useState } from "react";
import {
  listDrafts,
  createDraft,
  saveDraft,
  deleteDraft,
  type DraftIndexEntry,
} from "@/lib/builder/draftStorage";
import type { SiteRegistryEntry } from "@/lib/sites/registry";

const LAST_DRAFT_KEY = "builder:last-draft-id";

export default function SitesDashboard() {
  const [sites, setSites] = useState<SiteRegistryEntry[]>([]);
  const [drafts, setDrafts] = useState<DraftIndexEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/builder/sites")
      .then((r) => r.json())
      .then((d) => setSites(d.sites || []))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only read of localStorage on mount
    setDrafts(listDrafts());
  }, []);

  function openDraft(id: string) {
    window.localStorage.setItem(LAST_DRAFT_KEY, id);
    // eslint-disable-next-line react-hooks/immutability -- plain client-side navigation triggered from a click handler, not during render
    window.location.href = "/studio";
  }

  function removeDraft(id: string) {
    deleteDraft(id);
    setDrafts(listDrafts());
  }

  async function editSite(slug: string) {
    setError(null);
    try {
      const res = await fetch(`/api/builder/sites/${slug}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load site.");
      const rec = createDraft();
      saveDraft({ ...rec, draft: data.draft });
      openDraft(rec.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load site.");
    }
  }

  return (
    <div className="scai scai-studio builder-app" style={{ overflowY: "auto" }}>
      <header className="builder-topbar">
        <a href="/studio" className="scai-logo" aria-label="SCAI Studio">
          <span className="scai-logo__mark">S</span>
          <span>
            SCAI <span className="grad-text">Studio</span>
          </span>
        </a>
        <div className="builder-topbar__meta">
          <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.3px" }}>Your sites</span>
          <span className="builder-topbar__slug">Dashboard</span>
        </div>
        <div className="builder-topbar__actions">
          <a className="builder-btn builder-btn--ghost" href="/studio">
            Back to builder
          </a>
          <button className="builder-btn builder-btn--primary" onClick={() => openDraft(createDraft().id)}>
            New site
          </button>
        </div>
      </header>

      <div className="builder-dashboard">
        <div className="builder-dashboard__head">
          <h1>
            Your <span className="grad-text">sites</span>
          </h1>
        </div>

        {error && <p className="builder-status builder-status--error">{error}</p>}

        <h2>Published</h2>
        {loading ? (
          <p className="hint">Loading…</p>
        ) : sites.length === 0 ? (
          <p className="hint">No sites published yet — publish a draft from the builder to see it here.</p>
        ) : (
          <div className="builder-dashboard__grid">
            {sites.map((s) => (
              <div className="builder-dashboard__card" key={s.slug}>
                <h3>{s.siteName}</h3>
                <span>
                  /{s.slug} · {s.status}
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  <a className="builder-btn builder-btn--sm" href={`/${s.slug}`} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                  <button className="builder-btn builder-btn--sm" onClick={() => editSite(s.slug)}>
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2>Local drafts</h2>
        {drafts.length === 0 ? (
          <p className="hint">No drafts yet — start one from the builder.</p>
        ) : (
          <div className="builder-dashboard__grid">
            {drafts.map((d) => (
              <div className="builder-dashboard__card" key={d.id}>
                <h3>{d.siteName || "Untitled site"}</h3>
                <span>
                  {d.slug ? `/${d.slug}` : "no slug yet"} · updated {new Date(d.updatedAt).toLocaleString()}
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="builder-btn builder-btn--sm" onClick={() => openDraft(d.id)}>
                    Open
                  </button>
                  <button className="builder-btn builder-btn--sm builder-btn--danger" onClick={() => removeDraft(d.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
