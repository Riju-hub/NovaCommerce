// src/pages/customer/OrderConfirmationPage.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">Order Confirmed!</h1>
          <p className="text-xs text-slate-500">
            Thank you for your purchase. We sent a receipt to your email address.
          </p>
        </div>

        {order && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Order Reference:</span>
              <span className="font-mono font-bold text-slate-900">#{order._id?.slice(-8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Payment Status:</span>
              <span className="font-semibold text-emerald-600 capitalize">{order.paymentMethod || 'Paid'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Charged:</span>
              <span className="font-bold text-slate-900">${parseFloat(order.totalAmount || 0).toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-center gap-4">
          <Link to="/products">
            <Button variant="primary" icon={ArrowRight}>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;