
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Store, 
  Settings, 
  ExternalLink, 
  Cpu, 
  Menu, 
  X, 
  ChevronRight 
} from 'lucide-react';

const VendorSidebar = ({ storeName = 'My Store' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/vendor/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/vendor/products', icon: Package },
    { label: 'Store Settings', path: '/vendor/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Store Header */}
      <div className="p-5 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-500/20 border border-indigo-400/30 shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-sm font-black text-white truncate tracking-tight">{storeName}</h3>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-md inline-flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Verified Seller
            </span>
          </div>
        </div>

        {/* Close button for Mobile Drawer */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 flex-1 space-y-1.5">
        <div className="px-3 pb-2 text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1">
          <Cpu className="w-3 h-3" /> Vendor Command Hub
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Link */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/30">
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-between text-xs font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800/80 border border-slate-800/80 px-3.5 py-2.5 rounded-xl transition-all"
        >
          <span>View Public Storefront</span>
          <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Trigger Button (Mobile Screens Only) */}
      <div className="md:hidden fixed top-20 left-4 z-30">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-indigo-400 text-xs font-bold rounded-2xl shadow-2xl hover:bg-slate-800 transition-all cursor-pointer"
        >
          <Menu className="w-4 h-4" />
          <span>Vendor Menu</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>

      {/* Desktop Sidebar (Permanent Column) */}
      <aside className="hidden md:flex w-64 bg-slate-950 text-slate-300 min-h-[calc(100vh-5rem)] flex-col shrink-0 border-r border-slate-800/80 font-sans relative">
        {sidebarContent}
      </aside>

      {/* Mobile Sliding Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Sliding Left Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-72 bg-slate-950 text-slate-300 h-full shadow-2xl flex flex-col z-10 border-r border-slate-800/80 font-sans"
            >
              {sidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VendorSidebar;