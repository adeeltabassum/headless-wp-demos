import type { WorkingDraft } from "./mergePatch";
import { createDefaultDraft } from "./schema";

/**
 * Client-side draft persistence — localStorage today, but the record shape
 * is exactly what a KV/DB row would look like, so swapping storage layers
 * later (per the plan's future-proofing seam) only touches this file.
 */

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface DraftRecord {
  id: string;
  createdAt: number;
  updatedAt: number;
  draft: WorkingDraft;
  chatHistory: ChatMessage[];
  /** Populated once this draft has been published; used by the /studio/sites dashboard. */
  publishedUrl?: string;
  publishedPrUrl?: string;
}

export interface DraftIndexEntry {
  id: string;
  siteName: string;
  slug: string;
  updatedAt: number;
}

const INDEX_KEY = "builder:index";
const draftKey = (id: string) => `builder:draft:${id}`;

function isBrowser() {
  return typeof window !== "undefined";
}

function readIndex(): DraftIndexEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(INDEX_KEY);
    return raw ? (JSON.parse(raw) as DraftIndexEntry[]) : [];
  } catch {
    return [];
  }
}

function writeIndex(entries: DraftIndexEntry[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(INDEX_KEY, JSON.stringify(entries));
}

export function listDrafts(): DraftIndexEntry[] {
  return readIndex().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function loadDraft(id: string): DraftRecord | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(draftKey(id));
    return raw ? (JSON.parse(raw) as DraftRecord) : null;
  } catch {
    return null;
  }
}

export function saveDraft(record: DraftRecord) {
  if (!isBrowser()) return;
  record.updatedAt = Date.now();
  window.localStorage.setItem(draftKey(record.id), JSON.stringify(record));

  const index = readIndex().filter((e) => e.id !== record.id);
  index.push({
    id: record.id,
    siteName: record.draft.siteName || "Untitled site",
    slug: record.draft.slug || "",
    updatedAt: record.updatedAt,
  });
  writeIndex(index);
}

export function createDraft(): DraftRecord {
  const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  const record: DraftRecord = {
    id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    draft: createDefaultDraft(),
    chatHistory: [],
  };
  saveDraft(record);
  return record;
}

export function deleteDraft(id: string) {
  if (!isBrowser()) return;
  window.localStorage.removeItem(draftKey(id));
  writeIndex(readIndex().filter((e) => e.id !== id));
}
