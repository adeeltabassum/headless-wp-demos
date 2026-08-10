#!/usr/bin/env node
/**
 * Scaffolds a brand-new niche blog site from the master template
 * (src/components/niche-template, src/styles/niche-template).
 *
 * Usage:
 *   npx tsx scripts/scaffold-niche-site.ts --slug pet-grooming --name "Pet Grooming Guide" --primary "#2f7d6b"
 *
 * Creates the same 7 files the /api/builder/publish route creates for a
 * wizard-built site — this CLI and the builder API both call the shared
 * generateAllSiteFiles() in src/lib/builder/generateSiteFiles.ts, so a
 * hand-scaffolded site and an AI-drafted site are wired identically. The
 * only difference is the content: this CLI fills every field with a
 * TODO-flagged placeholder for a developer to replace by hand.
 */
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { generateAllSiteFiles } from "../src/lib/builder/generateSiteFiles";
import { defaultNicheTheme } from "../src/lib/niche-template/theme";
import type { NicheTemplateContent } from "../src/lib/niche-template/content";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function arg(name: string, fallback?: string) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : fallback;
}

const slug = arg("slug");
const siteName = arg("name", slug);
const primary = arg("primary", "#4a4a4a")!;

if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error(
    'Usage: npx tsx scripts/scaffold-niche-site.ts --slug "my-site" --name "My Site" --primary "#2f7d6b"'
  );
  console.error("--slug must be lowercase letters, numbers, and hyphens only.");
  process.exit(1);
}

function write(relPath: string, contents: string) {
  const full = path.join(root, relPath);
  mkdirSync(path.dirname(full), { recursive: true });
  if (existsSync(full)) {
    console.warn(`skip (exists): ${relPath}`);
    return;
  }
  writeFileSync(full, contents);
  console.log(`created: ${relPath}`);
}

const base = `/${slug}`;
const todoContent: NicheTemplateContent = {
  siteName: siteName!,
  siteBase: base,
  metadata: {
    title: siteName!,
    description: `TODO: one-sentence description of ${siteName} for SEO.`,
  },
  logo: "/niche-template/images/logo-placeholder.svg",
  favicon: "/niche-template/images/favicon-placeholder.svg",
  social: [
    { icon: "facebook", label: "Facebook", href: "#" },
    { icon: "instagram", label: "Instagram", href: "#" },
  ],
  nav: [
    { label: "Category One", href: `${base}/category/category-one` },
    { label: "Category Two", href: `${base}/category/category-two` },
  ],
  offcanvas: [
    { label: "FAQ", href: `${base}/page/faq` },
    { label: "Contact", href: `${base}/page/contact` },
  ],
  hero: {
    title: `Welcome To ${siteName}`,
    subtitle: "TODO: one-line pitch for the homepage hero.",
    button: "Start Here",
    href: `${base}/category/category-one`,
    background: "/niche-template/images/hero-placeholder.svg",
  },
  categoryTiles: [
    {
      label: "Category One",
      href: `${base}/category/category-one`,
      background: "/niche-template/images/tile-placeholder.svg",
    },
    {
      label: "Category Two",
      href: `${base}/category/category-two`,
      background: "/niche-template/images/tile-placeholder.svg",
    },
  ],
  categories: [
    {
      label: "Category One",
      slug: "category-one",
      description: "TODO: one-sentence description of this category.",
      background: "/niche-template/images/banner-placeholder.svg",
    },
    {
      label: "Category Two",
      slug: "category-two",
      description: "TODO: one-sentence description of this category.",
      background: "/niche-template/images/banner-placeholder.svg",
    },
  ],
  articles: [
    {
      id: "1",
      title: "TODO: Real Article Title",
      excerpt: "TODO: one or two sentence excerpt shown on listing cards.",
      image: "/niche-template/images/thumbnail-placeholder.svg",
      slug: "todo-real-article-title",
      category: "category-one",
      content: ["TODO: first paragraph of the full article body.", "TODO: second paragraph."],
    },
  ],
  sidebar: {
    about: "TODO: About Us blurb for the sidebar widget.",
    legal: "TODO: legal disclaimer text for the sidebar widget.",
    privacyHref: `${base}/page/privacy-policy`,
    tags: ["Tag One", "Tag Two", "Tag Three"],
  },
  footer: {
    featured: [
      { label: "FAQ", href: `${base}/page/faq` },
      { label: "Contact", href: `${base}/page/contact` },
    ],
    links: [
      { label: "About", href: `${base}/page/about` },
      { label: "Privacy Policy", href: `${base}/page/privacy-policy` },
      { label: "Terms and Conditions", href: `${base}/page/terms` },
    ],
    newsletter: {
      text: "TODO: newsletter signup pitch.",
      placeholder: "Enter your email address",
      submit: "Subscribe",
    },
    copyright: `© ${siteName}. All rights reserved.`,
  },
  pages: [
    {
      slug: "about",
      title: "About",
      bannerTitle: "About",
      description: "TODO: About page description.",
      content: ["TODO: About page body copy."],
    },
    {
      slug: "faq",
      title: "FAQ",
      bannerTitle: "FAQ",
      description: "TODO: FAQ page description.",
      content: ["TODO: Q&A content."],
    },
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      bannerTitle: "Privacy Policy",
      description: "TODO: Privacy policy description.",
      content: ["TODO: Privacy policy body copy."],
    },
    {
      slug: "terms",
      title: "Terms and Conditions",
      bannerTitle: "Terms and Conditions",
      description: "TODO: Terms description.",
      content: ["TODO: Terms body copy."],
    },
    {
      slug: "contact",
      title: "Contact",
      bannerTitle: "Contact",
      description: "TODO: Contact page description.",
      intro: "TODO: intro text inviting visitors to use the form below.",
    },
  ],
};

const theme = { ...defaultNicheTheme, primary, onPrimary: "#ffffff" };

for (const file of generateAllSiteFiles({ slug, content: todoContent, theme, withJsonSidecar: false })) {
  write(file.path, file.contents);
}

const imagesDir = path.join(root, "public", slug, "images");
mkdirSync(imagesDir, { recursive: true });
write(`public/${slug}/images/.gitkeep`, "");

console.log(`\nDone. Preview at http://localhost:3000/${slug}`);
console.log(`Next steps:`);
console.log(`  1. Edit src/lib/sites/${slug}/theme.ts — set real colors/fonts.`);
console.log(`  2. Edit src/lib/sites/${slug}/content.ts — replace every TODO and placeholder image path.`);
console.log(`  3. Drop real images into public/${slug}/images/ at the dimensions in src/lib/niche-template/images.ts.`);
console.log(`\n(Or skip all of this and use the AI builder at /studio instead.)`);
