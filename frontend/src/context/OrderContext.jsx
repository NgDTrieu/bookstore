import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // Khởi tạo orders từ localStorage, nếu không có thì dùng mảng rỗng
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Lưu orders vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders((prev) => [...prev, {
      id: `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...order,
      createdAt: new Date().toISOString(),
      status: Math.random() > 0.3 ? 'pending' : 'completed', // Ngẫu nhiên pending hoặc completed
    }]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);