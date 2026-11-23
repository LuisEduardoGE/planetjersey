# Planet Jersey

**A World Cup 2026 football-kit storefront.** Home, away and retro national-team shirts, built frontend-first with Vite, React and TypeScript.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)

![Planet Jersey homepage](docs/screenshot.jpg)

The catalog runs on local seed data, with a data shape designed to swap to a real API (e.g. FastAPI) without rewriting the UI.

## Features

- **Storefront homepage**: stadium hero, bestsellers, shop-by-region tiles, editorial band, reviews, newsletter.
- **Catalog** with URL-driven region filters (Europe / South America / Africa), search, and sorting by price or rating.
- **Product detail**: large imagery, ratings, sale pricing, size selector, expandable details / shipping / returns, "you may also like".
- **Cart drawer** with quantity controls, live totals and a free-shipping progress nudge.
- **Trust and conversion layer**: announcement bar, trust badges, payment icons, rich footer.
- Fully **responsive** (desktop / tablet / mobile), with an Archivo + Inter type system.

## Tech stack

| Layer | Choice |
|---|---|
| Build | Vite 5 |
| UI | React 18 + TypeScript (strict) |
| Routing | React Router 6 |
| State | React Context + `useReducer` |
| Styling | Hand-written CSS (`src/index.css`) |

## Getting started

```bash
npm install
npm run dev                      # http://localhost:5173
npm run build && npm run preview # production build
```

Or `python run.py`, which installs dependencies if needed and starts the dev server.

## Project structure

```
src/
├── main.tsx              # entry: Router + CartProvider
├── App.tsx               # shell: navbar, routes, cart drawer, footer
├── index.css             # all styles
├── types/                # Product, CartItem, Region, Kit
├── data/products.ts      # seed catalog (swap for an API later)
├── context/CartContext   # cart state + pricing rules
├── components/           # Header, TrustBar, Footer, ProductCard, CartDrawer, ...
└── pages/                # Home, Catalog, ProductDetail
```

**Where the business logic lives:** pricing rules (subtotal, shipping, free-shipping threshold) are in one function, `computeOrderSummary()` in `src/context/CartContext.tsx`. Every UI surface reads from it, so a pricing-policy change is a single edit.

## Roadmap

- [ ] Real backend (FastAPI) behind `/api/products`
- [ ] Checkout and payments (Stripe)
- [ ] Multiple photos per kit
- [ ] Player name / number customisation
- [ ] Persist the cart to `localStorage`
- [ ] i18n (EN / FR / NL)

## Credits and license

Code is [MIT](LICENSE). Photography is from [Unsplash](https://unsplash.com) under the Unsplash License. Planet Jersey is a demo store: team names are used descriptively and no official kits are sold.
