import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../contexts/CartContext.jsx';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    });
    window.setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <article className="product-card">
      <Link className="product-image" to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <Link className="product-title" to={`/products/${product.id}`}>
          {product.title}
        </Link>
        <div className="product-rating">
          <Star size={16} fill="currentColor" />
          <span>{product.rating?.rate?.toFixed(1) || '4.0'}</span>
          <small>({product.rating?.count || 0})</small>
        </div>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button className="primary-button small-button" type="button" onClick={handleAddToCart} disabled={isAdding}>
            <ShoppingCart size={17} />
            {isAdding ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
