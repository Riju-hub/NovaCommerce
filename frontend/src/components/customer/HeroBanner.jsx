
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Cpu, 
  Radio, 
  Zap, 
  TrendingUp, 
  Store, 
  CheckCircle2 
} from 'lucide-react';

// Custom Typewriter Sub-Component
const TypewriterHeadline = () => {
  const phrases = [
    'Modern Tech Gear',
    'Sustainable Fashion',
    'Next-Gen Electronics',
    'Curated Lifestyle Goods',
  ];
  
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 font-black inline-block min-h-[1.2em]">
      {phrases[index].substring(0, subIndex)}
      <span className="inline-block w-1 h-7 sm:h-12 bg-indigo-400 ml-1 translate-y-1 animate-pulse" />
    </span>
  );
};

const HeroBanner = () => {
  return (
    <div className="space-y-6 font-sans">
      
      {/* Hero Outer Frame */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/80 shadow-2xl text-white">
        
        {/* Dynamic Light Orbs & Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.22),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 py-14 sm:py-20 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* AI Chip Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 shadow-inner"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>AI Multi-Vendor Marketplace Ecosystem</span>
            </motion.div>

            {/* Dynamic Typewriter Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Discover verified <br className="hidden sm:inline" />
              <TypewriterHeadline />
            </h1>

            {/* Sub-description */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Explore thousands of independent seller storefronts backed by automated inventory synchronization, AI recommendations, and encrypted instant checkout.
            </p>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-xl shadow-indigo-600/30 transition-all hover:gap-3.5 active:scale-95"
              >
                Explore Catalog <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/register?role=vendor"
                className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-800 transition-all active:scale-95"
              >
                <Store className="w-4 h-4 text-indigo-400" /> Start Selling
              </Link>
            </div>

            {/* Trust Micro Indicators */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-[11px] font-mono text-slate-400 border-t border-slate-800/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Sellers
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Processing
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Encrypted Payments
              </span>
            </div>

          </div>

          {/* Right Floating Interactive Dashboard Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm space-y-4"
            >
              {/* Primary Live Card */}
              <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 p-6 rounded-3xl shadow-2xl relative space-y-5">
                
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> Live Marketplace Node
                  </span>
                  <Cpu className="w-4 h-4 text-indigo-400" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/30">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">Active Marketplace</h4>
                    <p className="text-xs text-slate-400">12,400+ orders completed</p>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-3 pt-1">
                  <div>
                    <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400 mb-1">
                      <span>Order Fulfillment Rate</span>
                      <span className="text-emerald-400">99.4%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-[99.4%] h-full bg-emerald-400 rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400 mb-1">
                      <span>Inventory Neural Sync</span>
                      <span className="text-indigo-400">100%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Secondary Floating Mini Chip */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="bg-slate-900/90 backdrop-blur-xl border border-indigo-800/50 p-3.5 rounded-2xl shadow-xl flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                  <span className="text-slate-300 font-bold">New Seller Onboarded</span>
                </div>
                <span className="text-indigo-400 font-bold">Just Now</span>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </div>

      {/* Trust Highlights Bottom Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800/80 text-slate-300">
        <div className="flex items-center gap-3 justify-center sm:justify-start px-3">
          <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-indigo-400">
            <Truck className="w-5 h-5 shrink-0" />
          </div>
          <div>
            <h5 className="text-xs font-extrabold text-white">Global Express Delivery</h5>
            <p className="text-[11px] text-slate-400">AI-optimized routing to your door</p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center sm:justify-start px-3 border-t sm:border-t-0 sm:border-l border-slate-800/80 pt-3 sm:pt-0">
          <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-indigo-400">
            <ShieldCheck className="w-5 h-5 shrink-0" />
          </div>
          <div>
            <h5 className="text-xs font-extrabold text-white">Buyer Protection</h5>
            <p className="text-[11px] text-slate-400">100% encrypted refund guarantee</p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center sm:justify-start px-3 border-t sm:border-t-0 sm:border-l border-slate-800/80 pt-3 sm:pt-0">
          <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-indigo-400">
            <RotateCcw className="w-5 h-5 shrink-0" />
          </div>
          <div>
            <h5 className="text-xs font-extrabold text-white">Hassle-Free Returns</h5>
            <p className="text-[11px] text-slate-400">30-day effortless return window</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroBanner;