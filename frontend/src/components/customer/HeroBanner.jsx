// src/components/customer/HeroBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-400/20 text-blue-300">
              <ShoppingBag className="w-3.5 h-3.5" /> Next-Gen Marketplace
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Discover Products from Independent Sellers Worldwide.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore thousands of verified vendor storefronts with instant global shipping and guaranteed buyer protection.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-lg shadow-blue-600/30 transition-all hover:gap-3"
              >
                Shop All Categories <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/register?role=vendor"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm px-5 py-3 rounded-lg border border-slate-700/60 transition-colors"
              >
                Sell on NexCart
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-xs md:max-w-sm shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600/30 flex items-center justify-center font-bold text-lg text-blue-300">
                  ⚡
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Top Verified Store</h4>
                  <p className="text-xs text-slate-300">Over 10,000+ orders delivered</p>
                </div>
              </div>
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-200 text-slate-700">
        <div className="flex items-center gap-3 justify-center sm:justify-start px-2">
          <Truck className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <h5 className="text-xs font-bold text-slate-900">Global Express Shipping</h5>
            <p className="text-[11px] text-slate-500">Fast delivery straight to your doorstep</p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center sm:justify-start px-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <h5 className="text-xs font-bold text-slate-900">Buyer Protection</h5>
            <p className="text-[11px] text-slate-500">100% money-back guarantee</p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center sm:justify-start px-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0">
          <RotateCcw className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <h5 className="text-xs font-bold text-slate-900">Hassle-Free Returns</h5>
            <p className="text-[11px] text-slate-500">30-day effortless return window</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;