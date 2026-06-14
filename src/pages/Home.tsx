import { Link } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export function Home() {
  const featured = products.filter((p) => p.badge).slice(0, 3);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <h1>
            Authentic kits from
            <br />
            every corner of the planet.
          </h1>
          <p>
            Match-grade jerseys for football, basketball, baseball and hockey.
            Shipped worldwide.
          </p>
          <Link to="/catalog" className="btn btn--primary">
            Shop the collection
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Featured drops</h2>
          <Link to="/catalog" className="section__link">
            View all →
          </Link>
        </div>
        <div className="grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
