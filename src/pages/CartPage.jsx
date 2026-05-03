import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/Cart/CartItem.jsx';
import CartSummary from '../components/Cart/CartSummary.jsx';
import { useCart } from '../contexts/CartContext.jsx';

function CartPage() {
  const { items, clearCart } = useCart();

  if (!items.length) {
    return (
      <div className="empty-state page-state">
        <h1>Your cart is empty</h1>
        <p>Add a few products and your cart will stay saved between visits.</p>
        <Link className="primary-button" to="/">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="cart-layout">
      <div>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Shopping cart</p>
            <h1>Review your items</h1>
          </div>
          <button className="secondary-button" type="button" onClick={clearCart}>
            Clear cart
          </button>
        </div>
        <div className="cart-list">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <CartSummary />
    </section>
  );
}

export default CartPage;
