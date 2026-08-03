export type NicheBlogPageType = "category" | "landing" | "static" | "contact";

export interface NicheBlogPost {
  title: string;
  excerpt: string;
}

export interface NicheBlogPage {
  slug: string;
  type: NicheBlogPageType;
  title: string;
  bannerTitle: string;
  description: string;
  background: string;
  featuredPostTitle?: string;
  intro?: string;
  content?: string[];
  posts?: NicheBlogPost[];
}

export const NICHE_BLOG_BASE = "/niche-blog";

export function nicheBlogHref(slug: string) {
  return `${NICHE_BLOG_BASE}/${slug}`;
}

const samplePosts = (category: string, topics: string[]): NicheBlogPost[] =>
  topics.map((title) => ({
    title,
    excerpt: `Expert guides and tips about ${category.toLowerCase()} — ${title.toLowerCase()}.`,
  }));

export const nicheBlogPages: NicheBlogPage[] = [
  {
    slug: "welcome-to-arrow-awareness",
    type: "landing",
    title: "Welcome To Arrow Awareness - Arrow Awareness",
    bannerTitle: "Welcome To Arrow Awareness",
    description:
      "Start your archery journey with Arrow Awareness — guides, tips, and resources for every skill level.",
    background: "/niche-blog/images/hero.webp",
    intro:
      "Whether you are picking up your first bow or refining competition form, Arrow Awareness is your starting point for trusted archery content.",
    content: [
      "Browse our category pages to explore compound bows, recurve setups, crossbows, hunting gear, shooting technique, and bow string maintenance.",
      "Our team of archers and coaches publishes practical guides designed to help you shoot safely, choose the right equipment, and improve with every session.",
      "Use the navigation above to jump into the topic that matters most to you, or explore the featured categories below on the homepage.",
    ],
  },
  {
    slug: "best-bow",
    type: "category",
    title: "Best Bow - Arrow Awareness",
    bannerTitle: "Category: Best Bow",
    description: "Reviews and buying guides for the best bows across compound, recurve, and beginner setups.",
    background: "/niche-blog/images/bow-arrow.webp",
    featuredPostTitle: "Primary Category Post Title 6",
    intro: "Find top-rated bows for target shooting, hunting, and getting started in archery.",
    posts: samplePosts("Best Bow", [
      "Best Compound Bows for Beginners",
      "Top Recurve Bows Under $300",
      "Best Youth Bows for Kids",
      "Best Hunting Bows for 2024",
      "How to Choose Your First Bow",
      "Best Budget Bows for Target Archery",
    ]),
  },
  {
    slug: "bow-and-arrow",
    type: "category",
    title: "Bow and Arrow - Arrow Awareness",
    bannerTitle: "Category: Bow and Arrow",
    description: "Guides on bows, arrows, setups, and essential archery equipment.",
    background: "/niche-blog/images/bow-arrow.webp",
    featuredPostTitle: "Primary Category Post Title 6",
    intro: "Everything you need to know about matching bows with the right arrows and accessories.",
    posts: samplePosts("Bow and Arrow", [
      "How to Choose the Right Arrows",
      "Arrow Spine Explained for Beginners",
      "Bow and Arrow Setup Checklist",
      "Understanding Draw Weight and Length",
      "Essential Archery Accessories",
      "How to Maintain Your Bow and Arrows",
    ]),
  },
  {
    slug: "bow-hunting",
    type: "category",
    title: "Bow Hunting - Arrow Awareness",
    bannerTitle: "Category: Bow Hunting",
    description: "Bow hunting tips, gear reviews, and field strategies for ethical, successful hunts.",
    background: "/niche-blog/images/hunting.webp",
    featuredPostTitle: "Primary Category Post Title 4",
    intro: "From tree stand setups to broadhead selection, explore bow hunting guides built for the field.",
    posts: samplePosts("Bow Hunting", [
      "Bow Hunting Tips for Beginners",
      "Best Broadheads for Deer Hunting",
      "Tree Stand Safety Essentials",
      "How to Pattern Whitetail with a Bow",
      "Choosing a Hunting Compound Bow",
      "Field Dressing Basics for Archery Hunters",
    ]),
  },
  {
    slug: "bow-shooting",
    type: "category",
    title: "Bow Shooting - Arrow Awareness",
    bannerTitle: "Category: Bow Shooting",
    description: "Improve accuracy, form, and consistency with bow shooting technique guides.",
    background: "/niche-blog/images/cross.webp",
    featuredPostTitle: "Primary Category Post Title 5",
    intro: "Master stance, anchor point, release, and follow-through with step-by-step shooting advice.",
    posts: samplePosts("Bow Shooting", [
      "Proper Archery Stance for Accuracy",
      "How to Fix Target Panic",
      "Anchor Point Tips for Consistency",
      "Release Aid vs Finger Shooting",
      "Indoor vs Outdoor Shooting Adjustments",
      "Drills to Improve Grouping at 20 Yards",
    ]),
  },
  {
    slug: "bow-string",
    type: "category",
    title: "Bow String - Arrow Awareness",
    bannerTitle: "Category: Bow String",
    description: "Bow string maintenance, replacement, tuning, and material guides.",
    background: "/niche-blog/images/recurve.webp",
    featuredPostTitle: "Primary Category Post Title 3",
    intro: "Keep your bow performing at its best with string care, waxing, and replacement know-how.",
    posts: samplePosts("Bow String", [
      "When to Replace Your Bow String",
      "How to Wax a Bow String Properly",
      "D-Loop Installation Guide",
      "String Material Comparison: Dacron vs Fast Flight",
      "Peep Sight Alignment Basics",
      "Troubleshooting String Stretch Issues",
    ]),
  },
  {
    slug: "compound-bow",
    type: "category",
    title: "Compound Bow - Arrow Awareness",
    bannerTitle: "Category: Compound Bow",
    description: "Compound bow setup, tuning, accessories, and performance guides.",
    background: "/niche-blog/images/bow-arrow.webp",
    featuredPostTitle: "Primary Category Post Title 2",
    intro: "Dial in cam timing, draw length, and accessories for a tuned compound bow.",
    posts: samplePosts("Compound Bow", [
      "Compound Bow Setup for Beginners",
      "How to Paper Tune a Compound Bow",
      "Cam Timing and Sync Explained",
      "Best Compound Bow Sights",
      "Rest Types: Whisker Biscuit vs Drop Away",
      "Adjusting Draw Length on a Compound Bow",
    ]),
  },
  {
    slug: "cross-bow",
    type: "category",
    title: "Cross Bow - Arrow Awareness",
    bannerTitle: "Category: Cross Bow",
    description: "Crossbow reviews, safety, maintenance, and hunting application guides.",
    background: "/niche-blog/images/cross.webp",
    featuredPostTitle: "Primary Category Post Title 1",
    intro: "Safe handling, cocking methods, and bolt selection for crossbow shooters and hunters.",
    posts: samplePosts("Cross Bow", [
      "Crossbow Safety Rules Every Shooter Should Know",
      "Best Crossbows for Beginners",
      "How to Sight In a Crossbow Scope",
      "Crossbow Bolt Selection Guide",
      "Cocking Device Options Compared",
      "Crossbow Maintenance Checklist",
    ]),
  },
  {
    slug: "recurve-bow",
    type: "category",
    title: "Recurve Bow - Arrow Awareness",
    bannerTitle: "Category: Recurve Bow",
    description: "Recurve bow tuning, takedown setups, Olympic style, and traditional archery guides.",
    background: "/niche-blog/images/recurve.webp",
    featuredPostTitle: "Primary Category Post Title 7",
    intro: "Build and tune a recurve for target archery, field shooting, or traditional practice.",
    posts: samplePosts("Recurve Bow", [
      "Recurve Bow Tuning Step by Step",
      "ILF vs One-Piece Recurve Bows",
      "Best Recurve Risers for Target Archery",
      "String Height and Nocking Point Setup",
      "Traditional vs Olympic Recurve Styles",
      "How to Choose Recurve Limb Weight",
    ]),
  },
  {
    slug: "faq",
    type: "static",
    title: "FAQ - Arrow Awareness",
    bannerTitle: "FAQ",
    description: "Frequently asked questions about Arrow Awareness and our archery content.",
    background: "/niche-blog/images/hero.webp",
    content: [
      "How often is new content published? We add new archery guides regularly across all category pages.",
      "Can I suggest a topic? Yes — use our contact form and tell us what you would like to see covered.",
      "Is the information suitable for beginners? Absolutely. We label difficulty where it matters and start with fundamentals.",
      "Do you review specific bow brands? Yes, our Best Bow and category pages include equipment reviews and comparisons.",
    ],
  },
  {
    slug: "partnerships",
    type: "static",
    title: "Partnerships - Arrow Awareness",
    bannerTitle: "Partnerships",
    description: "Partner with Arrow Awareness for sponsored content, collaborations, and brand features.",
    background: "/niche-blog/images/hero.webp",
    content: [
      "Arrow Awareness welcomes partnership inquiries from archery brands, ranges, coaches, and event organizers.",
      "We prioritize partnerships that provide genuine value to our readers — quality gear, education, and safe shooting practices.",
      "For collaboration proposals, email team@arrowawareness.com with details about your brand and campaign goals.",
    ],
  },
  {
    slug: "guest-post-policy",
    type: "static",
    title: "Guest Post Policy - Arrow Awareness",
    bannerTitle: "Guest Post Policy",
    description: "Guidelines for submitting guest articles to Arrow Awareness.",
    background: "/niche-blog/images/hero.webp",
    content: [
      "We accept guest submissions from experienced archers, coaches, and industry professionals.",
      "Articles must be original, well-researched, and focused on archery education — not promotional filler.",
      "Include an author bio and any relevant credentials. We reserve the right to edit for clarity and style.",
      "Pitch your topic via our contact page before submitting a full draft.",
    ],
  },
  {
    slug: "do-not-sell-my-info",
    type: "static",
    title: "Do Not Sell My Info - Arrow Awareness",
    bannerTitle: "Do Not Sell My Info",
    description: "Your privacy choices regarding personal information on Arrow Awareness.",
    background: "/niche-blog/images/hero.webp",
    content: [
      "Arrow Awareness does not sell personal information to third parties for monetary consideration.",
      "You may contact us to request access, correction, or deletion of personal data we hold.",
      "For privacy-related requests, email team@arrowawareness.com with the subject line Privacy Request.",
    ],
  },
  {
    slug: "about",
    type: "static",
    title: "About - Arrow Awareness",
    bannerTitle: "About",
    description: "Learn about the Arrow Awareness team and our mission to educate archers worldwide.",
    background: "/niche-blog/images/hero.webp",
    content: [
      "At Arrow Awareness, we are dedicated to the art and discipline of archery. Our content is carefully curated, written, and revised by a team of passionate archers, coaches, and enthusiasts with years of experience.",
      "Whether you are a seasoned competitor or a beginner, we aim to provide relevant and insightful information about archery to help you sharpen your skills, improve your technique, and deepen your appreciation for this timeless sport.",
    ],
  },
  {
    slug: "contact",
    type: "contact",
    title: "Contact - Arrow Awareness",
    bannerTitle: "Contact",
    description: "Get in touch with the Arrow Awareness team for questions, feedback, and suggestions.",
    background: "/niche-blog/images/hero.webp",
    intro:
      "We love to hear from our readers! Feel free to get in touch with us anytime with any inquiries, feedback, or suggestions you may have. You can fill in the contact form below, and we will get back to you shortly, or you can email us directly at team@arrowawareness.com.",
  },
  {
    slug: "privacy-policy",
    type: "static",
    title: "Privacy Policy - Arrow Awareness",
    bannerTitle: "Privacy Policy",
    description: "How Arrow Awareness collects, uses, and protects your information.",
    background: "/niche-blog/images/hero.webp",
    content: [
      "Arrow Awareness may collect information you provide through forms, newsletters, and site analytics.",
      "Advertisements displayed on Arrow Awareness may be tailored to your interests based on tracking data from your browsing activity. This is achieved using cookies.",
      "We use cookies to improve site performance and understand how visitors use our content. You can manage cookie preferences in your browser settings.",
      "We do not share personal information except as required to operate the site or comply with law.",
    ],
  },
  {
    slug: "terms-and-conditions",
    type: "static",
    title: "Terms and Conditions - Arrow Awareness",
    bannerTitle: "Terms and Conditions",
    description: "Terms of use for Arrow Awareness website and content.",
    background: "/niche-blog/images/hero.webp",
    content: [
      "By using Arrow Awareness, you agree to use our content for personal, non-commercial purposes unless otherwise permitted.",
      "Archery involves inherent risks. Always follow range rules, manufacturer guidance, and local laws when shooting or hunting.",
      "Content on this site is for general guidance and may not cover every aspect of archery in detail. Consult experts for specific safety or technical questions.",
      "We may update these terms periodically. Continued use of the site constitutes acceptance of the updated terms.",
    ],
  },
];

const pageMap = new Map(nicheBlogPages.map((page) => [page.slug, page]));

export function getNicheBlogPage(slug: string): NicheBlogPage | undefined {
  return pageMap.get(slug);
}

export function getAllNicheBlogSlugs(): string[] {
  return nicheBlogPages.map((page) => page.slug);
}
