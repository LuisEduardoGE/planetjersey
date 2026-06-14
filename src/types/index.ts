export type League = "Football" | "Basketball" | "Baseball" | "Hockey";

export interface Product {
  id: string;
  name: string;
  team: string;
  league: League;
  /** Price in whole currency units (e.g. 89.99). */
  price: number;
  /** Public path or URL to the product image. */
  image: string;
  /** Available sizes for this jersey. */
  sizes: string[];
  /** Short marketing blurb shown on the product page. */
  description: string;
  /** Optional badge, e.g. "New" or "Limited". */
  badge?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}
