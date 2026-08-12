"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { defaultNicheTheme } from "@/lib/niche-template/theme";
import { IMAGE_SLOTS } from "@/lib/niche-template/images";
import { slugify, type BuilderCategorySchema, DEFAULT_ENABLED_PAGES } from "@/lib/builder/schema";
import type { WorkingDraft } from "@/lib/builder/mergePatch";
import {
  DESIGN_SYSTEM_PRESETS,
  NICHE_OPTIONS,
  TONE_OPTIONS,
  domainToSlug,
  suggestDesignSystems,
  suggestTemplateId,
} from "@/lib/builder/presets";
import { extractLogoColors, paletteToTheme } from "@/lib/builder/logoColors";
import {
  defaultLogoCustomization,
  matchDesignSystemFromPrimary,
  renderFaviconFromCustomization,
  renderLogoFromCustomization,
} from "@/lib/builder/logoCustomization";
import { LogoCustomizer } from "./LogoCustomizer";
import { stockPhotoUrl } from "@/lib/builder/stockPhotos";
import type { ImageSlotKey } from "@/lib/niche-template/images";
import { siteTemplates } from "@/lib/templates";
import type { GenerateImageFn } from "@/lib/builder/imageGenTypes";
import type { ImagePromptContext } from "@/lib/builder/geminiImage";
import type { z } from "zod";

type BuilderCategory = z.infer<typeof BuilderCategorySchema>;

const STEPS = [
  { id: "business", label: "Business" },
  { id: "branding", label: "Branding" },
  { id: "structure", label: "Site structure" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

export interface WizardPanelProps {
  draft: WorkingDraft;
  onChange: (patch: Partial<WorkingDraft>) => void;
  onGenerateImage: GenerateImageFn;
  onGenerateSite?: () => Promise<void>;
  busyKey: string | null;
  generatingSite?: boolean;
  generateProgress?: string;
}

function applyDesignSystem(draft: WorkingDraft, presetId: string): Partial<WorkingDraft> {
  if (presetId === "custom") return { designSystemId: "custom" };
  const preset = DESIGN_SYSTEM_PRESETS.find((p) => p.id === presetId);
  if (!preset) return { designSystemId: presetId };
  // Replace theme wholesale so a previous palette cannot "stick"
  return { designSystemId: presetId, theme: { ...preset.theme } };
}

export function WizardPanel({
  draft,
  onChange,
  onGenerateImage,
  onGenerateSite,
  busyKey,
  generatingSite,
  generateProgress,
}: WizardPanelProps) {
  const [step, setStep] = useState<StepId>("business");
  const [logoMode, setLogoMode] = useState<"upload" | "generate">(draft.hasLogo ? "upload" : "generate");
  const [showLogoCustomizer, setShowLogoCustomizer] = useState(!draft.hasLogo && !!draft.designSystemId);
  const [logoSuggestedPreset, setLogoSuggestedPreset] = useState<string | null>(null);
  const [customThemeOpen, setCustomThemeOpen] = useState(draft.designSystemId === "custom");
  const fileRef = useRef<HTMLInputElement>(null);

  const theme = { ...defaultNicheTheme, ...(draft.theme || {}) };
  const enabled = { ...DEFAULT_ENABLED_PAGES, ...draft.enabledPages };
  const categories: BuilderCategory[] = draft.categories || [];
  const isNicheBlog = (draft.templateId || "niche-template") === "niche-template";

  const suggestedTemplate = useMemo(
    () => suggestTemplateId(draft.niche, draft.nicheCustom),
    [draft.niche, draft.nicheCustom]
  );

  const designSuggestions = useMemo(
    () => suggestDesignSystems(draft.niche),
    [draft.niche]
  );

  const imgCtx: ImagePromptContext = {
    siteName: draft.siteName || "My Site",
    niche: draft.niche,
    tone: draft.tone,
    primaryColor: theme.primary,
  };

  const updateDomain = useCallback(
    (domain: string) => {
      onChange({ domain, slug: domainToSlug(domain) || draft.slug });
    },
    [draft.slug, onChange]
  );

  const updateSiteName = useCallback(
    (siteName: string) => {
      const patch: Partial<WorkingDraft> = { siteName };
      if (!draft.domain && !draft.slug) {
        patch.slug = slugify(siteName);
        patch.domain = `${slugify(siteName)}.com`;
      }
      onChange(patch);
    },
    [draft.domain, draft.slug, onChange]
  );

  async function handleLogoUpload(file: File) {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      try {
        const palette = await extractLogoColors(dataUrl);
        const themePatch = paletteToTheme(palette);
        const matched = matchDesignSystemFromPrimary(palette.primary, DESIGN_SYSTEM_PRESETS);
        setLogoSuggestedPreset(matched);
        const favicon = renderFaviconFromCustomization(
          defaultLogoCustomization(draft.siteName || "Site", palette.primary)
        );
        onChange({
          logo: dataUrl,
          favicon,
          hasLogo: true,
          designSystemId: "from-logo",
          theme: { ...themePatch },
        });
      } catch {
        // Still apply the uploaded logo even if color extraction fails
        const primary = draft.theme?.primary || defaultNicheTheme.primary;
        onChange({
          logo: dataUrl,
          hasLogo: true,
          designSystemId: "from-logo",
          favicon: renderFaviconFromCustomization(defaultLogoCustomization(draft.siteName || "Site", primary)),
        });
      }
    };
    reader.onerror = () => {
      // no-op — user can retry
    };
    reader.readAsDataURL(file);
  }

  async function generateFaviconFromTheme(primary?: string) {
    const color = primary || theme.primary;
    try {
      const result = await onGenerateImage(
        "favicon",
        { ...imgCtx, label: "favicon", primaryColor: color },
        "image:favicon",
        { localOnly: true }
      );
      onChange({ favicon: result.url });
    } catch {
      // ignore
    }
  }

  function selectDesignSystem(presetId: string) {
    const preset = DESIGN_SYSTEM_PRESETS.find((p) => p.id === presetId);
    const primary = preset?.theme.primary || theme.primary;
    const custom = defaultLogoCustomization(draft.siteName || "My Site", primary);
    const logoUrl = renderLogoFromCustomization(custom);
    const faviconUrl = renderFaviconFromCustomization(custom);
    onChange({
      ...applyDesignSystem(draft, presetId),
      logoCustomization: custom,
      logo: logoUrl,
      favicon: faviconUrl,
      hasLogo: false,
    });
    setShowLogoCustomizer(true);
  }

  function applyLogoCustomization(logoUrl: string, faviconUrl: string) {
    onChange({ logo: logoUrl, favicon: faviconUrl, logoCustomization: draft.logoCustomization, hasLogo: false });
  }

  async function addStockHero() {
    const url = stockPhotoUrl(draft.siteName || "hero", draft.niche, "hero" as ImageSlotKey);
    onChange({
      templateImages: { ...draft.templateImages, hero: url, heroBackground: url },
      hero: { ...draft.hero, background: url },
    });
  }

  function setCategory(i: number, patch: Partial<BuilderCategory>) {
    const next = categories.slice();
    next[i] = { ...next[i], ...patch };
    onChange({ categories: next });
  }

  function addCategory() {
    onChange({ categories: [...categories, { label: `Topic ${categories.length + 1}` }] });
  }

  function removeCategory(i: number) {
    onChange({ categories: categories.filter((_, idx) => idx !== i) });
  }

  function togglePage(key: keyof typeof DEFAULT_ENABLED_PAGES) {
    onChange({ enabledPages: { ...enabled, [key]: !enabled[key] } });
  }

  function goNext() {
    if (step === "business") setStep("branding");
    else if (step === "branding") setStep("structure");
  }

  function goBack() {
    if (step === "structure") setStep("branding");
    else if (step === "branding") setStep("business");
  }

  return (
    <div className="builder-wizard">
      <nav className="builder-wizard__steps" aria-label="Setup steps">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`builder-wizard__step${step === s.id ? " is-active" : ""}${STEPS.findIndex((x) => x.id === step) > i ? " is-done" : ""}`}
            onClick={() => setStep(s.id)}
          >
            <span className="builder-wizard__step-num">{i + 1}</span>
            {s.label}
          </button>
        ))}
      </nav>

      {step === "business" && (
        <section className="builder-section">
          <h2>Business information</h2>
          <p className="hint">Core facts used to generate your site copy, metadata, and design suggestions.</p>

          <div className="builder-row">
            <div className="builder-field">
              <label>Site name</label>
              <input
                type="text"
                value={draft.siteName || ""}
                onChange={(e) => updateSiteName(e.target.value)}
                placeholder="Home Brew Haven"
              />
            </div>
            <div className="builder-field">
              <label>Domain</label>
              <input
                type="text"
                value={draft.domain || ""}
                onChange={(e) => updateDomain(e.target.value)}
                placeholder="homebrewhaven.com"
              />
              {draft.slug && (
                <span className="hint" style={{ marginTop: 4 }}>
                  Publish path: /{draft.slug}
                </span>
              )}
            </div>
          </div>

          <div className="builder-row">
            <div className="builder-field">
              <label>Niche</label>
              <select
                value={draft.niche || ""}
                onChange={(e) => {
                  const niche = e.target.value;
                  onChange({
                    niche,
                    templateId: suggestTemplateId(niche, draft.nicheCustom),
                  });
                }}
              >
                <option value="">Select a niche…</option>
                {NICHE_OPTIONS.map((n) => (
                  <option key={n.value} value={n.value}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="builder-field">
              <label>Tone</label>
              <select value={draft.tone || "professional"} onChange={(e) => onChange({ tone: e.target.value })}>
                {TONE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {draft.niche === "other" && (
            <div className="builder-field">
              <label>Describe your niche</label>
              <input
                type="text"
                value={draft.nicheCustom || ""}
                onChange={(e) =>
                  onChange({
                    nicheCustom: e.target.value,
                    templateId: suggestTemplateId("other", e.target.value),
                  })
                }
                placeholder="e.g. Vintage vinyl record collecting"
              />
            </div>
          )}

          <div className="builder-field">
            <label>Template</label>
            <p className="hint" style={{ marginBottom: 8 }}>
              {draft.niche
                ? `Suggested for your niche: ${siteTemplates.find((t) => t.id === suggestedTemplate)?.name || suggestedTemplate}`
                : "Choose a layout — niche selection will suggest one automatically."}
            </p>
            <div className="builder-template-grid">
              {siteTemplates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`builder-template-card${(draft.templateId || "niche-template") === t.id ? " is-selected" : ""}`}
                  onClick={() => onChange({ templateId: t.id as WorkingDraft["templateId"] })}
                >
                  <strong>{t.name}</strong>
                  <span>{t.tag}</span>
                  {(draft.templateId || "niche-template") === t.id && draft.niche && t.id === suggestedTemplate && (
                    <em className="builder-template-card__badge">Suggested</em>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="builder-wizard__nav">
            <div />
            <button type="button" className="builder-btn builder-btn--primary" onClick={goNext}>
              Next: Branding
            </button>
          </div>
        </section>
      )}

      {step === "branding" && (
        <section className="builder-section">
          <h2>Branding</h2>
          <p className="hint">
            Upload a logo to extract brand colors, or pick a suggested design system. Meta title and description are
            generated automatically.
          </p>

          <div className="builder-field">
            <label>Logo</label>
            <div className="builder-logo-choice">
              <label className="builder-radio">
                <input
                  type="radio"
                  name="logoMode"
                  checked={logoMode === "upload"}
                  onChange={() => setLogoMode("upload")}
                />
                I have a logo
              </label>
              <label className="builder-radio">
                <input
                  type="radio"
                  name="logoMode"
                  checked={logoMode === "generate"}
                  onChange={() => {
                    setLogoMode("generate");
                    const first = suggestDesignSystems(draft.niche)[0];
                    if (first) {
                      const custom = defaultLogoCustomization(
                        draft.siteName || "My Site",
                        first.theme.primary || "#2d6a3e"
                      );
                      onChange({
                        hasLogo: false,
                        designSystemId: first.id,
                        theme: { ...first.theme },
                        logoCustomization: custom,
                        logo: renderLogoFromCustomization(custom),
                        favicon: renderFaviconFromCustomization(custom),
                      });
                      setShowLogoCustomizer(true);
                    } else {
                      onChange({ hasLogo: false });
                      setShowLogoCustomizer(false);
                    }
                  }}
                />
                No logo yet — generate from brand colors
              </label>
            </div>
          </div>

          {logoMode === "upload" && (
            <div className="builder-field">
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                className="builder-file-input"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleLogoUpload(file);
                }}
              />
              <div className="builder-image-slot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="builder-image-slot__thumb"
                  src={draft.logo || IMAGE_SLOTS.logo.placeholder}
                  alt="Logo preview"
                />
                <div className="builder-image-slot__meta">
                  <strong>Logo</strong>
                  <span>{draft.logo ? "Uploaded — colors extracted" : "PNG, JPG, SVG, or WebP"}</span>
                </div>
                <button type="button" className="builder-btn builder-btn--sm" onClick={() => fileRef.current?.click()}>
                  {draft.logo ? "Replace logo" : "Upload logo"}
                </button>
              </div>
            </div>
          )}

          {logoMode === "upload" && logoSuggestedPreset && (
            <p className="hint builder-notice">
              Suggested design system from your logo:{" "}
              <strong>{DESIGN_SYSTEM_PRESETS.find((p) => p.id === logoSuggestedPreset)?.name || logoSuggestedPreset}</strong>
              <button
                type="button"
                className="builder-btn builder-btn--sm"
                style={{ marginLeft: 8 }}
                onClick={() => {
                  const patch = applyDesignSystem(draft, logoSuggestedPreset);
                  onChange(patch);
                }}
              >
                Apply palette
              </button>
            </p>
          )}

          {logoMode === "generate" && (
            <>
              <p className="hint">Pick one of four palettes suggested from your business information.</p>
              <div className="builder-design-grid">
                {designSuggestions.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`builder-design-card${draft.designSystemId === preset.id ? " is-selected" : ""}`}
                    onClick={() => selectDesignSystem(preset.id)}
                  >
                    <div className="builder-design-card__swatches">
                      {preset.swatches.map((c) => (
                        <span key={c} style={{ background: c }} />
                      ))}
                    </div>
                    <strong>{preset.name}</strong>
                    <span>{preset.description}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="builder-field" style={{ marginTop: 16 }}>
            <button
              type="button"
              className="builder-btn builder-btn--ghost builder-btn--sm"
              onClick={() => setCustomThemeOpen((v) => !v)}
            >
              {customThemeOpen ? "Hide custom colors" : "Custom design system"}
            </button>
          </div>

          {(customThemeOpen || draft.designSystemId === "custom") && (
            <div className="builder-row">
              {(["primary", "background", "text", "surface", "ink"] as const).map((key) => (
                <div className="builder-field" key={key}>
                  <label>{key}</label>
                  <div className="builder-color-row">
                    <input
                      type="color"
                      value={theme[key]}
                      onChange={(e) =>
                        onChange({ designSystemId: "custom", theme: { ...draft.theme, [key]: e.target.value } })
                      }
                    />
                    <span>{theme[key]}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {logoMode === "generate" && showLogoCustomizer && draft.siteName && (
            <div className="builder-field" style={{ marginTop: 16 }}>
              <label>Customize generated logo</label>
              <LogoCustomizer
                siteName={draft.siteName}
                customization={
                  draft.logoCustomization ||
                  defaultLogoCustomization(draft.siteName, theme.primary)
                }
                onChange={(custom) => onChange({ logoCustomization: custom })}
                onApply={applyLogoCustomization}
              />
            </div>
          )}

          <div className="builder-field">
            <label>Site images</label>
            <p className="hint">Hero and section images use free stock photos for now.</p>
            <button type="button" className="builder-btn builder-btn--sm" onClick={() => void addStockHero()}>
              Add hero stock photo
            </button>
            {(draft.templateImages?.hero || draft.hero?.background) && (
              <span className="hint" style={{ display: "block", marginTop: 8 }}>
                Hero image set
              </span>
            )}
          </div>

          <div className="builder-image-slot" style={{ marginTop: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="builder-image-slot__thumb"
              src={draft.favicon || IMAGE_SLOTS.favicon.placeholder}
              alt="Favicon"
            />
            <div className="builder-image-slot__meta">
              <strong>Favicon</strong>
              <span>Auto-generated from brand colors</span>
            </div>
            <button
              type="button"
              className="builder-btn builder-btn--sm"
              disabled={busyKey === "image:favicon"}
              onClick={() => void generateFaviconFromTheme()}
            >
              {busyKey === "image:favicon" ? "Generating…" : "Regenerate favicon"}
            </button>
          </div>

          <div className="builder-wizard__nav">
            <button type="button" className="builder-btn builder-btn--ghost" onClick={goBack}>
              Back
            </button>
            <button type="button" className="builder-btn builder-btn--primary" onClick={goNext}>
              Next: Site structure
            </button>
          </div>
        </section>
      )}

      {step === "structure" && (
        <section className="builder-section">
          <h2>Site structure</h2>
          <p className="hint">Choose which pages to generate. Header navigation uses your categories (niche blog).</p>

          <div className="builder-field">
            <label>Pages to generate</label>
            <div className="builder-checkbox-grid">
              {(
                [
                  ["about", "About"],
                  ["faq", "FAQ"],
                  ["privacy", "Privacy Policy"],
                  ["terms", "Terms & Conditions"],
                  ["contact", "Contact"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="builder-checkbox">
                  <input type="checkbox" checked={enabled[key]} onChange={() => togglePage(key)} />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {isNicheBlog && (
            <div className="builder-field">
              <div className="builder-section__head">
                <label style={{ marginBottom: 0 }}>Categories (header nav)</label>
                <button type="button" className="builder-btn builder-btn--sm" onClick={addCategory}>
                  + Add category
                </button>
              </div>
              <p className="hint">Optional — 2–4 topics appear in the header and as homepage tiles.</p>
              <div className="builder-card-list">
                {categories.map((cat, i) => (
                  <div className="builder-card builder-card--compact" key={i}>
                    <button
                      className="builder-card__remove"
                      onClick={() => removeCategory(i)}
                      aria-label="Remove category"
                      type="button"
                    >
                      ×
                    </button>
                    <input
                      type="text"
                      value={cat.label}
                      onChange={(e) => setCategory(i, { label: e.target.value })}
                      placeholder="Topic name"
                    />
                  </div>
                ))}
                {categories.length === 0 && (
                  <p className="hint">No categories — a default &quot;Getting Started&quot; section will be used.</p>
                )}
              </div>
            </div>
          )}

          {!isNicheBlog && (
            <p className="hint builder-notice">
              Categories apply to the Niche Blog template. Switch templates in Business information to configure blog
              categories.
            </p>
          )}

          <div className="builder-wizard__nav">
            <button type="button" className="builder-btn builder-btn--ghost" onClick={goBack}>
              Back
            </button>
            <div className="builder-inline-actions">
              {onGenerateSite && (
                <button
                  type="button"
                  className="builder-btn builder-btn--primary"
                  disabled={!!generatingSite || !draft.siteName}
                  onClick={() => void onGenerateSite()}
                >
                  {generatingSite ? "Generating…" : "Generate site content"}
                </button>
              )}
              {generateProgress && <span className="hint">{generateProgress}</span>}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
