import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useCart } from '../../contexts/CartContext.jsx';
import './Cart.css';

function CartSummary({ checkout = false }) {
  const { totals } = useCart();

  return (
    <aside className="summary-panel">
      <h2>Order summary</h2>
      <dl className="summary-list">
        <div>
          <dt>Subtotal</dt>
          <dd>${totals.subtotal.toFixed(2)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`}</dd>
        </div>
        <div>
          <dt>Estimated tax</dt>
          <dd>${totals.tax.toFixed(2)}</dd>
        </div>
        <div className="summary-total">
          <dt>Total</dt>
          <dd>${totals.total.toFixed(2)}</dd>
        </div>
      </dl>
      <p className="secure-note">
        <ShieldCheck size={18} />
        Demo checkout. No payment is collected.
      </p>
      {!checkout && (
        <Link className={`primary-button full-button ${totals.count === 0 ? 'disabled-link' : ''}`} to="/checkout">
          Checkout
        </Link>
      )}
    </aside>
  );
}

export default CartSummary;
