"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import type { EcommerceProduct } from "@/lib/ecommerce/content";
import { useEcommerceCart } from "../CartProvider";
import { MediaPlaceholder } from "./MediaPlaceholder";

export function ProductCard({
  product,
  badgeVariant = "light",
}: {
  product: EcommerceProduct;
  badgeVariant?: "light" | "dark";
}) {
  const { addItem } = useEcommerceCart();

  return (
    <article className="ec-product-card">
      <Link href={product.href}>
        <MediaPlaceholder className="ec-product-card__media" src={product.image} alt={product.title}>
          {product.discountBadge ? (
            <span className="ec-badge ec-badge--dark">{product.discountBadge}</span>
          ) : (
            <span className={`ec-badge${badgeVariant === "dark" ? " ec-badge--dark" : ""}`}>
              {product.category}
            </span>
          )}
        </MediaPlaceholder>
      </Link>
      <h3>
        <Link href={product.href}>{product.title}</Link>
      </h3>
      <p className="ec-price">{product.price}</p>
      <button
        type="button"
        className="ec-btn ec-btn--dark ec-btn--block"
        onClick={() => addItem(product)}
      >
        Add to cart
      </button>
    </article>
  );
}
