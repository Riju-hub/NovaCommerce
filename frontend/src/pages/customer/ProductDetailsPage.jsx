
// src/pages/customer/ProductDetailsPage.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, Home, PackageX, RefreshCw, ArrowLeft, ShieldAlert } from 'lucide-react';
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

  // Modern Glass Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="p-8 rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl flex flex-col items-center gap-4 max-w-xs w-full text-center">
          <Loader size="lg" color="indigo" />
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Retrieving Item</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Fetching latest details & stock...</p>
          </div>
        </div>
      </div>
    );
  }

  // Modern Error & 404 Empty State
  if (error || !selectedProduct) {
    return (
      <div className="min-h-[80vh] bg-slate-50/50 dark:bg-slate-950 flex items-center justify-center px-4 py-12 transition-colors">
        <div className="relative max-w-md w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-10 rounded-3xl text-center shadow-2xl shadow-indigo-500/5 space-y-6 overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-500 flex items-center justify-center ring-1 ring-rose-500/20 shadow-sm">
              {error ? <ShieldAlert className="w-8 h-8" /> : <PackageX className="w-8 h-8" />}
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                {error ? 'Failed to Load Product' : 'Product Not Found'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {error 
                  ? 'Something went wrong while connecting to our servers. Please try again.' 
                  : 'The item you are looking for might have been sold out, removed, or the link is incorrect.'}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {error ? (
              <button
                onClick={() => dispatch(fetchProductById(id))}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            ) : null}

            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold text-xs px-5 py-3 rounded-xl transition-all active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Browse Products</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10 space-y-8">
        
        {/* Dynamic Modern Breadcrumbs
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 overflow-x-auto pb-1 no-scrollbar">
          <Link 
            to="/" 
            className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          
          <Link 
            to="/products" 
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
          >
            Products
          </Link>

          {selectedProduct?.category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <Link 
                to={`/products?category=${encodeURIComponent(selectedProduct.category)}`}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
              >
                {selectedProduct.category}
              </Link>
            </>
          )}

          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

          <span className="text-slate-900 dark:text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {selectedProduct.name || selectedProduct.title || 'Details'}
          </span>
        </nav> */}

        {/* Dynamic Modern Breadcrumbs */}
<nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 overflow-x-auto pb-1 no-scrollbar">
  <Link 
    to="/" 
    className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
  >
    <Home className="w-3.5 h-3.5" />
    <span>Home</span>
  </Link>
  
  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
  
  <Link 
    to="/products" 
    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
  >
    Products
  </Link>

  {/* FIXED: Safely resolve category whether it's a string or an object */}
  {selectedProduct?.category && (() => {
    const categoryName = typeof selectedProduct.category === 'object' 
      ? selectedProduct.category.name 
      : selectedProduct.category;

    if (!categoryName) return null;

    return (
      <>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link 
          to={`/products?category=${encodeURIComponent(categoryName)}`}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
        >
          {categoryName}
        </Link>
      </>
    );
  })()}

  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

  <span className="text-slate-900 dark:text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-xs">
    {selectedProduct.name || selectedProduct.title || 'Details'}
  </span>
</nav>

        {/* Product Details Wrapper Card */}
        <main className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-xl shadow-indigo-500/5">
          <ProductDetails product={selectedProduct} />
        </main>

      </div>
    </div>
  );
};

export default ProductDetailsPage;