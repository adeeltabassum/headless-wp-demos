/**
 * Content contract for the SaaS master template.
 * Studio / publish derive a SaasContent object; components read it via the provider.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface Tool {
  title: string;
  description: string;
  icon: string;
}

export interface Feature {
  title: string;
  description: string;
  imagePosition: "left" | "right";
  image?: string;
}

export interface Testimonial {
  rating: number;
  text: string;
  author: string;
  location: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category?: string;
  href?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SaasContent {
  siteName: string;
  siteBase: string;
  metadata: { title: string; description: string };
  logo: string;
  favicon: string;
  heroImage: string;
  productImage: string;
  nav: NavLink[];
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    priceLine: string;
  };
  product: {
    title: string;
    description: string;
    subtitle: string;
    subdescription: string;
    features: string[];
  };
  toolsHeading: string;
  toolsSubheading: string;
  tools: Tool[];
  workflow: {
    title: string;
    description: string;
  };
  features: Feature[];
  testimonials: Testimonial[];
  pricing: {
    title: string;
    description: string;
    productName: string;
    price: string;
    priceDescription: string;
    guarantee: string;
    cta: string;
    features: string[];
    additionalFeatures: string[];
  };
  blogHeading: string;
  blogSubheading: string;
  blogPosts: BlogPost[];
  faqHeading: string;
  faqSubheading: string;
  faqs: FAQ[];
  finalCta: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonHref: string;
  };
  footer: {
    blurb: string;
    copyright: string;
  };
  headerCta: {
    demo: string;
    purchase: string;
  };
}

const base = "/saas";

export const saasSampleContent: SaasContent = {
  siteName: "SAAS Template",
  siteBase: base,
  metadata: {
    title: "SAAS Template",
    description: "A modern SAAS landing page template",
  },
  logo: "/saas/images/logo.png",
  favicon: "/saas/images/logo.png",
  heroImage: "/saas/images/placeholder-hero.png",
  productImage: "/saas/images/placeholder-hero.png",
  nav: [
    { label: "Product", href: `${base}#product` },
    { label: "Tools", href: `${base}#tools` },
    { label: "Use Case", href: `${base}#use-case` },
    { label: "FAQ", href: `${base}#faq` },
  ],
  hero: {
    title: "Lorem Ipsum Dolor Sit Amet Lorem",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis",
    primaryCta: "Purchase Now",
    secondaryCta: "Watch Demo",
    priceLine: "One time purchase - $199",
  },
  product: {
    title: "Product Description",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    subtitle: "Product Description",
    subdescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.",
      features: [
      "Automation",
      "Analytics",
      "Integrations",
      "Collaboration",
      "Reporting",
    ],
  },
  toolsHeading: "Tools",
  toolsSubheading:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis",
  tools: [
    {
      title: "Automation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      icon: "🤖",
    },
    {
      title: "Analytics",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      icon: "🔧",
    },
    {
      title: "Integrations",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      icon: "⚡",
    },
    {
      title: "Collaboration",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      icon: "🎯",
    },
    {
      title: "Reporting",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      icon: "💡",
    },
    {
      title: "Security",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      icon: "🚀",
    },
  ],
  workflow: {
    title: "Simple Workflow, Powerful Results",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Ut elit tellus, luctus nec.",
  },
  features: [
    {
      title: "Launch faster",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
      imagePosition: "left",
      image: "/saas/images/placeholder-hero.png",
    },
    {
      title: "Stay organized",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
      imagePosition: "right",
      image: "/saas/images/placeholder-hero.png",
    },
    {
      title: "Scale with confidence",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
      imagePosition: "left",
      image: "/saas/images/placeholder-hero.png",
    },
    {
      title: "Measure what matters",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
      imagePosition: "right",
      image: "/saas/images/placeholder-hero.png",
    },
  ],
  testimonials: [
    {
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      author: "John D",
      location: "Austin, TX",
      tags: ["Punctuality", "Quality", "Value"],
    },
    {
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      author: "John D",
      location: "Austin, TX",
      tags: ["Punctuality", "Quality", "Value"],
    },
    {
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      author: "John D",
      location: "Austin, TX",
      tags: ["Punctuality", "Quality", "Value"],
    },
  ],
  pricing: {
    title: "Simple Pricing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.",
    productName: "Tool Name",
    price: "$142",
    priceDescription: "One-time purchase",
    guarantee: "30-day money-back guarantee, no questions asked",
    cta: "Purchase Now",
    features: [
      "Core product access",
      "Email support",
      "Lifetime updates",
    ],
    additionalFeatures: [
      "Team workspace",
      "Priority onboarding",
      "Export & API access",
    ],
  },
  blogHeading: "From the blog",
  blogSubheading:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  blogPosts: [
    {
      id: "post-06",
      title: "Post 06",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed proin interdum enim",
      image: "/saas/images/placeholder.svg",
      category: "Guides",
      href: "#",
    },
    {
      id: "post-03",
      title: "Post 03",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed proin interdum enim",
      image: "/saas/images/placeholder.svg",
      category: "Tips",
      href: "#",
    },
    {
      id: "post-05",
      title: "Post 05",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed proin interdum enim",
      image: "/saas/images/placeholder.svg",
      category: "News",
      href: "#",
    },
  ],
  faqHeading: "Frequently Asked Question",
  faqSubheading:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  faqs: [
    {
      question: "What is included in the purchase?",
      answer:
        "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.",
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer:
        "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.",
    },
    {
      question: "Can my team use this product?",
      answer:
        "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.",
    },
    {
      question: "How do updates work?",
      answer:
        "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.",
    },
    {
      question: "Is support included?",
      answer:
        "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.",
    },
  ],
  finalCta: {
    title: "Lorem Ipsum Dolor",
    subtitle: "Massa viverra feugiat lacus paresent. Velit.",
    buttonText: "Purchase For $199",
    buttonHref: "#pricing",
  },
  footer: {
    blurb:
      "Mauris commodo feugiat donec pellentesque feugiat in fringilla adipiscing. Nunc hendrerit faucib.",
    copyright: "SAAS Template. All Rights Reserved.",
  },
  headerCta: {
    demo: "See Demo",
    purchase: "Purchase Now",
  },
};

/** @deprecated Prefer saasSampleContent / SaasContent — kept for legacy imports. */
export const siteConfig = {
  siteName: saasSampleContent.siteName,
  tagline: saasSampleContent.hero.title,
  heroSubtitle: saasSampleContent.hero.subtitle,
  price: saasSampleContent.pricing.price,
  priceDescription: saasSampleContent.pricing.priceDescription,
};

/** @deprecated Prefer saasSampleContent.nav */
export const navigation = saasSampleContent.nav;
/** @deprecated Prefer saasSampleContent.product */
export const productDescription = saasSampleContent.product;
/** @deprecated Prefer saasSampleContent.tools */
export const tools = saasSampleContent.tools;
/** @deprecated Prefer saasSampleContent.workflow */
export const workflowSection = saasSampleContent.workflow;
/** @deprecated Prefer saasSampleContent.features */
export const features = saasSampleContent.features;
/** @deprecated Prefer saasSampleContent.testimonials */
export const testimonials = saasSampleContent.testimonials;
/** @deprecated Prefer saasSampleContent.pricing */
export const pricingData = saasSampleContent.pricing;
/** @deprecated Prefer saasSampleContent.blogPosts */
export const blogPosts = saasSampleContent.blogPosts;
/** @deprecated Prefer saasSampleContent.faqs */
export const faqs = saasSampleContent.faqs;
/** @deprecated Prefer saasSampleContent.finalCta */
export const finalCTA = saasSampleContent.finalCta;
/** @deprecated Prefer saasSampleContent.footer.blurb */
export const footerText = saasSampleContent.footer.blurb;
