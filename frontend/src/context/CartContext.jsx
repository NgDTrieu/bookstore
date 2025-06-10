import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Khởi tạo cartItems từ localStorage, nếu không có thì dùng mảng rỗng
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Lưu cartItems vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book) => {
    setCartItems((prevItems) => [...prevItems, book]);
  };

  const removeFromCart = (bookId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCartItems((prevItems) => {
      const currentCount = prevItems.filter((item) => item.id === bookId).length;
      const otherItems = prevItems.filter((item) => item.id !== bookId);
      const book = prevItems.find((item) => item.id === bookId);
      if (!book) return prevItems;

      const newItems = [];
      for (let i = 0; i < quantity; i++) {
        newItems.push({ ...book });
      }
      return [...otherItems, ...newItems];
    });
  };

  const clearCart = () => {
    setCartItems([]); // Reset giỏ hàng về rỗng
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};