// src/pages/admin/OrderManagementPage.jsx
import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import OrderTable from '../../components/admin/OrderTable';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([
    {
      _id: 'ord_101a9f',
      shippingAddress: { fullName: 'Alice Smith', city: 'Seattle' },
      items: [{ id: '1' }, { id: '2' }],
      totalAmount: 189.50,
      status: 'pending',
    },
    {
      _id: 'ord_102b8e',
      shippingAddress: { fullName: 'Bob Johnson', city: 'Chicago' },
      items: [{ id: '3' }],
      totalAmount: 49.99,
      status: 'shipped',
    },
  ]);

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform Orders</h1>
          <p className="text-xs text-slate-500">
            Monitor and manage fulfillment statuses across all vendor stores.
          </p>
        </div>

        <OrderTable orders={orders} onStatusUpdate={handleStatusUpdate} />
      </main>
    </div>
  );
};

export default OrderManagementPage;