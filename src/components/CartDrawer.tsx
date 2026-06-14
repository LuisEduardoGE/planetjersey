import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, summary, setQuantity, removeItem, clear } = useCart();

  return (
    <>
      <div
        className={`drawer__backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
      />
      <aside className={`drawer ${open ? "is-open" : ""}`}>
        <div className="drawer__head">
          <h2>Your Cart</h2>
          <button className="drawer__close" onClick={onClose}>
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p className="drawer__empty">Your cart is empty. Go grab a kit!</p>
        ) : (
          <ul className="drawer__items">
            {items.map((item) => (
              <li key={`${item.product.id}-${item.size}`} className="line">
                <div
                  className="line__thumb"
                  style={{ background: item.product.image }}
                />
                <div className="line__info">
                  <p className="line__name">{item.product.name}</p>
                  <p className="line__meta">
                    {item.product.team} · Size {item.size}
                  </p>
                  <div className="line__qty">
                    <button
                      onClick={() =>
                        setQuantity(
                          item.product.id,
                          item.size,
                          item.quantity - 1
                        )
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity(
                          item.product.id,
                          item.size,
                          item.quantity + 1
                        )
                      }
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
                {summary.shipping === 0
                  ? "Free"
                  : `$${summary.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="summary summary--total">
              <span>Total</span>
              <span>${summary.total.toFixed(2)}</span>
            </div>
            <button
              className="btn btn--primary btn--block"
              onClick={() => alert("Checkout is a stub — wire up payments next!")}
            >
              Checkout
            </button>
            <button className="drawer__clear" onClick={clear}>
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
