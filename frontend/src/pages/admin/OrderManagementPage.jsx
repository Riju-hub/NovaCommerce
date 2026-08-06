
import React, { useState } from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
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
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto w-full min-w-0">
        <div className="border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-1">
            <ShoppingBag className="w-4 h-4" /> Global Logistics
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            Platform Orders <Sparkles className="w-5 h-5 text-amber-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor and update order fulfillment statuses across all vendor stores.
          </p>
        </div>

        <OrderTable orders={orders} onStatusUpdate={handleStatusUpdate} />
      </main>
    </div>
  );
};

export default OrderManagementPage;