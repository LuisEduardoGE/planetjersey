# Planet Jersey 🌍👕

An e-commerce store for authentic sports jerseys and kits — football, basketball, baseball, and hockey, shipped worldwide.

Built as a frontend-first **Vite + React + TypeScript** app. The catalog runs on local seed data today, with the data shape designed to swap to a real API (e.g. FastAPI) without rewriting the UI.

---

## ✨ Features

- **Catalog** with league filters (Football / Basketball / Baseball / Hockey)
- **Product detail** pages with size selection
- **Cart** as a slide-out drawer with quantity controls and live totals
- **Order summary** with a configurable free-shipping threshold
- Responsive layout, zero external image assets (color-block kits)

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
# 1. Install dependencies
npm install

# 2. Start the dev server (opens http://localhost:5173)
npm run dev

# 3. Production build
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
│   ├── types/               # Product, CartItem, League
│   ├── data/products.ts     # Seed catalog (swap for an API later)
│   ├── context/CartContext  # Cart state + pricing rules
│   ├── components/          # Navbar, ProductCard, CartDrawer
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
