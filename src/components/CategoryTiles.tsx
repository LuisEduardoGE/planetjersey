import { Link } from "react-router-dom";
import { img } from "../data/products";

const TILES = [
  {
    label: "South America",
    tagline: "Samba & stripes",
    to: "/catalog?region=South%20America",
    image: "https://images.unsplash.com/photo-1763656813028-3eb492fa7bcf",
  },
  {
    label: "Europe",
    tagline: "Giants of the game",
    to: "/catalog?region=Europe",
    image: "https://images.unsplash.com/photo-1778454288878-9b3c0c975589",
  },
  {
    label: "Africa",
    tagline: "Rising forces",
    to: "/catalog?region=Africa",
    image: "https://images.unsplash.com/photo-1764104517932-664d963a2af0",
  },
  {
    label: "Retro Classics",
    tagline: "Legends of summers past",
    to: "/catalog?badge=Retro",
    image: "https://images.unsplash.com/photo-1759447946445-397b1c034768",
  },
];

export function CategoryTiles() {
  return (
    <div className="soft-band">
    <section className="section">
      <div className="section__head">
        <div>
          <h2 className="section__title">Shop by region</h2>
          <p className="section__sub">Every confederation. Every contender.</p>
        </div>
      </div>
      <div className="tiles">
        {TILES.map((t) => (
          <Link key={t.label} to={t.to} className="tile">
            <img
              className="tile__img"
              src={img(t.image, 500)}
              alt={t.label}
              loading="lazy"
            />
            <div className="tile__overlay" />
            <div className="tile__text">
              <span className="tile__tag">{t.tagline}</span>
              <span className="tile__name">{t.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
    </div>
  );
}
