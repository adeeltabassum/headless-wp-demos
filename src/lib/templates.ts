export type SiteTemplate = {
  id: string;
  name: string;
  description: string;
  href: string;
  tag: string;
  pages: number;
  status: "Live" | "Preview";
  stack: string;
  previewGrad: string;
  screenshot: string;
};

export const siteTemplates: SiteTemplate[] = [
  {
    id: "niche-template",
    name: "Niche Blog (Master)",
    description: "Master skeleton for AI-generated niche sites — the base SCAI Studio publishes from.",
    href: "/niche-template",
    tag: "Niche Blog",
    pages: 8,
    status: "Live",
    stack: "Next.js · SCAI Studio",
    previewGrad: "linear-gradient(135deg, #111 0%, #1c2a1f 50%, #7ffba9 100%)",
    screenshot: "/gallery/screenshots/niche-template.png",
  },
  {
    id: "local",
    name: "Flat Bid Moving",
    description: "Local & long-distance movers landing page for San Diego.",
    href: "/local",
    tag: "Local Business",
    pages: 1,
    status: "Live",
    stack: "Next.js · Tailwind",
    previewGrad: "linear-gradient(135deg, #1a1a1a 0%, #3a1518 45%, #d63742 100%)",
    screenshot: "/gallery/screenshots/local.png",
  },
  {
    id: "saas",
    name: "SAAS Template",
    description: "Modern SAAS landing page with pricing, testimonials, and FAQs.",
    href: "/saas",
    tag: "SAAS",
    pages: 1,
    status: "Live",
    stack: "Next.js · Elementor CSS",
    previewGrad: "linear-gradient(135deg, #0a0a0a 0%, #12241f 40%, #40edc3 100%)",
    screenshot: "/gallery/screenshots/saas.png",
  },
];
