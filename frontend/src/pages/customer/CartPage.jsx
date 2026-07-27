// src/pages/customer/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import CartItem from '../../components/customer/CartItem';
import CartSummary from '../../components/customer/CartSummary';
import Button from '../../components/common/Button';
import useCart from '../../hooks/useCart';

const CartPage = () => {
  const { cartItems, resetCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-lg mx-auto my-16 bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4 shadow-xs">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
          Looks like you haven't added any products to your shopping cart yet.
        </p>
        <Link to="/products" className="inline-block pt-2">
          <Button variant="primary" icon={ArrowLeft}>
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Shopping Cart ({cartItems.length})</h1>
        <button
          onClick={resetCart}
          className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-3">
          {cartItems.map((item) => (
            <CartItem key={item.cartKey} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;