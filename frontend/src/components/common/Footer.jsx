import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  ArrowRight, 
  Cpu, 
  Radio, 
  Zap,
  Globe
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-auto relative overflow-hidden font-sans">
      
      {/* Dynamic AI Background Ambient Glows & Grid Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Live AI Neural Status Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 font-mono font-bold tracking-tight">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              AI Neural Core Online
            </span>
            <span className="hidden sm:flex items-center gap-1 text-slate-400 font-mono">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Latency: 12ms
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer">
              <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Live Recommendations
            </span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-indigo-400" /> Global Nodes Active
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Value Badges with Neon Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          
          <motion.div 
            whileHover={{ y: -3 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 transition-all shadow-xl shadow-slate-950/50 group"
          >
            <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-950/50">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm tracking-tight flex items-center gap-1.5">
                Express Global Delivery <Zap className="w-3.5 h-3.5 text-amber-400" />
              </h5>
              <p className="text-xs text-slate-400 mt-0.5">Fast, AI-optimized order routing worldwide</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 transition-all shadow-xl shadow-slate-950/50 group"
          >
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-lg shadow-emerald-950/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm tracking-tight">Encrypted Payment Gateway</h5>
              <p className="text-xs text-slate-400 mt-0.5">Zero-trust checkout powered by Stripe</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-violet-500/50 transition-all shadow-xl shadow-slate-950/50 group"
          >
            <div className="p-3 rounded-xl bg-violet-950/60 border border-violet-800/40 text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-lg shadow-violet-950/50">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm tracking-tight">24/7 AI Concierge Support</h5>
              <p className="text-xs text-slate-400 mt-0.5">Instant multi-lingual automated resolution</p>
            </div>
          </motion.div>

        </div>

        {/* Links Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse" />
                <div className="relative bg-slate-900 text-white font-black px-3 py-1.5 rounded-xl text-base tracking-wider flex items-center gap-1.5 border border-slate-700/60">
                  <span>NEX</span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                </div>
              </div>
              <span className="font-black text-xl text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                NexCart
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Next-generation multi-vendor e-commerce platform integrated with AI catalog exploration, real-time inventory synchronization, and seller performance metrics.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                  View Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                  My Account
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Sell with Us</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link to="/register?role=vendor" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                  Become a Vendor
                </Link>
              </li>
              <li>
                <Link to="/vendor/dashboard" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                  Vendor Portal
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                  Seller Policies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright & Signoff */}
        <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <span>© {new Date().getFullYear()} NexCart Multi-Vendor AI Platform. All rights reserved.</span>
          <span className="flex items-center gap-1 font-medium">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> for next-gen commerce.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;