import type { Product } from "../types";

/**
 * National-team kits for the summer of 2026. With no backend yet, this local
 * data source feeds the whole store; the shape matches a future `/api/products`
 * response so swapping to an API later is a data-source change, not a rewrite.
 *
 * Images are real photography from Unsplash (free license). `image` holds the
 * base URL; `img()` builds a sized, cropped variant per surface.
 */
export const products: Product[] = [
  {
    id: "brazil-2026-home",
    name: "Brazil 2026 Home",
    team: "Brazil",
    region: "South America",
    kit: "Home",
    price: 89.99,
    compareAt: 109.99,
    image: "https://images.unsplash.com/photo-1552066379-e7bfd22155c5",
    rating: 4.9,
    reviewCount: 512,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "The unmistakable canary yellow with green trim and the crest over the heart. Lightweight, breathable knit built to move — the brightest shirt at any watch party.",
    badge: "Bestseller",
  },
  {
    id: "brazil-2026-away",
    name: "Brazil 2026 Away",
    team: "Brazil",
    region: "South America",
    kit: "Away",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1780336673669-15be60152796",
    rating: 4.8,
    reviewCount: 274,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Royal-blue away shirt with tonal detailing and gold accents. A modern cut that wears as well on the street as in the stands.",
  },
  {
    id: "colombia-2026-home",
    name: "Colombia 2026 Home",
    team: "Colombia",
    region: "South America",
    kit: "Home",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1763656813028-3eb492fa7bcf",
    rating: 4.7,
    reviewCount: 161,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Sunshine yellow with red-and-blue collar trim. A vivid, summery shirt with a soft-touch finish and a relaxed fan fit.",
    badge: "New",
  },
  {
    id: "portugal-2026-home",
    name: "Portugal 2026 Home — #7",
    team: "Portugal",
    region: "Europe",
    kit: "Home",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1778454288878-9b3c0c975589",
    rating: 4.9,
    reviewCount: 643,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Deep red home shirt with green detailing and the iconic #7 on the back. Match-weight fabric with a tailored, true-to-size cut.",
    badge: "Bestseller",
  },
  {
    id: "spain-2026-home",
    name: "Spain 2026 Home",
    team: "Spain",
    region: "Europe",
    kit: "Home",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1551854321-1432edd90a5c",
    rating: 4.7,
    reviewCount: 208,
    sizes: ["S", "M", "L", "XL"],
    description:
      "La Roja's bold red home kit with gold trim. Cut for everyday wear as easily as matchday, with a breathable mesh back.",
  },
  {
    id: "germany-2026-away",
    name: "Germany 2026 Away",
    team: "Germany",
    region: "Europe",
    kit: "Away",
    price: 84.99,
    compareAt: 99.99,
    image: "https://images.unsplash.com/photo-1551854386-b42759a60dd0",
    rating: 4.6,
    reviewCount: 154,
    sizes: ["S", "M", "L", "XL"],
    description:
      "The striking teal-green away shirt with a tonal pattern. A modern classic that wears like a premium tee.",
  },
  {
    id: "germany-1990-retro",
    name: "Germany 1990 Retro",
    team: "Germany",
    region: "Europe",
    kit: "Home",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1759447946445-397b1c034768",
    rating: 4.8,
    reviewCount: 226,
    sizes: ["S", "M", "L", "XL"],
    description:
      "The legendary white shirt with the black-red-gold chevron across the chest. A faithful throwback in a heavier, vintage-feel cotton blend.",
    badge: "Retro",
  },
  {
    id: "england-2026-home",
    name: "England 2026 Home",
    team: "England",
    region: "Europe",
    kit: "Home",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1780587109939-faae46139552",
    rating: 4.7,
    reviewCount: 189,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Crisp white home shirt with the three-lions crest and a clean red trim. Understated, classic, and built for the long summer ahead.",
  },
  {
    id: "cameroon-2026-home",
    name: "Cameroon 2026 Home",
    team: "Cameroon",
    region: "Africa",
    kit: "Home",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1764104517932-664d963a2af0",
    rating: 4.6,
    reviewCount: 97,
    sizes: ["S", "M", "L", "XL"],
    description:
      "The Indomitable Lions' vivid green home shirt with red-and-gold accents. Bold colour, soft hand-feel, and a comfortable fan fit.",
    badge: "New",
  },
];

/**
 * Build a sized, cropped Unsplash URL. Keeps payloads small on cards and crisp
 * on the product page. Swap the implementation if you move off Unsplash.
 */
export function img(
  base: string,
  width: number,
  ratio: "portrait" | "square" = "portrait"
): string {
  const height = ratio === "portrait" ? Math.round(width * 1.25) : width;
  return `${base}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
