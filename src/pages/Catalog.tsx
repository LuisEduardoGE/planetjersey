import { useMemo, useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import type { League } from "../types";

const LEAGUES: (League | "All")[] = [
  "All",
  "Football",
  "Basketball",
  "Baseball",
  "Hockey",
];

export function Catalog() {
  const [league, setLeague] = useState<League | "All">("All");

  const visible = useMemo(
    () =>
      league === "All"
        ? products
        : products.filter((p) => p.league === league),
    [league]
  );

  return (
    <div className="catalog">
      <div className="catalog__head">
        <h1>Shop all jerseys</h1>
        <div className="filters">
          {LEAGUES.map((l) => (
            <button
              key={l}
              className={`chip ${league === l ? "is-active" : ""}`}
              onClick={() => setLeague(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
