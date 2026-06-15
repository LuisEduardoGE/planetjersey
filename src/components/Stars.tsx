interface StarsProps {
  rating: number;
  count?: number;
  size?: number;
}

/** Accessible star rating: full / half / empty stars from a 0–5 value. */
export function Stars({ rating, count, size = 15 }: StarsProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.max(0, Math.min(1, rating - i));
    return fill;
  });

  return (
    <span
      className="stars"
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
    >
      <span className="stars__row" style={{ fontSize: size }}>
        {stars.map((fill, i) => (
          <span key={i} className="stars__star">
            <span className="stars__bg">★</span>
            <span className="stars__fg" style={{ width: `${fill * 100}%` }}>
              ★
            </span>
          </span>
        ))}
      </span>
      {count !== undefined && <span className="stars__count">({count})</span>}
    </span>
  );
}
