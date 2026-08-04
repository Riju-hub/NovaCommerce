
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const OrderTable = ({ orders = [], onStatusUpdate }) => {
  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
      processing: 'bg-indigo-950/80 text-indigo-400 border-indigo-800/60',
      shipped: 'bg-purple-950/80 text-purple-400 border-purple-800/60',
      delivered: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
      cancelled: 'bg-rose-950/80 text-rose-400 border-rose-800/60',
    };

    return (
      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border capitalize ${styles[status] || styles.pending}`}>
        {status}
      </span>
    );
  };

  if (orders.length === 0) {
    return (
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-12 text-center text-slate-400 my-4 shadow-2xl flex flex-col items-center justify-center gap-3">
        <div className="p-3 bg-indigo-950/80 rounded-2xl border border-indigo-800/50 text-indigo-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div>
          <p className="text-base font-extrabold text-white">No orders recorded</p>
          <p className="text-xs text-slate-500 mt-1">Order activity across the platform will be listed here.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-slate-800 overflow-hidden shadow-2xl"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
              <th className="py-4 px-5">Order ID</th>
              <th className="py-4 px-5">Customer</th>
              <th className="py-4 px-5">Items</th>
              <th className="py-4 px-5">Total Amount</th>
              <th className="py-4 px-5">Status</th>
              <th className="py-4 px-5 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs text-slate-300">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-5 font-mono font-black text-white">
                  #{order._id?.slice(-6).toUpperCase()}
                </td>
                <td className="py-3.5 px-5">
                  <div className="font-bold text-white">{order.shippingAddress?.fullName || 'Guest User'}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{order.shippingAddress?.city}</div>
                </td>
                <td className="py-3.5 px-5 font-bold text-slate-400">
                  {order.items?.length || 1} item(s)
                </td>
                <td className="py-3.5 px-5 font-black text-white font-mono">
                  ₹{parseFloat(order.totalAmount || 0).toFixed(2)}
                </td>
                <td className="py-3.5 px-5">{getStatusBadge(order.status || 'pending')}</td>
                <td className="py-3.5 px-5 text-right">
                  <select
                    value={order.status || 'pending'}
                    onChange={(e) => onStatusUpdate(order._id, e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold py-1.5 px-3 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrderTable;