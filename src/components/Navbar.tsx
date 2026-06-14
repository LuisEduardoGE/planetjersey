import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface NavbarProps {
  onOpenCart: () => void;
}

export function Navbar({ onOpenCart }: NavbarProps) {
  const { summary } = useCart();

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__logo">●</span> Planet&nbsp;Jersey
      </Link>

      <nav className="navbar__links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/catalog">Shop</NavLink>
      </nav>

      <button className="navbar__cart" onClick={onOpenCart}>
        Cart
        {summary.itemCount > 0 && (
          <span className="navbar__badge">{summary.itemCount}</span>
        )}
      </button>
    </header>
  );
}
