# Planet Jersey 🌍⚽

A football e-commerce store for **national-team kits** — home, away and retro shirts from nations across Europe, South America and Africa, themed for the summer 2026 World Cup and shipped worldwide.

Built as a frontend-first **Vite + React + TypeScript** app. The catalog runs on local seed data today, with the data shape designed to swap to a real API (e.g. FastAPI) without rewriting the UI.

---

## ✨ Features

- **Storefront homepage** — cinematic stadium hero, bestsellers, shop-by-region tiles, editorial band, customer reviews, newsletter
- **Catalog** with URL-driven region filters (Europe / South America / Africa), search, and sorting (price / rating)
- **Product detail** — large imagery, star ratings, sale pricing, size selector, expandable details/shipping/returns, "you may also like"
- **Cart drawer** with quantity controls, live totals, and a free-shipping progress nudge
- **Trust & conversion layer** — announcement bar, 4-up trust badges (quality / fast shipping / free returns / secure checkout), payment icons, rich footer
- **Real photography** sourced from Unsplash (free license); product images centralized for easy swap to your own studio shots
- Fully **responsive** (desktop / tablet / mobile), typographic system with Archivo + Inter

---

## 🧱 Tech stack

| Layer    | Choice                          |
| -------- | ------------------------------- |
| Build    | Vite 5                          |
| UI       | React 18 + TypeScript (strict)  |
| Routing  | React Router 6                  |
| State    | React Context + `useReducer`    |
| Styling  | Hand-rolled CSS (`src/index.css`) |

---

## 🚀 Getting started

```bash
# Option A — one command (installs deps if needed, starts dev server)
python run.py

# Option B — npm directly
npm install
npm run dev          # opens http://localhost:5173

# Production build
npm run build && npm run preview
```

---

## 📁 Project structure

```
planetjersey/
├── index.html
├── vite.config.ts
├── src/
│   ├── main.tsx              # App entry — Router + CartProvider
│   ├── App.tsx              # Shell: navbar, routes, cart drawer, footer
│   ├── index.css            # All styles
│   ├── types/               # Product, CartItem, Region, Kit
│   ├── data/products.ts     # Seed catalog + img() helper (swap for an API later)
│   ├── context/CartContext  # Cart state + pricing rules
│   ├── components/          # Header, AnnouncementBar, TrustBar, Footer,
│   │                        # ProductCard, CartDrawer, CategoryTiles,
│   │                        # Testimonials, Newsletter, Stars
│   └── pages/               # Home, Catalog, ProductDetail
```

---

## 🧠 Where the business logic lives

Pricing rules (subtotal, shipping, free-shipping threshold) live in **one place**:
`src/context/CartContext.tsx` → `computeOrderSummary()`. Every UI surface reads
from it, so changing the pricing policy is a single-function edit.

---

## 🗺️ Roadmap

- [ ] Replace seed data with a real backend (FastAPI) and `/api/products`
- [ ] Real checkout + payment provider (Stripe)
- [ ] Product images & multiple photos per kit
- [ ] Player name/number customization
- [ ] Persist cart to `localStorage`
- [ ] Search and sort
- [ ] i18n (EN/FR/NL) — matching the studio multilingual pattern

---

## 📄 License

Private project © Planet Jersey. All rights reserved.
