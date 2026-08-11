
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ArrowRight, 
//   ShieldCheck, 
//   Truck, 
//   RotateCcw, 
//   Sparkles, 
//   Cpu, 
//   Radio, 
//   Zap, 
//   TrendingUp, 
//   Store, 
//   CheckCircle2 
// } from 'lucide-react';

// // Custom Typewriter Sub-Component
// const TypewriterHeadline = () => {
//   const phrases = [
//     'Modern Tech Gear',
//     'Sustainable Fashion',
//     'Next-Gen Electronics',
//     'Curated Lifestyle Goods',
//   ];
  
//   const [index, setIndex] = useState(0);
//   const [subIndex, setSubIndex] = useState(0);
//   const [reverse, setReverse] = useState(false);

//   useEffect(() => {
//     if (subIndex === phrases[index].length + 1 && !reverse) {
//       const timeout = setTimeout(() => setReverse(true), 2000);
//       return () => clearTimeout(timeout);
//     }

//     if (subIndex === 0 && reverse) {
//       setReverse(false);
//       setIndex((prev) => (prev + 1) % phrases.length);
//       return;
//     }

//     const timeout = setTimeout(() => {
//       setSubIndex((prev) => prev + (reverse ? -1 : 1));
//     }, reverse ? 40 : 80);

//     return () => clearTimeout(timeout);
//   }, [subIndex, index, reverse]);

//   return (
//     <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 font-black inline-block min-h-[1.2em]">
//       {phrases[index].substring(0, subIndex)}
//       <span className="inline-block w-1 h-7 sm:h-12 bg-indigo-400 ml-1 translate-y-1 animate-pulse" />
//     </span>
//   );
// };

// const HeroBanner = () => {
//   return (
//     <div className="space-y-6 font-sans">
      
//       {/* Hero Outer Frame */}
//       <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/80 shadow-2xl text-white">
        
//         {/* Dynamic Light Orbs & Grid Accent */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.22),transparent_70%)] pointer-events-none" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
//         <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
//         <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

//         {/* Content Container */}
//         <div className="relative max-w-7xl mx-auto px-6 py-14 sm:py-20 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
//           {/* Left Hero Column */}
//           <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
//             {/* AI Chip Badge */}
//             <motion.div 
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 shadow-inner"
//             >
//               <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
//               <span>AI Multi-Vendor Marketplace Ecosystem</span>
//             </motion.div>

//             {/* Dynamic Typewriter Title */}
//             <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
//               Discover verified <br className="hidden sm:inline" />
//               <TypewriterHeadline />
//             </h1>

//             {/* Sub-description */}
//             <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
//               Explore thousands of independent seller storefronts backed by automated inventory synchronization, AI recommendations, and encrypted instant checkout.
//             </p>

//             {/* CTA Action Buttons */}
//             <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
//               <Link
//                 to="/products"
//                 className="inline-flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-xl shadow-indigo-600/30 transition-all hover:gap-3.5 active:scale-95"
//               >
//                 Explore Catalog <ArrowRight className="w-4 h-4" />
//               </Link>
//               <Link
//                 to="/register?role=vendor"
//                 className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-800 transition-all active:scale-95"
//               >
//                 <Store className="w-4 h-4 text-indigo-400" /> Start Selling
//               </Link>
//             </div>

//             {/* Trust Micro Indicators */}
//             <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-[11px] font-mono text-slate-400 border-t border-slate-800/60">
//               <span className="flex items-center gap-1.5">
//                 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Sellers
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Processing
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Encrypted Payments
//               </span>
//             </div>

//           </div>

//           {/* Right Floating Interactive Dashboard Column */}
//           <div className="lg:col-span-5 relative flex justify-center">
            
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9, y: 10 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="w-full max-w-sm space-y-4"
//             >
//               {/* Primary Live Card */}
//               <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 p-6 rounded-3xl shadow-2xl relative space-y-5">
                
//                 <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
//                   <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
//                     <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> Live Marketplace Node
//                   </span>
//                   <Cpu className="w-4 h-4 text-indigo-400" />
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/30">
//                     <TrendingUp className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-black text-white">Active Marketplace</h4>
//                     <p className="text-xs text-slate-400">12,400+ orders completed</p>
//                   </div>
//                 </div>

//                 {/* Progress Indicators */}
//                 <div className="space-y-3 pt-1">
//                   <div>
//                     <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400 mb-1">
//                       <span>Order Fulfillment Rate</span>
//                       <span className="text-emerald-400">99.4%</span>
//                     </div>
//                     <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
//                       <div className="w-[99.4%] h-full bg-emerald-400 rounded-full" />
//                     </div>
//                   </div>

//                   <div>
//                     <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400 mb-1">
//                       <span>Inventory Neural Sync</span>
//                       <span className="text-indigo-400">100%</span>
//                     </div>
//                     <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
//                       <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
//                     </div>
//                   </div>
//                 </div>

//               </div>

//               {/* Secondary Floating Mini Chip */}
//               <motion.div 
//                 animate={{ y: [0, -6, 0] }}
//                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
//                 className="bg-slate-900/90 backdrop-blur-xl border border-indigo-800/50 p-3.5 rounded-2xl shadow-xl flex items-center justify-between text-xs font-mono"
//               >
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
//                   <span className="text-slate-300 font-bold">New Seller Onboarded</span>
//                 </div>
//                 <span className="text-indigo-400 font-bold">Just Now</span>
//               </motion.div>

//             </motion.div>

//           </div>

//         </div>
//       </div>

//       {/* Trust Highlights Bottom Ribbon */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800/80 text-slate-300">
//         <div className="flex items-center gap-3 justify-center sm:justify-start px-3">
//           <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-indigo-400">
//             <Truck className="w-5 h-5 shrink-0" />
//           </div>
//           <div>
//             <h5 className="text-xs font-extrabold text-white">Global Express Delivery</h5>
//             <p className="text-[11px] text-slate-400">AI-optimized routing to your door</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 justify-center sm:justify-start px-3 border-t sm:border-t-0 sm:border-l border-slate-800/80 pt-3 sm:pt-0">
//           <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-indigo-400">
//             <ShieldCheck className="w-5 h-5 shrink-0" />
//           </div>
//           <div>
//             <h5 className="text-xs font-extrabold text-white">Buyer Protection</h5>
//             <p className="text-[11px] text-slate-400">100% encrypted refund guarantee</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 justify-center sm:justify-start px-3 border-t sm:border-t-0 sm:border-l border-slate-800/80 pt-3 sm:pt-0">
//           <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-indigo-400">
//             <RotateCcw className="w-5 h-5 shrink-0" />
//           </div>
//           <div>
//             <h5 className="text-xs font-extrabold text-white">Hassle-Free Returns</h5>
//             <p className="text-[11px] text-slate-400">30-day effortless return window</p>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default HeroBanner;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   ArrowUpRight,
//   ShieldCheck,
//   Truck,
//   RotateCcw,
//   Stamp,
//   Store,
//   Radio,
//   Receipt,
// } from 'lucide-react';

// /**
//  * Fonts: this design pairs a characterful serif (Fraunces) with a mono
//  * data face (IBM Plex Mono) and Inter for body copy. The @import below is
//  * for convenience — in production, load these once in your global
//  * stylesheet or index.html instead of per-component.
//  */
// const FontImports = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

//     @keyframes ledger-scroll {
//       from { transform: translateY(0); }
//       to { transform: translateY(-50%); }
//     }
//     .ledger-track {
//       animation: ledger-scroll 16s linear infinite;
//     }
//     @media (prefers-reduced-motion: reduce) {
//       .ledger-track { animation: none; }
//     }
//   `}</style>
// );

// // Rotates through category phrases like entries being logged into a ledger
// const CategoryLog = () => {
//   const phrases = [
//     'Modern Tech Gear',
//     'Sustainable Fashion',
//     'Next-Gen Electronics',
//     'Curated Lifestyle Goods',
//   ];

//   const [index, setIndex] = useState(0);
//   const [subIndex, setSubIndex] = useState(0);
//   const [reverse, setReverse] = useState(false);

//   useEffect(() => {
//     if (subIndex === phrases[index].length + 1 && !reverse) {
//       const t = setTimeout(() => setReverse(true), 2200);
//       return () => clearTimeout(t);
//     }
//     if (subIndex === 0 && reverse) {
//       setReverse(false);
//       setIndex((prev) => (prev + 1) % phrases.length);
//       return;
//     }
//     const t = setTimeout(
//       () => setSubIndex((prev) => prev + (reverse ? -1 : 1)),
//       reverse ? 35 : 70
//     );
//     return () => clearTimeout(t);
//   }, [subIndex, index, reverse]);

//   return (
//     <span className="italic text-[#D9A441] font-medium">
//       {phrases[index].substring(0, subIndex)}
//       <span className="inline-block w-[2px] h-[0.9em] bg-[#D9A441] ml-1 translate-y-[2px] align-middle animate-pulse" />
//     </span>
//   );
// };

// // The signature element: a scrolling ledger of live marketplace activity,
// // styled like a torn receipt / ticket stub.
// const LiveLedger = () => {
//   const entries = [
//     { id: '#48213', label: 'Kyoto Ceramics', status: 'shipped', icon: Truck },
//     { id: '#48214', label: 'Nordic Looms', status: 'onboarded', icon: Store },
//     { id: '#48215', label: 'Basalt & Co.', status: 'payment cleared', icon: ShieldCheck },
//     { id: '#48216', label: 'Terra Botanicals', status: 'inventory synced', icon: Receipt },
//     { id: '#48217', label: 'Salt & Cedar', status: 'shipped', icon: Truck },
//     { id: '#48218', label: 'Marrow Studio', status: 'onboarded', icon: Store },
//   ];
//   const looped = [...entries, ...entries];

//   return (
//     <div className="relative w-full max-w-sm">
//       {/* Rotated verified stamp overlapping the corner */}
//       <div className="absolute -top-4 -right-3 z-20 flex items-center gap-1.5 bg-[#D9A441] text-[#0B0F0E] text-[10px] font-bold font-['IBM_Plex_Mono'] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg -rotate-6 border border-[#0B0F0E]/10">
//         <Stamp className="w-3 h-3" /> Verified
//       </div>

//       <div className="bg-[#12181B] border border-[#26302B] rounded-2xl shadow-2xl overflow-hidden">
//         {/* Perforated top edge, ticket-style */}
//         <div
//           className="h-3 w-full"
//           style={{
//             backgroundImage:
//               'repeating-linear-gradient(90deg, #0B0F0E 0 6px, transparent 6px 12px)',
//             backgroundColor: '#26302B',
//           }}
//         />

//         <div className="p-6 space-y-4">
//           <div className="flex items-center justify-between border-b border-[#26302B] pb-3">
//             <span className="flex items-center gap-2 text-[10px] font-['IBM_Plex_Mono'] font-semibold text-[#7FB6A2] uppercase tracking-[0.2em]">
//               <Radio className="w-3 h-3 animate-pulse" /> Live Ledger
//             </span>
//             <span className="text-[10px] font-['IBM_Plex_Mono'] text-[#6B756F]">
//               12,400+ orders
//             </span>
//           </div>

//           {/* Scrolling ticket entries, masked top/bottom */}
//           <div
//             className="relative h-44 overflow-hidden"
//             style={{
//               maskImage:
//                 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
//               WebkitMaskImage:
//                 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
//             }}
//           >
//             <div className="ledger-track absolute inset-x-0 top-0 space-y-3">
//               {looped.map((entry, i) => {
//                 const Icon = entry.icon;
//                 return (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 font-['IBM_Plex_Mono'] text-xs"
//                   >
//                     <Icon className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
//                     <span className="text-[#6B756F]">{entry.id}</span>
//                     <span className="text-[#EDE7D9] font-medium truncate">
//                       {entry.label}
//                     </span>
//                     <span className="ml-auto text-[#7FB6A2] shrink-0">
//                       {entry.status}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Ledger totals row */}
//           <div className="pt-3 border-t border-dashed border-[#26302B] space-y-2">
//             <div className="flex justify-between font-['IBM_Plex_Mono'] text-[11px]">
//               <span className="text-[#6B756F]">Fulfillment rate</span>
//               <span className="text-[#7FB6A2] font-semibold">99.4%</span>
//             </div>
//             <div className="flex justify-between font-['IBM_Plex_Mono'] text-[11px]">
//               <span className="text-[#6B756F]">Inventory sync</span>
//               <span className="text-[#D9A441] font-semibold">100%</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const HeroBanner = () => {
//   return (
//     <div className="space-y-5 font-['Inter']">
//       <FontImports />

//       {/* Hero frame */}
//       <div className="relative overflow-hidden rounded-3xl bg-[#0B0F0E] border border-[#1D2622] shadow-2xl text-[#EDE7D9]">
//         {/* single restrained glow, not scattered orbs */}
//         <div className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-[#2C6E5B]/20 rounded-full blur-[100px] pointer-events-none" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1D262210_1px,transparent_1px),linear-gradient(to_bottom,#1D262210_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

//         <div className="relative max-w-7xl mx-auto px-6 py-14 sm:py-20 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//           {/* Left column */}
//           <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
//             {/* Stamp-style eyebrow badge */}
//             <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-['IBM_Plex_Mono'] font-semibold bg-[#12181B] border border-[#D9A441]/40 text-[#D9A441] uppercase tracking-widest">
//               <Stamp className="w-3.5 h-3.5" />
//               Est. verified marketplace
//             </div>

//             <h1 className="font-['Fraunces'] text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-[#F5F1E6]">
//               Sellers earn their listing.
//               <br />
//               Now cataloging <CategoryLog />
//             </h1>

//             <p className="text-sm text-[#9AA39D] leading-relaxed max-w-xl mx-auto lg:mx-0">
//               Every storefront is vetted before it goes live. Orders are routed,
//               tracked, and insured automatically — so you never have to
//               guess where a package, or a payment, actually is.
//             </p>

//             <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
//               <Link
//                 to="/products"
//                 className="inline-flex items-center gap-2 bg-[#D9A441] hover:bg-[#E5B458] text-[#0B0F0E] font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-[#D9A441]/20 transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A441]"
//               >
//                 Browse the catalog <ArrowUpRight className="w-4 h-4" />
//               </Link>
//               <Link
//                 to="/register?role=vendor"
//                 className="inline-flex items-center gap-2 bg-transparent hover:bg-[#12181B] text-[#EDE7D9] font-semibold text-sm px-6 py-3.5 rounded-xl border border-[#26302B] transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7FB6A2]"
//               >
//                 <Store className="w-4 h-4 text-[#7FB6A2]" /> Open your storefront
//               </Link>
//             </div>
//           </div>

//           {/* Right column: signature ledger element */}
//           <div className="lg:col-span-5 flex justify-center">
//             <LiveLedger />
//           </div>
//         </div>

//         {/* Trust ribbon — ledger row instead of card grid */}
//         <div className="relative border-t border-[#1D2622] px-6 sm:px-12 py-4">
//           <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-[#1D2622]">
//             {[
//               { icon: Truck, label: 'Global delivery', detail: 'AI-routed to your door' },
//               { icon: ShieldCheck, label: 'Buyer protection', detail: 'Encrypted, insured refunds' },
//               { icon: RotateCcw, label: 'Returns', detail: '30 days, no forms' },
//             ].map(({ icon: Icon, label, detail }) => (
//               <div
//                 key={label}
//                 className="flex items-center gap-3 px-5 py-2.5 sm:py-0 w-full sm:w-auto justify-center sm:justify-start"
//               >
//                 <Icon className="w-4 h-4 text-[#D9A441] shrink-0" />
//                 <span className="text-xs font-['IBM_Plex_Mono']">
//                   <span className="text-[#EDE7D9] font-semibold">{label}</span>
//                   <span className="text-[#6B756F]"> — {detail}</span>
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroBanner;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ArrowRight, 
//   Search, 
//   ShoppingBag, 
//   Sparkles, 
//   Star, 
//   ShieldCheck, 
//   Truck, 
//   RotateCcw, 
//   Zap, 
//   TrendingUp,
//   Heart,
//   Plus
// } from 'lucide-react';

// // Typewriter Component
// const TypewriterHeadline = () => {
//   const phrases = [
//     'Next-Gen Tech',
//     'Streetwear Essentials',
//     'Smart Home Gear',
//     'Luxury Accessories',
//   ];
  
//   const [index, setIndex] = useState(0);
//   const [subIndex, setSubIndex] = useState(0);
//   const [reverse, setReverse] = useState(false);

//   useEffect(() => {
//     if (subIndex === phrases[index].length + 1 && !reverse) {
//       const timeout = setTimeout(() => setReverse(true), 2200);
//       return () => clearTimeout(timeout);
//     }

//     if (subIndex === 0 && reverse) {
//       setReverse(false);
//       setIndex((prev) => (prev + 1) % phrases.length);
//       return;
//     }

//     const timeout = setTimeout(() => {
//       setSubIndex((prev) => prev + (reverse ? -1 : 1));
//     }, reverse ? 35 : 70);

//     return () => clearTimeout(timeout);
//   }, [subIndex, index, reverse]);

//   return (
//     <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-pink-400 font-black inline-block min-h-[1.15em]">
//       {phrases[index].substring(0, subIndex)}
//       <span className="inline-block w-1 h-7 sm:h-11 bg-indigo-400 ml-1 translate-y-1 animate-pulse" />
//     </span>
//   );
// };

// const HeroBanner = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   return (
//     <div className="space-y-6 font-sans">
//       {/* Main Hero Outer Card */}
//       <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/80 shadow-2xl text-white">
        
//         {/* Ambient Gradient Background & Subtle Grid Pattern */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_50%)] pointer-events-none" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.12),transparent_50%)] pointer-events-none" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

//         {/* Content Layout */}
//         <div className="relative max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
//           {/* Left Column: Hero Offer & Search */}
//           <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
//             {/* Promo Pill */}
//             <motion.div 
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 backdrop-blur-md"
//             >
//               <span className="flex h-2 w-2 relative">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
//               </span>
//               <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
//               <span>Spring Tech Sale — Up to 40% Off</span>
//             </motion.div>

//             {/* Dynamic Title */}
//             <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
//               Upgrade Your Life With <br className="hidden sm:inline" />
//               <TypewriterHeadline />
//             </h1>

//             {/* Sub-description */}
//             <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
//               Explore 10,000+ top-rated products from verified global brands. Experience fast shipping, buyer protection, and effortless returns.
//             </p>

//             {/* Integrated Search Bar */}
//             <div className="pt-2 max-w-xl mx-auto lg:mx-0">
//               <div className="relative flex items-center">
//                 <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
//                 <input
//                   type="text"
//                   placeholder="Search products, brands, or categories..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 text-slate-100 text-sm rounded-2xl pl-12 pr-32 py-3.5 outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-500"
//                 />
//                 <button 
//                   type="button" 
//                   className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs px-5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5"
//                 >
//                   Search
//                 </button>
//               </div>

//               {/* Popular Search Pills */}
//               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-3 text-xs text-slate-400">
//                 <span className="font-medium text-slate-500">Popular:</span>
//                 {['Wireless Earbuds', 'Smart Watches', 'Mechanical Keyboards', '4K Monitors'].map((tag) => (
//                   <Link 
//                     key={tag}
//                     to={`/products?search=${encodeURIComponent(tag)}`}
//                     className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-indigo-300 hover:border-slate-700 transition-colors"
//                   >
//                     {tag}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* CTA Action Buttons */}
//             <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
//               <Link
//                 to="/products"
//                 className="inline-flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-xl shadow-indigo-600/25 transition-all hover:gap-3.5 active:scale-95"
//               >
//                 <ShoppingBag className="w-4 h-4" /> Shop Catalog
//               </Link>
//               <Link
//                 to="/deals"
//                 className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm px-6 py-3.5 rounded-2xl border border-slate-800 transition-all active:scale-95"
//               >
//                 <Zap className="w-4 h-4 text-amber-400" /> Today's Deals
//               </Link>
//             </div>

//             {/* Micro Social Proof */}
//             <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 border-t border-slate-800/60">
//               <div className="flex -space-x-2">
//                 {[1, 2, 3, 4].map((i) => (
//                   <img
//                     key={i}
//                     className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover"
//                     src={`https://i.pravatar.cc/100?img=${i + 10}`}
//                     alt="User Avatar"
//                   />
//                 ))}
//               </div>
//               <div className="text-left text-xs">
//                 <div className="flex items-center gap-1 text-amber-400 font-bold">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
//                   ))}
//                   <span className="text-white ml-1 text-xs">4.9 / 5.0</span>
//                 </div>
//                 <p className="text-slate-400 text-[11px]">Trusted by 50,000+ happy shoppers</p>
//               </div>
//             </div>

//           </div>

//           {/* Right Column: Dynamic E-Commerce Product Showcase */}
//           <div className="lg:col-span-5 relative flex justify-center">
            
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="w-full max-w-sm relative"
//             >
              
//               {/* Featured Product Card */}
//               <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 p-4 rounded-3xl shadow-2xl relative space-y-4 group">
                
//                 {/* Image Showcase Box */}
//                 <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800/80 flex items-center justify-center">
//                   <img 
//                     src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" 
//                     alt="Premium Wireless Headphones"
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
                  
//                   {/* Discount Badge */}
//                   <div className="absolute top-3 left-3 bg-rose-500 text-white font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-lg shadow-md">
//                     25% OFF
//                   </div>

//                   {/* Wishlist Button */}
//                   <button 
//                     type="button" 
//                     className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/70 hover:bg-slate-900 backdrop-blur-md text-slate-300 hover:text-rose-400 transition-colors border border-slate-700/50"
//                   >
//                     <Heart className="w-4 h-4" />
//                   </button>

//                   {/* Floating Live Stock Status */}
//                   <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80 flex items-center justify-between text-[11px]">
//                     <span className="text-emerald-400 font-medium flex items-center gap-1.5">
//                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> In Stock
//                     </span>
//                     <span className="text-slate-400 font-mono">Free Shipping</span>
//                   </div>
//                 </div>

//                 {/* Product Metadata */}
//                 <div className="space-y-2 px-1">
//                   <div className="flex items-center justify-between text-xs text-slate-400">
//                     <span>Audio Tech</span>
//                     <div className="flex items-center gap-1 text-amber-400 font-bold">
//                       <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
//                       <span>4.9 (1,280)</span>
//                     </div>
//                   </div>

//                   <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
//                     Spatial Wireless ANC Headphones
//                   </h3>

//                   <div className="flex items-center justify-between pt-1">
//                     <div className="flex items-baseline gap-2">
//                       <span className="text-xl font-extrabold text-white">$249.00</span>
//                       <span className="text-xs text-slate-500 line-through">$329.00</span>
//                     </div>

//                     <button 
//                       type="button" 
//                       className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
//                     >
//                       <Plus className="w-4 h-4" /> Add
//                     </button>
//                   </div>
//                 </div>

//               </div>

//               {/* Floating Banner Badge 1: Instant Checkout Indicator */}
//               <motion.div 
//                 animate={{ y: [0, -8, 0] }}
//                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
//                 className="absolute -top-5 -left-6 bg-slate-900/95 backdrop-blur-xl border border-slate-800 p-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs"
//               >
//                 <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
//                   <TrendingUp className="w-4 h-4" />
//                 </div>
//                 <div>
//                   <p className="font-bold text-white">#1 Best Seller</p>
//                   <p className="text-[10px] text-slate-400">Trending in Electronics</p>
//                 </div>
//               </motion.div>

//               {/* Floating Banner Badge 2: Recent Purchase Notification */}
//               <motion.div 
//                 animate={{ y: [0, 8, 0] }}
//                 transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
//                 className="absolute -bottom-5 -right-6 bg-slate-900/95 backdrop-blur-xl border border-slate-800 p-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs hidden sm:flex"
//               >
//                 <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
//                   <ShoppingBag className="w-4 h-4" />
//                 </div>
//                 <div>
//                   <p className="font-bold text-white">Just Purchased</p>
//                   <p className="text-[10px] text-slate-400">2 minutes ago from NY</p>
//                 </div>
//               </motion.div>

//             </motion.div>

//           </div>

//         </div>
//       </div>

//       {/* Modern E-Commerce Trust Badges Ribbon */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800/80 text-slate-300">
        
//         <div className="flex items-center gap-3.5 justify-center sm:justify-start px-3">
//           <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-indigo-400 shrink-0">
//             <Truck className="w-5 h-5" />
//           </div>
//           <div>
//             <h5 className="text-xs font-bold text-white">Free Express Shipping</h5>
//             <p className="text-[11px] text-slate-400">On all orders over $50</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3.5 justify-center sm:justify-start px-3 border-t sm:border-t-0 sm:border-l border-slate-800/80 pt-3 sm:pt-0">
//           <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-indigo-400 shrink-0">
//             <ShieldCheck className="w-5 h-5" />
//           </div>
//           <div>
//             <h5 className="text-xs font-bold text-white">100% Secure Checkout</h5>
//             <p className="text-[11px] text-slate-400">256-bit encrypted transactions</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3.5 justify-center sm:justify-start px-3 border-t sm:border-t-0 sm:border-l border-slate-800/80 pt-3 sm:pt-0">
//           <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-indigo-400 shrink-0">
//             <RotateCcw className="w-5 h-5" />
//           </div>
//           <div>
//             <h5 className="text-xs font-bold text-white">30-Day Easy Returns</h5>
//             <p className="text-[11px] text-slate-400">Money-back guarantee</p>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default HeroBanner;


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