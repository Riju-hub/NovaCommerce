
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
  ArrowRight,
  Zap
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
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
  const userRole = user?.role?.toLowerCase();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      setSearchFocused(false);
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
    // FIX: Outer container sticky class forces header to stay pinned on scroll
    <div className="bg-slate-950 text-slate-100 font-sans sticky top-0 z-50 transition-all duration-300">
      
      {/* Top Animated Laser Line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 to-indigo-500 z-50" />

      {/* Header Container */}
      <header className={`transition-all duration-300 ${
        scrolled ? 'py-2 sm:py-2.5 bg-slate-950/90 backdrop-blur-2xl' : 'py-3 sm:py-4 bg-slate-950/80 backdrop-blur-xl'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className={`relative flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 rounded-2xl sm:rounded-3xl transition-all duration-300 border ${
            scrolled 
              ? 'bg-slate-950/90 border-indigo-500/30 shadow-[0_10px_30px_rgba(79,70,229,0.2)]' 
              : 'bg-slate-900/80 border-slate-800/80 shadow-2xl'
          }`}>
            
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-pink-500/10 rounded-2xl sm:rounded-3xl pointer-events-none" />

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 group shrink-0 relative z-10">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-80 group-hover:opacity-100 transition duration-300 animate-pulse" />
                <div className="relative bg-slate-950 text-white font-black px-3 py-2 rounded-xl text-base tracking-wider flex items-center gap-1.5 border border-indigo-400/40 shadow-2xl">
                  <span className="bg-gradient-to-r from-white via-indigo-200 to-pink-200 text-transparent bg-clip-text">NEX</span>
                  <Sparkles className="w-4 h-4 text-pink-400 group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col hidden xs:flex">
                <span className="font-black text-xl text-white tracking-tight leading-none group-hover:text-indigo-300 transition-colors drop-shadow-md">
                  NexCart
                </span>
                <span className="text-[9px] font-mono font-extrabold tracking-widest text-indigo-400 uppercase flex items-center gap-1 mt-1">
                  <Cpu className="w-2.5 h-2.5 text-pink-400" /> AI Ecosystem
                </span>
              </div>
            </Link>

            {/* SEARCH */}
            <div className="flex-1 max-w-md mx-6 hidden md:block relative z-10">
              <form onSubmit={handleSearch}>
                <div className="relative flex items-center">
                  <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300 ${
                    searchFocused ? 'opacity-100 blur-sm' : 'opacity-0'
                  }`} />
                  
                  <div className="relative w-full flex items-center bg-slate-950/90 rounded-2xl border border-slate-800">
                    <Search className={`w-4 h-4 absolute left-4 transition-colors ${
                      searchFocused ? 'text-indigo-400' : 'text-slate-400'
                    }`} />
                    <input
                      type="text"
                      placeholder="Ask AI or search products, brands..."
                      value={searchQuery}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs font-semibold py-3 pl-11 pr-20 text-slate-100 placeholder-slate-500 bg-transparent rounded-2xl focus:outline-none"
                    />
                    
                    <button 
                      type="submit" 
                      className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-[10px] uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>

              <AnimatePresence>
                {searchFocused && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 p-3 bg-slate-950/95 border border-indigo-500/40 rounded-2xl shadow-2xl backdrop-blur-2xl space-y-2 z-50"
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-indigo-400">
                      <Zap className="w-3 h-3 text-amber-400" /> AI Trending Suggestions
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['ANC Wireless', 'Cyberwear Hoodie', 'OLED Gaming Monitor', 'Smart Watch'].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setSearchQuery(item);
                            navigate(`/products?search=${encodeURIComponent(item)}`);
                            setSearchFocused(false);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/50 text-[11px] text-slate-200 hover:text-white hover:border-pink-500/50 transition-all cursor-pointer"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ACTION LINKS */}
            <div className="hidden lg:flex items-center gap-3 relative z-10">
              <Link 
                to="/products" 
                className={`text-xs font-bold transition-all flex items-center gap-1.5 px-4 py-2.5 rounded-xl border ${
                  location.pathname === '/products' 
                    ? 'text-white bg-indigo-600/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                    : 'text-slate-300 border-slate-800 hover:text-white hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <Compass className="w-4 h-4 text-indigo-400" /> Catalog
              </Link>

              {isAuthenticated && userRole === 'vendor' && (
                <Link 
                  to="/vendor/dashboard" 
                  className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-300 bg-indigo-950/80 hover:bg-indigo-900 px-4 py-2.5 rounded-xl transition-all border border-indigo-600/50 shadow-md shadow-indigo-950/50"
                >
                  <Store className="w-4 h-4 text-indigo-400" /> Vendor Hub
                </Link>
              )}

              {isAuthenticated && userRole === 'admin' && (
                <Link 
                  to="/admin/dashboard" 
                  className="flex items-center gap-1.5 text-xs font-extrabold text-amber-300 bg-amber-950/80 hover:bg-amber-900 px-4 py-2.5 rounded-xl transition-all border border-amber-500/50 shadow-md shadow-amber-950/50"
                >
                  <Shield className="w-4 h-4 text-amber-400" /> Admin
                </Link>
              )}

              <button 
                onClick={handleCartClick}
                className="relative p-2.5 text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all cursor-pointer group hover:border-indigo-500/50 shadow-md"
                title="View Cart"
              >
                <ShoppingBag className="w-5 h-5 text-indigo-300 group-hover:scale-110 group-hover:text-pink-400 transition-all" />
                {isAuthenticated && cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-slate-950 shadow-lg shadow-rose-500/50 animate-bounce"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-2 border-l pl-3 border-slate-800">
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2.5 text-xs font-bold text-slate-100 hover:text-indigo-300 p-1 rounded-xl hover:bg-slate-900 transition-colors"
                  >
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg blur-xs opacity-75" />
                      <div className="relative w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center text-xs font-black border border-indigo-400/40">
                        {getUserInitials(user?.name)}
                      </div>
                    </div>
                    <span className="max-w-[90px] truncate font-extrabold">{user?.name}</span>
                  </Link>

                  <button
                    onClick={logoutUser}
                    title="Sign Out"
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2.5 border-l pl-3 border-slate-800">
                  <Link 
                    to="/login" 
                    className="text-xs font-extrabold text-slate-200 hover:text-white px-3.5 py-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
                  >
                    Sign In
                  </Link>

                  <Link 
                    to="/register" 
                    className="relative group overflow-hidden rounded-xl p-[1px] font-bold text-xs shadow-xl active:scale-95 transition-transform"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:opacity-100 opacity-80 transition-opacity animate-gradient-x" />
                    <span className="relative block px-4 py-2.5 rounded-[11px] bg-slate-950 text-white group-hover:bg-opacity-0 transition-colors flex items-center gap-1.5 font-extrabold">
                      Get Started <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              )}

            </div>

            {/* MOBILE MENU TRIGGER */}
            <div className="flex items-center gap-2 md:hidden relative z-10">
              <button 
                onClick={handleCartClick}
                className="relative p-2.5 text-slate-200 bg-slate-900 border border-slate-800 rounded-xl"
              >
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
                {isAuthenticated && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-indigo-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 text-slate-200 bg-slate-900 border border-slate-800 rounded-xl"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* AUTH MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative w-full max-w-sm bg-slate-950 border border-indigo-500/40 p-6 rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.25)] z-10 text-center space-y-5"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/30">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-white">Authentication Required</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sign in to access your synchronized cart, track orders, and complete instant checkout.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
                >
                  Sign In to Continue <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/register');
                  }}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Create New Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xs bg-slate-950 text-slate-100 h-full shadow-2xl flex flex-col z-10 border-l border-indigo-500/30 overflow-y-auto"
            >
              <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-tr from-indigo-600 to-pink-600 text-white font-black p-1.5 rounded-lg text-xs shadow-md">
                    NEX
                  </div>
                  <span className="font-extrabold text-white text-sm">Control Panel</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-5 flex-1">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search store..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-900 text-xs font-semibold rounded-xl py-3 pl-9 pr-4 text-slate-100 placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </form>

                {isAuthenticated ? (
                  <div className="p-3 bg-slate-900/90 rounded-2xl border border-indigo-500/30 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-600 text-white font-black flex items-center justify-center text-xs shadow-md">
                      {getUserInitials(user?.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{user?.name}</h4>
                      <p className="text-[10px] text-indigo-400 capitalize font-mono">{userRole || 'Customer'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                    <p className="text-[11px] text-slate-400">Sign in to manage orders and sync cart.</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center text-xs font-bold bg-slate-800 hover:bg-slate-700 py-2.5 rounded-xl text-white"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center text-xs font-bold bg-gradient-to-r from-indigo-600 to-pink-600 py-2.5 rounded-xl text-white"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider px-2">
                    Menu Navigation
                  </span>
                  
                  <Link
                    to="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 hover:text-indigo-300 transition-colors"
                  >
                    <span className="flex items-center gap-2.5"><Compass className="w-4 h-4 text-indigo-400" /> Catalog</span>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </Link>

                  <button
                    onClick={handleCartClick}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 hover:text-indigo-300 transition-colors text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5"><ShoppingBag className="w-4 h-4 text-indigo-400" /> Cart ({cartCount})</span>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>

                  {isAuthenticated && userRole === 'vendor' && (
                    <Link
                      to="/vendor/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl text-xs font-bold text-indigo-300 bg-indigo-950/60 border border-indigo-800/60"
                    >
                      <span className="flex items-center gap-2.5"><Store className="w-4 h-4 text-indigo-400" /> Vendor Hub</span>
                      <ChevronRight className="w-4 h-4 text-indigo-500" />
                    </Link>
                  )}

                  {isAuthenticated && userRole === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-800/60"
                    >
                      <span className="flex items-center gap-2.5"><Shield className="w-4 h-4 text-amber-400" /> Admin Panel</span>
                      <ChevronRight className="w-4 h-4 text-amber-500" />
                    </Link>
                  )}

                  {isAuthenticated && (
                    <>
                      <Link
                        to="/orders"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 hover:text-indigo-300 transition-colors"
                      >
                        <span className="flex items-center gap-2.5"><Package className="w-4 h-4 text-slate-400" /> My Orders</span>
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 hover:text-indigo-300 transition-colors"
                      >
                        <span className="flex items-center gap-2.5"><User className="w-4 h-4 text-slate-400" /> Account Settings</span>
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                      </Link>
                    </>
                  )}
                </div>

              </div>

              {isAuthenticated && (
                <div className="p-4 border-t border-slate-800/80 bg-slate-900/50">
                  <button
                    onClick={() => {
                      logoutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 text-xs font-bold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 rounded-xl border border-rose-900/50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;