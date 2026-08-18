"use client";

import { useMemo, useState } from "react";
import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import type { EcommerceSortOption } from "@/lib/ecommerce/content";
import {
  filterAndSortProducts,
  pageCount,
  paginate,
  paginationRange,
  type ShopFilterState,
} from "@/lib/ecommerce/shop-filters";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { ProductCard } from "../ui/ProductCard";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";

export function ShopView() {
  const { shop } = useEcommerceContent();
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(shop.priceMax);
  const [sort, setSort] = useState<EcommerceSortOption>(shop.defaultSort);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const state: ShopFilterState = { query, categories, brands, priceMax, sort, page };

  const filtered = useMemo(
    () => filterAndSortProducts(shop.products, state),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- state fields listed
    [shop.products, query, categories, brands, priceMax, sort]
  );

  const totalPages = pageCount(filtered.length, shop.pageSize);
  const safePage = Math.min(page, totalPages);
  const visible = paginate(filtered, safePage, shop.pageSize);
  const pages = paginationRange(safePage, totalPages);

  function toggleInList(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
    setPage(1);
  }

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
  }

  return (
    <main className="ec-shop">
      <section className="ec-shop-hero">
        <div className="ec-container">
          <h1>{shop.title}</h1>
          <p className="ec-shop-hero__desc">{shop.description}</p>
          <form className="ec-shop-search" onSubmit={onSearchSubmit} role="search">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder={shop.searchPlaceholder}
              aria-label={shop.searchPlaceholder}
            />
            <button type="submit" className="ec-shop-search__btn" aria-label="Search">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      <section className="ec-section ec-shop-catalog">
        <div className="ec-container">
          <div className="ec-shop-toolbar">
            <p className="ec-shop-count">
              Showing <strong>{filtered.length}</strong> Products
            </p>
            <div className="ec-shop-toolbar__actions">
              <button
                type="button"
                className="ec-btn ec-btn--dark ec-btn--sm ec-shop-filters-toggle"
                onClick={() => setFiltersOpen((v) => !v)}
              >
                {filtersOpen ? "Hide filters" : "Filters"}
              </button>
              <div className={`ec-shop-sort${sortOpen ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="ec-shop-sort__trigger"
                  aria-expanded={sortOpen}
                  onClick={() => setSortOpen((v) => !v)}
                >
                  <span>{shop.sortLabel}</span>
                  <strong>{shop.sortOptions.find((o) => o.value === sort)?.label}</strong>
                  <svg viewBox="0 0 12 8" width="12" height="8" aria-hidden="true">
                    <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </button>
                {sortOpen ? (
                  <ul className="ec-shop-sort__menu" role="listbox">
                    {shop.sortOptions.map((opt) => (
                      <li key={opt.value}>
                        <button
                          type="button"
                          className={opt.value === sort ? "is-active" : undefined}
                          role="option"
                          aria-selected={opt.value === sort}
                          onClick={() => {
                            setSort(opt.value);
                            setSortOpen(false);
                            setPage(1);
                          }}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          <div className={`ec-shop-layout${filtersOpen ? " ec-shop-layout--filters-open" : ""}`}>
            <aside className="ec-shop-filters" aria-label="Product filters">
              <div className="ec-shop-filters__head">
                <h2>{shop.filterHeading}</h2>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M4 6h16M7 12h10M10 18h4" />
                </svg>
              </div>

              <div className="ec-shop-filter-group">
                <h3>{shop.categoriesHeading}</h3>
                <ul>
                  {shop.categories.map((cat) => (
                    <li key={cat}>
                      <label>
                        <input
                          type="checkbox"
                          checked={categories.includes(cat)}
                          onChange={() => toggleInList(categories, cat, setCategories)}
                        />
                        <span>{cat}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ec-shop-filter-group">
                <h3>{shop.brandsHeading}</h3>
                <ul>
                  {shop.brands.map((brand) => (
                    <li key={brand}>
                      <label>
                        <input
                          type="checkbox"
                          checked={brands.includes(brand)}
                          onChange={() => toggleInList(brands, brand, setBrands)}
                        />
                        <span>{brand}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ec-shop-filter-group">
                <h3>{shop.priceHeading}</h3>
                <input
                  type="range"
                  min={shop.priceMin}
                  max={shop.priceMax}
                  step={10}
                  value={priceMax}
                  onChange={(e) => {
                    setPriceMax(Number(e.target.value));
                    setPage(1);
                  }}
                  aria-label={shop.priceHeading}
                />
                <div className="ec-shop-price-labels">
                  <span>${shop.priceMin}</span>
                  <span>{shop.priceMaxLabel}</span>
                </div>
              </div>
            </aside>

            <div className="ec-shop-main">
              {visible.length ? (
                <div className="ec-product-grid ec-product-grid--3">
                  {visible.map((item) => (
                    <ProductCard key={item.slug} product={item} badgeVariant="dark" />
                  ))}
                </div>
              ) : (
                <p className="ec-shop-empty">No products match your filters.</p>
              )}

              {totalPages > 1 ? (
                <nav className="ec-pagination" aria-label="Pagination">
                  <button
                    type="button"
                    className="ec-pagination__btn"
                    disabled={safePage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </button>
                  {pages.map((p, i) =>
                    p === -1 ? (
                      <span key={`e-${i}`} className="ec-pagination__ellipsis">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        className={`ec-pagination__btn${p === safePage ? " is-active" : ""}`}
                        aria-current={p === safePage ? "page" : undefined}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    type="button"
                    className="ec-pagination__btn"
                    disabled={safePage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </button>
                </nav>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="ec-section">
        <div className="ec-container">
          <div className="ec-shop-promo">
            <div className="ec-shop-promo__copy">
              <h2>{shop.promo.title}</h2>
              <p>{shop.promo.body}</p>
              <Link className="ec-btn ec-btn--dark" href={shop.promo.ctaHref}>
                {shop.promo.ctaLabel}
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </Link>
            </div>
            <MediaPlaceholder className="ec-shop-promo__media" src={shop.promo.image} alt="" />
          </div>
        </div>
      </section>
    </main>
  );
}
