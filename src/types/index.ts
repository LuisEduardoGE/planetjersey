/** Confederation / region used to browse national teams. */
export type Region = "Europe" | "South America" | "Africa";

export type Kit = "Home" | "Away";

export interface Product {
  id: string;
  /** Display name, e.g. "Brazil 2026 Home". */
  name: string;
  /** Nation the kit belongs to, e.g. "Brazil". */
  team: string;
  region: Region;
  kit: Kit;
  /** Price in whole currency units (e.g. 89.99). */
  price: number;
  /** Optional original price, shown struck-through when on sale. */
  compareAt?: number;
  /** Primary product image (base URL; size with `img()`). */
  image: string;
  /** Average customer rating, 0–5. */
  rating: number;
  /** Number of customer reviews. */
  reviewCount: number;
  /** Available sizes. */
  sizes: string[];
  /** Short marketing blurb shown on the product page. */
  description: string;
  /** Optional badge, e.g. "New", "Retro", "Bestseller". */
  badge?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}
