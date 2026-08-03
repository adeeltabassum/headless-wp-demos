import { nicheBlogHref } from "@/lib/niche-blog/pages";

export const nicheBlogContent = {
  metadata: {
    title: "Home - Arrow Awareness",
    description:
      "Welcome To Arrow Awareness. Expert archery guides on bows, hunting, shooting, and more.",
  },
  logo: "/niche-blog/images/logo.png",
  favicon: "/niche-blog/images/favicon.png",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/arrowawareness" },
    { label: "YouTube", href: "https://www.youtube.com/arrowawareness" },
    { label: "Twitter", href: "https://x.com/arrowawareness" },
    { label: "Instagram", href: "https://www.instagram.com/arrowawareness" },
  ],
  nav: [
    { label: "Best Bow", href: nicheBlogHref("best-bow") },
    { label: "Bow and Arrow", href: nicheBlogHref("bow-and-arrow") },
    { label: "Bow Hunting", href: nicheBlogHref("bow-hunting") },
    { label: "Bow Shooting", href: nicheBlogHref("bow-shooting") },
    { label: "Bow String", href: nicheBlogHref("bow-string") },
    { label: "Compound Bow", href: nicheBlogHref("compound-bow") },
    { label: "Cross Bow", href: nicheBlogHref("cross-bow") },
    { label: "Recurve Bow", href: nicheBlogHref("recurve-bow") },
  ],
  offcanvas: [
    { label: "FAQ", href: nicheBlogHref("faq") },
    { label: "Partnerships", href: nicheBlogHref("partnerships") },
    { label: "Guest Post Policy", href: nicheBlogHref("guest-post-policy") },
    { label: "Do Not Sell My Info", href: nicheBlogHref("do-not-sell-my-info") },
  ],
  hero: {
    title: "Welcome To Arrow Awareness",
    button: "START HERE",
    href: nicheBlogHref("welcome-to-arrow-awareness"),
    background: "/niche-blog/images/hero.webp",
  },
  categories: [
    { label: "BOW & ARROW", href: nicheBlogHref("bow-and-arrow"), background: "/niche-blog/images/bow-arrow.webp" },
    { label: "RECURVE BOW", href: nicheBlogHref("recurve-bow"), background: "/niche-blog/images/recurve.webp" },
    { label: "CROSS BOW", href: nicheBlogHref("cross-bow"), background: "/niche-blog/images/cross.webp" },
    { label: "BOW HUNTING", href: nicheBlogHref("bow-hunting"), background: "/niche-blog/images/hunting.webp" },
  ],
  sidebar: {
    about:
      "At Arrow Awareness, we are dedicated to the art and discipline of archery. Our content is carefully curated, written, and revised by a team of passionate archers, coaches, and enthusiasts with years of experience.",
    legal:
      "The information provided on Arrow Awareness is intended for general guidance and may not cover every aspect of archery in detail. For any specific safety concerns or technical details, please consult the official user manuals, manufacturers' websites, or seek expert advice.",
    privacyHref: nicheBlogHref("privacy-policy"),
  },
  footer: {
    featured: [
      { label: "FAQ", href: nicheBlogHref("faq") },
      { label: "Partnerships", href: nicheBlogHref("partnerships") },
      { label: "Guest Post Policy", href: nicheBlogHref("guest-post-policy") },
      { label: "Do Not Sell My Info", href: nicheBlogHref("do-not-sell-my-info") },
    ],
    links: [
      { label: "About", href: nicheBlogHref("about") },
      { label: "Contact", href: nicheBlogHref("contact") },
      { label: "Privacy Policy", href: nicheBlogHref("privacy-policy") },
      { label: "Terms and Conditions", href: nicheBlogHref("terms-and-conditions") },
    ],
    newsletter: {
      text: "Get exclusive content, advice, and tips from our newsletter",
      placeholder: "Enter your email address",
      submit: "Send",
    },
    copyright: "Arrow Awareness. All rights reserved.",
  },
};
