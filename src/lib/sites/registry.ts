import registryData from "./registry.json";

/**
 * The site registry — a JSON file committed alongside every publish,
 * tracking every site the builder has ever produced. Read via a static
 * import so it always reflects whatever commit is currently deployed
 * (works identically in dev and on Vercel's read-only serverless
 * filesystem); writes only ever happen as part of a publish's GitHub
 * commit, never a local fs write at request time — upgradeable to a real
 * DB table later without changing this module's public shape.
 */
export interface SiteRegistryEntry {
  slug: string;
  siteName: string;
  createdAt: string;
  updatedAt: string;
  prUrl?: string;
  status: "draft-pr" | "live";
}

export function getRegistry(): SiteRegistryEntry[] {
  return registryData as SiteRegistryEntry[];
}

export function isSlugTaken(slug: string): boolean {
  return getRegistry().some((e) => e.slug === slug);
}

export function findEntry(slug: string): SiteRegistryEntry | undefined {
  return getRegistry().find((e) => e.slug === slug);
}

/** Returns the full registry array with `entry` upserted by slug, ready to be serialized back into registry.json. */
export function upsertEntry(entry: SiteRegistryEntry): SiteRegistryEntry[] {
  const rest = getRegistry().filter((e) => e.slug !== entry.slug);
  return [...rest, entry].sort((a, b) => a.slug.localeCompare(b.slug));
}
