
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Cpu, Sparkles, Zap } from 'lucide-react';
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
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/80 backdrop-blur-2xl p-6 rounded-2xl border border-slate-800 shadow-2xl shadow-indigo-950/40 space-y-5 relative overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-950/80 text-indigo-400 rounded-xl border border-indigo-800/50">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-base font-black text-white tracking-tight">Order Summary</h3>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-2 py-0.5 rounded-full">
          <Sparkles className="w-3 h-3 animate-pulse" /> AI Calculated
        </span>
      </div>

      <div className="space-y-3 text-xs font-semibold text-slate-400">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span className="font-mono text-slate-200">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Estimated Delivery Charge</span>
          <span className="font-mono text-slate-200">
            {shippingFee === 0 ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 fill-emerald-400" /> FREE
              </span>
            ) : (
              formatCurrency(shippingFee)
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Estimated GST (18%)</span>
          <span className="font-mono text-slate-200">{formatCurrency(estimatedTax)}</span>
        </div>
      </div>

      <div className="border-t border-slate-800/80 pt-4 flex justify-between items-center">
        <span className="text-sm font-extrabold text-white">Total Amount</span>
        <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 font-mono">
          {formatCurrency(grandTotal)}
        </span>
      </div>

      <Link to="/checkout" className="block pt-1">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full py-3.5 shadow-lg shadow-indigo-600/30" 
          disabled={items.length === 0} 
          icon={ArrowRight}
        >
          Proceed to Checkout
        </Button>
      </Link>

      <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Encrypted 256-Bit SSL Checkout
      </p>
    </motion.div>
  );
};

export default CartSummary;