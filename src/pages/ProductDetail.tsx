import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="notfound">
        <h1>Jersey not found</h1>
        <Link to="/catalog" className="btn btn--primary">
          Back to shop
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (!size) return;
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="detail">
      <div
        className="detail__image"
        style={{ background: product.image }}
      >
        {product.badge && <span className="card__badge">{product.badge}</span>}
        <span className="detail__number">{product.team.charAt(0)}</span>
      </div>

      <div className="detail__info">
        <span className="card__league">{product.league}</span>
        <h1>{product.name}</h1>
        <p className="detail__team">{product.team}</p>
        <p className="detail__price">${product.price.toFixed(2)}</p>
        <p className="detail__desc">{product.description}</p>

        <div className="detail__sizes">
          <span className="detail__label">Select size</span>
          <div className="sizes">
            {product.sizes.map((s) => (
              <button
                key={s}
                className={`size ${size === s ? "is-active" : ""}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn btn--primary btn--block"
          disabled={!size}
          onClick={handleAdd}
        >
          {added ? "Added ✓" : size ? "Add to cart" : "Pick a size first"}
        </button>

        <Link to="/catalog" className="detail__back">
          ← Back to shop
        </Link>
      </div>
    </div>
  );
}
