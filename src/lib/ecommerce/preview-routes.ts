import type { PreviewPage } from "@/components/studio/ecommerce-preview-types";

export type { PreviewPage } from "@/components/studio/ecommerce-preview-types";

export type ParsedEcommercePreview = {
  page: PreviewPage;
  productSlug?: string;
  postSlug?: string;
  legalSlug?: string;
};

/**
 * Map a draft site path (e.g. /mug-store/shop) onto Studio preview page ids.
 */
export function parseEcommercePreviewPath(
  siteBase: string,
  pathname: string
): ParsedEcommercePreview {
  const base = siteBase.replace(/\/$/, "") || "";
  let path = pathname.split("?")[0].split("#")[0];
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  if (!path || path === base || path === `${base}/`) {
    return { page: "home" };
  }

  if (!path.startsWith(base + "/") && path !== base) {
    // Absolute path without matching base — try treating as relative to base
    if (path.startsWith("/") && !path.slice(1).includes("/")) {
      // e.g. /shop when base is /mug-store — ignore
    }
  }

  const rest = path.startsWith(base + "/") ? path.slice(base.length) : path;

  if (rest === "/shop") return { page: "shop" };
  if (rest === "/cart") return { page: "cart" };
  if (rest === "/checkout") return { page: "checkout" };
  if (rest === "/about") return { page: "about" };
  if (rest === "/contact") return { page: "contact" };
  if (rest === "/track") return { page: "track" };
  if (rest === "/blog") return { page: "blog" };

  const productMatch = rest.match(/^\/product\/([^/]+)$/);
  if (productMatch) return { page: "product", productSlug: productMatch[1] };

  const blogMatch = rest.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) return { page: "blog-post", postSlug: blogMatch[1] };

  const legalMatch = rest.match(/^\/legal\/([^/]+)$/);
  if (legalMatch) {
    const slug = legalMatch[1];
    const map: Record<string, PreviewPage> = {
      "shipping-policy": "legal-shipping",
      "refund-policy": "legal-refund",
      terms: "legal-terms",
      "privacy-policy": "legal-privacy",
      disclaimer: "legal-disclaimer",
    };
    return { page: map[slug] || "home", legalSlug: slug };
  }

  return { page: "home" };
}

export function previewPageToPath(
  siteBase: string,
  page: PreviewPage,
  opts?: { productSlug?: string; postSlug?: string }
): string {
  const base = siteBase.replace(/\/$/, "") || "";
  switch (page) {
    case "home":
      return base || "/";
    case "shop":
      return `${base}/shop`;
    case "product":
      return `${base}/product/${opts?.productSlug || "product-1"}`;
    case "cart":
    case "cart-empty":
      return `${base}/cart`;
    case "checkout":
    case "checkout-pay":
    case "checkout-review":
    case "checkout-success":
    case "checkout-failed":
      return `${base}/checkout`;
    case "track":
    case "track-detail":
    case "track-missing":
      return `${base}/track`;
    case "about":
      return `${base}/about`;
    case "contact":
      return `${base}/contact`;
    case "blog":
      return `${base}/blog`;
    case "blog-post":
      return `${base}/blog/${opts?.postSlug || "post-1"}`;
    case "legal-shipping":
      return `${base}/legal/shipping-policy`;
    case "legal-refund":
      return `${base}/legal/refund-policy`;
    case "legal-terms":
      return `${base}/legal/terms`;
    case "legal-privacy":
      return `${base}/legal/privacy-policy`;
    case "legal-disclaimer":
      return `${base}/legal/disclaimer`;
    default:
      return base || "/";
  }
}
