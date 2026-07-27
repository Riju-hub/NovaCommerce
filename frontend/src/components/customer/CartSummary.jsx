// src/components/customer/CartSummary.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';

const CartSummary = ({ items = [] }) => {
  const subtotal = items.reduce((sum, item) => {
    const price = item.selectedVariant?.price || item.price;
    return sum + price * item.quantity;
  }, 0);

  const shippingFee = subtotal > 1000 || subtotal === 0 ? 0 : 99; 
  const estimatedTax = subtotal * 0.18; 
  const grandTotal = subtotal + shippingFee + estimatedTax;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
      <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Order Summary</h3>

      <div className="space-y-2 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Delivery Charge</span>
          <span className="font-semibold text-slate-900">
            {shippingFee === 0 ? <span className="text-emerald-600">FREE</span> : formatCurrency(shippingFee)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Estimated GST (18%)</span>
          <span className="font-semibold text-slate-900">{formatCurrency(estimatedTax)}</span>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
        <span className="text-sm font-bold text-slate-900">Total Amount</span>
        <span className="text-lg font-black text-blue-600">{formatCurrency(grandTotal)}</span>
      </div>

      <Link to="/checkout" className="block pt-2">
        <Button variant="primary" size="lg" className="w-full" disabled={items.length === 0} icon={ArrowRight}>
          Proceed to Checkout
        </Button>
      </Link>

      <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Safe & Secure Encrypted Checkout
      </p>
    </div>
  );
};

export default CartSummary;