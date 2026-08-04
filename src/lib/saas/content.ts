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
  imagePosition: 'left' | 'right';
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
}

export interface FAQ {
  question: string;
  answer: string;
}

export const siteConfig = {
  siteName: "SAAS Template",
  tagline: "Lorem Ipsum Dolor Sit Amet Lorem",
  heroSubtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis",
  price: "$199",
  priceDescription: "One time purchase",
};

export const navigation: NavLink[] = [
  { label: "Product", href: "/saas#product" },
  { label: "Tools", href: "/saas#tools" },
  { label: "Use Case", href: "/saas#use-case" },
  { label: "FAQ", href: "/saas#faq" },
];

export const productDescription = {
  title: "Product Description",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  subtitle: "Product Description",
  subdescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.",
  features: [
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
  ],
};

export const tools: Tool[] = [
  {
    title: "Ai Tool",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    icon: "🤖",
  },
  {
    title: "Ai Tool",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    icon: "🔧",
  },
  {
    title: "Ai Tool",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    icon: "⚡",
  },
  {
    title: "Ai Tool",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    icon: "🎯",
  },
  {
    title: "Ai Tool",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    icon: "💡",
  },
  {
    title: "Ai Tool",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    icon: "🚀",
  },
];

export const workflowSection = {
  title: "Simple Workflow, Powerful Results",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Ut elit tellus, luctus nec.",
};

export const features: Feature[] = [
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
    imagePosition: "left",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
    imagePosition: "right",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
    imagePosition: "left",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
    imagePosition: "right",
  },
];

export const testimonials: Testimonial[] = [
  {
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    author: "John D",
    location: "Austin, TX",
    tags: ["Punctuality", "Quality", "Value"],
  },
  {
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    author: "John D",
    location: "Austin, TX",
    tags: ["Punctuality", "Quality", "Value"],
  },
  {
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    author: "John D",
    location: "Austin, TX",
    tags: ["Punctuality", "Quality", "Value"],
  },
  {
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    author: "John D",
    location: "Austin, TX",
    tags: ["Punctuality", "Quality", "Value"],
  },
  {
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    author: "John D",
    location: "Austin, TX",
    tags: ["Punctuality", "Quality", "Value"],
  },
];

export const pricingData = {
  title: "Lorem Ipsum",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.",
  productName: "Tool Name",
  price: "$142",
  priceDescription: "One-time purchase",
  guarantee: "30-day money-back guarantee, no questions asked",
  features: [
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
  ],
  additionalFeatures: [
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
  ],
};

export const blogPosts: BlogPost[] = [
  {
    id: "post-06",
    title: "Post 06",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed proin interdum enim",
    image: "/saas/images/placeholder.svg",
  },
  {
    id: "post-03",
    title: "Post 03",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed proin interdum enim",
    image: "/saas/images/placeholder.svg",
  },
  {
    id: "post-05",
    title: "Post 05",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed proin interdum enim",
    image: "/saas/images/placeholder.svg",
  },
];

export const faqs: FAQ[] = [
  {
    question: "Vel adipiscing enim magnis?",
    answer: "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.",
  },
  {
    question: "Vel adipiscing enim magnis?",
    answer: "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.",
  },
  {
    question: "Vel adipiscing enim magnis?",
    answer: "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.",
  },
  {
    question: "Vel adipiscing enim magnis?",
    answer: "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.",
  },
  {
    question: "Vel adipiscing enim magnis?",
    answer: "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.",
  },
];

export const finalCTA = {
  title: "Lorem Ipsum Dolor",
  subtitle: "Massa viverra feugiat lacus paresent. Velit.",
  buttonText: "Purchase For $199",
  buttonHref: "#pricing",
};

export const footerText = "Lorem ipsum dolor sit amet consectetur adipiscing elit Sit quis elementum vitae vitaea netus viverra";
