
import React from 'react';
import ProductCard from './ProductCard';
import Loader from '../common/Loader';
import { PackageSearch } from 'lucide-react';

const ProductGrid = ({ products = [], isLoading = false }) => {
  const productList = Array.isArray(products)
    ? products
    : products?.products || [];

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader size="lg" color="indigo" />
      </div>
    );
  }

  if (productList.length === 0) {
    return (
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-12 text-center text-slate-400 my-6 shadow-2xl flex flex-col items-center justify-center gap-3">
        <div className="p-4 bg-indigo-950/60 rounded-2xl border border-indigo-800/50 text-indigo-400">
          <PackageSearch className="w-8 h-8" />
        </div>
        <div>
          <p className="text-base font-extrabold text-white">No products found</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search query, filters, or parameters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productList.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;