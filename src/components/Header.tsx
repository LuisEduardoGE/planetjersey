import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  onOpenCart: () => void;
}

const REGIONS = ["Europe", "South America", "Africa"] as const;

export function Header({ onOpenCart }: HeaderProps) {
  const { summary } = useCart();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/catalog${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="brand" aria-label="Planet Jersey home">
          <span className="brand__mark">PJ</span>
          <span className="brand__name">
            Planet<span className="brand__accent">Jersey</span>
          </span>
        </Link>

        <form className="search" onSubmit={submitSearch} role="search">
          <span className="search__icon" aria-hidden>
            ⌕
          </span>
          <input
            className="search__input"
            type="search"
            placeholder="Search nations, kits, players…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
        </form>

        <div className="header__actions">
          <a className="header__help" href="#help">
            Help
          </a>
          <button className="cartbtn" onClick={onOpenCart} aria-label="Open cart">
            <span className="cartbtn__icon" aria-hidden>
              🛒
            </span>
            <span>Cart</span>
            {summary.itemCount > 0 && (
              <span className="cartbtn__badge">{summary.itemCount}</span>
            )}
          </button>
        </div>
      </div>

      <nav className="navbar2" aria-label="Browse">
        <div className="navbar2__inner">
          {REGIONS.map((r) => (
            <NavLink
              key={r}
              to={`/catalog?region=${encodeURIComponent(r)}`}
              className="navbar2__link"
            >
              {r}
            </NavLink>
          ))}
          <NavLink to="/catalog?badge=New" className="navbar2__link">
            New 2026
          </NavLink>
          <NavLink to="/catalog?badge=Retro" className="navbar2__link">
            Retro
          </NavLink>
          <NavLink
            to="/catalog?sale=1"
            className="navbar2__link navbar2__link--sale"
          >
            Sale
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
