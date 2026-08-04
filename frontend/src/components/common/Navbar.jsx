
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  User, 
  Search, 
  Store, 
  Shield, 
  LogOut, 
  Menu, 
  X, 
  Package, 
  Sparkles,
  ChevronRight,
  Compass,
  Cpu,
  Lock,
  ArrowRight
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logoutUser } = useAuth();
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const userRole = user?.role?.toLowerCase();

  // Lock background scroll when drawer or auth modal is open
  useEffect(() => {
    if (mobileMenuOpen || showAuthModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, showAuthModal]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      navigate('/cart');
      setMobileMenuOpen(false);
    }
  };

  const getUserInitials = (name) => {
    if (!name) return 'AI';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      {/* Sleek Obsidian AI Navbar Header */}
      <nav className="bg-slate-950/85 backdrop-blur-2xl border-b border-slate-800/80 sticky top-0 z-40 shadow-2xl shadow-indigo-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* AI Brand Logo with Neon Glow */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse" />
                <div className="relative bg-slate-900 text-white font-black px-3 py-2 rounded-xl text-base tracking-wider flex items-center gap-1.5 border border-slate-700/60 shadow-inner">
                  <span>NEX</span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white tracking-tight leading-none group-hover:text-indigo-400 transition-colors">
                  NexCart
                </span>
                <span className="text-[9px] font-black tracking-widest text-indigo-400 uppercase flex items-center gap-1 mt-1">
                  <Cpu className="w-2.5 h-2.5" /> AI Powered
                </span>
              </div>
            </Link>

            {/* Futuristic Search Input - Desktop */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8 hidden lg:block">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Ask AI or search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/90 text-sm border border-slate-800 rounded-full py-2.5 pl-11 pr-10 text-slate-100 placeholder-slate-500 focus:bg-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all shadow-inner"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-indigo-400 transition-colors" />
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-5">
              <Link 
                to="/products" 
                className={`text-sm font-bold transition-all flex items-center gap-1.5 px-3.5 py-2 rounded-xl ${
                  location.pathname === '/products' 
                    ? 'text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 shadow-xs' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Compass className="w-4 h-4 text-indigo-400" /> Explore
              </Link>

              {isAuthenticated && userRole === 'vendor' && (
                <Link 
                  to="/vendor/dashboard" 
                  className="flex items-center gap-1.5 text-sm font-bold text-indigo-300 bg-indigo-950/50 hover:bg-indigo-900/50 px-3.5 py-2 rounded-xl transition-all border border-indigo-800/60 shadow-xs"
                >
                  <Store className="w-4 h-4 text-indigo-400" /> Vendor Hub
                </Link>
              )}

              {isAuthenticated && userRole === 'admin' && (
                <Link 
                  to="/admin/dashboard" 
                  className="flex items-center gap-1.5 text-sm font-bold text-amber-300 bg-amber-950/40 hover:bg-amber-900/40 px-3.5 py-2 rounded-xl transition-all border border-amber-800/60 shadow-xs"
                >
                  <Shield className="w-4 h-4 text-amber-400" /> Admin
                </Link>
              )}

              {isAuthenticated && (
                <Link 
                  to="/orders" 
                  className="flex items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-900 px-3.5 py-2 rounded-xl transition-all"
                >
                  <Package className="w-4 h-4 text-slate-400" /> Orders
                </Link>
              )}

              {/* Cart Button with Auth Guard */}
              <button 
                onClick={handleCartClick}
                className="relative p-2.5 text-slate-300 hover:text-white hover:bg-slate-900 rounded-2xl transition-all cursor-pointer"
                title="View Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {isAuthenticated && cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-slate-950 shadow-lg shadow-indigo-500/50"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Account Options */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3 border-l pl-4 border-slate-800">
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2.5 text-sm font-bold text-slate-200 hover:text-indigo-400 p-1.5 rounded-xl hover:bg-slate-900 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 text-white flex items-center justify-center text-xs font-black shadow-md shadow-indigo-500/20 border border-indigo-400/30">
                      {getUserInitials(user?.name)}
                    </div>
                    <span className="max-w-[100px] truncate">{user?.name || 'Profile'}</span>
                  </Link>
                  <button
                    onClick={logoutUser}
                    title="Logout"
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 border-l pl-4 border-slate-800">
                  <Link 
                    to="/login" 
                    className="text-sm font-bold text-slate-300 hover:text-white px-4 py-2 rounded-xl hover:bg-slate-900 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Actions Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button 
                onClick={handleCartClick}
                className="relative p-2 text-slate-300 hover:text-white"
              >
                <ShoppingBag className="w-6 h-6" />
                {isAuthenticated && cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md shadow-indigo-500/40">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-slate-200 hover:bg-slate-900 rounded-xl transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Authentication Required Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl z-10 text-center space-y-5"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 bg-indigo-950/80 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-800/50 shadow-inner">
                <Lock className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-white">Sign In Required</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You need an active NexCart account to view your cart items, sync orders, and proceed to checkout.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Sign In to Continue <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/register');
                  }}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors"
                >
                  Create New Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modern Right-Side AI Drawer Panel (Mobile) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Right Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xs sm:max-w-sm bg-slate-950 text-slate-100 h-full shadow-2xl flex flex-col z-10 overflow-y-auto border-l border-slate-800/80"
            >
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-black p-1.5 rounded-lg text-xs">
                    NEX
                  </div>
                  <span className="font-extrabold text-white tracking-wide">Menu Panel</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-5 space-y-6 flex-1">
                
                {/* Search Bar inside Drawer */}
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search store..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-900 text-sm rounded-xl py-3 pl-10 pr-4 text-slate-100 placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  </div>
                </form>

                {/* Account Status Card */}
                {isAuthenticated ? (
                  <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-black flex items-center justify-center text-sm shadow-md shadow-indigo-500/30">
                      {getUserInitials(user?.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{user?.name}</h4>
                      <p className="text-xs text-indigo-400 capitalize">{userRole || 'Customer'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-900/80 border border-slate-800 text-white rounded-2xl space-y-3">
                    <p className="text-xs text-slate-400">Sign in to sync your cart across devices and manage orders.</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center text-xs font-bold bg-slate-800 hover:bg-slate-700 py-2.5 rounded-xl text-white transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center text-xs font-bold bg-indigo-600 hover:bg-indigo-500 py-2.5 rounded-xl text-white transition-colors"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}

                {/* Main Navigation Items */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-2">Navigation</span>
                  
                  <Link
                    to="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-900 hover:text-indigo-400 transition-colors"
                  >
                    <span className="flex items-center gap-2.5"><Compass className="w-4 h-4 text-indigo-400" /> Catalog</span>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </Link>

                  <button
                    onClick={handleCartClick}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-900 hover:text-indigo-400 transition-colors text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5"><ShoppingBag className="w-4 h-4 text-indigo-400" /> Cart ({cartCount})</span>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>

                  {isAuthenticated && userRole === 'vendor' && (
                    <Link
                      to="/vendor/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-indigo-300 bg-indigo-950/40 hover:bg-indigo-900/50 transition-colors border border-indigo-900/40"
                    >
                      <span className="flex items-center gap-2.5"><Store className="w-4 h-4 text-indigo-400" /> Vendor Dashboard</span>
                      <ChevronRight className="w-4 h-4 text-indigo-500" />
                    </Link>
                  )}

                  {isAuthenticated && userRole === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 transition-colors border border-amber-900/40"
                    >
                      <span className="flex items-center gap-2.5"><Shield className="w-4 h-4 text-amber-400" /> Admin Panel</span>
                      <ChevronRight className="w-4 h-4 text-amber-500" />
                    </Link>
                  )}

                  {isAuthenticated && (
                    <Link
                      to="/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-900 hover:text-indigo-400 transition-colors"
                    >
                      <span className="flex items-center gap-2.5"><Package className="w-4 h-4 text-slate-400" /> My Orders</span>
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    </Link>
                  )}

                  {isAuthenticated && (
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-900 hover:text-indigo-400 transition-colors"
                    >
                      <span className="flex items-center gap-2.5"><User className="w-4 h-4 text-slate-400" /> Profile Settings</span>
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    </Link>
                  )}
                </div>

              </div>

              {/* Drawer Footer */}
              {isAuthenticated && (
                <div className="p-5 border-t border-slate-800/80 bg-slate-900/50">
                  <button
                    onClick={() => {
                      logoutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 text-sm font-bold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 rounded-xl border border-rose-900/50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;