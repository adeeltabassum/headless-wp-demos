import { IMAGE_SLOTS } from "./images";
import type { NicheTemplateContent } from "./content";

/**
 * Neutral placeholder content for previewing the bare skeleton.
 * No real copy, no real images — every value here is a stand-in that a
 * real site would replace via its own content.ts.
 */

const base = "/niche-template";

const topics = ["Topic One", "Topic Two", "Topic Three", "Topic Four"] as const;

export const nicheTemplateSampleContent: NicheTemplateContent = {
  siteName: "Niche Blog",
  siteBase: base,
  metadata: {
    title: "Niche Blog — Master Template",
    description: "A skeleton niche blog template with no branding applied yet.",
  },
  logo: IMAGE_SLOTS.logo.placeholder,
  favicon: IMAGE_SLOTS.favicon.placeholder,
  social: [
    { icon: "facebook", label: "Facebook", href: "#" },
    { icon: "twitter", label: "Twitter", href: "#" },
    { icon: "youtube", label: "YouTube", href: "#" },
    { icon: "instagram", label: "Instagram", href: "#" },
  ],
  nav: topics.map((topic) => ({ label: topic, href: `${base}/category/${topic.toLowerCase().replace(/\s+/g, "-")}` })),
  offcanvas: [
    { label: "FAQ", href: `${base}/page/faq` },
    { label: "Contact", href: `${base}/page/contact` },
  ],
  hero: {
    title: "Welcome To Niche Blog",
    subtitle: "A one-line description of what this site is about goes here.",
    button: "Start Here",
    href: `${base}/category/${topics[0].toLowerCase().replace(/\s+/g, "-")}`,
    background: IMAGE_SLOTS.hero.placeholder,
  },
  categoryTiles: topics.map((topic) => ({
    label: topic,
    href: `${base}/category/${topic.toLowerCase().replace(/\s+/g, "-")}`,
    background: IMAGE_SLOTS.categoryTile.placeholder,
  })),
  categories: topics.map((topic, i) => ({
    label: topic,
    slug: topic.toLowerCase().replace(/\s+/g, "-"),
    description: `Guides and articles about ${topic.toLowerCase()}.`,
    background: IMAGE_SLOTS.pageBanner.placeholder,
    featuredPostTitle: `Featured post title ${i + 1}`,
  })),
  articles: Array.from({ length: 6 }, (_, i) => ({
    id: String(i + 1),
    title: `Sample Article Title ${i + 1}`,
    excerpt:
      "Placeholder excerpt text describing what this article covers. Replace with real copy when content is ready.",
    image: IMAGE_SLOTS.articleThumbnail.placeholder,
    slug: `sample-article-${i + 1}`,
    category: topics[i % topics.length].toLowerCase().replace(/\s+/g, "-"),
    content: [
      "Placeholder introduction paragraph for the full article body.",
      "Placeholder second paragraph — replace with real long-form content.",
      "Placeholder closing paragraph summarizing the article.",
    ],
  })),
  sidebar: {
    about: "Placeholder About Us text. Describe the site's mission and who writes the content.",
    legal: "Placeholder legal disclaimer text for general guidance and liability notes.",
    privacyHref: `${base}/page/privacy-policy`,
    tags: ["Tag One", "Tag Two", "Tag Three", "Tag Four", "Tag Five"],
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
      text: "Placeholder newsletter signup copy goes here.",
      placeholder: "Enter your email address",
      submit: "Subscribe",
    },
    copyright: "© Niche Blog. All rights reserved.",
  },
  pages: [
    {
      slug: "about",
      title: "About",
      bannerTitle: "About",
      description: "Placeholder about page description.",
      content: [
        "Placeholder About page content. Explain who runs the site and why it exists.",
        "Add a second paragraph with more detail about the site's mission.",
      ],
    },
    {
      slug: "faq",
      title: "FAQ",
      bannerTitle: "FAQ",
      description: "Placeholder FAQ page description.",
      content: [
        "Placeholder question and answer content goes here.",
        "Add as many Q&A paragraphs as needed.",
      ],
    },
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      bannerTitle: "Privacy Policy",
      description: "Placeholder privacy policy description.",
      content: ["Placeholder privacy policy content goes here."],
    },
    {
      slug: "terms",
      title: "Terms and Conditions",
      bannerTitle: "Terms and Conditions",
      description: "Placeholder terms description.",
      content: ["Placeholder terms and conditions content goes here."],
    },
    {
      slug: "contact",
      title: "Contact",
      bannerTitle: "Contact",
      description: "Placeholder contact page description.",
      intro: "Placeholder intro text inviting visitors to reach out using the form below.",
    },
  ],
};
