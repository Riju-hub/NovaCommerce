// // src/pages/customer/CartPage.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
// import CartItem from '../../components/customer/CartItem';
// import CartSummary from '../../components/customer/CartSummary';
// import Button from '../../components/common/Button';
// import useCart from '../../hooks/useCart';

// const CartPage = () => {
//   const { cartItems, resetCart } = useCart();

//   if (cartItems.length === 0) {
//     return (
//       <div className="max-w-lg mx-auto my-16 bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4 shadow-xs">
//         <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
//           <ShoppingBag className="w-8 h-8" />
//         </div>
//         <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
//         <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
//           Looks like you haven't added any products to your shopping cart yet.
//         </p>
//         <Link to="/products" className="inline-block pt-2">
//           <Button variant="primary" icon={ArrowLeft}>
//             Start Shopping
//           </Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
//       <div className="flex items-center justify-between border-b border-slate-200 pb-4">
//         <h1 className="text-2xl font-bold text-slate-900">Shopping Cart ({cartItems.length})</h1>
//         <button
//           onClick={resetCart}
//           className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1"
//         >
//           <Trash2 className="w-3.5 h-3.5" /> Clear Cart
//         </button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//         <div className="lg:col-span-2 space-y-3">
//           {cartItems.map((item) => (
//             <CartItem key={item.cartKey} item={item} />
//           ))}
//         </div>

//         <div className="lg:col-span-1">
//           <CartSummary items={cartItems} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;



// src/pages/customer/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  ArrowLeft, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Zap,
  Lock
} from 'lucide-react';
import CartItem from '../../components/customer/CartItem';
import CartSummary from '../../components/customer/CartSummary';
import useCart from '../../hooks/useCart';

const CartPage = () => {
  const { cartItems, resetCart } = useCart();

  // Empty Cart State
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 font-sans bg-slate-950 text-slate-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative max-w-md w-full bg-slate-900/80 border border-slate-800/80 p-8 sm:p-10 rounded-3xl text-center space-y-6 shadow-2xl backdrop-blur-2xl overflow-hidden"
        >
          {/* Ambient Lighting Background Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-3xl blur-md opacity-60 animate-pulse" />
            <div className="relative w-full h-full bg-slate-950 rounded-3xl border border-indigo-400/30 flex items-center justify-center text-indigo-400 shadow-xl">
              <ShoppingBag className="w-10 h-10" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-950/80 border border-indigo-800/50 text-indigo-300">
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>Your Cart is Currently Empty</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Ready to Fill Your Cart?</h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Explore thousands of verified products from independent stores with instant AI recommendations.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" /> Start Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="relative overflow-hidden bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Ambient Lighting */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-1 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Real-Time Inventory Synced</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Your Shopping Cart ({cartItems.length})
            </h1>
          </div>

          <button
            onClick={resetCart}
            className="z-10 px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 text-rose-400 hover:text-rose-300 text-xs font-extrabold transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Clear All Items
          </button>
        </div>

        {/* Main Cart Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.cartKey || item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <CartItem item={item} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Shopping Continuation Link */}
            <div className="pt-2">
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Continue Browsing Catalog
              </Link>
            </div>

            {/* Security Trust Micro Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-400">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>256-Bit SSL Encryption</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-400">
                <Truck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Fast Express Shipping</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-400">
                <RotateCcw className="w-4 h-4 text-pink-400 shrink-0" />
                <span>30-Day Hassle-Free Return</span>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 sticky top-24">
            <CartSummary items={cartItems} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default CartPage;