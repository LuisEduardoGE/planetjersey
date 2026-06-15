const STATS = [
  { value: "48", label: "Nations" },
  { value: "16", label: "Host Cities" },
  { value: "104", label: "Matches" },
  { value: "1", label: "Planet" },
];

/** Bold numeric band — adds rhythm and colour between product rows. */
export function StatsBand() {
  return (
    <section className="statsband">
      <div className="statsband__inner">
        <p className="statsband__kicker">The summer the world unites</p>
        <div className="statsband__grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
