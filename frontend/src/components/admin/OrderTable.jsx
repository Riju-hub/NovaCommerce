// src/components/admin/OrderTable.jsx
import React from 'react';
import { Eye, PackageCheck } from 'lucide-react';

const OrderTable = ({ orders = [], onStatusUpdate }) => {
  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      processing: 'bg-blue-50 text-blue-700 border-blue-200',
      shipped: 'bg-purple-50 text-purple-700 border-purple-200',
      delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200',
    };

    return (
      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${styles[status] || styles.pending}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4">Order ID</th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">Items</th>
              <th className="py-3.5 px-4">Total Amount</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-slate-900">
                  #{order._id?.slice(-6).toUpperCase()}
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-900">{order.shippingAddress?.fullName || 'Guest'}</div>
                  <div className="text-[11px] text-slate-500">{order.shippingAddress?.city}</div>
                </td>
                <td className="py-3 px-4 font-medium text-slate-600">
                  {order.items?.length || 1} item(s)
                </td>
                <td className="py-3 px-4 font-bold text-slate-900">
                  ${parseFloat(order.totalAmount || 0).toFixed(2)}
                </td>
                <td className="py-3 px-4">{getStatusBadge(order.status || 'pending')}</td>
                <td className="py-3 px-4 text-right">
                  <select
                    value={order.status || 'pending'}
                    onChange={(e) => onStatusUpdate(order._id, e.target.value)}
                    className="bg-white border border-slate-300 rounded-md text-xs font-medium py-1 px-2 text-slate-700 focus:outline-none focus:border-blue-600"
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
    </div>
  );
};

export default OrderTable;