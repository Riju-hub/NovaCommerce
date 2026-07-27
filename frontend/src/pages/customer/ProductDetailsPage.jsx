// src/pages/customer/ProductDetailsPage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetails from '../../components/customer/ProductDetails';
import Loader from '../../components/common/Loader';
import { fetchProductById } from '../../redux/slices/productSlice';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" color="blue" />
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 p-8 rounded-2xl text-center">
        <h2 className="text-lg font-bold text-slate-900">Product Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">The item you are looking for may have been removed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductDetails product={selectedProduct} />
    </div>
  );
};

export default ProductDetailsPage;