import { useCart } from "../context/CartContext";
import { img } from "../data/products";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const FREE_SHIPPING_AT = 150;

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, summary, setQuantity, removeItem, clear } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_AT - summary.subtotal);
  const progress = Math.min(100, (summary.subtotal / FREE_SHIPPING_AT) * 100);

  return (
    <>
      <div
        className={`drawer__backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
      />
      <aside
        className={`drawer ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        aria-label="Shopping cart"
      >
        <div className="drawer__head">
          <h2>
            Your Cart{" "}
            {summary.itemCount > 0 && (
              <span className="drawer__count">{summary.itemCount}</span>
            )}
          </h2>
          <button className="drawer__close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        {items.length > 0 && (
          <div className="ship-nudge">
            {remaining > 0 ? (
              <p>
                You're <strong>${remaining.toFixed(2)}</strong> away from{" "}
                <strong>free shipping</strong>
              </p>
            ) : (
              <p className="ship-nudge--win">🎉 You've unlocked free shipping!</p>
            )}
            <div className="ship-nudge__bar">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="drawer__empty">
            <p className="drawer__empty-icon">🛒</p>
            <p>Your cart is empty.</p>
            <p className="drawer__empty-sub">Find your colours in the shop.</p>
          </div>
        ) : (
          <ul className="drawer__items">
            {items.map((item) => (
              <li key={`${item.product.id}-${item.size}`} className="line">
                <img
                  className="line__thumb"
                  src={img(item.product.image, 120)}
                  alt={item.product.name}
                />
                <div className="line__info">
                  <p className="line__name">{item.product.name}</p>
                  <p className="line__meta">Size {item.size}</p>
                  <div className="line__qty">
                    <button
                      onClick={() =>
                        setQuantity(item.product.id, item.size, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity(item.product.id, item.size, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="line__right">
                  <p className="line__price">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="line__remove"
                    onClick={() => removeItem(item.product.id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="drawer__foot">
            <div className="summary">
              <span>Subtotal</span>
              <span>${summary.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary">
              <span>Shipping</span>
              <span>
                {summary.shipping === 0 ? "Free" : `$${summary.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="summary summary--total">
              <span>Total</span>
              <span>${summary.total.toFixed(2)}</span>
            </div>
            <button
              className="btn btn--primary btn--block btn--lg"
              onClick={() => alert("Checkout is a stub — wire up payments next!")}
            >
              Secure Checkout →
            </button>
            <p className="drawer__assure">
              🔒 Encrypted checkout · 30-day returns
            </p>
            <button className="drawer__clear" onClick={clear}>
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
