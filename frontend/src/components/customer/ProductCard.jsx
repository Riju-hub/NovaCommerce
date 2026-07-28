// src/components/customer/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Store } from 'lucide-react';
import useCart from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

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
    addItem(product, 1);
  };

  const storeName = getStoreName();

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col h-full">
      {/* Product Image */}
      <Link to={`/products/${product._id}`} className="relative aspect-square overflow-hidden bg-slate-100 block">
        <img
          src={primaryImage}
          alt={product?.name || product?.title || 'Product'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {storeName && (
          <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
            <Store className="w-3 h-3 text-blue-400" /> {storeName}
          </span>
        )}
      </Link>

      {/* Body Information */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium text-blue-600 uppercase tracking-wider text-[10px]">
              {getCategoryName(product.category)}
            </span>
            <span className="flex items-center gap-1 text-slate-600 font-semibold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {product.rating ? product.rating.toFixed(1) : '4.8'}
            </span>
          </div>

          <Link to={`/products/${product._id}`}>
            <h3 className="font-semibold text-slate-900 text-sm hover:text-blue-600 line-clamp-2 transition-colors">
              {product?.name || product?.title}
            </h3>
          </Link>
        </div>

        {/* Price & Add To Cart */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
          <div>
            <span className="text-xs text-slate-400 block leading-none">Price</span>
            <span className="text-base font-bold text-slate-900">
              {formatCurrency(product?.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg transition-colors shadow-xs flex items-center justify-center cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;