import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { getProductById } from '../services/api.js';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    setStatus('loading');

    getProductById(id)
      .then((data) => {
        if (active) {
          setProduct(data);
          setStatus(data ? 'success' : 'error');
        }
      })
      .catch(() => active && setStatus('error'));

    return () => {
      active = false;
    };
  }, [id]);

  if (status === 'loading') return <LoadingSpinner label="Loading product" />;

  if (status === 'error' || !product) {
    return (
      <div className="empty-state page-state">
        <h1>Product not found</h1>
        <Link className="primary-button" to="/">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <section className="detail-layout">
      <Link className="back-link" to="/">
        <ArrowLeft size={18} />
        Back to products
      </Link>
      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.title}</h1>
          <div className="product-rating">
            <Star size={17} fill="currentColor" />
            <span>{product.rating?.rate?.toFixed(1) || '4.0'}</span>
            <small>({product.rating?.count || 0} reviews)</small>
          </div>
          <p>{product.description}</p>
          <strong className="detail-price">${product.price.toFixed(2)}</strong>
          <button
            className="primary-button detail-button"
            type="button"
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: 1
              })
            }
          >
            <ShoppingCart size={18} />
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
