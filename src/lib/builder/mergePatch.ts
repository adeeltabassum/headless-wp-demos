import type { BuilderDraft } from "./schema";

/**
 * Merges a chat/section patch into the current draft. Arrays (categories,
 * articles, social, tags) are replaced wholesale — patches always send the
 * full list for those fields. Plain nested objects (theme, hero, sidebar,
 * footer, pages) are shallow-merged one level so a patch that only sets
 * `hero.title` doesn't wipe `hero.subtitle`.
 */
export function mergeDraftPatch<T extends Record<string, unknown>>(
  base: T,
  patch: Partial<T>
): T {
  const merged: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      merged[key] = value;
    } else if (key === "theme" && value && typeof value === "object") {
      // Palette switches must replace theme wholesale — shallow-merge left
      // stale Forest colors stuck under Ocean/Ember/Midnight.
      merged[key] = { ...(value as Record<string, unknown>) };
    } else if (value && typeof value === "object") {
      const existing = merged[key];
      merged[key] = {
        ...(existing && typeof existing === "object" ? existing : {}),
        ...value,
      };
    } else {
      merged[key] = value;
    }
  }
  return merged as T;
}

export type WorkingDraft = Partial<BuilderDraft>;
