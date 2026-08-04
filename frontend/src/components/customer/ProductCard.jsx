import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Store, Lock, ArrowRight, X } from 'lucide-react';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const primaryImage = product?.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image';

  const getCategoryName = (category) => {
    if (!category) return 'General';
    if (typeof category === 'object' && category.name) return category.name;
    if (typeof category === 'string' && category.length < 24) return category;
    return 'General';
  };

  const getStoreName = () => {
    if (product?.store?.name) return product.store.name;
    if (product?.vendor?.storeName) return product.vendor.storeName;
    return null;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    addItem(product, 1);
  };

  const storeName = getStoreName();

  return (
    <>
      <motion.div 
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl hover:border-indigo-500/50 transition-all flex flex-col h-full relative"
      >
        {/* Product Image */}
        <Link to={`/products/${product._id}`} className="relative aspect-square overflow-hidden bg-slate-950 block">
          <img
            src={primaryImage}
            alt={product?.name || product?.title || 'Product'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {storeName && (
            <span className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1.5 shadow-md">
              <Store className="w-3 h-3 text-indigo-400" /> {storeName}
            </span>
          )}
        </Link>

        {/* Body Information */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="font-extrabold text-indigo-400 uppercase tracking-widest text-[9px] bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-800/40">
                {getCategoryName(product.category)}
              </span>
              <span className="flex items-center gap-1 text-slate-300 font-bold text-[11px]">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating ? product.rating.toFixed(1) : '4.8'}
              </span>
            </div>

            <Link to={`/products/${product._id}`}>
              <h3 className="font-extrabold text-white text-sm hover:text-indigo-400 line-clamp-2 transition-colors tracking-tight">
                {product?.name || product?.title}
              </h3>
            </Link>
          </div>

          {/* Price & Add To Cart */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mt-auto">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Price</span>
              <span className="text-base font-black text-white font-mono">
                {formatCurrency(product?.price)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center cursor-pointer active:scale-95"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Auth Guard Modal for Product Card */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl z-10 text-center space-y-5"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 bg-indigo-950/80 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-800/50 shadow-inner">
                <Lock className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-white">Sign In Required</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You need an active NexCart account to add items to your cart, sync orders across devices, and check out.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  Sign In to Continue <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/register');
                  }}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Create New Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;