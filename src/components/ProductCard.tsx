import { Link } from "react-router-dom";
import type { Product } from "../types";

/**
 * `product.image` holds a hex color in the seed data, so we render a colored
 * "kit" block instead of loading external images. When a real image URL is
 * supplied later, swap the block for an <img src={product.image} />.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="card">
      <div className="card__image" style={{ background: product.image }}>
        {product.badge && <span className="card__badge">{product.badge}</span>}
        <span className="card__number">{product.team.charAt(0)}</span>
      </div>
      <div className="card__body">
        <span className="card__league">{product.league}</span>
        <h3 className="card__title">{product.name}</h3>
        <p className="card__team">{product.team}</p>
        <p className="card__price">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
