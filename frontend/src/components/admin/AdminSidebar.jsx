// src/components/admin/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Store, ShoppingBag, BarChart3, ShieldCheck, ArrowLeft } from 'lucide-react';

const AdminSidebar = () => {
  const navItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'User Management', path: '/admin/users', icon: Users },
    { label: 'Vendor Approvals', path: '/admin/vendors', icon: Store },
    { label: 'Order Platform', path: '/admin/orders', icon: ShoppingBag },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] flex flex-col shrink-0 border-r border-slate-800">
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-lg shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Platform Admin</h3>
            <span className="text-[10px] font-medium text-slate-400">Superuser Access</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
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
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
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
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Customer Portal
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;