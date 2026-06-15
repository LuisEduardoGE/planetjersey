const NATIONS = [
  { code: "br", name: "Brazil" },
  { code: "ar", name: "Argentina" },
  { code: "fr", name: "France" },
  { code: "es", name: "Spain" },
  { code: "de", name: "Germany" },
  { code: "gb-eng", name: "England" },
  { code: "pt", name: "Portugal" },
  { code: "nl", name: "Netherlands" },
  { code: "it", name: "Italy" },
  { code: "be", name: "Belgium" },
  { code: "hr", name: "Croatia" },
  { code: "co", name: "Colombia" },
  { code: "uy", name: "Uruguay" },
  { code: "mx", name: "Mexico" },
  { code: "us", name: "USA" },
  { code: "ca", name: "Canada" },
  { code: "jp", name: "Japan" },
  { code: "kr", name: "South Korea" },
  { code: "ma", name: "Morocco" },
  { code: "sn", name: "Senegal" },
  { code: "cm", name: "Cameroon" },
  { code: "ng", name: "Nigeria" },
];

/** Infinite-scrolling ticker of qualified nations — instant World Cup colour. */
export function NationsTicker() {
  // Render the list twice so the marquee loops seamlessly.
  const row = [...NATIONS, ...NATIONS];

  return (
    <div className="ticker" aria-label="Nations competing in 2026">
      <div className="ticker__track">
        {row.map((n, i) => (
          <span className="ticker__item" key={`${n.code}-${i}`} aria-hidden={i >= NATIONS.length}>
            <img
              className="ticker__flag"
              src={`https://flagcdn.com/w40/${n.code}.png`}
              srcSet={`https://flagcdn.com/w80/${n.code}.png 2x`}
              width={26}
              height={18}
              alt=""
              loading="lazy"
            />
            <span className="ticker__name">{n.name}</span>
            <span className="ticker__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
