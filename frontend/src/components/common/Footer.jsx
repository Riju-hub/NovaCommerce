// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Sparkles, 
//   Heart, 
//   ShieldCheck, 
//   Truck, 
//   Headphones, 
//   ArrowRight, 
//   Cpu, 
//   Radio, 
//   Zap,
//   Globe
// } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-auto relative overflow-hidden font-sans">
      
//       {/* Dynamic AI Background Ambient Glows & Grid Patterns */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

//       {/* Live AI Neural Status Bar */}
//       <div className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md relative z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
//           <div className="flex items-center gap-3">
//             <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 font-mono font-bold tracking-tight">
//               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
//               AI Neural Core Online
//             </span>
//             <span className="hidden sm:flex items-center gap-1 text-slate-400 font-mono">
//               <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Latency: 12ms
//             </span>
//           </div>

//           <div className="flex items-center gap-6 text-slate-400 font-medium">
//             <span className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer">
//               <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Live Recommendations
//             </span>
//             <span className="hidden md:flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer">
//               <Globe className="w-3.5 h-3.5 text-indigo-400" /> Global Nodes Active
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
//         {/* Value Badges with Neon Borders */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          
//           <motion.div 
//             whileHover={{ y: -3 }}
//             className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 transition-all shadow-xl shadow-slate-950/50 group"
//           >
//             <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-950/50">
//               <Truck className="w-6 h-6" />
//             </div>
//             <div>
//               <h5 className="text-white font-bold text-sm tracking-tight flex items-center gap-1.5">
//                 Express Global Delivery <Zap className="w-3.5 h-3.5 text-amber-400" />
//               </h5>
//               <p className="text-xs text-slate-400 mt-0.5">Fast, AI-optimized order routing worldwide</p>
//             </div>
//           </motion.div>

//           <motion.div 
//             whileHover={{ y: -3 }}
//             className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 transition-all shadow-xl shadow-slate-950/50 group"
//           >
//             <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-lg shadow-emerald-950/50">
//               <ShieldCheck className="w-6 h-6" />
//             </div>
//             <div>
//               <h5 className="text-white font-bold text-sm tracking-tight">Encrypted Payment Gateway</h5>
//               <p className="text-xs text-slate-400 mt-0.5">Zero-trust checkout powered by Stripe</p>
//             </div>
//           </motion.div>

//           <motion.div 
//             whileHover={{ y: -3 }}
//             className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-violet-500/50 transition-all shadow-xl shadow-slate-950/50 group"
//           >
//             <div className="p-3 rounded-xl bg-violet-950/60 border border-violet-800/40 text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-lg shadow-violet-950/50">
//               <Headphones className="w-6 h-6" />
//             </div>
//             <div>
//               <h5 className="text-white font-bold text-sm tracking-tight">24/7 AI Concierge Support</h5>
//               <p className="text-xs text-slate-400 mt-0.5">Instant multi-lingual automated resolution</p>
//             </div>
//           </motion.div>

//         </div>

//         {/* Links Grid Section */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
//           {/* Brand Info */}
//           <div className="space-y-4">
//             <Link to="/" className="flex items-center gap-3 group">
//               <div className="relative">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse" />
//                 <div className="relative bg-slate-900 text-white font-black px-3 py-1.5 rounded-xl text-base tracking-wider flex items-center gap-1.5 border border-slate-700/60">
//                   <span>NEX</span>
//                   <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
//                 </div>
//               </div>
//               <span className="font-black text-xl text-white tracking-tight group-hover:text-indigo-400 transition-colors">
//                 NexCart
//               </span>
//             </Link>
//             <p className="text-xs leading-relaxed text-slate-400">
//               Next-generation multi-vendor e-commerce platform integrated with AI catalog exploration, real-time inventory synchronization, and seller performance metrics.
//             </p>
//           </div>

//           <div>
//             <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Customer Care</h4>
//             <ul className="space-y-2.5 text-xs font-semibold">
//               <li>
//                 <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                   All Products
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/cart" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                   View Cart
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/profile" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                   My Account
//                 </Link>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                   Shipping & Returns
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Sell with Us</h4>
//             <ul className="space-y-2.5 text-xs font-semibold">
//               <li>
//                 <Link to="/register?role=vendor" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                   Become a Vendor
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/vendor/dashboard" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                   Vendor Portal
//                 </Link>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                   Seller Policies
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Platform</h4>
//             <ul className="space-y-2.5 text-xs font-semibold">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                   Terms of Service
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                   <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                   Contact Support
//                 </a>
//               </li>
//             </ul>
//           </div>

//         </div>

//         {/* Copyright & Signoff */}
//         <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
//           <span>© {new Date().getFullYear()} NexCart Multi-Vendor AI Platform. All rights reserved.</span>
//           <span className="flex items-center gap-1 font-medium">
//             Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> for next-gen commerce.
//           </span>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Sparkles, 
//   Heart, 
//   ShieldCheck, 
//   Truck, 
//   Headphones, 
//   ArrowRight, 
//   Cpu, 
//   Radio, 
//   Zap,
//   Globe,
//   Mail,
//   CheckCircle2,
//   Lock
// } from 'lucide-react';
// import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6';

// const Footer = () => {
//   const [email, setEmail] = useState('');
//   const [subscribed, setSubscribed] = useState(false);

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (email.trim()) {
//       setSubscribed(true);
//       setEmail('');
//       setTimeout(() => setSubscribed(false), 4000);
//     }
//   };

//   return (
//     <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-auto relative overflow-hidden font-sans">
      
//       {/* Top Ambient Laser Divider */}
//       <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 via-pink-500 to-transparent opacity-80" />

//       {/* Dynamic Background Lighting */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.18),transparent_65%)] pointer-events-none" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_100%,rgba(236,72,153,0.12),transparent_60%)] pointer-events-none" />
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

//       {/* Live AI Status Bar */}
//       <div className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md relative z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
//           <div className="flex items-center gap-3">
//             <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
//               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
//               AI Neural Core Online
//             </span>
//             <span className="hidden sm:flex items-center gap-1 text-slate-400 font-mono">
//               <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Latency: 12ms
//             </span>
//           </div>

//           <div className="flex items-center gap-6 text-slate-400 font-medium">
//             <span className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors cursor-pointer">
//               <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Realtime Sync
//             </span>
//             <span className="hidden md:flex items-center gap-1.5 hover:text-indigo-300 transition-colors cursor-pointer">
//               <Globe className="w-3.5 h-3.5 text-pink-400" /> Global Nodes Active
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 space-y-16">
        
//         {/* Value Proposition Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
//           <motion.div 
//             whileHover={{ y: -4 }}
//             className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all shadow-xl shadow-slate-950/50 group backdrop-blur-xl"
//           >
//             <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
//               <Truck className="w-6 h-6" />
//             </div>
//             <div>
//               <h5 className="text-white font-extrabold text-sm tracking-tight flex items-center gap-1.5">
//                 Express Global Delivery <Zap className="w-3.5 h-3.5 text-amber-400" />
//               </h5>
//               <p className="text-xs text-slate-400 mt-0.5">AI-optimized order routing worldwide</p>
//             </div>
//           </motion.div>

//           <motion.div 
//             whileHover={{ y: -4 }}
//             className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl shadow-slate-950/50 group backdrop-blur-xl"
//           >
//             <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform">
//               <ShieldCheck className="w-6 h-6" />
//             </div>
//             <div>
//               <h5 className="text-white font-extrabold text-sm tracking-tight">Encrypted Gateways</h5>
//               <p className="text-xs text-slate-400 mt-0.5">Zero-trust payments with Stripe & Razorpay</p>
//             </div>
//           </motion.div>

//           <motion.div 
//             whileHover={{ y: -4 }}
//             className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 transition-all shadow-xl shadow-slate-950/50 group backdrop-blur-xl"
//           >
//             <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-600/30 group-hover:scale-105 transition-transform">
//               <Headphones className="w-6 h-6" />
//             </div>
//             <div>
//               <h5 className="text-white font-extrabold text-sm tracking-tight">24/7 Concierge Support</h5>
//               <p className="text-xs text-slate-400 mt-0.5">Instant automated buyer resolution</p>
//             </div>
//           </motion.div>

//         </div>

//         {/* Links & Newsletter Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-b border-slate-800/80 py-12">
          
//           {/* Brand Column & Newsletter */}
//           <div className="lg:col-span-5 space-y-6">
//             <Link to="/" className="flex items-center gap-3 group">
//               <div className="relative">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-xs opacity-80 group-hover:opacity-100 transition duration-300 animate-pulse" />
//                 <div className="relative bg-slate-950 text-white font-black px-3 py-1.5 rounded-lg text-base tracking-wider flex items-center gap-1.5 border border-indigo-400/40">
//                   <span>NEX</span>
//                   <Sparkles className="w-4 h-4 text-pink-400" />
//                 </div>
//               </div>
//               <span className="font-black text-xl text-white tracking-tight group-hover:text-indigo-300 transition-colors">
//                 NexCart
//               </span>
//             </Link>

//             <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
//               Next-generation multi-vendor e-commerce platform integrated with AI catalog exploration, real-time inventory synchronization, and automated checkout.
//             </p>

//             {/* Newsletter Subscription Box */}
//             <div className="space-y-3 pt-2">
//               <label className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider block">
//                 Stay Updated With Deals
//               </label>

//               {subscribed ? (
//                 <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
//                   <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
//                   <span>Subscribed successfully! Welcome aboard.</span>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm">
//                   <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
//                   <input
//                     type="email"
//                     required
//                     placeholder="Enter your email address..."
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 text-slate-100 text-xs rounded-2xl pl-10 pr-28 py-3 outline-none transition-all"
//                   />
//                   <button
//                     type="submit"
//                     className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
//                   >
//                     Join
//                   </button>
//                 </form>
//               )}
//             </div>

//             {/* Social Media Links */}
//             <div className="flex items-center gap-3 pt-2">
//               {[
//                 { icon: Twitter, href: '#' },
//                 { icon: Github, href: '#' },
//                 { icon: Linkedin, href: '#' },
//                 { icon: Instagram, href: '#' },
//               ].map((social, i) => (
//                 <a
//                   key={i}
//                   href={social.href}
//                   className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition-all"
//                 >
//                   <social.icon className="w-4 h-4" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Nav Columns */}
//           <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
//             <div>
//               <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 font-mono">
//                 Customer Care
//               </h4>
//               <ul className="space-y-3 text-xs font-semibold">
//                 {['All Products', 'View Cart', 'My Account', 'Shipping & Returns'].map((item) => (
//                   <li key={item}>
//                     <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                       <ArrowRight className="w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                       {item}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 font-mono">
//                 Sell With Us
//               </h4>
//               <ul className="space-y-3 text-xs font-semibold">
//                 <li>
//                   <Link to="/register?role=vendor" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                     <ArrowRight className="w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                     Become a Vendor
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/vendor/dashboard" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                     <ArrowRight className="w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                     Vendor Hub
//                   </Link>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                     <ArrowRight className="w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                     Seller Policies
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 font-mono">
//                 Platform
//               </h4>
//               <ul className="space-y-3 text-xs font-semibold">
//                 {['Privacy Policy', 'Terms of Service', 'API Documentation', 'System Status'].map((item) => (
//                   <li key={item}>
//                     <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
//                       <ArrowRight className="w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
//                       {item}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//           </div>

//         </div>

//         {/* Copyright & Security Badges */}
//         <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
//           <div className="flex items-center gap-2">
//             <Lock className="w-3.5 h-3.5 text-emerald-400" />
//             <span>© {new Date().getFullYear()} NexCart Multi-Vendor Ecosystem. All rights reserved.</span>
//           </div>
          
//           <span className="flex items-center gap-1.5 font-medium">
//             Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> for next-gen commerce.
//           </span>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React, { useState } from 'react';
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
  Globe,
  Mail,
  CheckCircle2,
  Lock
} from 'lucide-react';

// Custom, zero-dependency Social SVG Icons
const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const socialLinks = [
    { icon: TwitterIcon, href: '#' },
    { icon: GithubIcon, href: '#' },
    { icon: LinkedinIcon, href: '#' },
    { icon: InstagramIcon, href: '#' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-auto relative overflow-hidden font-sans">
      
      {/* Top Ambient Laser Divider */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 via-pink-500 to-transparent opacity-80" />

      {/* Dynamic Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.18),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_100%,rgba(236,72,153,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Live AI Status Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              AI Neural Core Online
            </span>
            <span className="hidden sm:flex items-center gap-1 text-slate-400 font-mono">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Latency: 12ms
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors cursor-pointer">
              <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Realtime Sync
            </span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-indigo-300 transition-colors cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-pink-400" /> Global Nodes Active
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 space-y-16">
        
        {/* Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            whileHover={{ y: -4 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all shadow-xl shadow-slate-950/50 group backdrop-blur-xl"
          >
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                Express Global Delivery <Zap className="w-3.5 h-3.5 text-amber-400" />
              </h5>
              <p className="text-xs text-slate-400 mt-0.5">AI-optimized order routing worldwide</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl shadow-slate-950/50 group backdrop-blur-xl"
          >
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-extrabold text-sm tracking-tight">Encrypted Gateways</h5>
              <p className="text-xs text-slate-400 mt-0.5">Zero-trust payments with Stripe & Razorpay</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 transition-all shadow-xl shadow-slate-950/50 group backdrop-blur-xl"
          >
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-600/30 group-hover:scale-105 transition-transform">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-extrabold text-sm tracking-tight">24/7 Concierge Support</h5>
              <p className="text-xs text-slate-400 mt-0.5">Instant automated buyer resolution</p>
            </div>
          </motion.div>

        </div>

        {/* Links & Newsletter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-b border-slate-800/80 py-12">
          
          {/* Brand Column & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-xs opacity-80 group-hover:opacity-100 transition duration-300 animate-pulse" />
                <div className="relative bg-slate-950 text-white font-black px-3 py-1.5 rounded-lg text-base tracking-wider flex items-center gap-1.5 border border-indigo-400/40">
                  <span>NEX</span>
                  <Sparkles className="w-4 h-4 text-pink-400" />
                </div>
              </div>
              <span className="font-black text-xl text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                NexCart
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Next-generation multi-vendor e-commerce platform integrated with AI catalog exploration, real-time inventory synchronization, and automated checkout.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider block">
                Stay Updated With Deals
              </label>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscribed successfully! Welcome aboard.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 text-slate-100 text-xs rounded-2xl pl-10 pr-28 py-3 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, i) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition-all flex items-center justify-center"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            <div>
              <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 font-mono">
                Customer Care
              </h4>
              <ul className="space-y-3 text-xs font-semibold">
                {['All Products', 'View Cart', 'My Account', 'Shipping & Returns'].map((item) => (
                  <li key={item}>
                    <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                      <ArrowRight className="w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 font-mono">
                Sell With Us
              </h4>
              <ul className="space-y-3 text-xs font-semibold">
                <li>
                  <Link to="/register?role=vendor" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                    Become a Vendor
                  </Link>
                </li>
                <li>
                  <Link to="/vendor/dashboard" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                    Vendor Hub
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                    Seller Policies
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 font-mono">
                Platform
              </h4>
              <ul className="space-y-3 text-xs font-semibold">
                {['Privacy Policy', 'Terms of Service', 'API Documentation', 'System Status'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                      <ArrowRight className="w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> 
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Copyright & Security Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>© {new Date().getFullYear()} NexCart Multi-Vendor Ecosystem. All rights reserved.</span>
          </div>
          
          <span className="flex items-center gap-1.5 font-medium">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> for next-gen commerce.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;