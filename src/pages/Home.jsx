import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck } from 'lucide-react';
import ProductList from '../components/ProductList/ProductList.jsx';
import { useProducts } from '../hooks/useProducts.js';

function Home() {
  const productsState = useProducts();

  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Intermediate React e-commerce project</p>
          <h1>CartCraft</h1>
          <p>
            A responsive shopping experience with routing, API data, filters, persistent cart,
            simulated accounts, protected checkout, and form validation.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#catalog-heading">
              Shop products
              <ArrowRight size={18} />
            </a>
            <Link className="secondary-button" to="/cart">
              View cart
            </Link>
          </div>
        </div>
        <div className="hero-media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80"
            alt=""
          />
          <div className="hero-badge">
            <Truck size={20} />
            Free shipping over $75
          </div>
        </div>
      </section>

      <ProductList {...productsState} />
    </>
  );
}

export default Home;
