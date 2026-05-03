import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext.jsx';
import './Cart.css';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <article className="cart-item">
      <Link className="cart-item-image" to={`/products/${item.id}`}>
        <img src={item.image} alt={item.title} />
      </Link>
      <div className="cart-item-details">
        <p className="product-category">{item.category}</p>
        <Link className="cart-item-title" to={`/products/${item.id}`}>
          {item.title}
        </Link>
        <strong>${item.price.toFixed(2)}</strong>
      </div>
      <div className="quantity-control" aria-label={`Quantity for ${item.title}`}>
        <button className="icon-button" type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
          <Minus size={16} />
          <span className="sr-only">Decrease quantity</span>
        </button>
        <span>{item.quantity}</span>
        <button className="icon-button" type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          <Plus size={16} />
          <span className="sr-only">Increase quantity</span>
        </button>
      </div>
      <strong className="cart-line-total">${(item.price * item.quantity).toFixed(2)}</strong>
      <button className="icon-button danger-button" type="button" onClick={() => removeFromCart(item.id)}>
        <Trash2 size={18} />
        <span className="sr-only">Remove item</span>
      </button>
    </article>
  );
}

export default CartItem;
