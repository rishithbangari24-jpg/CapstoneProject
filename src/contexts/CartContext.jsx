import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'capstone-cart';

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => String(item.id) === String(product.id));

      if (existingItem) {
        return currentItems.map((item) =>
          String(item.id) === String(product.id) ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
        );
      }

      return [...currentItems, { ...product, quantity: product.quantity || 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => (String(item.id) === String(id) ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems((currentItems) => currentItems.filter((item) => String(item.id) !== String(id)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 75 || subtotal === 0 ? 0 : 7.99;
    const tax = subtotal * 0.0825;
    const total = subtotal + shipping + tax;

    return {
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      shipping,
      tax,
      total
    };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totals,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }),
    [addToCart, clearCart, items, removeFromCart, totals, updateQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}

export { CartContext };
