import { Link } from "react-router-dom";
import type { Product } from "../types";
import { img } from "../data/products";
import { Stars } from "./Stars";

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.compareAt && product.compareAt > product.price;
  const discount = onSale
    ? Math.round((1 - product.price / product.compareAt!) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="pcard">
      <div className="pcard__media">
        <img
          className="pcard__img"
          src={img(product.image, 480)}
          alt={`${product.name} — ${product.team}`}
          loading="lazy"
        />
        {product.badge && (
          <span className="pcard__badge">{product.badge}</span>
        )}
        {onSale && <span className="pcard__sale">-{discount}%</span>}
        <span className="pcard__quick">View product</span>
      </div>

      <div className="pcard__body">
        <span className="pcard__league">{product.kit} · {product.region}</span>
        <h3 className="pcard__title">{product.name}</h3>
        <p className="pcard__team">{product.team}</p>
        <Stars rating={product.rating} count={product.reviewCount} size={14} />
        <div className="pcard__pricerow">
          <span className="pcard__price">${product.price.toFixed(2)}</span>
          {onSale && (
            <span className="pcard__compare">
              ${product.compareAt!.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
