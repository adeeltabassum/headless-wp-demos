import type { NicheTheme } from "@/lib/niche-template/theme";
import type { TemplateId } from "./schema";

export const NICHE_OPTIONS = [
  { value: "health-wellness", label: "Health & Wellness" },
  { value: "finance", label: "Finance & Money" },
  { value: "home-garden", label: "Home & Garden" },
  { value: "food-cooking", label: "Food & Cooking" },
  { value: "tech-gadgets", label: "Tech & Gadgets" },
  { value: "travel", label: "Travel" },
  { value: "fitness", label: "Fitness & Sports" },
  { value: "parenting", label: "Parenting & Family" },
  { value: "pets", label: "Pets & Animals" },
  { value: "beauty", label: "Beauty & Skincare" },
  { value: "automotive", label: "Automotive" },
  { value: "real-estate", label: "Real Estate" },
  { value: "education", label: "Education & Learning" },
  { value: "local-business", label: "Local Business / Services" },
  { value: "saas-software", label: "SaaS / Software" },
  { value: "ecommerce", label: "Ecommerce / Online Store" },
  { value: "other", label: "Other (custom)" },
] as const;

export type NicheValue = (typeof NICHE_OPTIONS)[number]["value"];

export const TONE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "authoritative", label: "Authoritative" },
  { value: "casual", label: "Casual" },
  { value: "technical", label: "Technical" },
  { value: "inspirational", label: "Inspirational" },
] as const;

export type ToneValue = (typeof TONE_OPTIONS)[number]["value"];

export type DesignSystemPreset = {
  id: string;
  name: string;
  description: string;
  swatches: [string, string, string, string];
  theme: Partial<NicheTheme>;
};

const BASE_RADIUS = { radiusSm: "4px", radiusMd: "8px", radiusLg: "12px" };

export const DESIGN_SYSTEM_PRESETS: DesignSystemPreset[] = [
  {
    id: "forest",
    name: "Forest",
    description: "Clean green accents on neutral surfaces — great for wellness and outdoor niches.",
    swatches: ["#1a2e1a", "#f5f5f0", "#2d6a3e", "#111111"],
    theme: {
      primary: "#2d6a3e",
      onPrimary: "#ffffff",
      background: "#f5f5f0",
      surface: "#ffffff",
      text: "#1a1a1a",
      muted: "#6b7280",
      border: "#e5e7eb",
      ink: "#111111",
      onInk: "#ffffff",
      ...BASE_RADIUS,
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Calm blues with crisp white surfaces — trust-forward and readable.",
    swatches: ["#0f2942", "#f8fafc", "#2563eb", "#0f172a"],
    theme: {
      primary: "#2563eb",
      onPrimary: "#ffffff",
      background: "#f8fafc",
      surface: "#ffffff",
      text: "#0f172a",
      muted: "#64748b",
      border: "#e2e8f0",
      ink: "#0f2942",
      onInk: "#ffffff",
      ...BASE_RADIUS,
    },
  },
  {
    id: "ember",
    name: "Ember",
    description: "Warm reds and dark ink — bold for food, fitness, and local services.",
    swatches: ["#1a1a1a", "#fafafa", "#dc2626", "#171717"],
    theme: {
      primary: "#dc2626",
      onPrimary: "#ffffff",
      background: "#fafafa",
      surface: "#ffffff",
      text: "#171717",
      muted: "#737373",
      border: "#e5e5e5",
      ink: "#1a1a1a",
      onInk: "#ffffff",
      ...BASE_RADIUS,
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Dark mode with mint accent — modern SaaS and tech feel.",
    swatches: ["#030303", "#111111", "#40edc3", "#e5e5e5"],
    theme: {
      primary: "#40edc3",
      onPrimary: "#030303",
      background: "#030303",
      surface: "#111111",
      text: "#e5e5e5",
      muted: "#9ca3af",
      border: "#262626",
      ink: "#111111",
      onInk: "#ffffff",
      ...BASE_RADIUS,
    },
  },
];

/** Map niche → recommended template (user can override). */
export function suggestTemplateId(niche: string | undefined, nicheCustom?: string): TemplateId {
  const key = niche === "other" ? nicheCustom?.toLowerCase() || "" : niche || "";
  if (key.includes("local") || niche === "local-business") return "local";
  if (key.includes("saas") || key.includes("software") || niche === "saas-software") return "saas";
  if (
    key.includes("ecommerce") ||
    key.includes("e-commerce") ||
    key.includes("shop") ||
    key.includes("store") ||
    key.includes("retail") ||
    niche === "ecommerce"
  ) {
    return "ecommerce";
  }
  return "niche-template";
}

/** Pick 4 design presets — rotate based on niche hash for variety. */
export function suggestDesignSystems(niche: string | undefined): DesignSystemPreset[] {
  const idx = NICHE_OPTIONS.findIndex((n) => n.value === niche);
  const offset = idx >= 0 ? idx : 0;
  const rotated = [
    ...DESIGN_SYSTEM_PRESETS.slice(offset % DESIGN_SYSTEM_PRESETS.length),
    ...DESIGN_SYSTEM_PRESETS.slice(0, offset % DESIGN_SYSTEM_PRESETS.length),
  ];
  return rotated.slice(0, 4);
}

export function getNicheLabel(niche: string | undefined, nicheCustom?: string): string {
  if (!niche) return nicheCustom || "this topic";
  if (niche === "other") return nicheCustom || "this topic";
  return NICHE_OPTIONS.find((n) => n.value === niche)?.label || niche;
}

/**
 * Photo / stock-image search context. For ecommerce, prefer the store name or
 * custom niche text over the generic "Ecommerce / Online Store" label so
 * Pexels/Picsum seeds match the product (e.g. mugs, not lighthouses).
 */
export function getPhotoSearchNiche(draft: {
  niche?: string;
  nicheCustom?: string;
  siteName?: string;
}): string {
  const custom = draft.nicheCustom?.trim();
  const site = draft.siteName?.trim();
  if (draft.niche === "ecommerce" || draft.niche === "other") {
    if (custom) return custom;
    if (site) return site;
    return "retail product store";
  }
  const label = getNicheLabel(draft.niche, draft.nicheCustom);
  if (site && label) return `${site} ${label}`;
  return label || site || "business";
}

export function getToneLabel(tone: string | undefined): string {
  return TONE_OPTIONS.find((t) => t.value === tone)?.label || tone || "Professional";
}

export function domainToSlug(domain: string): string {
  const cleaned = domain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];
  const base = cleaned.includes(".") ? cleaned.split(".")[0] : cleaned;
  return base.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60) || "site";
}
