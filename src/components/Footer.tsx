import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "Shop",
    links: ["Europe", "South America", "Africa", "New 2026", "Retro", "Sale"],
  },
  {
    title: "Help",
    links: [
      "Shipping & Delivery",
      "Returns & Exchanges",
      "Size Guide",
      "Track My Order",
      "Contact Us",
    ],
  },
  {
    title: "Company",
    links: ["About Planet Jersey", "The 2026 Drop", "Careers", "Reviews"],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brandcol">
          <Link to="/" className="brand brand--light">
            <span className="brand__mark">PJ</span>
            <span className="brand__name">
              Planet<span className="brand__accent">Jersey</span>
            </span>
          </Link>
          <p className="footer__blurb">
            National-team football kits from every corner of the planet. One
            summer, every nation — shipped worldwide, ready for kickoff.
          </p>
          <div className="footer__pay" aria-label="Accepted payment methods">
            {["VISA", "MC", "AMEX", "PayPal", "Pay"].map((p) => (
              <span key={p} className="paychip">
                {p}
              </span>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} className="footer__col" aria-label={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#footer-link">{l}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Planet Jersey. All rights reserved.</p>
        <div className="footer__legal">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#cookies">Cookies</a>
        </div>
        <div className="footer__social" aria-label="Social media">
          <a href="#instagram" aria-label="Instagram">
            ◉
          </a>
          <a href="#x" aria-label="X">
            𝕏
          </a>
          <a href="#tiktok" aria-label="TikTok">
            ♪
          </a>
        </div>
      </div>
    </footer>
  );
}
