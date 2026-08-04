export type DemoProject = {
  id: string;
  name: string;
  description: string;
  href: string;
  tag: string;
};

export const demoProjects: DemoProject[] = [
  {
    id: "local",
    name: "Flat Bid Moving",
    description: "Local & long-distance movers landing page for San Diego.",
    href: "/local",
    tag: "Local Business",
  },
  {
    id: "niche-blog",
    name: "Arrow Awareness",
    description: "Niche blog homepage, categories, and inner pages.",
    href: "/niche-blog",
    tag: "Niche Blog",
  },
  {
    id: "grub-gadget",
    name: "Grub Gadget",
    description: "Kitchen appliance blog with categories and single posts.",
    href: "/grub-gadget",
    tag: "Niche Blog",
  },
  {
    id: "saas",
    name: "SAAS Template",
    description: "Modern SAAS landing page with pricing, testimonials, and FAQs.",
    href: "/saas",
    tag: "SAAS",
  },
];
