import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Adiciona um item ou incrementa a quantidade
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name);
      if (existingItem) {
        return prevItems.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Diminui a quantidade de um item
  const decreaseQuantity = (itemName) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === itemName);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((i) =>
          i.name === itemName ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      // Se a quantidade for 1, remove o item
      return prevItems.filter((i) => i.name !== itemName);
    });
  };

  // Remove o item completamente, independente da quantidade
  const removeItem = (itemName) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.name !== itemName));
  };


  const value = {
    cartItems,
    addToCart,
    decreaseQuantity, // Nova função
    removeItem,       // Função renomeada para clareza
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};