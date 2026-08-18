import type { EcommerceContent, EcommerceProduct } from "./content";
import { ecommerceSampleContent } from "./sample-content";

export function getProductBySlug(
  content: EcommerceContent,
  slug: string
): EcommerceProduct | null {
  const fromShop = content.shop.products.find((p) => p.slug === slug);
  if (fromShop) return fromShop;
  const fromHome = [
    ...content.home.topProducts.items,
    ...content.home.ourProducts.items,
  ].find((p) => p.slug === slug);
  return fromHome || null;
}

export function getRelatedProducts(
  content: EcommerceContent,
  slug: string,
  limit = 3
): EcommerceProduct[] {
  return content.shop.products.filter((p) => p.slug !== slug).slice(0, limit);
}

export function resolveProductDetail(content: EcommerceContent, slug: string) {
  const product = getProductBySlug(content, slug) || content.shop.products[0] || null;
  const page = content.product || ecommerceSampleContent.product;
  if (!product) return null;

  const gallery =
    product.gallery?.length
      ? product.gallery
      : product.image
        ? [product.image, product.image, product.image, product.image]
        : ["", "", "", ""];

  return {
    product: {
      ...product,
      shortDescription: product.shortDescription || page.defaultShortDescription,
      rating: product.rating ?? page.defaultRating,
      reviewCount: product.reviewCount ?? page.defaultReviewCount,
      colors: product.colors?.length ? product.colors : page.defaultColors,
      sizes: product.sizes?.length ? product.sizes : page.defaultSizes,
      descriptionParagraphs: product.descriptionParagraphs?.length
        ? product.descriptionParagraphs
        : page.defaultDescription,
      specifications: product.specifications?.length
        ? product.specifications
        : page.defaultSpecifications,
      shippingInfo: product.shippingInfo?.length ? product.shippingInfo : page.defaultShipping,
      gallery,
    },
    page,
    related: getRelatedProducts(content, product.slug, 3),
  };
}
