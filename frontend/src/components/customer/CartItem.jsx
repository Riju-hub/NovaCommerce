// src/components/customer/CartItem.jsx
import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import useCart from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

const CartItem = ({ item }) => {
  const { removeItem, changeQuantity } = useCart();

  const unitPrice = item.selectedVariant?.price || item.price;
  const image = item.images?.[0] || 'https://via.placeholder.com/100';

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
          <img src={image} alt={item.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm line-clamp-1">{item.title}</h4>
          {item.selectedVariant && (
            <p className="text-xs text-slate-500 mt-0.5">Variant: {item.selectedVariant.name}</p>
          )}
          <span className="text-xs font-bold text-blue-600">
            {formatCurrency(unitPrice)} each
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-1">
          <button
            onClick={() => changeQuantity(item.cartKey, item.quantity - 1)}
            className="p-1 hover:bg-white rounded transition-colors text-slate-600"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
          <button
            onClick={() => changeQuantity(item.cartKey, item.quantity + 1)}
            className="p-1 hover:bg-white rounded transition-colors text-slate-600"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <span className="text-sm font-bold text-slate-900 min-w-[80px] text-right">
          {formatCurrency(unitPrice * item.quantity)}
        </span>

        <button
          onClick={() => removeItem(item.cartKey)}
          className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors"
          title="Remove Item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;