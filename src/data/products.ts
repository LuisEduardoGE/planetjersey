import type { Product } from "../types";

/**
 * Seed catalog. With no backend yet, this local data source feeds the whole
 * store. The shape matches what a future `/api/products` endpoint would return,
 * so swapping to a real API later is a data-source change, not a rewrite.
 *
 * Images use placeholder color blocks via a data-driven gradient (see
 * ProductCard) so the store runs with zero external assets.
 */
export const products: Product[] = [
  {
    id: "fc-home-24",
    name: "Home Kit 24/25",
    team: "Atlas FC",
    league: "Football",
    price: 89.99,
    image: "#0b6b3a",
    sizes: ["S", "M", "L", "XL"],
    description:
      "The classic home shirt in forest green with the crest stitched over the heart. Breathable match-grade fabric.",
    badge: "New",
  },
  {
    id: "fc-away-24",
    name: "Away Kit 24/25",
    team: "Atlas FC",
    league: "Football",
    price: 84.99,
    image: "#1d4ed8",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Deep royal blue away strip with a tonal jacquard pattern. Lightweight and made for travel days.",
  },
  {
    id: "nba-city-edition",
    name: "City Edition Jersey",
    team: "Metro Hawks",
    league: "Basketball",
    price: 109.99,
    image: "#7c3aed",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Limited City Edition swingman jersey with embroidered numbers and a mesh body for the hardwood.",
    badge: "Limited",
  },
  {
    id: "nba-classic",
    name: "Classic Edition Jersey",
    team: "Metro Hawks",
    league: "Basketball",
    price: 94.99,
    image: "#dc2626",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Retro red throwback honoring the championship era. Soft-hand screen print across the chest.",
  },
  {
    id: "mlb-home-pinstripe",
    name: "Home Pinstripe Jersey",
    team: "Harbor Sailors",
    league: "Baseball",
    price: 119.99,
    image: "#0ea5e9",
    sizes: ["M", "L", "XL", "XXL"],
    description:
      "Authentic on-field pinstripe jersey with button-front placket and tackle-twill lettering.",
  },
  {
    id: "nhl-third",
    name: "Third Jersey",
    team: "Glacier Wolves",
    league: "Hockey",
    price: 134.99,
    image: "#0f766e",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Alternate teal sweater with a fight-strap and laced collar. Built to take a beating on the ice.",
    badge: "New",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
