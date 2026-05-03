# CartCraft - Premium React E-Commerce Application

CartCraft is a robust, responsive, and visually stunning e-commerce application built with React and Vite. Designed as a comprehensive capstone project, it demonstrates modern web development practices including robust state management, advanced routing, local storage persistence, and a premium user interface.

## ✨ Key Features

- **Premium UI/UX Design:** Features a modern aesthetic with glassmorphism effects, rich shadows, smooth micro-animations, and the elegant *Outfit* typography.
- **Dynamic Product Catalog:** Fetches and displays products via the FakeStoreAPI (with built-in fallback data), including categories, search functionality, and sorting options.
- **Advanced State Management:** Utilizes the React Context API to manage global state seamlessly across the application (`CartContext` and `AuthContext`).
- **Persistent Storage:** Shopping cart data and simulated user sessions are securely persisted using browser `localStorage`, ensuring data is maintained across page reloads.
- **Simulated Authentication:** Complete user registration and login flows with form validation and secure, protected routing for checkout.
- **Full Checkout Flow:** Includes cart management (add, remove, update quantities, calculate subtotals/taxes) and a simulated multi-step checkout form leading to an order success page.
- **Optimized Performance:** Implements React Router with lazy-loaded components and Suspense to guarantee rapid initial page loads.
- **Fully Responsive:** Beautifully adapts to all screen sizes, from large desktop monitors to mobile devices, with dynamic navigation and grid layouts.

## 🛠️ Technology Stack

- **Core:** React 18, Vite
- **Routing:** React Router DOM (v6)
- **Styling:** Custom Modern CSS (Variables, Flexbox, CSS Grid, Glassmorphism)
- **Icons:** Lucide React
- **Data Fetching:** Native Fetch API

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rishithbangari24-jpg/CapstoneProject.git
   cd "Capstone project"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Production Build
To create an optimized production build, run:
```bash
npm run build
```

## 🏗️ Project Architecture

```text
src/
├── components/      # Reusable UI components (Navbar, ProductCard, Cart, Checkout, etc.)
├── contexts/        # Global state providers (AuthContext.jsx, CartContext.jsx)
├── hooks/           # Custom React hooks (useProducts.js)
├── pages/           # Route-level components (Home, ProductDetail, CartPage, etc.)
├── services/        # API interaction logic (api.js)
├── styles/          # Global styles and design tokens (global.css)
├── App.jsx          # Main application layout and routing
└── main.jsx         # React application entry point
```

## 🌐 Deployment

This project is configured and ready to be deployed to platforms like Vercel or Netlify.

**Vercel / Netlify Settings:**
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

---
*Developed as a React Capstone Project.*
