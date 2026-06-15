import { Link } from "react-router-dom";

const PANELS = [
  {
    eyebrow: "Legends never fade",
    title: "Retro Collection",
    text: "Iconic shirts from summers past, reborn in vintage-feel fabric.",
    cta: "Shop retro",
    to: "/catalog?badge=Retro",
    image:
      "https://images.unsplash.com/photo-1605002713581-123e77bcf83d?auto=format&fit=crop&w=900&q=80",
    tone: "dark",
  },
  {
    eyebrow: "Fresh off the press",
    title: "New for 2026",
    text: "The latest national kits, landing now ahead of the big summer.",
    cta: "Shop new in",
    to: "/catalog?badge=New",
    image:
      "https://images.unsplash.com/photo-1551854321-1432edd90a5c?auto=format&fit=crop&w=900&q=80",
    tone: "brand",
  },
];

/** Two bold image panels — breaks up the white grids with full-bleed colour. */
export function PromoSplit() {
  return (
    <section className="section">
      <div className="promosplit">
        {PANELS.map((p) => (
          <Link
            key={p.title}
            to={p.to}
            className={`promo promo--${p.tone}`}
            style={{ backgroundImage: `url(${p.image})` }}
          >
            <div className="promo__scrim" />
            <div className="promo__content">
              <span className="promo__eyebrow">{p.eyebrow}</span>
              <h3 className="promo__title">{p.title}</h3>
              <p className="promo__text">{p.text}</p>
              <span className="promo__cta">{p.cta} →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
