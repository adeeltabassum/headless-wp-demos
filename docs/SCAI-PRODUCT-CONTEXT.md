# SCAI Studio — Product Context for AI Assistants

> **Purpose of this doc:** Give another AI full context on what we're building, how it works today, and where we need help. Read this before suggesting architecture or workflow changes.

---

## What we're building

**SCAI (SEO Content AI)** is a Next.js app that helps one person spin up niche websites fast.

We are **not** building a page builder where users drag blocks around. We **are** building:

1. **Reusable templates** (fixed HTML/CSS skeletons)
2. **A configuration wizard** (business info, branding, site structure)
3. **AI + stock assets** to fill in text and images
4. **One-click publish** to GitHub (PR) and Vercel

**Mental model:** The template skeleton stays the same. Users configure; the system generates values (copy, colors, images, meta tags).

---

## Live URLs (local dev)

| Route | What it is |
|-------|------------|
| `/` | SCAI home |
| `/templates` | Template library (3 templates) |
| `/studio` | Site builder wizard + live preview |
| `/studio/sites` | List of saved/published drafts |
| `/niche-template` | Master niche blog demo |
| `/local` | Local business demo |
| `/saas` | SAAS landing demo |

**Repo:** `headless-wp-demos` on GitHub · **Stack:** Next.js 16, React 19, TypeScript, Zod, Tailwind/SCAI design system

---

## The 3 templates

| ID | Name | Use case | Builder support |
|----|------|----------|-----------------|
| `niche-template` | Niche Blog (Master) | AI-generated niche blogs | **Best** — full preview, publish, content gen |
| `local` | Flat Bid Moving | Local service businesses | Preview + publish; body copy mostly template defaults |
| `saas` | SAAS Template | Software landing pages | Preview + publish; header/hero branded; rest is template defaults |

Templates are listed at `/templates`. Old `/demos` redirects to `/templates`.

---

## Studio wizard (current UX)

Chat was **removed**. Studio is a **3-step wizard** + **live preview** side-by-side.

### Step 1 — Business information

User fills:

- **Site name** (text)
- **Domain** (e.g. `mybrand.com` → publish slug derived from it)
- **Niche** (dropdown from preset list + "Other" for custom)
- **Tone** (dropdown only: Professional, Friendly, etc.)
- **Template** (picker; auto-suggested from niche, user can override)

**Not user inputs:** meta title, meta description, hero copy, page body text — these are **outputs** generated later.

### Step 2 — Branding

Two paths:

**A) User has a logo**
1. Upload logo
2. Extract brand colors (client-side)
3. Suggest matching design system
4. Auto-generate favicon

**B) No logo**
1. Pick one of 4 suggested design systems (based on niche)
2. Auto-generate favicon
3. Open **logo customizer** — recommended SVG logo with:
   - Per-word text colors
   - Icon + favicon color controls
   - "Apply logo & favicon"

Also: hero stock photo button (Picsum), optional custom color pickers.

### Step 3 — Site structure

- **Page toggles:** About, FAQ, Privacy, Terms, Contact (checkboxes — not text editors)
- **Categories** (niche blog only): optional topic names for header nav
- **"Generate site content"** button — runs the content orchestrator (see below)

Then: **Publish** (top bar) opens a GitHub PR with generated site files.

---

## Core data: `BuilderDraft`

The wizard edits a `BuilderDraft` object (see `src/lib/builder/schema.ts`).

**User configures:**
```
siteName, domain, slug, templateId, niche, nicheCustom, tone
designSystemId, theme (colors), logo, favicon, logoCustomization
enabledPages { about, faq, privacy, terms, contact }
categories[] (niche blog)
```

**System generates / fills:**
```
description (meta), hero, sidebar, footer, pages.*, articles[]
templateImages { hero, services, gallery }
```

Drafts persist in **localStorage** (`src/lib/builder/draftStorage.ts`).

---

## How content flows (the pipeline)

```
BuilderDraft (wizard config)
        ↓
   derive*() functions          ← expand config into full template content
        ↓
   Live Preview                 ← real template components, not mockups
        ↓
   generateSiteContent()        ← optional: AI text + stock images (sequential)
        ↓
   Publish API                   ← validate, write files, GitHub PR
```

### Derive (always runs for preview/publish)

| Template | File |
|----------|------|
| Niche blog | `src/lib/builder/derive.ts` |
| Local | `src/lib/builder/deriveLocal.ts` |
| SAAS | `src/lib/builder/deriveSaas.ts` |

Derive fills in defaults for anything missing: nav links, hero text, meta tags, footer, enabled static pages, etc.

### Generate site content (manual button, sequential)

File: `src/lib/builder/generateSiteContent.ts`

Calls `/api/builder/generate-section` **one section at a time** (not parallel):

1. Logo SVG (if no upload)
2. Hero copy
3. Sidebar
4. Footer
5. Each enabled static page
6. Per category: description + 3 articles (niche blog only)
7. Stock images (Picsum — instant, no API)

**Important:** ~16+ Gemini calls for a full niche blog with 4 categories + all pages. Free tier can 429. Failed sections are skipped silently (partial content).

### Publish

File: `src/app/api/builder/publish/route.ts`

1. Validate `BuilderDraft` with Zod
2. Check slug uniqueness
3. Branch by `templateId`:
   - `niche-template` → `generateSiteFiles.ts` (routes + content.ts + theme.ts)
   - `local` → `generateLocalSiteFiles.ts`
   - `saas` → `generateSaasSiteFiles.ts`
4. Extract inline images (data URLs) to `public/{slug}/images/`
5. Commit to GitHub branch + open PR (if `GITHUB_TOKEN` set)
6. Dry-run mode if no GitHub creds (validates files only)

Published sites live at `src/app/{slug}/` and `src/lib/sites/{slug}/`.

---

## AI endpoints

| Endpoint | Purpose |
|----------|---------|
| `POST /api/builder/generate-section` | One section of copy (hero, page, articles, etc.) |
| `POST /api/builder/generate-image` | Gemini image OR fallback SVG/stock |
| `POST /api/builder/publish` | Validate + scaffold + GitHub PR |
| `POST /api/builder/chat` | **Legacy** — chat UI removed, API still exists |

**LLM:** Google Gemini via `src/lib/builder/llm.ts`  
**No API key:** `src/lib/builder/mock.ts` returns placeholder copy tagged `[Mock mode...]`

**Section keys** (niche blog): `hero`, `sidebar`, `footer`, `page`, `categoryDescription`, `articles`

---

## Images

| Type | How |
|------|-----|
| Logo / favicon | SVG generated locally (`localSvgAssets.ts`) or uploaded |
| Hero, categories, articles | Picsum stock photos (`stockPhotos.ts`) — stable seed per label |
| AI photos | Gemini via generate-image (quota limited; often falls back to stock/SVG) |

Image slots defined in `src/lib/niche-template/images.ts` (niche template only today).

---

## Preview system

`TemplatePreviewPanel` routes to:

- `PreviewPanel` — niche blog (in-panel router, links work before publish)
- `LocalPreviewPanel` — local business via `LocalContentProvider`
- `SaasPreviewPanel` — SAAS via `SaasPreviewProvider`

Preview uses the **same production components** as published sites, fed by derived content from the draft.

---

## Key folders (quick map)

```
site/
├── src/app/studio/              Studio pages
├── src/app/templates/           Template library
├── src/app/api/builder/         Builder APIs
├── src/components/studio/       WizardPanel, StudioApp, previews, LogoCustomizer
├── src/components/niche-template/   Master blog components
├── src/components/local/        Local business components (+ LocalContentProvider)
├── src/components/saas/         SAAS components (+ SaasPreviewProvider)
├── src/lib/builder/             Schema, derive, generate, publish, presets, LLM
├── src/lib/templates.ts         Template registry (3 entries)
├── src/lib/sites/               Published site content (per slug)
└── src/styles/scai/             Design system (studio + gallery)
```

---

## Environment variables

```env
GEMINI_API_KEY=           # AI text + images (optional — mock mode without it)
GITHUB_TOKEN=             # Publish PRs
GITHUB_REPO=              # owner/repo
BUILDER_ACCESS_PASSWORD=  # Optional gate on /studio (unset = open)
VERCEL_*                  # Optional deploy polling
```

---

## Design principles (product decisions)

1. **Configure, don't author** — users pick from lists; system writes copy
2. **Fixed skeleton, variable values** — HTML/CSS structure doesn't change per site
3. **Templates over one-offs** — we ship reusable layouts, not custom builds per client
4. **Minimal typing** — dropdowns for niche/tone; checkboxes for pages
5. **Outputs not inputs** — meta, hero, page bodies are generated
6. **Stock images first** — reliable and free; AI images are bonus
7. **Sequential generation** — simpler but slow; rate limits are a known pain point

---

## What's working today

- 3-step wizard with live preview for all 3 templates
- Logo upload → color extract → design system suggestion
- Logo customizer (per-word colors, favicon colors)
- Generate site content (niche blog gets the most)
- Publish niche blog + local + saas to GitHub PR
- Template library at `/templates`
- Draft persistence in localStorage

---

## Known gaps (where we need help)

These are the areas another AI should focus on if improving workflow:

| Gap | Detail |
|-----|--------|
| **Not auto-generate** | User must click "Generate site content" — nothing runs on wizard complete |
| **Sequential + silent failures** | Many Gemini calls in a row; 429 = missing sections with no clear error |
| **Local/SAAS content gen** | No AI sections for services, FAQ items, pricing, testimonials — template defaults remain |
| **SAAS components** | Most sections still hardcoded Lorem; only header/hero use derived content |
| **No structured content blocks** | Pages stored as flat strings, not typed blocks (headings, FAQ pairs, lists) |
| **Chat API orphaned** | `/api/builder/chat` exists but UI removed — may return for v2 |
| **Tag pages** | Not generated on publish for niche blog |
| **Rate limits** | Free Gemini tier blocks full one-click generation |

---

## Ideal future workflow (product vision)

This is what we're aiming toward — use this when proposing improvements:

1. User completes wizard (3 steps, minimal input)
2. **One "Generate site" action** runs everything with progress UI
3. Meta, hero, pages, categories, articles all populate automatically
4. Stock images applied per slot
5. Live preview updates in real time
6. User reviews → Publish
7. Same flow works equally for all 3 templates

---

## End-to-end user journey (today)

```
Visit /studio
  → Step 1: site name, domain, niche, tone, template
  → Step 2: logo OR design system → customize logo → hero stock photo
  → Step 3: toggle pages, add categories (if blog)
  → Click "Generate site content" (optional but recommended)
  → Check live preview
  → Click Publish
  → GitHub PR created → merge → site live at /{slug}
```

---

## How to help us (instructions for the AI reading this)

When suggesting changes:

1. **Respect the configure-not-author model** — don't propose free-text editors for page content
2. **Keep templates as fixed skeletons** — generation fills values, not structure
3. **Prefer finite choices** (dropdowns, presets, checkboxes) over open text fields
4. **Be practical about Gemini limits** — batch, parallelize, or queue generation thoughtfully
5. **Point to real files** in `src/lib/builder/` and `src/components/studio/` when proposing code changes
6. **Don't over-engineer** — solo developer, need shippable increments

Good questions to ask us:
- Should generation auto-run after step 3, or stay manual?
- Should Local/SAAS get their own section schemas in `sections.ts`?
- Should we move from flat page strings to structured content blocks?
- How should we handle 429 errors (retry UI, queue, partial success banner)?

---

## Version note

This doc reflects the codebase as of **August 2026**. Studio uses the wizard (not chat). Template library has 3 templates. ChatPanel exists in code but is not mounted in StudioApp.

If something in the repo contradicts this doc, **trust the code** — especially `schema.ts`, `WizardPanel.tsx`, and `generateSiteContent.ts`.
