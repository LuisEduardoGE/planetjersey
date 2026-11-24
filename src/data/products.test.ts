import { describe, expect, it } from "vitest";
import { getProductById, img, products } from "./products";

describe("seed catalog", () => {
  it("has unique product ids", () => {
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has valid prices, ratings and sizes", () => {
    for (const p of products) {
      expect(p.price, p.id).toBeGreaterThan(0);
      if (p.compareAt !== undefined) expect(p.compareAt, p.id).toBeGreaterThan(p.price);
      expect(p.rating, p.id).toBeGreaterThanOrEqual(0);
      expect(p.rating, p.id).toBeLessThanOrEqual(5);
      expect(p.sizes.length, p.id).toBeGreaterThan(0);
    }
  });
});

describe("getProductById", () => {
  it("finds a product by id", () => {
    const first = products[0];
    expect(getProductById(first.id)).toBe(first);
  });

  it("returns undefined for an unknown id", () => {
    expect(getProductById("does-not-exist")).toBeUndefined();
  });
});

describe("img", () => {
  const base = "https://images.unsplash.com/photo-1";

  it("builds a portrait crop by default (height = 1.25 x width)", () => {
    expect(img(base, 400)).toBe(`${base}?auto=format&fit=crop&w=400&h=500&q=80`);
  });

  it("builds a square crop", () => {
    expect(img(base, 300, "square")).toBe(`${base}?auto=format&fit=crop&w=300&h=300&q=80`);
  });
});
