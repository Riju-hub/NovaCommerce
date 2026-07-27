// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Store, Shield, LogOut, Menu, X } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logoutUser } = useAuth();
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white font-black p-2 rounded-lg text-lg tracking-wider">
              NEX
            </div>
            <span className="font-bold text-xl text-slate-900 hidden sm:inline">NexCart</span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 text-sm border border-transparent rounded-full py-2 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            </div>
          </form>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-sm font-medium text-slate-600 hover:text-blue-600">
              Browse
            </Link>

            {user?.role === 'vendor' && (
              <Link to="/vendor/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600">
                <Store className="w-4 h-4" /> Vendor Dashboard
              </Link>
            )}

            <Link 
              to="/admin/dashboard" 
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200"
            >
              <Shield className="w-4 h-4 text-amber-600" /> Admin
            </Link>

            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-blue-600">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
                <Link to="/profile" className="flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-blue-600">
                  <User className="w-4 h-4" /> {user?.name || 'Account'}
                </Link>
                <button
                  onClick={logoutUser}
                  title="Logout"
                  className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l pl-4 border-slate-200">
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 px-3 py-1.5">
                  Sign In
                </Link>
                <Link to="/register" className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-sm rounded-lg py-2 px-3 text-slate-800"
            />
          </form>
          <Link to="/products" className="block text-sm font-medium text-slate-700 py-2">Catalog</Link>
          <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-amber-700 py-2">
            Admin Panel
          </Link>
          <Link to="/cart" className="block text-sm font-medium text-slate-700 py-2">Cart ({cartCount})</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="block text-sm font-medium text-slate-700 py-2">Profile</Link>
              <button onClick={logoutUser} className="block w-full text-left text-sm font-medium text-red-600 py-2">
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/login" className="text-center text-sm font-medium border py-2 rounded-lg">Sign In</Link>
              <Link to="/register" className="text-center text-sm font-medium bg-blue-600 text-white py-2 rounded-lg">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;