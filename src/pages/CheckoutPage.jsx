import React from 'react';
import { Link } from 'react-router-dom';
import CartSummary from '../components/Cart/CartSummary.jsx';
import CheckoutForm from '../components/Checkout/CheckoutForm.jsx';
import { useCart } from '../contexts/CartContext.jsx';

function CheckoutPage() {
  const { items } = useCart();

  if (!items.length) {
    return (
      <div className="empty-state page-state">
        <h1>No items to checkout</h1>
        <p>Your cart is empty. Add products before starting checkout.</p>
        <Link className="primary-button" to="/">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <section className="cart-layout">
      <div>
        <p className="eyebrow">Secure checkout simulation</p>
        <h1 className="page-title">Complete your order</h1>
        <CheckoutForm />
      </div>
      <CartSummary checkout />
    </section>
  );
}

export default CheckoutPage;
