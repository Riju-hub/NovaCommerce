
// src/pages/customer/HomePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Store, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
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
    { 
      name: 'Electronics', 
      icon: '⚡', 
      badge: 'Tech & Gadgets',
      bgGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      borderColor: 'group-hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' 
    },
    { 
      name: 'Fashion', 
      icon: '👗', 
      badge: 'Style & Trends',
      bgGradient: 'from-fuchsia-500/10 via-pink-500/5 to-transparent',
      borderColor: 'group-hover:border-fuchsia-500/40',
      iconBg: 'bg-fuchsia-500/10 text-fuchsia-600 dark:bg-fuchsia-500/20 dark:text-fuchsia-400' 
    },
    { 
      name: 'Home & Kitchen', 
      icon: '🏠', 
      badge: 'Living & Comfort',
      bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      borderColor: 'group-hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' 
    },
    { 
      name: 'Fitness', 
      icon: '🏋️', 
      badge: 'Health & Sports',
      bgGradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
      borderColor: 'group-hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10 space-y-16 sm:space-y-24">
        
        {/* Hero Section Container */}
        <section className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/5 border border-slate-200/60 dark:border-slate-800/80">
          <HeroBanner />
        </section>

        {/* Categories Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4" />
                <span>Curated Hub</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400">
                Explore Categories
              </h2>
            </div>
            
            <Link 
              to="/products" 
              className="group inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              <span>View All Categories</span>
              <div className="p-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>

          {/* Grid Layout - Responsive 1 -> 2 -> 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className={`group relative p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${cat.borderColor}`}
              >
                {/* Background Subtle Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10 flex items-start justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 ${cat.iconBg}`}>
                    {cat.icon}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="relative z-10 mt-8">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-0.5">
                    {cat.badge}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Trending Now</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Handpicked products popular right now</p>
              </div>
            </div>

            <Link 
              to="/products" 
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:block"
            >
              See More Products &rarr;
            </Link>
          </div>

          <ProductGrid products={products} isLoading={loading} />

          <div className="text-center sm:hidden pt-2">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200"
            >
              See More Products
            </Link>
          </div>
        </section>

        {/* Multi-Vendor CTA Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
          {/* Ambient Glow Effects */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-12 w-96 h-96 bg-indigo-900/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold backdrop-blur-md">
                <Store className="w-3.5 h-3.5" />
                <span>Multi-Vendor Ecosystem</span>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Scale Your Brand on <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200">NexCart</span>
              </h3>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Connect with thousands of daily active buyers. Launch your custom storefront, display your catalog, and manage orders dynamically with zero upfront costs.
              </p>

              <div className="flex items-center gap-6 pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" /> Instant Setup
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" /> Secure Payments
                </span>
              </div>
            </div>

            <Link
              to="/register?role=vendor"
              className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 via-indigo-600 to-sky-600 hover:from-indigo-600 hover:to-sky-700 text-white font-bold text-sm px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] shrink-0 w-full sm:w-auto"
            >
              <span>Open Storefront</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;