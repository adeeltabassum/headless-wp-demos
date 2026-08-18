import type { EcommerceProduct, EcommerceSortOption } from "./content";

export type ShopFilterState = {
  query: string;
  categories: string[];
  brands: string[];
  priceMax: number;
  sort: EcommerceSortOption;
  page: number;
};

export function filterAndSortProducts(
  products: EcommerceProduct[],
  state: ShopFilterState
): EcommerceProduct[] {
  const q = state.query.trim().toLowerCase();

  let list = products.filter((p) => {
    if (q) {
      const hay = `${p.title} ${p.category} ${p.brand}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (state.categories.length && !state.categories.includes(p.category)) return false;
    if (state.brands.length && !state.brands.includes(p.brand)) return false;
    if (p.priceValue > state.priceMax) return false;
    return true;
  });

  switch (state.sort) {
    case "price-asc":
      list = [...list].sort((a, b) => a.priceValue - b.priceValue);
      break;
    case "price-desc":
      list = [...list].sort((a, b) => b.priceValue - a.priceValue);
      break;
    case "name-asc":
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name-desc":
      list = [...list].sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "newest":
      list = [...list].reverse();
      break;
    case "recommended":
    default:
      break;
  }

  return list;
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function pageCount(total: number, pageSize: number): number {
  return Math.max(1, Math.ceil(total / pageSize));
}

/** Build compact page number list with ellipsis markers (-1). */
export function paginationRange(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  if (current <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }
  if (current >= total - 2) {
    pages.add(total - 1);
    pages.add(total - 2);
    pages.add(total - 3);
  }
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: number[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push(-1);
    out.push(sorted[i]);
  }
  return out;
}
