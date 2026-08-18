import type { EcommerceContent, EcommerceProduct } from "./content";
import { DEFAULT_SHOP_SORT_OPTIONS } from "./content";
import { ecommerceLegalSample } from "./legal-sample";
import {
  ecommerceAboutSample,
  ecommerceBlogPageSample,
  ecommerceContactSample,
} from "./pages-sample";

const CATS = ["Apparel", "Accessories", "Home", "Electronics", "Outdoor", "Beauty"] as const;
const BRANDS = ["Northline", "Harbor & Co", "Vista", "Peakform", "Lumen"] as const;

function formatPrice(value: number): string {
  return `$${value}`;
}

function makeProduct(
  index: number,
  base: string,
  overrides?: Partial<EcommerceProduct>
): EcommerceProduct {
  const category = CATS[index % CATS.length];
  const brand = BRANDS[index % BRANDS.length];
  const priceValue = [18, 28, 36, 48, 64, 89, 120, 150, 220, 340][index % 10];
  const slug = `product-${index + 1}`;
  return {
    slug,
    title: `Lorem ipsum product ${index + 1}`,
    price: formatPrice(priceValue),
    priceValue,
    category,
    brand,
    href: `${base}/product/${slug}`,
    discountBadge: index % 3 === 0 ? "15%" : undefined,
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
    ...overrides,
  };
}

const BASE = "/ecommerce";

const catalog: EcommerceProduct[] = Array.from({ length: 18 }, (_, i) => makeProduct(i, BASE));

const product = (slug: string, i: number): EcommerceProduct => {
  const p = catalog[i] || makeProduct(i, BASE);
  return { ...p, slug, href: `${BASE}/product/${slug}` };
};

export const ecommerceSampleContent: EcommerceContent = {
  siteName: "YourBrand",
  siteBase: BASE,
  metadata: {
    title: "Ecommerce Template — Home",
    description: "Master ecommerce homepage skeleton for SCAI Studio.",
  },
  favicon: "/favicon.ico",
  header: {
    logoLabel: "Logo name",
    nav: [
      { label: "Home", href: "/ecommerce" },
      { label: "Shop", href: "/ecommerce/shop" },
      { label: "Blog", href: "/ecommerce/blog" },
      { label: "Contact Us", href: "/ecommerce/contact" },
      { label: "About", href: "/ecommerce/about" },
    ],
    accountLabel: "Account",
    cartLabel: "Cart",
    cartHref: "/ecommerce/cart",
  },
  footer: {
    logoLabel: "Logo name",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
    social: [
      { label: "Facebook", href: "#", network: "facebook" },
      { label: "Twitter", href: "#", network: "twitter" },
      { label: "Instagram", href: "#", network: "instagram" },
      { label: "LinkedIn", href: "#", network: "linkedin" },
    ],
    navigation: [
      { label: "Home", href: "/ecommerce" },
      { label: "Shop", href: "/ecommerce/shop" },
      { label: "Blog", href: "/ecommerce/blog" },
      { label: "Contact", href: "/ecommerce/contact" },
      { label: "About", href: "/ecommerce/about" },
    ],
    pages: [
      { label: "Privacy Policy", href: "/ecommerce/legal/privacy-policy" },
      { label: "Shipping Policy", href: "/ecommerce/legal/shipping-policy" },
      { label: "Refund Policy", href: "/ecommerce/legal/refund-policy" },
      { label: "Terms & Conditions", href: "/ecommerce/legal/terms" },
      { label: "Disclaimer", href: "/ecommerce/legal/disclaimer" },
    ],
    contact: {
      email: "hello@yourbrand.com",
      address: "123 Market Street, City",
      phone: "+1 (555) 000-0000",
    },
    copyright: "© 2024 YourBrand. All Rights Reserved.",
    legal: [
      { label: "Terms and Conditions", href: "/ecommerce/legal/terms" },
      { label: "Privacy Policy", href: "/ecommerce/legal/privacy-policy" },
    ],
  },
  legal: ecommerceLegalSample,
  about: ecommerceAboutSample,
  blog: ecommerceBlogPageSample,
  contact: ecommerceContactSample,
  home: {
    hero: {
      title: "Lorem Ipsum Dolor Sit Amet Lorem Ipsum",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      ctaLabel: "Shop now",
      ctaHref: "/ecommerce/shop",
    },
    topProducts: {
      heading: "Top Products",
      subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      viewAllLabel: "View all products",
      viewAllHref: "/ecommerce/shop",
      items: [product("top-1", 0), product("top-2", 1), product("top-3", 2)],
    },
    featurePrimary: {
      title: "Lorem Dolor",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      bullets: [
        "Lorem ipsum dolor sit amet consectetur",
        "Ut elit tellus luctus nec ullamcorper",
      ],
      ctaLabel: "Read more",
      ctaHref: "#",
      reverse: false,
    },
    ourProducts: {
      heading: "Our Products",
      subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      viewAllLabel: "View all products",
      viewAllHref: "/ecommerce/shop",
      items: [
        product("our-1", 0),
        product("our-2", 1),
        product("our-3", 2),
        product("our-4", 3),
        product("our-5", 4),
        product("our-6", 5),
      ],
    },
    categories: {
      heading: "Browse Categories",
      subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      viewAllLabel: "View all categories",
      viewAllHref: "/ecommerce/shop",
      items: [
        {
          title: CATS[0],
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
          href: "/ecommerce/shop",
        },
        {
          title: CATS[1],
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
          href: "/ecommerce/shop",
        },
      ],
    },
    featureSecondary: {
      title: "Lorem Ipsum Dolor Sit",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      bullets: [
        "Lorem ipsum dolor sit amet consectetur",
        "Ut elit tellus luctus nec ullamcorper",
      ],
      ctaLabel: "Read more",
      ctaHref: "#",
      reverse: true,
    },
    blog: {
      heading: "Blog",
      subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      viewAllLabel: "View all blog",
      viewAllHref: "/ecommerce/blog",
      posts: ecommerceBlogPageSample.posts.slice(0, 3).map((p) => ({
        title: p.title,
        excerpt: p.excerpt,
        dateLabel: p.dateLabel,
        href: p.href,
        image: p.image,
        category: p.category,
      })),
    },
    faq: {
      heading: "Frequently Asked Questions",
      subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      items: [
        {
          question: "Lorem ipsum dolor sit amet consectetur?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        },
        {
          question: "Ut elit tellus luctus nec ullamcorper?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
        },
        {
          question: "Pulvinar dapibus leo mattis?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
        },
        {
          question: "Consectetur adipiscing elit ut?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
        },
        {
          question: "Luctus nec ullamcorper mattis?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
        },
      ],
    },
    cta: {
      title: "Lorem Ipsum Dolor Sit Amet",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
      ctaLabel: "Shop now",
      ctaHref: "/ecommerce/shop",
    },
  },
  shop: {
    title: "Shop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    searchPlaceholder: "Search An Item",
    filterHeading: "Filter By",
    categoriesHeading: "Categories",
    brandsHeading: "Brands",
    priceHeading: "Price Range",
    priceMin: 0,
    priceMax: 10000,
    priceMaxLabel: "$10,000+",
    sortLabel: "Sort by:",
    sortOptions: DEFAULT_SHOP_SORT_OPTIONS,
    defaultSort: "recommended",
    pageSize: 9,
    categories: [...CATS],
    brands: [...BRANDS],
    products: catalog,
    promo: {
      title: "Lorem Ipsum Dolor Sit Amet Lorem Ipsum",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
      ctaLabel: "Buy Now",
      ctaHref: "/ecommerce/shop",
    },
    metadata: {
      title: "Shop — Ecommerce Template",
      description: "Browse products with search, filters, and sorting.",
    },
  },
  product: {
    breadcrumbHome: "Home",
    breadcrumbShop: "All Product",
    breadcrumbCurrent: "Product Details",
    quantityLabel: "Quantity",
    colorLabel: "Color",
    sizeLabel: "Size",
    sizePlaceholder: "Select",
    addToCartLabel: "Add to Cart",
    buyNowLabel: "Buy Now",
    tabDescription: "Description",
    tabSpecifications: "Specifications",
    tabShipping: "Shipping Info",
    defaultShortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    defaultDescription: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus.",
    ],
    defaultSpecifications: [
      "Material: Premium durable blend",
      "Weight: 1.2 lbs",
      "Dimensions: 12 × 8 × 4 in",
      "Warranty: 1 year limited",
      "SKU: EC-SAMPLE-001",
    ],
    defaultShipping: [
      "Standard shipping: 5–7 business days",
      "Express shipping: 2–3 business days",
      "Free returns within 30 days",
      "International shipping available on select items",
    ],
    defaultColors: [
      { label: "Charcoal", hex: "#2a2a2a" },
      { label: "Slate", hex: "#4a4a4a" },
      { label: "Stone", hex: "#6b6b6b" },
      { label: "Ash", hex: "#8a8a8a" },
      { label: "Mist", hex: "#a3a3a3" },
    ],
    defaultSizes: ["XS", "S", "M", "L", "XL"],
    defaultRating: 5,
    defaultReviewCount: 15,
    relatedHeading: "Related Products",
    relatedSubheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reviewsHeading: "Product Reviews",
    reviewsSubheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reviews: [
      {
        title: "Lorem ipsum dolor sit",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
        author: "Alex M.",
        date: "15 Jan 2024",
        rating: 5,
      },
      {
        title: "Ut elit tellus luctus",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
        author: "Jordan K.",
        date: "12 Jan 2024",
        rating: 5,
      },
      {
        title: "Pulvinar dapibus leo",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
        author: "Sam R.",
        date: "08 Jan 2024",
        rating: 4,
      },
      {
        title: "Consectetur adipiscing",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
        author: "Taylor B.",
        date: "02 Jan 2024",
        rating: 5,
      },
      {
        title: "Nec ullamcorper mattis",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
        author: "Casey L.",
        date: "28 Dec 2023",
        rating: 5,
      },
      {
        title: "Dolor sit amet",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
        author: "Riley P.",
        date: "20 Dec 2023",
        rating: 4,
      },
    ],
    faqHeading: "Frequently Asked Questions",
    faqSubheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    faq: [
      {
        question: "Lorem ipsum dolor sit amet consectetur?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      },
      {
        question: "Ut elit tellus luctus nec ullamcorper?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
      },
      {
        question: "Pulvinar dapibus leo mattis?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
      },
      {
        question: "Consectetur adipiscing elit ut?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
      },
      {
        question: "Luctus nec ullamcorper mattis?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
      },
    ],
    cta: {
      title: "Lorem Ipsum Dolor Sit Amet Lorem Ipsum",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
      ctaLabel: "Shop now",
      ctaHref: "/ecommerce/shop",
    },
  },
  cart: {
    title: "Shopping Cart",
    totalLabel: "Total:",
    checkoutLabel: "Proceed to Checkout",
    emptyTitle: "Your Cart is Empty",
    emptyCtaLabel: "Explore Products",
    emptyCtaHref: "/ecommerce/shop",
    currencyPrefix: "$",
  },
  checkout: {
    summaryTitle: "Order Summary",
    subtotalLabel: "Subtotal",
    shippingLabel: "Shipping",
    taxesLabel: "Taxes",
    totalLabel: "Total",
    currencyPrefix: "$",
    taxAmount: 0.99,
    step1Title: "Shipping Address",
    step2Title: "Payment Details",
    step3Title: "Review Your Order",
    nextLabel: "Next",
    previousLabel: "Previous",
    placeOrderLabel: "Place Order",
    editLabel: "Edit",
    shippingToLabel: "Shipping To",
    paymentMethodLabel: "Payment Method",
    emptyTitle: "Your cart is empty",
    emptyCtaLabel: "Explore Products",
    emptyCtaHref: "/ecommerce/shop",
    successModal: {
      title: "Thank You For Your Order!",
      body: "Your order has been placed successfully. A confirmation email with your order details has been sent to your inbox.",
      orderNumberLabel: "Order Number:",
      trackingNumberLabel: "Tracking Number:",
      orderTotalLabel: "Order Total:",
      sampleOrderNumber: "#AIB-17012024",
      sampleTrackingNumber: "1Z999AA10123456784",
      receiptNote:
        "We've also sent a detailed receipt and order summary to your email address.",
      continueLabel: "Continue Shopping",
      trackLabel: "Track Your Order",
    },
    failedModal: {
      title: "Transaction Failed",
      body: "We were unable to process your payment. Please review the details below and try again.",
      statusLabel: "Status:",
      statusValue: "Declined",
      paymentMethodLabel: "Payment Method:",
      samplePaymentMethod: "Visa **** 4242",
      helpNote:
        "If the problem persists, please contact your bank or use a different payment method.",
      tryAgainLabel: "Try Again",
      supportLabel: "Contact Support",
      supportHref: "/ecommerce/contact",
    },
    labels: {
      fullName: "Full name",
      email: "Email Address",
      address: "Address",
      city: "City",
      zip: "ZIP / Postal Code",
      country: "Country",
      phone: "Phone (Optional)",
      nameOnCard: "Name on Card",
      cardNumber: "Card Number",
      expiration: "Expiration Date (MM/YY)",
      cvc: "CVC",
      shippingMethod: "Shipping Method",
    },
    placeholders: {
      fullName: "John Doe",
      email: "john@example.com",
      address: "1234 Elm Street, Apt 56B",
      city: "Springfield",
      zip: "62704",
      country: "United States",
      phone: "+1 (555) 000-0000",
      nameOnCard: "John M. Doe",
      cardNumber: "1234 5678 9876 5432",
      expiration: "12/25",
      cvc: "129",
    },
    shippingMethods: [
      {
        id: "free",
        label: "Free Shipping",
        detail: "5-7 Business Days",
        price: 0,
        priceLabel: "$0.00",
      },
      {
        id: "standard",
        label: "Standard Shipping",
        detail: "3-4 Business Days",
        price: 9.99,
        priceLabel: "$9.99",
      },
      {
        id: "express",
        label: "Express Shipping",
        detail: "1-2 Business Days",
        price: 19.99,
        priceLabel: "$19.99",
      },
    ],
  },
  track: {
    title: "Track Your Order",
    description:
      "Enter your order ID and email address below to see the latest status and tracking details for your shipment.",
    orderIdLabel: "Order ID",
    emailLabel: "Email Address",
    orderIdPlaceholder: "#AIB-17012024",
    emailPlaceholder: "you@example.com",
    submitLabel: "Track Order",
    placedAtPrefix: "Order Placed At",
    orderNumberPrefix: "Order",
    orderPlacedLabel: "Order Placed",
    shippingToLabel: "Shipping To",
    subtotalLabel: "Subtotal",
    shippingLabel: "Shipping",
    taxesLabel: "Taxes",
    totalLabel: "Total Cost",
    currencyPrefix: "$",
    statusSteps: [
      { id: "placed", label: "Order Placed" },
      { id: "processing", label: "Processing" },
      { id: "shipped", label: "Shipped" },
      { id: "delivered", label: "Delivered" },
    ],
    notFoundTitle: "Order Not Found",
    notFoundBody: [
      "Please double-check your Order ID and email address, ensuring that both are entered correctly.",
      "If the problem persists, kindly verify the details with the confirmation email you received or contact our customer support for further assistance.",
    ],
    tryAgainLabel: "Try Again",
    sampleOrder: {
      orderId: "#AIB-17012024",
      email: "you@example.com",
      placedAtLabel: "Thu, Jun 22",
      placedDate: "12 July 2021",
      shippingAddress: "2013 Roger Street Courtenay, BC V9N 2J6",
      currentStep: 2,
      items: catalog.slice(0, 3).map((p, i) => ({
        title: p.title,
        subtitle: "Subtext Lorem Ipsum",
        price: p.price,
        priceValue: p.priceValue,
        image: p.image,
      })),
      subtotal: 148.45,
      shipping: 9.99,
      taxes: 11.88,
      total: 170.32,
    },
    metadata: {
      title: "Track Your Order — Ecommerce Template",
      description: "Look up shipment status with your order ID and email.",
    },
  },
};
