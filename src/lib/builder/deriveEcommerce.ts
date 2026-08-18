import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";
import type {
  EcommerceContent,
  EcommerceFaqItem,
  EcommerceLegalContent,
  EcommerceProduct,
} from "@/lib/ecommerce/content";
import { DEFAULT_SHOP_SORT_OPTIONS } from "@/lib/ecommerce/content";
import { defaultEcommerceTheme, type EcommerceTheme } from "@/lib/ecommerce/theme";
import type { BuilderDraft } from "./schema";
import {
  slugify,
  DEFAULT_ECOMMERCE_CATEGORIES,
  DEFAULT_ECOMMERCE_ENABLED_PAGES,
} from "./schema";
import { getNicheLabel, getToneLabel, getPhotoSearchNiche } from "./presets";
import {
  renderFaviconFromCustomization,
  renderLogoFromCustomization,
} from "./logoCustomization";
import { stockPhotoUrl } from "./stockPhotos";
import type { ContentBlock } from "./contentBlocks";

const DEFAULT_BRANDS = ["Northline", "Harbor & Co", "Vista", "Peakform", "Lumen"];

function customizeLegalPages(
  legal: EcommerceLegalContent,
  opts: { siteName: string; email: string }
): EcommerceLegalContent {
  const replace = (text: string) =>
    text
      .replaceAll("YourBrand", opts.siteName)
      .replaceAll("hello@yourbrand.com", opts.email);

  return {
    ...legal,
    pages: legal.pages.map((page) => ({
      ...page,
      intro: page.intro ? replace(page.intro) : page.intro,
      sections: page.sections.map((section) => ({
        ...section,
        items: section.items.map(replace),
      })),
      metadata: {
        title: replace(page.metadata.title).replace(
          "Ecommerce Template",
          opts.siteName
        ),
        description: replace(page.metadata.description),
      },
    })),
  };
}

function resolveFavicon(draft: BuilderDraft): string {
  if (draft.favicon) return draft.favicon;
  if (draft.logoCustomization) return renderFaviconFromCustomization(draft.logoCustomization);
  return ecommerceSampleContent.favicon;
}

function faqFromBlocks(blocks: ContentBlock[] | undefined): EcommerceFaqItem[] | null {
  if (!blocks?.length) return null;
  const items = blocks
    .filter((b): b is Extract<ContentBlock, { type: "faqItem" }> => b.type === "faqItem")
    .map((b) => ({ question: b.question, answer: b.answer }));
  return items.length ? items : null;
}

function formatPrice(value: number): string {
  return `$${value}`;
}

function productFrom(opts: {
  title: string;
  slug: string;
  category: string;
  brand: string;
  priceValue: number;
  base: string;
  image?: string;
}): EcommerceProduct {
  return {
    slug: opts.slug,
    title: opts.title,
    price: formatPrice(opts.priceValue),
    priceValue: opts.priceValue,
    category: opts.category,
    brand: opts.brand,
    image: opts.image,
    href: `${opts.base}/product/${opts.slug}`,
  };
}

/**
 * Map a Studio draft onto the ecommerce skeleton (home + shop).
 * Unset fields keep sample placeholders so pages never collapse.
 */
export function deriveEcommerceContent(draft: BuilderDraft): EcommerceContent {
  const niche = getNicheLabel(draft.niche, draft.nicheCustom);
  const photoNiche = getPhotoSearchNiche(draft);
  const tone = getToneLabel(draft.tone).toLowerCase();
  const base = `/${draft.slug}`;
  const siteName = draft.siteName;
  const ctaLabel = draft.hero?.button || ecommerceSampleContent.home.hero.ctaLabel;
  const shopHref = `${base}/shop`;
  const cartHref = `${base}/cart`;
  const pages = { ...DEFAULT_ECOMMERCE_ENABLED_PAGES, ...draft.enabledPages };

  const categorySeed =
    draft.categories?.length
      ? draft.categories
      : DEFAULT_ECOMMERCE_CATEGORIES.map((c) => ({ ...c, description: "" }));

  const categoryLabels = categorySeed.map((c) => c.label);
  const productImages = draft.templateImages?.services || [];
  const priceLadder = [18, 28, 36, 48, 64, 89, 120, 150, 220, 340, 420, 560];

  // Expand catalog for PLP: cycle categories × brands for ~12–18 items
  const catalog: EcommerceProduct[] = [];
  const targetCount = Math.max(12, categoryLabels.length * 2);
  for (let i = 0; i < targetCount; i++) {
    const cat = categorySeed[i % categorySeed.length];
    const brand = DEFAULT_BRANDS[i % DEFAULT_BRANDS.length];
    const titleBase = cat.label;
    const slug = `${slugify(cat.label) || "product"}-${i + 1}`;
    catalog.push(
      productFrom({
        title: `${titleBase} ${i + 1}`,
        slug,
        category: cat.label,
        brand,
        priceValue: priceLadder[i % priceLadder.length],
        base,
        image:
          productImages[i % Math.max(productImages.length, 1)] ||
          stockPhotoUrl(`${photoNiche} ${titleBase}`, photoNiche, "categoryTile"),
      })
    );
    catalog[catalog.length - 1] = {
      ...catalog[catalog.length - 1],
      shortDescription:
        cat.description ||
        `${titleBase} from ${siteName} — a ${tone} pick for ${niche.toLowerCase()} shoppers.`,
      discountBadge: i % 3 === 0 ? "15%" : undefined,
    };
  }

  const topProducts = catalog.slice(0, 3);
  const ourProducts = catalog.slice(0, 6);

  const browseCategories = categorySeed.slice(0, 4).map((cat, i) => ({
    title: cat.label,
    description:
      cat.description ||
      `Shop ${cat.label.toLowerCase()} from ${siteName} — curated for ${photoNiche.toLowerCase()}.`,
    href: shopHref,
    image:
      productImages[i] ||
      stockPhotoUrl(`${photoNiche} ${cat.label}`, photoNiche, "categoryTile"),
  }));

  const faqPage = draft.pages?.faq;
  const faqBlocks = faqFromBlocks(
    typeof faqPage === "object" && faqPage && "blocks" in faqPage
      ? (faqPage.blocks as ContentBlock[] | undefined)
      : undefined
  );
  const faqs =
    faqBlocks ||
    ecommerceSampleContent.home.faq.items.map((f, i) =>
      i === 0
        ? {
            question: `What does ${siteName} sell?`,
            answer:
              draft.description ||
              `${siteName} offers ${tone} ${niche.toLowerCase()} products with a simple shopping experience.`,
          }
        : f
    );

  const blogPagePosts =
    draft.articles?.length
      ? draft.articles.slice(0, 9).map((a, i) => {
          const sample = ecommerceSampleContent.blog.posts[i % ecommerceSampleContent.blog.posts.length];
          const slug = slugify(a.title) || `post-${i + 1}`;
          return {
            ...sample,
            slug,
            title: a.title,
            excerpt: a.excerpt || sample.excerpt,
            href: `${base}/blog/${slug}`,
            image: a.image || stockPhotoUrl(`${photoNiche} ${a.title}`, photoNiche, "articleThumbnail"),
            category: ecommerceSampleContent.blog.categories[i % ecommerceSampleContent.blog.categories.length],
            body: sample.body.map((block) =>
              block.type === "cta"
                ? { ...block, ctaHref: shopHref }
                : block
            ),
          };
        })
      : ecommerceSampleContent.blog.posts.map((p, i) => ({
          ...p,
          href: `${base}/blog/${p.slug}`,
          image: stockPhotoUrl(`${photoNiche} ${p.title}`, photoNiche, "articleThumbnail"),
          body: p.body.map((block) =>
            block.type === "cta" ? { ...block, ctaHref: shopHref } : block
          ),
          category: p.category || ecommerceSampleContent.blog.categories[i % ecommerceSampleContent.blog.categories.length],
        }));

  const blogPosts = blogPagePosts.slice(0, 3).map((p) => ({
    title: p.title,
    excerpt: p.excerpt,
    dateLabel: p.dateLabel,
    href: p.href,
    image: p.image,
    category: p.category,
  }));

  const heroImage =
    draft.templateImages?.heroBackground ||
    draft.templateImages?.hero ||
    draft.hero?.background ||
    stockPhotoUrl(`${photoNiche} products`, photoNiche, "hero");

  const about =
    draft.sidebar?.about ||
    draft.description ||
    `${siteName} is a ${tone} ${niche.toLowerCase()} store built for easy browsing and checkout.`;

  const featureBullets = categorySeed.slice(0, 2).map((c) => c.label);

  return {
    ...ecommerceSampleContent,
    siteName,
    siteBase: base,
    metadata: {
      title: `${siteName} | ${niche}`,
      description:
        draft.description ||
        `${siteName} — shop ${niche.toLowerCase()} online with a clean, modern storefront.`,
    },
    favicon: resolveFavicon(draft),
    header: {
      ...ecommerceSampleContent.header,
      logoLabel: siteName,
      nav: [
        { label: "Home", href: base },
        { label: "Shop", href: shopHref },
        ...(pages.blog !== false ? [{ label: "Blog", href: `${base}/blog` }] : []),
        ...(pages.contact !== false
          ? [{ label: "Contact Us", href: `${base}/contact` }]
          : []),
        ...(pages.about !== false ? [{ label: "About", href: `${base}/about` }] : []),
      ],
      cartHref,
    },
    footer: {
      ...ecommerceSampleContent.footer,
      logoLabel: siteName,
      blurb: draft.footer?.newsletterText || about,
      navigation: [
        { label: "Home", href: base },
        { label: "Shop", href: shopHref },
        ...(pages.blog !== false ? [{ label: "Blog", href: `${base}/blog` }] : []),
        ...(pages.contact !== false
          ? [{ label: "Contact", href: `${base}/contact` }]
          : []),
        ...(pages.about !== false ? [{ label: "About", href: `${base}/about` }] : []),
      ],
      pages: [
        ...(pages.privacy !== false
          ? [{ label: "Privacy Policy", href: `${base}/legal/privacy-policy` }]
          : []),
        ...(pages.shipping !== false
          ? [{ label: "Shipping Policy", href: `${base}/legal/shipping-policy` }]
          : []),
        ...(pages.refund !== false
          ? [{ label: "Refund Policy", href: `${base}/legal/refund-policy` }]
          : []),
        ...(pages.terms !== false
          ? [{ label: "Terms & Conditions", href: `${base}/legal/terms` }]
          : []),
        ...(pages.disclaimer !== false
          ? [{ label: "Disclaimer", href: `${base}/legal/disclaimer` }]
          : []),
      ],
      legal: [
        ...(pages.terms !== false
          ? [{ label: "Terms and Conditions", href: `${base}/legal/terms` }]
          : []),
        ...(pages.privacy !== false
          ? [{ label: "Privacy Policy", href: `${base}/legal/privacy-policy` }]
          : []),
      ],
      contact: {
        ...ecommerceSampleContent.footer.contact,
      },
      copyright: draft.footer?.copyright || `© ${new Date().getFullYear()} ${siteName}. All Rights Reserved.`,
    },
    legal: customizeLegalPages(
      {
        ...ecommerceSampleContent.legal,
        pages: ecommerceSampleContent.legal.pages.filter((p) => {
          if (p.slug === "shipping-policy") return pages.shipping !== false;
          if (p.slug === "refund-policy") return pages.refund !== false;
          if (p.slug === "terms") return pages.terms !== false;
          if (p.slug === "privacy-policy") return pages.privacy !== false;
          if (p.slug === "disclaimer") return pages.disclaimer !== false;
          return true;
        }),
      },
      {
        siteName,
        email: ecommerceSampleContent.footer.contact.email,
      }
    ),
    home: {
      ...ecommerceSampleContent.home,
      hero: {
        title: draft.hero?.title || `${siteName} — ${niche}`,
        subtitle:
          draft.hero?.subtitle ||
          `Discover ${tone} ${niche.toLowerCase()} products curated for everyday shopping.`,
        ctaLabel,
        ctaHref: shopHref,
        image: heroImage,
      },
      topProducts: {
        heading: "Top Products",
        subheading: `Popular picks from ${siteName}.`,
        viewAllLabel: "View all products",
        viewAllHref: shopHref,
        items: topProducts,
      },
      featurePrimary: {
        ...ecommerceSampleContent.home.featurePrimary,
        title: `Why ${siteName}`,
        body: about,
        bullets:
          featureBullets.length >= 2
            ? featureBullets
            : ecommerceSampleContent.home.featurePrimary.bullets,
        ctaLabel: "Read more",
        ctaHref: `${base}/about`,
        image: productImages[0] || heroImage,
        reverse: false,
      },
      ourProducts: {
        heading: "Our Products",
        subheading: `Explore the ${siteName} collection.`,
        viewAllLabel: "View all products",
        viewAllHref: shopHref,
        items: ourProducts,
      },
      categories: {
        heading: "Browse Categories",
        subheading: `Shop by category at ${siteName}.`,
        viewAllLabel: "View all categories",
        viewAllHref: shopHref,
        items: browseCategories,
      },
      featureSecondary: {
        ...ecommerceSampleContent.home.featureSecondary,
        title: `Shop ${niche}`,
        body:
          draft.description ||
          `${siteName} makes it easy to find ${niche.toLowerCase()} essentials with a clear catalog and cart.`,
        bullets:
          featureBullets.length >= 2
            ? featureBullets
            : ecommerceSampleContent.home.featureSecondary.bullets,
        ctaLabel: ctaLabel,
        ctaHref: shopHref,
        image: productImages[1] || heroImage,
        reverse: true,
      },
      blog: {
        heading: "Blog",
        subheading: `Tips and updates from ${siteName}.`,
        viewAllLabel: "View all blog",
        viewAllHref: `${base}/blog`,
        posts: blogPosts,
      },
      faq: {
        heading: "Frequently Asked Questions",
        subheading: `Common questions about shopping with ${siteName}.`,
        items: faqs.slice(0, 5),
      },
      cta: {
        title: `Ready to shop ${siteName}?`,
        body: `Browse the full catalog and find your next favorite.`,
        ctaLabel,
        ctaHref: shopHref,
        image: productImages[2] || heroImage,
      },
    },
    shop: {
      title: "Shop",
      description:
        draft.description ||
        `Browse ${siteName}'s ${niche.toLowerCase()} catalog — search, filter, and sort to find the right product.`,
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
      categories: categoryLabels,
      brands: DEFAULT_BRANDS,
      products: catalog,
      promo: {
        title: `Shop the best of ${siteName}`,
        body: about,
        ctaLabel: "Buy Now",
        ctaHref: shopHref,
        image: productImages[0] || heroImage,
      },
      metadata: {
        title: `Shop | ${siteName}`,
        description: `Browse products from ${siteName}.`,
      },
    },
    product: {
      ...ecommerceSampleContent.product,
      breadcrumbShop: "All Product",
      breadcrumbCurrent: "Product Details",
      defaultShortDescription:
        about || ecommerceSampleContent.product.defaultShortDescription,
      defaultDescription: [
        about,
        `Every ${siteName} product is curated for ${niche.toLowerCase()} shoppers who want a ${tone} experience.`,
        ecommerceSampleContent.product.defaultDescription[2],
      ],
      relatedHeading: "Related Products",
      relatedSubheading: `More from ${siteName}.`,
      reviewsHeading: "Product Reviews",
      reviewsSubheading: `What customers say about ${siteName}.`,
      faqHeading: "Frequently Asked Questions",
      faqSubheading: `Common questions about ${siteName} products.`,
      faq: faqs.slice(0, 5),
      cta: {
        title: `Ready to shop ${siteName}?`,
        body: `Browse the full catalog and find your next favorite.`,
        ctaLabel,
        ctaHref: shopHref,
        image: productImages[0] || heroImage,
      },
    },
    cart: {
      ...ecommerceSampleContent.cart,
      emptyCtaHref: shopHref,
    },
    checkout: {
      ...ecommerceSampleContent.checkout,
      emptyCtaHref: shopHref,
    },
    track: {
      ...ecommerceSampleContent.track,
      metadata: {
        title: `Track Your Order — ${siteName}`,
        description: `Look up ${siteName} shipment status with your order ID and email.`,
      },
      sampleOrder: {
        ...ecommerceSampleContent.track.sampleOrder,
        items: catalog.slice(0, 3).map((p) => ({
          title: p.title,
          subtitle: "Subtext Lorem Ipsum",
          price: p.price,
          priceValue: p.priceValue,
          image: p.image,
        })),
      },
    },
    about: {
      ...ecommerceSampleContent.about,
      description: about,
      sections: ecommerceSampleContent.about.sections.map((section, i) => ({
        ...section,
        body: i === 0 ? about : section.body,
        image: productImages[i] || heroImage,
      })),
      metadata: {
        title: `About Us — ${siteName}`,
        description: about,
      },
    },
    blog: {
      ...ecommerceSampleContent.blog,
      description: `Stories and guides from ${siteName}.`,
      posts: blogPagePosts,
      metadata: {
        title: `Blog — ${siteName}`,
        description: `Read the latest from ${siteName}.`,
      },
    },
    contact: {
      ...ecommerceSampleContent.contact,
      email: ecommerceSampleContent.footer.contact.email,
      phones: ecommerceSampleContent.footer.contact.phone,
      address: ecommerceSampleContent.footer.contact.address,
      infoHeading: `Talk to ${siteName}`,
      infoBody: about,
      metadata: {
        title: `Contact Us — ${siteName}`,
        description: `Get in touch with ${siteName}.`,
      },
    },
  };
}

export function deriveEcommerceTheme(draft: BuilderDraft): EcommerceTheme {
  return {
    ...defaultEcommerceTheme,
    ink: draft.theme?.ink || draft.theme?.text || defaultEcommerceTheme.ink,
    muted: draft.theme?.muted || defaultEcommerceTheme.muted,
    background: draft.theme?.background || defaultEcommerceTheme.background,
    backgroundSoft: draft.theme?.surface || defaultEcommerceTheme.backgroundSoft,
    border: draft.theme?.border || defaultEcommerceTheme.border,
    accent: draft.theme?.primary || defaultEcommerceTheme.accent,
    onAccent: draft.theme?.onPrimary || defaultEcommerceTheme.onAccent,
  };
}

/** Keep logo customization available for brand extract; ecommerce header uses text logo. */
export function resolveEcommerceLogoDataUrl(draft: BuilderDraft): string | null {
  if (draft.logo) return draft.logo;
  if (draft.logoCustomization) return renderLogoFromCustomization(draft.logoCustomization);
  return null;
}
