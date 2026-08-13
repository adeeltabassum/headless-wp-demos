import { LOCAL_IMAGE_SLOTS } from "./images";
import type { LocalContent } from "./content";

/**
 * Neutral placeholder content for the local business master skeleton.
 * No client branding — every value is a stand-in for Studio / publish.
 */

const base = "/local";

export const localSampleContent: LocalContent = {
  siteName: "Local Business",
  siteBase: base,
  metadata: {
    title: "Local Business — Master Template",
    description: "A skeleton local-service landing page with no branding applied yet.",
  },
  phone: "(555) 000-0000",
  phoneHref: "tel:+15550000000",
  logo: LOCAL_IMAGE_SLOTS.logo.placeholder,
  favicon: LOCAL_IMAGE_SLOTS.favicon.placeholder,
  heroBackground: LOCAL_IMAGE_SLOTS.heroBackground.placeholder,
  nav: [
    { label: "Services", href: "#services", hasDropdown: false },
    { label: "Gallery", href: "#gallery", hasDropdown: false },
    { label: "Blog", href: "#blog", hasDropdown: false },
    { label: "Contact", href: "#quote-form", hasDropdown: false },
  ],
  social: [
    { label: "Facebook", href: "#", network: "facebook" },
    { label: "Twitter", href: "#", network: "twitter" },
    { label: "Instagram", href: "#", network: "instagram" },
    { label: "Yelp", href: "#", network: "yelp" },
  ],
  aboutBlurb:
    "Placeholder about text. Describe your local business, service area, and what makes you trustworthy.",
  hero: {
    titleHighlight: "Trusted Local",
    titleRest: "Services Near You",
    subtitle:
      "specializes in reliable local services for residential and commercial clients. Replace this with your real value proposition.",
    cta: "Get My Free Quote",
    servicesLabel: "View Our Services",
    servicesHref: "#services",
  },
  quoteForm: {
    title: "Get a Quote",
    subtitle: "Leave a message or call us now at",
    fields: {
      name: "Enter your full name",
      email: "Enter your email",
      phone: "(555) 555 5555",
      from: "Enter a location or zip",
      to: "Enter a location or zip",
      date: "Pick your preferred date",
    },
    submit: "Get My Free Quote",
  },
  services: {
    heading: "Trusted Services for Every Need",
    subheading: "Placeholder services overview — swap titles and descriptions for your offerings.",
    cta: "View Our Services",
    items: [
      {
        title: "Service One",
        description: "Short placeholder description for service one.",
        href: "#services",
        image: LOCAL_IMAGE_SLOTS.service.placeholder,
      },
      {
        title: "Service Two",
        description: "Short placeholder description for service two.",
        href: "#services",
        image: LOCAL_IMAGE_SLOTS.service.placeholder,
      },
      {
        title: "Service Three",
        description: "Short placeholder description for service three.",
        href: "#services",
        image: LOCAL_IMAGE_SLOTS.service.placeholder,
      },
      {
        title: "Service Four",
        description: "Short placeholder description for service four.",
        href: "#services",
        image: LOCAL_IMAGE_SLOTS.service.placeholder,
      },
      {
        title: "Service Five",
        description: "Short placeholder description for service five.",
        href: "#services",
        image: LOCAL_IMAGE_SLOTS.service.placeholder,
      },
    ],
  },
  reviews: {
    googleLabel: "Our Google Reviews",
    testimonialsHref: "#reviews",
    testimonialsLabel: "See All Testimonials",
  },
  gallery: {
    heading: "See Us in Action",
    subheading: "Placeholder gallery caption — replace with real project photos.",
    images: [
      LOCAL_IMAGE_SLOTS.gallery.placeholder,
      LOCAL_IMAGE_SLOTS.gallery.placeholder,
      LOCAL_IMAGE_SLOTS.gallery.placeholder,
      LOCAL_IMAGE_SLOTS.gallery.placeholder,
      LOCAL_IMAGE_SLOTS.gallery.placeholder,
      LOCAL_IMAGE_SLOTS.gallery.placeholder,
    ],
    reviewsCta: "Our Google Reviews",
  },
  blog: {
    heading: "Tips & Insights",
    subheading: "Placeholder blog section — swap with real articles when ready.",
    cta: "View All Articles",
    posts: [
      {
        category: "Guides",
        title: "Sample article title one",
        excerpt: "Placeholder excerpt describing what this article covers.",
        href: "#blog-1",
        image: LOCAL_IMAGE_SLOTS.blog.placeholder,
      },
      {
        category: "Tips",
        title: "Sample article title two",
        excerpt: "Placeholder excerpt describing what this article covers.",
        href: "#blog-2",
        image: LOCAL_IMAGE_SLOTS.blog.placeholder,
      },
      {
        category: "News",
        title: "Sample article title three",
        excerpt: "Placeholder excerpt describing what this article covers.",
        href: "#blog-3",
        image: LOCAL_IMAGE_SLOTS.blog.placeholder,
      },
    ],
  },
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "What areas do you serve?",
        answer: "Placeholder answer — list your service areas here.",
      },
      {
        question: "Are you licensed and insured?",
        answer: "Placeholder answer — describe your credentials.",
      },
      {
        question: "How do I get a free quote?",
        answer: "Placeholder answer — point visitors to your quote form or phone number.",
      },
      {
        question: "What types of jobs do you handle?",
        answer: "Placeholder answer — summarize your core services.",
      },
      {
        question: "How quickly can you start?",
        answer: "Placeholder answer — set expectations for scheduling.",
      },
    ],
  },
  statsCta: {
    heading: "Your Local Experts",
    subheading: "Placeholder CTA copy — highlight trust signals and invite a quote.",
    button: "Get a Quote",
    workLink: { label: "View Our Work", href: "#gallery" },
    stats: [
      { label: "Customer Rating", value: "5.0", suffix: "" },
      { label: "Years Experience", value: "10", suffix: "+" },
      { label: "Jobs Completed", value: "1", suffix: "k+" },
      { label: "Years In Business", value: "5", suffix: "+" },
    ],
  },
  licenses: [
    { label: "License", value: "#0000000" },
    { label: "Insured", value: "Yes" },
    { label: "Bonded", value: "Yes" },
  ],
  footer: {
    services: [
      { label: "Service One", href: "#services" },
      { label: "Service Two", href: "#services" },
      { label: "Service Three", href: "#services" },
      { label: "All Services", href: "#services" },
    ],
    company: [
      { label: "About", href: "#stats" },
      { label: "Contact Us", href: "#quote-form" },
      { label: "Blog", href: "#blog" },
      { label: "Testimonials", href: "#reviews" },
    ],
    copyright: "Local Business. All Rights Reserved.",
    privacy: "#",
  },
};
