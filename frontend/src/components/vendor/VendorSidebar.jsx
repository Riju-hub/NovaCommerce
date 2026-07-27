// src/components/vendor/VendorSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Store, Settings, ExternalLink } from 'lucide-react';

const VendorSidebar = ({ storeName = 'My Store' }) => {
  const navItems = [
    { label: 'Dashboard', path: '/vendor/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/vendor/products', icon: Package },
    { label: 'Store Settings', path: '/vendor/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] flex flex-col shrink-0 border-r border-slate-800">
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
            <Store className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-sm font-semibold text-white truncate">{storeName}</h3>
            <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full inline-block mt-0.5">
              Verified Seller
            </span>
          </div>
        </div>
      </div>

      <nav className="p-3 flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <NavLink
          to="/"
          className="flex items-center justify-between text-xs font-medium text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors"
        >
          <span>View Public Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </NavLink>
      </div>
    </aside>
  );
};

export default VendorSidebar;