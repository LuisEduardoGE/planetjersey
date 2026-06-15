import { Stars } from "./Stars";

const REVIEWS = [
  {
    name: "Marcus T.",
    location: "London, UK",
    rating: 5,
    text: "Quality is unreal — stitching, weight, the colours pop. Arrived next day with full tracking. Ready for the summer.",
    product: "England 2026 Home",
  },
  {
    name: "Aisha R.",
    location: "Toronto, CA",
    rating: 5,
    text: "Bought the whole family their nations' kits. Fit is spot on and they look fantastic. So excited for the tournament.",
    product: "Portugal 2026 Home",
  },
  {
    name: "Diego M.",
    location: "Madrid, ES",
    rating: 4,
    text: "Great shirt and fast shipping. Ran a touch large, but the exchange was free and painless. Will order again.",
    product: "Spain 2026 Home",
  },
];

export function Testimonials() {
  return (
    <section className="section reviews">
      <div className="section__head section__head--center">
        <div>
          <h2 className="section__title">Loved by 40,000+ fans</h2>
          <p className="section__sub">
            <Stars rating={4.8} size={16} /> &nbsp;4.8 average from 12,400 verified reviews
          </p>
        </div>
      </div>
      <div className="reviews__grid">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="review">
            <Stars rating={r.rating} size={15} />
            <blockquote>"{r.text}"</blockquote>
            <figcaption>
              <span className="review__name">{r.name}</span>
              <span className="review__meta">
                {r.location} · <span className="review__verified">✓ Verified</span>
              </span>
              <span className="review__product">on {r.product}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
