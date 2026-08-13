/**
 * Content contract for the local business master template.
 * One shape, filled differently per site. Components only read this interface.
 */

export interface LocalNavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface LocalSocialLink {
  label: string;
  href: string;
  network: "facebook" | "twitter" | "instagram" | "yelp";
}

export interface LocalServiceItem {
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface LocalBlogPost {
  category: string;
  title: string;
  excerpt: string;
  href: string;
  image: string;
}

export interface LocalFaqItem {
  question: string;
  answer: string;
}

export interface LocalContent {
  siteName: string;
  siteBase: string;
  metadata: {
    title: string;
    description: string;
  };
  phone: string;
  phoneHref: string;
  logo: string;
  favicon: string;
  heroBackground: string;
  nav: LocalNavLink[];
  social: LocalSocialLink[];
  aboutBlurb: string;
  hero: {
    titleHighlight: string;
    titleRest: string;
    subtitle: string;
    cta: string;
    servicesLabel: string;
    servicesHref: string;
  };
  quoteForm: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      email: string;
      phone: string;
      from: string;
      to: string;
      date: string;
    };
    submit: string;
  };
  services: {
    heading: string;
    subheading: string;
    cta: string;
    items: LocalServiceItem[];
  };
  reviews: {
    googleLabel: string;
    testimonialsHref: string;
    testimonialsLabel: string;
  };
  gallery: {
    heading: string;
    subheading: string;
    images: string[];
    reviewsCta: string;
  };
  blog: {
    heading: string;
    subheading: string;
    cta: string;
    posts: LocalBlogPost[];
  };
  faq: {
    heading: string;
    items: LocalFaqItem[];
  };
  statsCta: {
    heading: string;
    subheading: string;
    button: string;
    workLink: { label: string; href: string };
    stats: Array<{ label: string; value: string; suffix: string }>;
  };
  licenses: Array<{ label: string; value: string }>;
  footer: {
    services: Array<{ label: string; href: string }>;
    company: Array<{ label: string; href: string }>;
    copyright: string;
    privacy: string;
  };
}
