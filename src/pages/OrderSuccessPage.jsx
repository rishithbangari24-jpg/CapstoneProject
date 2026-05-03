import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

function OrderSuccessPage() {
  const order = JSON.parse(localStorage.getItem('capstone-last-order') || 'null');

  return (
    <div className="empty-state page-state success-state">
      <CheckCircle2 size={52} />
      <h1>Order placed</h1>
      <p>
        {order
          ? `Order ${order.id} was created for ${order.customer}. Total: $${order.total.toFixed(2)}.`
          : 'Your demo order has been completed.'}
      </p>
      <Link className="primary-button" to="/">
        Continue shopping
      </Link>
    </div>
  );
}

export default OrderSuccessPage;
