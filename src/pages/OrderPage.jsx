// src/pages/OrderPage.jsx

import React, { useState } from 'react';
import OrdersTableComponent from '../components/OrdersTableComponent';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]); // 假设这是从后端获取的订单列表

  const handleGuestInfoChange = (orderIndex, field, value) => {
    const updatedOrders = orders.map((order, index) => {
      if (index === orderIndex) {
        return { ...order, [field]: value };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  return (
    <div>
      <OrdersTableComponent orders={orders} onGuestInfoChange={handleGuestInfoChange} />
    </div>
  );
};

export default OrdersPage;
