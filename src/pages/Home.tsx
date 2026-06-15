import { Link } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { CategoryTiles } from "../components/CategoryTiles";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/Newsletter";
import { NationsTicker } from "../components/NationsTicker";
import { StatsBand } from "../components/StatsBand";
import { PromoSplit } from "../components/PromoSplit";

const HERO_IMG =
  "https://images.unsplash.com/photo-1629217855633-79a6925d6c47?auto=format&fit=crop&w=1800&q=80";
const BAND_IMG =
  "https://images.unsplash.com/photo-1565483276060-e6730c0cc6a1?auto=format&fit=crop&w=1400&q=80";

export function Home() {
  // Top-rated first so the row always fills cleanly (Bestseller badges float up).
  const bestsellers = [...products]
    .sort((a, b) => {
      const aBest = a.badge === "Bestseller" ? 1 : 0;
      const bBest = b.badge === "Bestseller" ? 1 : 0;
      return bBest - aBest || b.rating - a.rating;
    })
    .slice(0, 8);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="hero__scrim" />
        <div className="hero__content">
          <span className="hero__eyebrow">Summer 2026 · The world is coming</span>
          <h1 className="hero__title">
            Back your nation.
            <br />
            Wear the dream.
          </h1>
          <p className="hero__sub">
            National-team kits for the biggest summer in football. Home, away
            and retro shirts from every contender — ready before kickoff.
          </p>
          <div className="hero__cta">
            <Link to="/catalog" className="btn btn--primary btn--lg">
              Shop all kits
            </Link>
            <Link to="/catalog?badge=Retro" className="btn btn--ghost btn--lg">
              Explore retro
            </Link>
          </div>
          <div className="hero__proof">
            <span>★ 4.8/5 from 12,400+ fans</span>
            <span>·</span>
            <span>Ships in 24 hours</span>
          </div>
        </div>
      </section>

      <NationsTicker />

      {/* Bestsellers */}
      <section className="section">
        <div className="section__head">
          <div>
            <h2 className="section__title">Bestselling kits</h2>
            <p className="section__sub">The shirts flying off our shelves this week.</p>
          </div>
          <Link to="/catalog" className="section__link">
            View all →
          </Link>
        </div>
        <div className="grid">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <CategoryTiles />

      <StatsBand />

      <PromoSplit />

      {/* Editorial band */}
      <section className="band" style={{ backgroundImage: `url(${BAND_IMG})` }}>
        <div className="band__scrim" />
        <div className="band__content">
          <h2>One planet. Every nation. One summer.</h2>
          <p>
            From Rio to Madrid to Yaoundé — when the whole world plays, you wear
            your colours with pride. Find your nation's shirt and join the party.
          </p>
          <Link to="/catalog" className="btn btn--primary btn--lg">
            Find your nation
          </Link>
        </div>
      </section>

      {/* New arrivals strip */}
      <section className="section">
        <div className="section__head">
          <div>
            <h2 className="section__title">Just landed</h2>
            <p className="section__sub">Fresh drops, ready to ship.</p>
          </div>
          <Link to="/catalog?badge=New" className="section__link">
            See new in →
          </Link>
        </div>
        <div className="grid">
          {products
            .filter((p) => p.badge === "New" || p.compareAt)
            .slice(0, 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </div>
  );
}
