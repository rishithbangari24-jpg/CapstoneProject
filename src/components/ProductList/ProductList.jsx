import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import './ProductList.css';

function ProductList({ products, categories, status, error, reload }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');

  const filteredProducts = useMemo(() => {
    const nextProducts = products
      .filter((product) => category === 'all' || product.category === category)
      .filter((product) => product.title.toLowerCase().includes(query.trim().toLowerCase()));

    return [...nextProducts].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'rating') return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      return (b.rating?.count || 0) - (a.rating?.count || 0);
    });
  }, [category, products, query, sort]);

  if (status === 'loading') {
    return <LoadingSpinner label="Fetching products" />;
  }

  if (status === 'error') {
    return (
      <div className="empty-state">
        <h2>Products could not be loaded</h2>
        <p>{error}</p>
        <button className="primary-button" type="button" onClick={reload}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <section className="catalog-section" aria-labelledby="catalog-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Live product catalog</p>
          <h2 id="catalog-heading">Shop curated essentials</h2>
        </div>
        <span className="result-count">{filteredProducts.length} items</span>
      </div>

      <div className="catalog-controls">
        <label className="search-control">
          <Search size={18} />
          <input
            type="search"
            value={query}
            placeholder="Search products"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label>
          <span className="sr-only">Filter category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="sort-control">
          <SlidersHorizontal size={18} />
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="rating">Highest rated</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>

      {filteredProducts.length ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No matching products</h2>
          <p>Adjust the search or category filter to browse more items.</p>
        </div>
      )}
    </section>
  );
}

export default ProductList;
