const ITEMS = [
  {
    icon: "★",
    title: "Premium Match Fabric",
    text: "Breathable, true-to-size kits built for the heat.",
  },
  {
    icon: "⚡",
    title: "Ships in 24 Hours",
    text: "Order today, on its way tomorrow.",
  },
  {
    icon: "⇄",
    title: "Free 30-Day Returns",
    text: "Changed your mind? Send it back, on us.",
  },
  {
    icon: "🔒",
    title: "Secure Checkout",
    text: "Encrypted payments. Your data stays safe.",
  },
];

/** Four-up trust strip — the single biggest credibility signal for a store. */
export function TrustBar() {
  return (
    <section className="trustbar" aria-label="Why shop with us">
      <div className="trustbar__inner">
        {ITEMS.map((item) => (
          <div key={item.title} className="trust">
            <span className="trust__icon" aria-hidden>
              {item.icon}
            </span>
            <div>
              <p className="trust__title">{item.title}</p>
              <p className="trust__text">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
