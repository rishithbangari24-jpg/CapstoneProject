# CartCraft - React E-Commerce Capstone

CartCraft is an intermediate React e-commerce application built for the capstone project. It combines routing, API integration, reusable components, Context API state management, localStorage persistence, simulated authentication, checkout validation, lazy loading, and responsive design.

## Features

- Product catalog powered by FakeStoreAPI with fallback demo products
- Product cards, product detail pages, category filter, search, and sorting
- Persistent shopping cart with add, remove, quantity update, subtotal, shipping, tax, and total
- Simulated register/login/logout flow using localStorage
- Protected checkout route
- Checkout form with delivery and payment validation
- Order success page with generated order id
- React Router routes with lazy-loaded pages and Suspense loading states
- Error boundary and responsive CSS

## Project Structure

```text
src/App.js
src/components/Navbar/
src/components/ProductList/
src/components/ProductCard/
src/components/Cart/
src/components/Checkout/
src/pages/Home.js
src/pages/ProductDetail.js
src/pages/CartPage.js
src/pages/CheckoutPage.js
src/contexts/CartContext.js
src/contexts/AuthContext.js
src/hooks/useProducts.js
src/services/api.js
src/styles/
public/
package.json
README.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Deployment Notes

This project is ready for Netlify or Vercel.

For Netlify:

- Build command: `npm run build`
- Publish directory: `dist`

For Vercel:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Capstone Timeline

1. Day 1: Project setup, architecture, routing, contexts, API service
2. Day 2: Product catalog, cards, search, filtering, sorting
3. Day 3: Product detail page, cart context, persistent cart page
4. Day 4: Register/login simulation, auth context, protected checkout route
5. Day 5: Checkout form, validation, order summary, success flow
6. Day 6: Lazy loading, loading states, error boundary, responsive polish
7. Day 7: Build testing, documentation, Netlify/Vercel deployment settings
