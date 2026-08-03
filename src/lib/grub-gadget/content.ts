export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  category: string; // category slug
}

export const articles: Article[] = [
  {
    id: "1",
    title: "How to reheat fried chicken in toaster oven?",
    excerpt: "To reheat fried chicken in a toaster oven, follow these simple steps. First, preheat your toaster oven to 400°F. Place the chicken on a baking sheet and heat for 10-15 minutes until crispy and warmed through.",
    image: "/grub-gadget/images/placeholder.svg",
    slug: "reheat-fried-chicken-toaster-oven",
    category: "toasters"
  },
  {
    id: "2",
    title: "How to clean a breville toaster oven?",
    excerpt: "To clean a Breville toaster oven, start by unplugging it and allowing it to cool completely. Remove all removable parts like the crumb tray and racks. Wash them with warm soapy water, then wipe the interior with a damp cloth.",
    image: "/grub-gadget/images/placeholder.svg",
    slug: "clean-breville-toaster-oven",
    category: "guides"
  },
  {
    id: "3",
    title: "How to microwave toaster strudels?",
    excerpt: "To microwave toaster strudels, place them on a microwave-safe plate and heat on high for 30 seconds. Flip and heat for another 30 seconds until warmed through. Let cool slightly before adding the icing packet.",
    image: "/grub-gadget/images/placeholder.svg",
    slug: "microwave-toaster-strudels",
    category: "microwave"
  },
  {
    id: "4",
    title: "How to cook chicken breast in toaster oven?",
    excerpt: "To cook chicken breast in a toaster oven, preheat to 375°F. Season your chicken and place it on a baking sheet. Cook for 20-25 minutes or until the internal temperature reaches 165°F for perfectly juicy chicken.",
    image: "/grub-gadget/images/placeholder.svg",
    slug: "cook-chicken-breast-toaster-oven",
    category: "toasters"
  },
  {
    id: "5",
    title: "How many minutes to toast in bread in toaster oven?",
    excerpt: "Toasting bread in a toaster oven typically takes between 3-5 minutes, depending on how dark you like it. Start by checking at 3 minutes and adjust the time to achieve your desired level of crispiness and color.",
    image: "/grub-gadget/images/placeholder.svg",
    slug: "toast-bread-toaster-oven-time",
    category: "guides"
  },
  {
    id: "6",
    title: "How to cook chicken in a toaster oven?",
    excerpt: "Cooking chicken in a toaster oven is quick and easy. Preheat to 375°F, season your chicken pieces, and cook for 25-30 minutes. Use a meat thermometer to ensure it reaches 165°F internal temperature for safe eating.",
    image: "/grub-gadget/images/placeholder.svg",
    slug: "cook-chicken-toaster-oven",
    category: "toasters"
  },
  {
    id: "7",
    title: "How long do toaster ovens last?",
    excerpt: "Toaster ovens can last anywhere from 5 to 10 years with proper care and maintenance. The lifespan depends on the quality of the appliance and how often you use it. Regular cleaning and following manufacturer guidelines can help extend its life.",
    image: "/grub-gadget/images/placeholder.svg",
    slug: "toaster-ovens-lifespan",
    category: "our-reviews"
  },
  {
    id: "8",
    title: "How to make a grilled cheese in a toaster oven?",
    excerpt: "To make a grilled cheese in a toaster oven, butter both sides of bread, add your favorite cheese and assemble. Place on a baking sheet and toast at 375°F for 4-5 minutes per side until golden brown and the cheese melts perfectly.",
    image: "/grub-gadget/images/placeholder.svg",
    slug: "make-grilled-cheese-toaster-oven",
    category: "cookware"
  }
];

export interface Category {
  label: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  { label: "OUR REVIEWS", slug: "our-reviews", description: "In-depth reviews of kitchen appliances and gadgets" },
  { label: "EXCLUSIVE", slug: "exclusive", description: "Exclusive content and insider tips" },
  { label: "GUIDES", slug: "guides", description: "Comprehensive guides for cooking and appliances" },
  { label: "MICROWAVE", slug: "microwave", description: "Everything about microwave cooking" },
  { label: "WALLS", slug: "walls", description: "Wall-mounted kitchen solutions" },
  { label: "TOASTERS", slug: "toasters", description: "Toaster oven tips, tricks, and reviews" },
  { label: "OTHER", slug: "other", description: "Other kitchen gadgets and tips" },
  { label: "COOKWARE", slug: "cookware", description: "Cookware reviews and cooking tips" }
];

export const navLinks = categories.map(cat => ({
  label: cat.label,
  href: `/grub-gadget/category/${cat.slug}`
}));

export const popularTags = [
  "Air fryer", "Air fryer oven", "Baking", "Breading",
  "Breville oven", "Calphalon", "Cast iron pan",
  "Chicken", "Chicken wings", "Chimichurri",
  "Cooking utensils", "Crab legs", "Cuisinart",
  "Enamel cast iron", "French toast", "Garlic powder",
  "George Foreman", "Grilled cheese", "Hamilton Beach",
  "Instant Pot", "Lodge cast iron", "Microwaving",
  "Ninja Foodi", "Oster", "Panini press",
  "Pizza", "Preheating", "Pressure cooker",
  "Reheating", "Salmon", "Smoker",
  "Stainless steel cookware", "Toaster ovens",
  "Toasting", "Waffle iron", "Warming"
];

export const footerLinks = {
  featured: [
    { label: "FAQ", href: "/grub-gadget/faq" },
    { label: "Privacy Policy", href: "/grub-gadget/privacy" },
    { label: "Terms of Service", href: "/grub-gadget/terms" },
    { label: "Do Not Sell My Info", href: "/grub-gadget/do-not-sell" }
  ],
  links: [
    { label: "About", href: "/grub-gadget/about" },
    { label: "Contact", href: "/grub-gadget/contact" },
    { label: "Cookies", href: "/grub-gadget/cookies" },
    { label: "Terms and conditions", href: "/grub-gadget/terms" }
  ]
};

export const siteContent = {
  about: "We at Grub Gadget are dedicated to helping you make the most of your kitchen appliances. Our content is carefully crafted, written, and reviewed by our team of cooking enthusiasts and appliance experts. We aim to provide relevant information about kitchen gadgets, cooking techniques, and appliance maintenance to help you cook better, save time, and get the most value from your kitchen investments.",
  legal: "The information provided on Grub Gadget is intended for general guidance and may not cover every aspect of cooking in detail. For any specific safety concerns or technical details, please consult the official user manuals, manufacturers' websites, or seek expert advice."
};
