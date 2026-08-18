import type {
  EcommerceAboutContent,
  EcommerceBlogArticle,
  EcommerceBlogPageContent,
  EcommerceContactContent,
} from "./content";

const BASE = "/ecommerce";

function article(
  index: number,
  category: string,
  overrides?: Partial<EcommerceBlogArticle>
): EcommerceBlogArticle {
  const slug = overrides?.slug || `post-${index + 1}`;
  const title = overrides?.title || "Lorem ipsum dolor sit amet";
  const resolvedCategory = overrides?.category || category;
  return {
    slug,
    title,
    excerpt:
      overrides?.excerpt ||
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
    category: resolvedCategory,
    dateLabel: overrides?.dateLabel || "15 Jan",
    dateFull: overrides?.dateFull || "February 15, 2024",
    image: overrides?.image,
    href: overrides?.href || `${BASE}/blog/${slug}`,
    body: overrides?.body || [
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      { type: "heading", text: "Heading 1" },
      {
        type: "paragraph",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      { type: "image", alt: title },
      { type: "heading", text: "Heading 2" },
      {
        type: "paragraph",
        text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus.",
      },
      {
        type: "cta",
        title: "Lorem Ipsum Color",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
        ctaLabel: "Shop now",
        ctaHref: `${BASE}/shop`,
      },
      { type: "heading", text: "Heading 3" },
      {
        type: "paragraph",
        text: "Nulla facilisi. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
      },
      { type: "image", alt: `${title} detail` },
      { type: "heading", text: "Heading 4" },
      {
        type: "paragraph",
        text: "Mauris accumsan nulla vel diam. Sed in lacus ut enim adipiscing aliquet. Nulla venenatis. In pede mi, aliquet sit amet, euismod in.",
      },
      {
        type: "cta",
        title: "Lorem Ipsum Color",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explore our latest products today.",
        ctaLabel: "Shop now",
        ctaHref: `${BASE}/shop`,
      },
    ],
  };
}

const CATS = ["History", "Nature", "Health", "Style", "Guides"] as const;

export const ecommerceBlogArticles: EcommerceBlogArticle[] = Array.from(
  { length: 9 },
  (_, i) => article(i, CATS[i % CATS.length])
);

export const ecommerceAboutSample: EcommerceAboutContent = {
  title: "About Us",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  sections: [
    {
      title: "Who We Are",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      bullets: [
        "Lorem ipsum dolor sit amet consectetur",
        "Ut elit tellus luctus nec ullamcorper",
        "Pulvinar dapibus leo mattis",
      ],
      reverse: false,
    },
    {
      title: "Our Product",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      bullets: [
        "Lorem ipsum dolor sit amet consectetur",
        "Ut elit tellus luctus nec ullamcorper",
        "Pulvinar dapibus leo mattis",
      ],
      reverse: true,
      checkStyle: true,
    },
  ],
  blogHeading: "Blog",
  blogSubheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  blogViewMoreLabel: "View More",
  metadata: {
    title: "About Us — Ecommerce Template",
    description: "Learn who we are and what we offer.",
  },
};

export const ecommerceBlogPageSample: EcommerceBlogPageContent = {
  title: "Blog",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  allPostsLabel: "All Posts",
  categories: [...CATS],
  loadMoreLabel: "Load More",
  readMoreLabel: "Read more",
  pageSize: 6,
  posts: ecommerceBlogArticles,
  relatedHeading: "Our Blogs",
  relatedSubheading:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
  metadata: {
    title: "Blog — Ecommerce Template",
    description: "Articles, guides, and stories from the store.",
  },
};

export const ecommerceContactSample: EcommerceContactContent = {
  title: "Contact Us",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  infoHeading: "Lorem Ipsum",
  infoBody:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
  infoBullets: ["Friendly support for orders, shipping, and product questions"],
  hours: "Fri: 8:00am - 4:00pm",
  email: "hello@yourbrand.com",
  phones: "+1 (555) 000-0000; +1 (555) 111-2222",
  address: "1234 Ipsum Street, Lorem City, FA 56789, USA",
  form: {
    firstNameLabel: "First name",
    lastNameLabel: "Last name",
    emailLabel: "Email",
    phoneLabel: "Phone number",
    locationLabel: "Nearest Location",
    locationPlaceholder: "Select a location",
    locations: ["New York", "Los Angeles", "Chicago", "Houston", "Online only"],
    messageLabel: "Message",
    messagePlaceholder: "How can we help?",
    submitLabel: "Send Message",
  },
  successMessage: "Thanks — your message has been received. We'll get back to you soon.",
  metadata: {
    title: "Contact Us — Ecommerce Template",
    description: "Get in touch with our team.",
  },
};

export function findBlogArticle(posts: EcommerceBlogArticle[], slug: string) {
  return posts.find((p) => p.slug === slug) || null;
}
