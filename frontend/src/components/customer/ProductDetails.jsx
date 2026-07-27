// src/components/customer/ProductDetails.jsx
import React, { useState } from 'react';
import { ShoppingCart, Star, Store, ShieldCheck, Truck, Plus, Minus } from 'lucide-react';
import Button from '../common/Button';
import useCart from '../../hooks/useCart';

const ProductDetails = ({ product }) => {
  const { addItem } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const images = product?.images?.length ? product.images : ['https://via.placeholder.com/600x600'];
  const currentPrice = selectedVariant ? selectedVariant.price : product?.price || 0;

  const categoryName = typeof product?.category === 'object'
    ? product.category?.name
    : product?.category || 'General';

  const storeName = typeof product?.store === 'object'
    ? product.store?.name
    : product?.vendor?.storeName || product?.store || null;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        <div className="space-y-4">
          <div className="aspect-square rounded-xl bg-slate-100 border border-slate-200 overflow-hidden">
            <img
              src={images[activeImageIndex]}
              alt={product?.name || product?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-lg border-2 overflow-hidden shrink-0 transition-all ${
                    activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div>
            {storeName && (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-2">
                <Store className="w-4 h-4 text-blue-600" />
                <span>Sold by <strong className="text-slate-900">{storeName}</strong></span>
              </div>
            )}

            <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
              {product?.name || product?.title}
            </h1>

            <div className="flex items-center gap-3 text-xs mb-4">
              <span className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                {product?.ratings || product?.rating || '4.8'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{categoryName}</span>
            </div>

            <div className="text-3xl font-black text-slate-900 mb-4">
              ₹{parseFloat(currentPrice).toLocaleString('en-IN')}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {product?.description || 'No description provided.'}
            </p>

            {product?.variants?.length > 0 && (
              <div className="space-y-2 mb-6">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                  Select Options
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id || v._id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3.5 py-2 rounded-lg border text-xs font-semibold transition-all ${
                        selectedVariant?.id === v.id || selectedVariant?._id === v._id
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {v.name} {v.price ? `(₹${v.price})` : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 mb-6">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                Quantity
              </label>
              <div className="flex items-center gap-3 w-36 bg-slate-100 border border-slate-200 rounded-lg p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 rounded-md hover:bg-white text-slate-700 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="flex-1 text-center text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1.5 rounded-md hover:bg-white text-slate-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              icon={ShoppingCart}
            >
              Add to Cart
            </Button>

            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-500 pt-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" /> Fast Standard Shipping
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" /> Verified Seller Guarantee
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;