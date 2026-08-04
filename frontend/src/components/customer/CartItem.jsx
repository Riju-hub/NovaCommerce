
import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, Tag, Sparkles } from 'lucide-react';
import useCart from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

const CartItem = ({ item }) => {
  const { removeItem, changeQuantity } = useCart();

  const unitPrice = item.selectedVariant?.price || item.price;
  const image = item.images?.[0] || 'https://via.placeholder.com/100';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4.5 bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-xl hover:border-indigo-500/40 transition-all group"
    >
      {/* Product Image & Details */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="w-18 h-18 rounded-xl bg-slate-950 border border-slate-800 shrink-0 overflow-hidden relative group-hover:border-indigo-500/50 transition-colors">
          <img src={image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="min-w-0">
          <h4 className="font-extrabold text-white text-sm line-clamp-1 tracking-tight group-hover:text-indigo-300 transition-colors">
            {item.title}
          </h4>
          
          {item.selectedVariant && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-2 py-0.5 rounded-md mt-1">
              <Tag className="w-3 h-3" /> {item.selectedVariant.name}
            </span>
          )}
          
          <div className="text-xs font-bold text-slate-400 mt-1">
            <span className="text-indigo-400 font-mono">{formatCurrency(unitPrice)}</span> / unit
          </div>
        </div>
      </div>

      {/* Controls & Pricing */}
      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
        
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-800 rounded-xl bg-slate-950/80 p-1 shadow-inner">
          <button
            onClick={() => changeQuantity(item.cartKey, item.quantity - 1)}
            className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition-colors text-slate-400 active:scale-95"
            title="Decrease Quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-9 text-center text-xs font-mono font-bold text-white">{item.quantity}</span>
          <button
            onClick={() => changeQuantity(item.cartKey, item.quantity + 1)}
            className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition-colors text-slate-400 active:scale-95"
            title="Increase Quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Total Price */}
        <span className="text-sm font-black text-white font-mono min-w-[85px] text-right">
          {formatCurrency(unitPrice * item.quantity)}
        </span>

        {/* Remove Button */}
        <button
          onClick={() => removeItem(item.cartKey)}
          className="p-2 text-slate-500 hover:text-rose-400 rounded-xl hover:bg-rose-950/40 border border-transparent hover:border-rose-900/40 transition-all active:scale-95"
          title="Remove Item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;