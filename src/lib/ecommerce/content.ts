/**
 * Content contract for the ecommerce master template.
 * One shape, filled per site. Components only read this interface.
 * Extend with shop / product / cart — do not fork providers.
 */

export interface EcommerceNavLink {
  label: string;
  href: string;
}

export interface EcommerceProduct {
  slug: string;
  title: string;
  price: string;
  /** Numeric price for filter/sort (dollars). */
  priceValue: number;
  category: string;
  brand: string;
  image?: string;
  href: string;
  /** PDP fields (optional — page falls back to product page defaults) */
  shortDescription?: string;
  rating?: number;
  reviewCount?: number;
  gallery?: string[];
  colors?: { label: string; hex: string }[];
  sizes?: string[];
  descriptionParagraphs?: string[];
  specifications?: string[];
  shippingInfo?: string[];
  discountBadge?: string;
}

export interface EcommerceCategory {
  title: string;
  description: string;
  href: string;
  image?: string;
}

export interface EcommerceBlogPost {
  title: string;
  excerpt: string;
  dateLabel: string;
  href: string;
  image?: string;
  category?: string;
}

export interface EcommerceFaqItem {
  question: string;
  answer: string;
}

export interface EcommerceFeatureBlock {
  title: string;
  body: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  image?: string;
  /** text-left / image-right vs image-left / text-right */
  reverse?: boolean;
}

export interface EcommerceSocialLink {
  label: string;
  href: string;
  network: "facebook" | "twitter" | "instagram" | "linkedin";
}

export type EcommerceSortOption =
  | "recommended"
  | "newest"
  | "price-desc"
  | "price-asc"
  | "name-asc"
  | "name-desc";

export interface EcommerceShopContent {
  title: string;
  description: string;
  searchPlaceholder: string;
  filterHeading: string;
  categoriesHeading: string;
  brandsHeading: string;
  priceHeading: string;
  priceMin: number;
  priceMax: number;
  priceMaxLabel: string;
  sortLabel: string;
  sortOptions: { value: EcommerceSortOption; label: string }[];
  defaultSort: EcommerceSortOption;
  pageSize: number;
  categories: string[];
  brands: string[];
  products: EcommerceProduct[];
  promo: {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    image?: string;
  };
  metadata: {
    title: string;
    description: string;
  };
}

export interface EcommerceContent {
  siteName: string;
  siteBase: string;
  metadata: {
    title: string;
    description: string;
  };
  favicon: string;
  header: {
    logoLabel: string;
    nav: EcommerceNavLink[];
    accountLabel: string;
    cartLabel: string;
    cartHref: string;
  };
  footer: {
    logoLabel: string;
    blurb: string;
    social: EcommerceSocialLink[];
    navigation: EcommerceNavLink[];
    pages: EcommerceNavLink[];
    contact: {
      email: string;
      address: string;
      phone: string;
    };
    copyright: string;
    legal: EcommerceNavLink[];
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      ctaLabel: string;
      ctaHref: string;
      image?: string;
    };
    topProducts: {
      heading: string;
      subheading: string;
      viewAllLabel: string;
      viewAllHref: string;
      items: EcommerceProduct[];
    };
    featurePrimary: EcommerceFeatureBlock;
    ourProducts: {
      heading: string;
      subheading: string;
      viewAllLabel: string;
      viewAllHref: string;
      items: EcommerceProduct[];
    };
    categories: {
      heading: string;
      subheading: string;
      viewAllLabel: string;
      viewAllHref: string;
      items: EcommerceCategory[];
    };
    featureSecondary: EcommerceFeatureBlock;
    blog: {
      heading: string;
      subheading: string;
      viewAllLabel: string;
      viewAllHref: string;
      posts: EcommerceBlogPost[];
    };
    faq: {
      heading: string;
      subheading: string;
      items: EcommerceFaqItem[];
    };
    cta: {
      title: string;
      body: string;
      ctaLabel: string;
      ctaHref: string;
      image?: string;
    };
  };
  /** Product listing page (PLP) */
  shop: EcommerceShopContent;
  /** Single product detail page (PDP) chrome + shared sections */
  product: EcommerceProductPageContent;
  /** Cart drawer chrome (empty + filled) */
  cart: EcommerceCartContent;
  /** Multi-step checkout (shipping → payment → review) */
  checkout: EcommerceCheckoutContent;
  /** Order tracking lookup + detail + not-found */
  track: EcommerceTrackContent;
  /** Legal / policy pages (shipping, refund, terms, privacy, disclaimer) */
  legal: EcommerceLegalContent;
  /** About Us page */
  about: EcommerceAboutContent;
  /** Blog index + article bodies */
  blog: EcommerceBlogPageContent;
  /** Contact Us page */
  contact: EcommerceContactContent;
}

export interface EcommerceAboutSection {
  title: string;
  body: string;
  bullets: string[];
  image?: string;
  /** Image on left when true */
  reverse?: boolean;
  /** Use checkmark bullets */
  checkStyle?: boolean;
}

export interface EcommerceAboutContent {
  title: string;
  description: string;
  sections: EcommerceAboutSection[];
  blogHeading: string;
  blogSubheading: string;
  blogViewMoreLabel: string;
  metadata: {
    title: string;
    description: string;
  };
}

export type EcommerceBlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src?: string; alt?: string }
  | {
      type: "cta";
      title: string;
      body: string;
      ctaLabel: string;
      ctaHref: string;
      image?: string;
    };

export interface EcommerceBlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  dateLabel: string;
  dateFull: string;
  image?: string;
  href: string;
  body: EcommerceBlogBlock[];
}

export interface EcommerceBlogPageContent {
  title: string;
  description: string;
  allPostsLabel: string;
  categories: string[];
  loadMoreLabel: string;
  readMoreLabel: string;
  pageSize: number;
  posts: EcommerceBlogArticle[];
  relatedHeading: string;
  relatedSubheading: string;
  metadata: {
    title: string;
    description: string;
  };
}

export interface EcommerceContactContent {
  title: string;
  description: string;
  infoHeading: string;
  infoBody: string;
  infoBullets: string[];
  hours: string;
  email: string;
  phones: string;
  address: string;
  form: {
    firstNameLabel: string;
    lastNameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    locationPlaceholder: string;
    locations: string[];
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
  };
  successMessage: string;
  metadata: {
    title: string;
    description: string;
  };
}

export type EcommerceLegalSlug =
  | "shipping-policy"
  | "refund-policy"
  | "terms"
  | "privacy-policy"
  | "disclaimer";

export interface EcommerceLegalSection {
  heading: string;
  /** Bullet or numbered list items */
  items: string[];
  /** Default unordered; use ordered for step lists */
  listStyle?: "ul" | "ol";
}

export interface EcommerceLegalPage {
  slug: EcommerceLegalSlug;
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: EcommerceLegalSection[];
  metadata: {
    title: string;
    description: string;
  };
}

export interface EcommerceLegalContent {
  lastUpdatedPrefix: string;
  pages: EcommerceLegalPage[];
}

export interface EcommerceTrackStatusStep {
  id: string;
  label: string;
}

export interface EcommerceTrackOrderItem {
  title: string;
  subtitle: string;
  price: string;
  priceValue: number;
  image?: string;
}

export interface EcommerceTrackSampleOrder {
  orderId: string;
  email: string;
  placedAtLabel: string;
  placedDate: string;
  shippingAddress: string;
  /** 1-based index of current status step (1 = Order Placed) */
  currentStep: number;
  items: EcommerceTrackOrderItem[];
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
}

export interface EcommerceTrackContent {
  title: string;
  description: string;
  orderIdLabel: string;
  emailLabel: string;
  orderIdPlaceholder: string;
  emailPlaceholder: string;
  submitLabel: string;
  placedAtPrefix: string;
  orderNumberPrefix: string;
  orderPlacedLabel: string;
  shippingToLabel: string;
  subtotalLabel: string;
  shippingLabel: string;
  taxesLabel: string;
  totalLabel: string;
  currencyPrefix: string;
  statusSteps: EcommerceTrackStatusStep[];
  notFoundTitle: string;
  notFoundBody: string[];
  tryAgainLabel: string;
  sampleOrder: EcommerceTrackSampleOrder;
  metadata: {
    title: string;
    description: string;
  };
}

export interface EcommerceShippingMethod {
  id: string;
  label: string;
  detail: string;
  price: number;
  priceLabel: string;
}

export interface EcommerceCheckoutSuccessModal {
  title: string;
  body: string;
  orderNumberLabel: string;
  trackingNumberLabel: string;
  orderTotalLabel: string;
  /** Demo order number shown after place order */
  sampleOrderNumber: string;
  /** Demo tracking number */
  sampleTrackingNumber: string;
  receiptNote: string;
  continueLabel: string;
  trackLabel: string;
}

export interface EcommerceCheckoutFailedModal {
  title: string;
  body: string;
  statusLabel: string;
  statusValue: string;
  paymentMethodLabel: string;
  /** Masked card shown when payment form has digits; fallback otherwise */
  samplePaymentMethod: string;
  helpNote: string;
  tryAgainLabel: string;
  supportLabel: string;
  supportHref: string;
}

export interface EcommerceCheckoutContent {
  summaryTitle: string;
  subtotalLabel: string;
  shippingLabel: string;
  taxesLabel: string;
  totalLabel: string;
  currencyPrefix: string;
  /** Flat tax amount used in summary demo math */
  taxAmount: number;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  nextLabel: string;
  previousLabel: string;
  placeOrderLabel: string;
  editLabel: string;
  shippingToLabel: string;
  paymentMethodLabel: string;
  emptyTitle: string;
  emptyCtaLabel: string;
  emptyCtaHref: string;
  /** Thank-you modal after successful place order */
  successModal: EcommerceCheckoutSuccessModal;
  /** Payment declined / transaction failed modal */
  failedModal: EcommerceCheckoutFailedModal;
  labels: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
    nameOnCard: string;
    cardNumber: string;
    expiration: string;
    cvc: string;
    shippingMethod: string;
  };
  placeholders: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
    nameOnCard: string;
    cardNumber: string;
    expiration: string;
    cvc: string;
  };
  shippingMethods: EcommerceShippingMethod[];
}

export interface EcommerceCartContent {
  title: string;
  totalLabel: string;
  checkoutLabel: string;
  emptyTitle: string;
  emptyCtaLabel: string;
  emptyCtaHref: string;
  currencyPrefix: string;
}

export interface EcommerceProductReview {
  title: string;
  body: string;
  author: string;
  date: string;
  rating: number;
}

export interface EcommerceProductPageContent {
  breadcrumbHome: string;
  breadcrumbShop: string;
  breadcrumbCurrent: string;
  quantityLabel: string;
  colorLabel: string;
  sizeLabel: string;
  sizePlaceholder: string;
  addToCartLabel: string;
  buyNowLabel: string;
  tabDescription: string;
  tabSpecifications: string;
  tabShipping: string;
  /** Fallback copy when a catalog product lacks detail fields */
  defaultShortDescription: string;
  defaultDescription: string[];
  defaultSpecifications: string[];
  defaultShipping: string[];
  defaultColors: { label: string; hex: string }[];
  defaultSizes: string[];
  defaultRating: number;
  defaultReviewCount: number;
  relatedHeading: string;
  relatedSubheading: string;
  reviewsHeading: string;
  reviewsSubheading: string;
  reviews: EcommerceProductReview[];
  faqHeading: string;
  faqSubheading: string;
  faq: EcommerceFaqItem[];
  cta: {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    image?: string;
  };
}

export const DEFAULT_SHOP_SORT_OPTIONS: EcommerceShopContent["sortOptions"] = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "price-desc", label: "Price (high to low)" },
  { value: "price-asc", label: "Price (low to high)" },
  { value: "name-asc", label: "Name A - Z" },
  { value: "name-desc", label: "Name Z - A" },
];
