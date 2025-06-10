import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((prev) => [...prev, {
      id: `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Tạo ID giả
      ...order,
      createdAt: new Date().toISOString(),
      status: 'pending', // Trạng thái mặc định
    }]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);