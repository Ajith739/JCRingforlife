import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('jcring_cart_v1') || localStorage.getItem('aion_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from storage', e);
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('jcring_cart_v1', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.finishId === product.finishId && item.size === product.size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += product.quantity || 1;
        return next;
      }

      const newItem = {
        id: `${product.finishId || 'midnight'}-${product.size || 'sizing-kit'}-${Date.now()}`,
        name: product.name || 'JCRingforlife Smart Ring',
        finishId: product.finishId || 'midnight',
        finishName: product.finishName || 'Midnight',
        size: product.size || 'Free Sizing Kit First',
        price: product.price || 149,
        originalPrice: product.originalPrice || 199,
        quantity: product.quantity || 1,
        image: product.image || '/assets/ring-finish-midnight-DK6ZPSTf.png',
      };

      return [...prev, newItem];
    });

    setIsOpen(true);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

