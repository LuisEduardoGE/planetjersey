import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import type { Region } from "../types";

const REGIONS: (Region | "All")[] = [
  "All",
  "Europe",
  "South America",
  "Africa",
];

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export function Catalog() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState<Sort>("featured");

  const regionParam = (params.get("region") as Region | null) ?? "All";
  const badgeParam = params.get("badge");
  const saleOnly = params.get("sale") === "1";
  const query = params.get("q")?.toLowerCase() ?? "";

  const setRegion = (r: Region | "All") => {
    const next = new URLSearchParams(params);
    if (r === "All") next.delete("region");
    else next.set("region", r);
    setParams(next);
  };

  const visible = useMemo(() => {
    let list = products.filter((p) => {
      if (regionParam !== "All" && p.region !== regionParam) return false;
      if (badgeParam && p.badge !== badgeParam) return false;
      if (saleOnly && !(p.compareAt && p.compareAt > p.price)) return false;
      if (
        query &&
        !`${p.name} ${p.team} ${p.region} ${p.kit}`
          .toLowerCase()
          .includes(query)
      )
        return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    return list;
  }, [regionParam, badgeParam, saleOnly, query, sort]);

  const heading = query
    ? `Results for "${query}"`
    : saleOnly
      ? "Sale"
      : badgeParam === "New"
        ? "New for 2026"
        : badgeParam
          ? badgeParam
          : regionParam === "All"
            ? "All national kits"
            : regionParam;

  return (
    <div className="catalog">
      <div className="catalog__head">
        <div>
          <h1 className="catalog__title">{heading}</h1>
          <p className="catalog__count">{visible.length} kits</p>
        </div>
        <label className="sort">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
      </div>

      <div className="filters">
        {REGIONS.map((r) => (
          <button
            key={r}
            className={`chip ${regionParam === r ? "is-active" : ""}`}
            onClick={() => setRegion(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="catalog__empty">
          No kits match that. Try another region or clear your filters.
        </p>
      ) : (
        <div className="grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {/* Promo card fills the grid and nudges sign-ups when results are few. */}
          {!query && (
            <Link to="/catalog?badge=New" className="pcard pcard--promo">
              <h3>More nations dropping weekly</h3>
              <p>New 2026 kits land every week. Be first to wear yours.</p>
              <span className="promo__cta">See what's new →</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
