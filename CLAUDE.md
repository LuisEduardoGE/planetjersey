# CLAUDE.md — Planet Jersey

Guidance for AI coding sessions (Claude Code) working in this repo. Keep changes consistent with the conventions below.

## What this project is

**Planet Jersey** is a football e-commerce store selling **national-team kits** (home/away/retro), themed for the summer 2026 World Cup. Frontend-first **Vite + React + TypeScript**. The catalog is currently local seed data (`src/data/products.ts`); the data shape mirrors a future REST API so the backend can be added without a UI rewrite.

Products are browsed by **`Region`** (Europe / South America / Africa) and **`Kit`** (Home / Away), not by sport. Keep the product copy neutral — describe colour, design, fabric and fit; do not make authenticity, licensing, or origin claims in product or marketing text.

## Tech & conventions

- **Stack:** Vite 5, React 18, TypeScript (`strict: true`), React Router 6, React Context for state.
- **Language:** TypeScript everywhere. No `any` — model data with the interfaces in `src/types`.
- **Styling:** Plain CSS in `src/index.css` using CSS variables (`--green`, `--ink`, …). Use existing class patterns (`card`, `btn`, `drawer`, `chip`) before inventing new ones.
- **State:** Cart lives in `src/context/CartContext.tsx` (reducer + context). Don't scatter cart state into components.
- **Components:** One component per file, named exports, props typed via an explicit interface.
- **Imports:** Use `import type { … }` for type-only imports (enforced by `verbatimModuleSyntax`-style settings).

## Single source of truth

- **Pricing/shipping rules** → `computeOrderSummary()` in `src/context/CartContext.tsx`. Change pricing policy here, nowhere else.
- **Catalog data** → `src/data/products.ts`. When a backend arrives, replace this module's internals (keep the `Product` shape and `getProductById` signature).
- **Types** → `src/types/index.ts`. Update here first, let TypeScript guide the rest.

## When extending the store

- **Add a product:** append to the `products` array in `src/data/products.ts`. Set `team` (the nation), `region`, and `kit`. `image` is the base image URL (Unsplash today); the `img(base, width, ratio)` helper builds sized/cropped variants. Include `rating`, `reviewCount`, `sizes`, and optionally `compareAt` (for sale pricing) and `badge` ("New" | "Retro" | "Bestseller").
- **Add a region:** extend the `Region` union in `src/types/index.ts`, then add it to `REGIONS` in `Header.tsx` and `Catalog.tsx` (and optionally a tile in `CategoryTiles.tsx`). Only expose a region in filters once it has products, or the filtered view shows empty.
- **Swap to your own photos:** replace each `image` base URL and, if you leave Unsplash, update `img()` — that's the only place URL params are built.
- **Add a page:** create it in `src/pages/`, register the `<Route>` in `src/App.tsx`.
- **Add to cart logic:** extend the reducer in `CartContext.tsx` (add an action), never mutate state in place.

## Image sourcing

Product/lifestyle photos are real Unsplash images (free license) chosen for a trustworthy look. For production, swap in your own licensed product photography. Keep a consistent 4:5 portrait crop for product cards (`img()` defaults to portrait) so the grid stays even.

## House style (this is a "product studio" pattern)

The owner (GitHub: **LuisEduardoGE**) ships products as: a product frontend (this repo) + optional Python **FastAPI** backend + sometimes a Flutter manager app. Keep this repo's API boundary clean so a FastAPI service can slot in. Default to a `/api/...` REST contract returning the existing `Product` JSON shape.

Future i18n target: EN / FR / NL (consistent with sibling projects).

## Commands

```bash
npm run dev       # dev server on :5173
npm run build     # type-check (tsc -b) + production build
npm run preview   # serve the build
```

## Definition of done for a change

1. `npm run build` passes (TypeScript strict, no unused locals).
2. New UI follows existing class names / variables.
3. Business logic stays in its single source of truth (see above).
4. No secrets committed; use `.env` (gitignored) + `.env.example`.

## Git / identity

- Owner: **LuisEduardoGE** (wtechitsolutions@gmail.com).
- Repo is **private**. Prefer small, focused commits with imperative messages.
- Branch off `main` for features; don't commit or push unless asked.
