import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById, products, img } from "../data/products";
import { useCart } from "../context/CartContext";
import { Stars } from "../components/Stars";
import { ProductCard } from "../components/ProductCard";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("details");

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

  const onSale = product.compareAt && product.compareAt > product.price;
  const related = products
    .filter((p) => p.region === product.region && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    if (!size) return;
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const sections = [
    { key: "details", title: "Product details", body: product.description },
    {
      key: "shipping",
      title: "Shipping & delivery",
      body: "Free tracked worldwide shipping on orders over $150. Standard delivery 3–7 business days; express options at checkout. Every order ships with a tracking number.",
    },
    {
      key: "returns",
      title: "Returns & exchanges",
      body: "30-day free returns, no questions asked. Wrong size? We'll swap it — exchanges are on us, both ways.",
    },
  ];

  return (
    <div className="detailpage">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/catalog">Shop</Link> /{" "}
        <Link to={`/catalog?region=${encodeURIComponent(product.region)}`}>
          {product.region}
        </Link>{" "}
        / <span>{product.name}</span>
      </nav>

      <div className="detail">
        <div className="detail__gallery">
          <img
            className="detail__img"
            src={img(product.image, 900)}
            alt={`${product.name} — ${product.team}`}
          />
          {product.badge && <span className="detail__badge">{product.badge}</span>}
        </div>

        <div className="detail__info">
          <span className="pcard__league">
            {product.kit} Kit · {product.region}
          </span>
          <h1 className="detail__title">{product.name}</h1>
          <p className="detail__team">{product.team} National Team</p>

          <div className="detail__rating">
            <Stars rating={product.rating} size={16} />
            <span className="detail__reviewlink">
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </span>
          </div>

          <div className="detail__pricerow">
            <span className="detail__price">${product.price.toFixed(2)}</span>
            {onSale && (
              <>
                <span className="detail__compare">
                  ${product.compareAt!.toFixed(2)}
                </span>
                <span className="detail__savetag">
                  Save ${(product.compareAt! - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <div className="detail__sizes">
            <div className="detail__sizehead">
              <span className="detail__label">Select size</span>
              <a className="detail__guide" href="#size-guide">
                Size guide
              </a>
            </div>
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
            className="btn btn--primary btn--block btn--lg"
            disabled={!size}
            onClick={handleAdd}
          >
            {added ? "Added to cart ✓" : size ? "Add to cart" : "Select a size"}
          </button>

          <ul className="detail__assurances">
            <li>★ Premium match-weight fabric</li>
            <li>⚡ Ships in 24 hours, tracked worldwide</li>
            <li>⇄ Free 30-day returns & exchanges</li>
            <li>🔒 Secure encrypted checkout</li>
          </ul>

          <div className="accordion">
            {sections.map((s) => (
              <div key={s.key} className="accordion__item">
                <button
                  className="accordion__head"
                  onClick={() =>
                    setOpenSection(openSection === s.key ? null : s.key)
                  }
                  aria-expanded={openSection === s.key}
                >
                  {s.title}
                  <span className="accordion__sign">
                    {openSection === s.key ? "−" : "+"}
                  </span>
                </button>
                {openSection === s.key && (
                  <p className="accordion__body">{s.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section__head">
            <h2 className="section__title">You may also like</h2>
          </div>
          <div className="grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
