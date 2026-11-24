.DEFAULT_GOAL := help
.PHONY: help install run test lint build preview clean

PORT ?= 5180

help: ## List available targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-10s %s\n", $$1, $$2}'

install: ## Install dependencies (npm ci)
	npm ci

run: ## Start the Vite dev server (PORT=5180 by default)
	npm run dev -- --port $(PORT)

test: ## Run the Vitest suite (npm test)
	npm test

lint: ## Type-check with tsc --noEmit (npm run lint)
	npm run lint

build: ## Type-check (tsc -b) and build the static site into dist/
	npm run build

preview: ## Serve the built dist/ locally (run make build first)
	npm run preview -- --port $(PORT)

clean: ## Remove build output and tsc build artifacts
	rm -rf dist coverage *.tsbuildinfo vite.config.js vite.config.d.ts
