import type { NicheTemplateContent } from "@/lib/niche-template/content";

const base = "/pet-grooming";

/**
 * Pet Grooming Guide content. Replace every placeholder string/path below with
 * real copy and real image files (see IMAGE SLOTS in
 * src/lib/niche-template/images.ts for exact dimensions per field).
 *
 * Real images go in public/pet-grooming/images/ — just point these fields at
 * /pet-grooming/images/whatever.jpg instead of the *-placeholder.svg paths.
 */
export const PetGroomingContent: NicheTemplateContent = {
  siteName: "Pet Grooming Guide",
  siteBase: base,
  metadata: {
    title: "Pet Grooming Guide",
    description: "TODO: one-sentence description of Pet Grooming Guide for SEO.",
  },

  // 320x88 — swap for /pet-grooming/images/logo.png once you have a real logo
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
    title: "Welcome To Pet Grooming Guide",
    subtitle: "TODO: one-line pitch for the homepage hero.",
    button: "Start Here",
    href: `${base}/category/category-one`,
    // 1600x800 — swap for /pet-grooming/images/hero.jpg
    background: "/niche-template/images/hero-placeholder.svg",
  },

  categoryTiles: [
    {
      label: "Category One",
      href: `${base}/category/category-one`,
      // 640x640 — swap for /pet-grooming/images/category-one.jpg
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
      // 1600x480 — swap for /pet-grooming/images/category-one-banner.jpg
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
      // 800x500 — swap for /pet-grooming/images/articles/article-1.jpg
      image: "/niche-template/images/thumbnail-placeholder.svg",
      slug: "todo-real-article-title",
      category: "category-one",
      content: [
        "TODO: first paragraph of the full article body.",
        "TODO: second paragraph.",
      ],
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
    copyright: "© Pet Grooming Guide. All rights reserved.",
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
