import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCategories, getProducts } from '../services/api.js';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const loadProducts = useCallback(async () => {
    setStatus('loading');
    setError('');

    try {
      const [productData, categoryData] = await Promise.all([getProducts(), getCategories()]);
      setProducts(productData);
      setCategories(categoryData);
      setStatus('success');
    } catch (err) {
      setError(err.message || 'Unable to load products.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const featuredProducts = useMemo(
    () => products.filter((product) => product.rating?.rate >= 4.3).slice(0, 4),
    [products]
  );

  return {
    products,
    categories,
    featuredProducts,
    status,
    error,
    reload: loadProducts
  };
}
