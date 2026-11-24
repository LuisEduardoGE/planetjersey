import { describe, expect, it } from "vitest";
import { cartReducer, computeOrderSummary } from "./CartContext";
import type { CartItem, Product } from "../types";

const product = (id: string, price: number): Product => ({
  id,
  name: `${id} kit`,
  team: id,
  region: "Europe",
  kit: "Home",
  price,
  image: "https://example.com/img",
  rating: 4.5,
  reviewCount: 10,
  sizes: ["S", "M", "L"],
  description: "Test kit",
});

const shirt = product("shirt", 50);
const other = product("other", 100);

describe("cartReducer", () => {
  it("adds a new line with quantity 1", () => {
    const state = cartReducer([], { type: "ADD", product: shirt, size: "M" });
    expect(state).toEqual([{ product: shirt, size: "M", quantity: 1 }]);
  });

  it("increments the quantity when the same product and size is added again", () => {
    let state = cartReducer([], { type: "ADD", product: shirt, size: "M" });
    state = cartReducer(state, { type: "ADD", product: shirt, size: "M" });
    expect(state).toHaveLength(1);
    expect(state[0].quantity).toBe(2);
  });

  it("keeps different sizes of the same product as separate lines", () => {
    let state = cartReducer([], { type: "ADD", product: shirt, size: "M" });
    state = cartReducer(state, { type: "ADD", product: shirt, size: "L" });
    expect(state.map((i) => i.size)).toEqual(["M", "L"]);
  });

  it("sets a quantity and drops the line when it reaches 0", () => {
    let state = cartReducer([], { type: "ADD", product: shirt, size: "M" });
    state = cartReducer(state, { type: "SET_QTY", productId: "shirt", size: "M", quantity: 3 });
    expect(state[0].quantity).toBe(3);
    state = cartReducer(state, { type: "SET_QTY", productId: "shirt", size: "M", quantity: 0 });
    expect(state).toEqual([]);
  });

  it("removes only the matching line", () => {
    let state = cartReducer([], { type: "ADD", product: shirt, size: "M" });
    state = cartReducer(state, { type: "ADD", product: other, size: "M" });
    state = cartReducer(state, { type: "REMOVE", productId: "shirt", size: "M" });
    expect(state.map((i) => i.product.id)).toEqual(["other"]);
  });

  it("clears the cart", () => {
    const state = cartReducer([{ product: shirt, size: "M", quantity: 2 }], { type: "CLEAR" });
    expect(state).toEqual([]);
  });
});

describe("computeOrderSummary", () => {
  const line = (p: Product, quantity: number): CartItem => ({ product: p, size: "M", quantity });

  it("charges nothing for an empty cart", () => {
    expect(computeOrderSummary([])).toEqual({ subtotal: 0, shipping: 0, total: 0, itemCount: 0 });
  });

  it("adds flat shipping below the free-shipping threshold", () => {
    const summary = computeOrderSummary([line(shirt, 2)]);
    expect(summary.subtotal).toBe(100);
    expect(summary.shipping).toBe(9.99);
    expect(summary.total).toBeCloseTo(109.99);
    expect(summary.itemCount).toBe(2);
  });

  it("ships free at exactly the threshold and above", () => {
    expect(computeOrderSummary([line(shirt, 3)]).shipping).toBe(0); // 150
    expect(computeOrderSummary([line(other, 2)]).shipping).toBe(0); // 200
  });

  it("sums quantities across lines", () => {
    const summary = computeOrderSummary([line(shirt, 1), line(other, 2)]);
    expect(summary.subtotal).toBe(250);
    expect(summary.itemCount).toBe(3);
    expect(summary.total).toBe(250);
  });
});
