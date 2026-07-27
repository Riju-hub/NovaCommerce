// src/components/customer/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';
import Loader from '../common/Loader';

const ProductGrid = ({ products = [], isLoading = false }) => {
  const productList = Array.isArray(products)
    ? products
    : products?.products || [];
  if (isLoading) {
    return (
      <div className="py-12 flex justify-center items-center">
        <Loader size="lg" color="blue" />
      </div>
    );
  }

  if (productList.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 my-4">
        <p className="text-base font-semibold text-slate-800">No products available</p>
        <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or filters.</p>
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