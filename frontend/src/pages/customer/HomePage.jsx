// src/pages/customer/HomePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Store, ShieldCheck } from 'lucide-react';
import HeroBanner from '../../components/customer/HeroBanner';
import ProductGrid from '../../components/customer/ProductGrid';
import { fetchProducts } from '../../redux/slices/productSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8 }));
  }, [dispatch]);

  const categories = [
    { name: 'Electronics', icon: '⚡', color: 'bg-blue-50 text-blue-600' },
    { name: 'Fashion', icon: '👗', color: 'bg-purple-50 text-purple-600' },
    { name: 'Home & Kitchen', icon: '🏠', color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Fitness', icon: '🏋️', color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <HeroBanner />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Explore Categories</h2>
            <p className="text-xs text-slate-500">Shop top items from curated vendor collections</p>
          </div>
          <Link to="/products" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-4 group"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0 ${cat.color}`}>
                {cat.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-400">Browse Catalog</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Trending Items</h2>
          </div>
          <Link to="/products" className="text-xs font-semibold text-blue-600 hover:underline">
            See More Products
          </Link>
        </div>

        <ProductGrid products={products} isLoading={loading} />
      </section>

      <section className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            <Store className="w-4 h-4" /> Multi-Vendor Opportunities
          </span>
          <h3 className="text-2xl font-bold">Grow Your Business on NexCart</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Reach thousands of active shoppers daily. Set up your custom storefront, list unlimited items, and track sales metrics with zero upfront cost.
          </p>
        </div>
        <Link
          to="/register?role=vendor"
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition-all shrink-0 shadow-lg"
        >
          Open Vendor Store
        </Link>
      </section>
    </div>
  );
};

export default HomePage;