"use client";

import { defaultNicheTheme } from "@/lib/niche-template/theme";
import { IMAGE_SLOTS, type ImageSlotKey } from "@/lib/niche-template/images";
import { slugify, type BuilderCategorySchema, type BuilderArticleSchema } from "@/lib/builder/schema";
import type { WorkingDraft } from "@/lib/builder/mergePatch";
import type { SectionContext, SectionKey } from "@/lib/builder/sections";
import type { ImagePromptContext } from "@/lib/builder/geminiImage";
import type { GenerateImageFn } from "@/lib/builder/imageGenTypes";
import type { z } from "zod";

type BuilderCategory = z.infer<typeof BuilderCategorySchema>;
type BuilderArticle = z.infer<typeof BuilderArticleSchema>;

export interface DraftPanelProps {
  draft: WorkingDraft;
  onChange: (patch: Partial<WorkingDraft>) => void;
  onGenerateSection: (
    section: SectionKey,
    context: SectionContext,
    busyKey: string
  ) => Promise<Record<string, unknown> | null>;
  onGenerateImage: GenerateImageFn;
  onGenerateAllImages: () => Promise<void>;
  busyKey: string | null;
  allImagesBusy?: boolean;
}

function AiButton({
  label,
  busy,
  disabled,
  onClick,
}: {
  label: string;
  busy: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="builder-btn builder-btn--sm"
      disabled={busy || disabled}
      onClick={onClick}
    >
      {busy ? "Generating…" : label}
    </button>
  );
}

function ImageSlotRow({
  slotKey,
  currentUrl,
  label,
  busy,
  onGenerate,
  onGenerateSvg,
  onGenerateStock,
  svgButtonLabel,
  stockButtonLabel,
}: {
  slotKey: ImageSlotKey;
  currentUrl?: string;
  label: string;
  busy: boolean;
  onGenerate: () => void;
  onGenerateSvg?: () => void;
  onGenerateStock?: () => void;
  svgButtonLabel?: string;
  stockButtonLabel?: string;
}) {
  const slot = IMAGE_SLOTS[slotKey];
  return (
    <div className="builder-image-slot">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="builder-image-slot__thumb" src={currentUrl || slot.placeholder} alt={label} />
      <div className="builder-image-slot__meta">
        <strong>{label}</strong>
        <span>
          {slot.width}×{slot.height}px
        </span>
      </div>
      <div className="builder-inline-actions" style={{ marginTop: 0 }}>
        <AiButton label={currentUrl ? "Regenerate" : "Generate"} busy={busy} onClick={onGenerate} />
        {onGenerateStock && (
          <AiButton label={stockButtonLabel || "Stock photo"} busy={busy} onClick={onGenerateStock} />
        )}
        {onGenerateSvg && (
          <AiButton label={svgButtonLabel || "SVG"} busy={busy} onClick={onGenerateSvg} />
        )}
      </div>
    </div>
  );
}

export function DraftPanel({
  draft,
  onChange,
  onGenerateSection,
  onGenerateImage,
  onGenerateAllImages,
  busyKey,
  allImagesBusy,
}: DraftPanelProps) {
  const theme = { ...defaultNicheTheme, ...(draft.theme || {}) };
  const baseCtx: SectionContext = { siteName: draft.siteName || "My Site", niche: draft.niche, tone: draft.tone };
  const imgCtx: ImagePromptContext = {
    siteName: draft.siteName || "My Site",
    niche: draft.niche,
    tone: draft.tone,
    primaryColor: theme.primary,
  };

  const categories: BuilderCategory[] = draft.categories || [];
  const articles: BuilderArticle[] = draft.articles || [];

  function setCategory(i: number, patch: Partial<BuilderCategory>) {
    const next = categories.slice();
    next[i] = { ...next[i], ...patch };
    onChange({ categories: next });
  }
  function addCategory() {
    onChange({ categories: [...categories, { label: "New Category" }] });
  }
  function removeCategory(i: number) {
    onChange({ categories: categories.filter((_, idx) => idx !== i) });
  }

  function setArticle(i: number, patch: Partial<BuilderArticle>) {
    const next = articles.slice();
    next[i] = { ...next[i], ...patch };
    onChange({ articles: next });
  }
  function addArticle(category?: string) {
    onChange({ articles: [...articles, { title: "New Article", category: category || categories[0]?.label || "" }] });
  }
  function removeArticle(i: number) {
    onChange({ articles: articles.filter((_, idx) => idx !== i) });
  }

  async function draftHero() {
    const data = await onGenerateSection("hero", baseCtx, "hero");
    if (!data) return;
    onChange({ hero: { ...draft.hero, title: data.title as string, subtitle: data.subtitle as string, button: data.button as string } });
  }

  async function draftSidebar() {
    const data = await onGenerateSection("sidebar", baseCtx, "sidebar");
    if (!data) return;
    onChange({ sidebar: { ...draft.sidebar, about: data.about as string, legal: data.legal as string, tags: data.tags as string[] } });
  }

  async function draftFooter() {
    const data = await onGenerateSection("footer", baseCtx, "footer");
    if (!data) return;
    onChange({ footer: { ...draft.footer, newsletterText: data.newsletterText as string, copyright: data.copyright as string } });
  }

  async function draftCategoryDescription(i: number) {
    const data = await onGenerateSection("categoryDescription", { ...baseCtx, label: categories[i].label }, `catdesc:${i}`);
    if (!data) return;
    setCategory(i, { description: data.description as string });
  }

  async function draftPage(key: "about" | "faq" | "privacy" | "terms" | "contactIntro") {
    const data = await onGenerateSection("page", { ...baseCtx, pageKey: key }, `page:${key}`);
    if (!data) return;
    if (Array.isArray(data.blocks)) {
      onChange({ pages: { ...draft.pages, [key]: { blocks: data.blocks as never } } });
    } else if (typeof data.text === "string") {
      onChange({ pages: { ...draft.pages, [key]: data.text } });
    }
  }

  async function draftArticlesForCategory(categoryLabel: string) {
    const data = await onGenerateSection("articles", { ...baseCtx, categoryLabel, count: 3 }, `articles:${categoryLabel}`);
    if (!data) return;
    const generated = (
      data.articles as Array<{
        title: string;
        excerpt: string;
        blocks?: unknown[];
        content?: string[];
      }>
    ).map((a) => ({
      title: a.title,
      excerpt: a.excerpt,
      blocks: a.blocks as never,
      content: a.content,
      category: categoryLabel,
      slug: slugify(a.title),
    }));
    onChange({ articles: [...articles.filter((a) => a.category !== categoryLabel), ...generated] });
  }

  async function generateImage(
    slot: ImageSlotKey,
    label: string,
    busyKey: string,
    apply: (url: string) => void,
    options?: { localOnly?: boolean }
  ) {
    try {
      const result = await onGenerateImage(slot, { ...imgCtx, label }, busyKey, options);
      apply(result.url);
    } catch {
      // StudioApp surfaces the error in the image status banner
    }
  }

  return (
    <div className="builder-draft">
      <section className="builder-section">
        <h2>Basics</h2>
        <p className="hint">The core facts every other section is generated from.</p>
        <div className="builder-row">
          <div className="builder-field">
            <label>Site name</label>
            <input
              type="text"
              value={draft.siteName || ""}
              onChange={(e) => onChange({ siteName: e.target.value, slug: draft.slug || slugify(e.target.value) })}
              placeholder="Home Brew Haven"
            />
          </div>
          <div className="builder-field">
            <label>URL slug</label>
            <input
              type="text"
              value={draft.slug || ""}
              onChange={(e) => onChange({ slug: slugify(e.target.value) })}
              placeholder="home-brew-haven"
            />
          </div>
        </div>
        <div className="builder-field">
          <label>Niche / what it&apos;s about</label>
          <input
            type="text"
            value={draft.niche || ""}
            onChange={(e) => onChange({ niche: e.target.value })}
            placeholder="Home coffee brewing gear and techniques"
          />
        </div>
        <div className="builder-row">
          <div className="builder-field">
            <label>Tone</label>
            <input
              type="text"
              value={draft.tone || ""}
              onChange={(e) => onChange({ tone: e.target.value })}
              placeholder="Friendly and expert"
            />
          </div>
          <div className="builder-field">
            <label>SEO description</label>
            <input
              type="text"
              value={draft.description || ""}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="One sentence for search engines"
            />
          </div>
        </div>
      </section>

      <section className="builder-section">
        <div className="builder-section__head">
          <h2>Branding</h2>
          <AiButton
            label="Generate all images"
            busy={!!allImagesBusy}
            disabled={!draft.siteName}
            onClick={() => void onGenerateAllImages()}
          />
        </div>
        <p className="hint">
          Colors and font — every component reads these. Logo/favicon use instant SVG. Photos: use <strong>Stock photo</strong> (free, instant) or <strong>Generate</strong> (Gemini AI).
        </p>
        <div className="builder-row">
          {(["primary", "background", "text", "surface", "ink"] as const).map((key) => (
            <div className="builder-field" key={key}>
              <label>{key}</label>
              <div className="builder-color-row">
                <input
                  type="color"
                  value={theme[key]}
                  onChange={(e) => onChange({ theme: { ...draft.theme, [key]: e.target.value } })}
                />
                <span>{theme[key]}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="builder-row">
          <div className="builder-field">
            <label>Body font (CSS font-family)</label>
            <select
              value={theme.fontBody}
              onChange={(e) => onChange({ theme: { ...draft.theme, fontBody: e.target.value } })}
            >
              <option value={defaultNicheTheme.fontBody}>System default</option>
              <option value="'Inter', -apple-system, sans-serif">Inter</option>
              <option value="'Poppins', -apple-system, sans-serif">Poppins</option>
              <option value="'Merriweather', Georgia, serif">Merriweather (serif)</option>
              <option value="'Playfair Display', Georgia, serif">Playfair Display (serif)</option>
            </select>
          </div>
          <div className="builder-field">
            <label>Corner rounding</label>
            <select
              value={theme.radiusMd}
              onChange={(e) => {
                const scale: Record<string, [string, string, string]> = {
                  "0px": ["0px", "0px", "0px"],
                  "8px": ["4px", "8px", "12px"],
                  "16px": ["8px", "16px", "24px"],
                };
                const [sm, md, lg] = scale[e.target.value] || scale["8px"];
                onChange({ theme: { ...draft.theme, radiusSm: sm, radiusMd: md, radiusLg: lg } });
              }}
            >
              <option value="0px">Sharp</option>
              <option value="8px">Rounded</option>
              <option value="16px">Very rounded</option>
            </select>
          </div>
        </div>
        <div className="builder-image-slot" style={{ marginTop: 10 }}>
          <ImageSlotRow
            slotKey="logo"
            currentUrl={draft.logo}
            label="Logo"
            busy={busyKey === "image:logo"}
            onGenerate={() => generateImage("logo", "logo", "image:logo", (url) => onChange({ logo: url }))}
            onGenerateSvg={() =>
              generateImage("logo", "logo", "image:logo", (url) => onChange({ logo: url }), { localOnly: true })
            }
            svgButtonLabel="SVG logo"
          />
        </div>
        <div className="builder-image-slot" style={{ marginTop: 10 }}>
          <ImageSlotRow
            slotKey="favicon"
            currentUrl={draft.favicon}
            label="Favicon"
            busy={busyKey === "image:favicon"}
            onGenerate={() => generateImage("favicon", "favicon", "image:favicon", (url) => onChange({ favicon: url }))}
            onGenerateSvg={() =>
              generateImage("favicon", "favicon", "image:favicon", (url) => onChange({ favicon: url }), {
                localOnly: true,
              })
            }
            svgButtonLabel="SVG icon"
          />
        </div>
      </section>

      <section className="builder-section">
        <div className="builder-section__head">
          <h2>Hero</h2>
          <AiButton label="Draft with AI" busy={busyKey === "hero"} onClick={draftHero} />
        </div>
        <p className="hint">The big banner at the top of the homepage.</p>
        <div className="builder-field">
          <label>Title</label>
          <input
            type="text"
            value={draft.hero?.title || ""}
            onChange={(e) => onChange({ hero: { ...draft.hero, title: e.target.value } })}
          />
        </div>
        <div className="builder-field">
          <label>Subtitle</label>
          <input
            type="text"
            value={draft.hero?.subtitle || ""}
            onChange={(e) => onChange({ hero: { ...draft.hero, subtitle: e.target.value } })}
          />
        </div>
        <div className="builder-field">
          <label>Button label</label>
          <input
            type="text"
            value={draft.hero?.button || ""}
            onChange={(e) => onChange({ hero: { ...draft.hero, button: e.target.value } })}
          />
        </div>
        <ImageSlotRow
          slotKey="hero"
          currentUrl={draft.hero?.background}
          label="Hero background"
          busy={busyKey === "image:hero"}
          onGenerate={() =>
            generateImage("hero", "hero background", "image:hero", (url) => onChange({ hero: { ...draft.hero, background: url } }))
          }
          onGenerateStock={() =>
            generateImage("hero", "hero background", "image:hero", (url) => onChange({ hero: { ...draft.hero, background: url } }), {
              localOnly: true,
            })
          }
        />
      </section>

      <section className="builder-section">
        <div className="builder-section__head">
          <h2>Categories</h2>
          <button type="button" className="builder-btn builder-btn--sm" onClick={addCategory}>
            + Add category
          </button>
        </div>
        <p className="hint">2-6 main topics. Each becomes a nav link, a homepage tile, and a category page.</p>
        <div className="builder-card-list">
          {categories.map((cat, i) => (
            <div className="builder-card" key={i}>
              <button className="builder-card__remove" onClick={() => removeCategory(i)} aria-label="Remove category">
                ×
              </button>
              <div className="builder-field">
                <label>Label</label>
                <input type="text" value={cat.label} onChange={(e) => setCategory(i, { label: e.target.value })} />
              </div>
              <div className="builder-field">
                <label>Description</label>
                <textarea value={cat.description || ""} onChange={(e) => setCategory(i, { description: e.target.value })} />
              </div>
              <ImageSlotRow
                slotKey="categoryTile"
                currentUrl={cat.background}
                label="Tile image"
                busy={busyKey === `image:tile:${i}`}
                onGenerate={() =>
                  generateImage("categoryTile", cat.label, `image:tile:${i}`, (url) => setCategory(i, { background: url }))
                }
                onGenerateStock={() =>
                  generateImage("categoryTile", cat.label, `image:tile:${i}`, (url) => setCategory(i, { background: url }), {
                    localOnly: true,
                  })
                }
              />
              <div className="builder-inline-actions">
                <AiButton label="Draft description" busy={busyKey === `catdesc:${i}`} onClick={() => draftCategoryDescription(i)} />
                <AiButton
                  label="Draft 3 articles"
                  busy={busyKey === `articles:${cat.label}`}
                  onClick={() => draftArticlesForCategory(cat.label)}
                />
              </div>
            </div>
          ))}
          {categories.length === 0 && <p className="hint">No categories yet — add one, or describe your site in chat.</p>}
        </div>
      </section>

      <section className="builder-section">
        <div className="builder-section__head">
          <h2>Articles ({articles.length})</h2>
          <button type="button" className="builder-btn builder-btn--sm" onClick={() => addArticle()}>
            + Add article
          </button>
        </div>
        <p className="hint">Use &quot;Draft 3 articles&quot; above per category for a quick full batch.</p>
        <div className="builder-card-list">
          {articles.map((art, i) => (
            <div className="builder-card" key={i}>
              <button className="builder-card__remove" onClick={() => removeArticle(i)} aria-label="Remove article">
                ×
              </button>
              <div className="builder-row">
                <div className="builder-field">
                  <label>Title</label>
                  <input type="text" value={art.title} onChange={(e) => setArticle(i, { title: e.target.value })} />
                </div>
                <div className="builder-field">
                  <label>Category</label>
                  <select value={art.category} onChange={(e) => setArticle(i, { category: e.target.value })}>
                    {categories.map((c) => (
                      <option key={c.label} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="builder-field">
                <label>Excerpt</label>
                <textarea value={art.excerpt || ""} onChange={(e) => setArticle(i, { excerpt: e.target.value })} />
              </div>
              <ImageSlotRow
                slotKey="articleThumbnail"
                currentUrl={art.image}
                label="Thumbnail"
                busy={busyKey === `image:thumb:${i}`}
                onGenerate={() =>
                  generateImage("articleThumbnail", art.title, `image:thumb:${i}`, (url) => setArticle(i, { image: url }))
                }
                onGenerateStock={() =>
                  generateImage("articleThumbnail", art.title, `image:thumb:${i}`, (url) => setArticle(i, { image: url }), {
                    localOnly: true,
                  })
                }
              />
            </div>
          ))}
        </div>
      </section>

      <section className="builder-section">
        <div className="builder-section__head">
          <h2>Sidebar</h2>
          <AiButton label="Draft with AI" busy={busyKey === "sidebar"} onClick={draftSidebar} />
        </div>
        <div className="builder-field">
          <label>About blurb</label>
          <textarea value={draft.sidebar?.about || ""} onChange={(e) => onChange({ sidebar: { ...draft.sidebar, about: e.target.value } })} />
        </div>
        <div className="builder-field">
          <label>Legal / disclaimer</label>
          <textarea value={draft.sidebar?.legal || ""} onChange={(e) => onChange({ sidebar: { ...draft.sidebar, legal: e.target.value } })} />
        </div>
        <div className="builder-field">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={(draft.sidebar?.tags || []).join(", ")}
            onChange={(e) =>
              onChange({ sidebar: { ...draft.sidebar, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) } })
            }
          />
        </div>
      </section>

      <section className="builder-section">
        <div className="builder-section__head">
          <h2>Footer</h2>
          <AiButton label="Draft with AI" busy={busyKey === "footer"} onClick={draftFooter} />
        </div>
        <div className="builder-field">
          <label>Newsletter pitch</label>
          <input
            type="text"
            value={draft.footer?.newsletterText || ""}
            onChange={(e) => onChange({ footer: { ...draft.footer, newsletterText: e.target.value } })}
          />
        </div>
        <div className="builder-field">
          <label>Copyright line</label>
          <input
            type="text"
            value={draft.footer?.copyright || ""}
            onChange={(e) => onChange({ footer: { ...draft.footer, copyright: e.target.value } })}
          />
        </div>
      </section>

      <section className="builder-section">
        <h2>Static pages</h2>
        <p className="hint">About, FAQ, Privacy, Terms, and the Contact page intro.</p>
        {(
          [
            ["about", "About"],
            ["faq", "FAQ"],
            ["privacy", "Privacy Policy"],
            ["terms", "Terms and Conditions"],
            ["contactIntro", "Contact intro"],
          ] as const
        ).map(([key, label]) => (
          <div className="builder-field" key={key}>
            <div className="builder-section__head" style={{ marginBottom: 4 }}>
              <label style={{ marginBottom: 0 }}>{label}</label>
              <AiButton label="Draft with AI" busy={busyKey === `page:${key}`} onClick={() => draftPage(key)} />
            </div>
            <textarea
              value={
                typeof draft.pages?.[key] === "string"
                  ? draft.pages[key]
                  : draft.pages?.[key] && typeof draft.pages[key] === "object"
                    ? JSON.stringify((draft.pages[key] as { blocks: unknown }).blocks, null, 2)
                    : ""
              }
              onChange={(e) => onChange({ pages: { ...draft.pages, [key]: e.target.value } })}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
