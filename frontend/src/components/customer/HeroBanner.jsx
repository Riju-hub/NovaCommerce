
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Search, 
  ShoppingBag, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Zap, 
  TrendingUp,
  Heart,
  Plus,
  CheckCircle2,
  Activity
} from 'lucide-react';

// Smooth Cross-Fade Typewriter Sub-Component
const TypewriterHeadline = () => {
  const phrases = [
    'Next-Gen Tech Gear',
    'Sustainable Fashion',
    'Smart Living Space',
    'Curated Luxury Goods',
  ];
  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <span className="inline-block relative overflow-hidden min-h-[1.25em] align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ y: 20, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-pink-400 font-black"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const HeroBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('indigo');

  return (
    <div className="space-y-6 font-sans">
      {/* Main Hero Outer Frame */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/80 shadow-2xl text-white">
        
        {/* Dynamic Light Orbs & Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.22),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* AI Commerce Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 shadow-inner"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>AI Multi-Vendor Ecosystem</span>
            </motion.div>

            {/* Dynamic Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Discover verified <br className="hidden sm:inline" />
              <TypewriterHeadline />
            </h1>

            {/* Sub-description */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Explore thousands of independent storefronts backed by instant inventory synchronization, AI-guided discovery, and secure end-to-end checkout.
            </p>

            {/* Integrated Search Console */}
            <div className="pt-1 max-w-xl mx-auto lg:mx-0">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search products, sellers, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 text-slate-100 text-xs sm:text-sm rounded-2xl pl-11 pr-28 py-3.5 outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-500"
                />
                <button 
                  type="button" 
                  className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs px-4 rounded-xl transition-all shadow-md active:scale-95"
                >
                  Search
                </button>
              </div>

              {/* Popular Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-3 text-[11px] text-slate-400">
                <span className="font-mono text-slate-500">Popular:</span>
                {['Wireless ANC', 'Smart Watches', 'Cyberwear', 'Audio Tech'].map((tag) => (
                  <Link 
                    key={tag}
                    to={`/products?search=${encodeURIComponent(tag)}`}
                    className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-indigo-300 hover:border-slate-700 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-xl shadow-indigo-600/30 transition-all hover:gap-3.5 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" /> Explore Catalog
              </Link>
              <Link
                to="/register?role=vendor"
                className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-800 transition-all active:scale-95"
              >
                <Zap className="w-4 h-4 text-amber-400" /> Today's Deals
              </Link>
            </div>

            {/* Social Trust Bar */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 border-t border-slate-800/60">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-950 object-cover"
                    src={`https://i.pravatar.cc/100?img=${i + 15}`}
                    alt="User"
                  />
                ))}
              </div>
              <div className="text-left text-xs">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                  <span className="text-white ml-1 text-xs">4.9 / 5.0</span>
                </div>
                <p className="text-slate-400 text-[11px]">50,000+ verified order reviews</p>
              </div>
            </div>

          </div>

          {/* Right Floating Product Visualization Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm relative"
            >
              
              {/* Primary Interactive Product Showcase */}
              <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 p-4 rounded-3xl shadow-2xl relative space-y-4 group">
                
                {/* Product Image Frame */}
                <div className="relative h-60 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" 
                    alt="Featured Product"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 bg-rose-500 text-white font-mono font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-lg shadow-md">
                    25% OFF
                  </div>

                  <button 
                    type="button" 
                    className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/70 backdrop-blur-md text-slate-300 hover:text-rose-400 transition-colors border border-slate-700/50"
                  >
                    <Heart className="w-4 h-4" />
                  </button>

                  {/* Stock Indicator */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> In Stock
                    </span>
                    <span className="text-slate-400 font-mono">Synced Node #04</span>
                  </div>
                </div>

                {/* Product Metadata & Customization Controls */}
                <div className="space-y-3 px-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-indigo-400 font-bold uppercase tracking-wider">Acoustic Audio Lab</span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>4.9 (840)</span>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-white group-hover:text-indigo-400 transition-colors">
                    Spatial Wireless ANC Headphones
                  </h3>

                  {/* Color Selector */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      {['indigo', 'purple', 'slate'].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`w-4 h-4 rounded-full border transition-all ${
                            color === 'indigo' ? 'bg-indigo-500' : color === 'purple' ? 'bg-purple-500' : 'bg-slate-600'
                          } ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : 'border-transparent'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">Selected: {selectedColor}</span>
                  </div>

                  {/* Price & Quick Add */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-white">$249.00</span>
                      <span className="text-xs text-slate-500 line-through">$329.00</span>
                    </div>

                    <button 
                      type="button" 
                      className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>

              </div>

              {/* Floating Live Activity Badge 1 */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-5 -left-6 bg-slate-900/95 backdrop-blur-xl border border-indigo-800/60 p-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs"
              >
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-white">#1 Best Seller</p>
                  <p className="text-[10px] font-mono text-slate-400">142 purchased today</p>
                </div>
              </motion.div>

              {/* Floating Live Activity Badge 2 */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -right-6 bg-slate-900/95 backdrop-blur-xl border border-slate-800 p-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs hidden sm:flex"
              >
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Live Inventory Sync</p>
                  <p className="text-[10px] font-mono text-emerald-400">99.4% Fulfillment</p>
                </div>
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