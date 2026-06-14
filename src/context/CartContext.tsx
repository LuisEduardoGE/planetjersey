import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "../types";

interface OrderSummary {
  /** Sum of line items before shipping. */
  subtotal: number;
  /** Shipping cost applied to the order. */
  shipping: number;
  /** Final amount the customer pays. */
  total: number;
  /** Total number of jerseys in the cart. */
  itemCount: number;
}

interface CartContextValue {
  items: CartItem[];
  summary: OrderSummary;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  setQuantity: (productId: string, size: string, quantity: number) => void;
  clear: () => void;
}

type CartAction =
  | { type: "ADD"; product: Product; size: string }
  | { type: "REMOVE"; productId: string; size: string }
  | { type: "SET_QTY"; productId: string; size: string; quantity: number }
  | { type: "CLEAR" };

const sameLine = (item: CartItem, productId: string, size: string) =>
  item.product.id === productId && item.size === size;

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) =>
        sameLine(i, action.product.id, action.size)
      );
      if (existing) {
        return state.map((i) =>
          sameLine(i, action.product.id, action.size)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...state, { product: action.product, size: action.size, quantity: 1 }];
    }
    case "REMOVE":
      return state.filter((i) => !sameLine(i, action.productId, action.size));
    case "SET_QTY":
      return state
        .map((i) =>
          sameLine(i, action.productId, action.size)
            ? { ...i, quantity: action.quantity }
            : i
        )
        .filter((i) => i.quantity > 0);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

/**
 * Business rules for what the customer actually pays.
 *
 * ── LEARNING-MODE TODO ──────────────────────────────────────────────
 * This is the most opinionated part of any store: the pricing policy.
 * The defaults below are a starting point. Tune them to your strategy:
 *   - FREE_SHIPPING_THRESHOLD: encourages bigger baskets, but eats margin.
 *   - FLAT_SHIPPING: simple and predictable vs. weight/region-based.
 * Consider whether to add tax, promo codes, or member discounts here.
 * Everything downstream (CartDrawer, checkout) reads from this one function.
 * ────────────────────────────────────────────────────────────────────
 */
const FREE_SHIPPING_THRESHOLD = 150;
const FLAT_SHIPPING = 9.99;

function computeOrderSummary(items: CartItem[]): OrderSummary {
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;
  return { subtotal, shipping, total, itemCount };
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      summary: computeOrderSummary(items),
      addItem: (product, size) => dispatch({ type: "ADD", product, size }),
      removeItem: (productId, size) =>
        dispatch({ type: "REMOVE", productId, size }),
      setQuantity: (productId, size, quantity) =>
        dispatch({ type: "SET_QTY", productId, size, quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
