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
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (prestation, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === prestation.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === prestation.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...prestation, quantity }];
    });
  };

  const removeFromCart = (prestationId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== prestationId));
  };

  const updateQuantity = (prestationId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(prestationId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === prestationId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
