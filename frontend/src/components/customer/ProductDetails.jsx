
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Star, 
  Store, 
  ShieldCheck, 
  Truck, 
  Plus, 
  Minus, 
  MessageSquare, 
  Send, 
  Lock, 
  Sparkles, 
  CheckCircle2,
  ArrowRight,
  X,
  Trash2
} from 'lucide-react';
import Button from '../common/Button';
import Toast from '../common/Toast';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import axiosInstance from '../../services/axiosInstance';

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isAuthenticated, user } = useAuth();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Review Form States
  const [reviews, setReviews] = useState(product?.reviews || []);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (product?.reviews) {
      setReviews(product.reviews);
    }
  }, [product]);

  const images = product?.images?.length ? product.images : ['https://via.placeholder.com/600x600'];
  const currentPrice = selectedVariant ? selectedVariant.price : product?.price || 0;

  const categoryName = typeof product?.category === 'object'
    ? product.category?.name
    : product?.category || 'General';

  const storeName = typeof product?.store === 'object'
    ? product.store?.name
    : product?.vendor?.storeName || product?.store || null;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    addItem(product, quantity, selectedVariant);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setToast({ message: 'Please enter a review comment.', type: 'error' });
      return;
    }

    setSubmittingReview(true);

    try {
      const response = await axiosInstance.post(`/products/${product._id}/reviews`, {
        rating,
        comment: comment.trim(),
      });

      const createdReview = response.data?.review || response.data?.data;

      const newReview = {
        _id: createdReview?._id || Date.now().toString(),
        user: createdReview?.user || user || { name: user?.name || 'Verified Buyer' },
        rating: Number(rating),
        comment: comment.trim(),
        createdAt: createdReview?.createdAt || new Date().toISOString(),
      };

      setReviews((prev) => [newReview, ...prev]);
      setComment('');
      setRating(5);
      setToast({ message: 'Review submitted successfully!', type: 'success' });
    } catch (err) {
      setToast({
        message: err.response?.data?.message || 'Failed to submit review. Try again.',
        type: 'error',
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axiosInstance.delete(`/products/${product._id}/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((rev) => (rev._id || rev.id) !== reviewId));
      setToast({ message: 'Review deleted successfully', type: 'success' });
    } catch (err) {
      setToast({
        message: err.response?.data?.message || 'Failed to delete review.',
        type: 'error',
      });
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : (product?.ratings || product?.rating || 4.8).toString();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Main Product Details Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-slate-800 p-6 md:p-10 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative group">
              <img
                src={images[activeImageIndex]}
                alt={product?.name || product?.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-18 h-18 rounded-xl border-2 overflow-hidden shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info & Options Section */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {storeName && (
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
                  <Store className="w-4 h-4 text-indigo-400" />
                  <span>Sold by <strong className="text-white">{storeName}</strong></span>
                </div>
              )}

              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                {product?.name || product?.title}
              </h1>

              <div className="flex items-center gap-3 text-xs mb-4">
                <span className="flex items-center gap-1 font-extrabold text-amber-400 bg-amber-950/40 border border-amber-800/50 px-2.5 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {averageRating}
                </span>
                <span className="text-slate-700">•</span>
                <span className="font-mono text-indigo-400 font-bold bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/40">
                  {categoryName}
                </span>
                <span className="text-slate-700">•</span>
                <span className="text-slate-400 font-semibold">{reviews.length} Reviews</span>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-4">
                ₹{parseFloat(currentPrice).toLocaleString('en-IN')}
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                {product?.description || 'No detailed specifications provided.'}
              </p>

              {/* Variants */}
              {product?.variants?.length > 0 && (
                <div className="space-y-2.5 mb-6">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">
                    Select Options
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id || v._id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          selectedVariant?.id === v.id || selectedVariant?._id === v._id
                            ? 'border-indigo-500 bg-indigo-950/80 text-white shadow-lg shadow-indigo-500/20'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        {v.name} {v.price ? `(₹${v.price})` : ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Controls */}
              <div className="space-y-2.5 mb-6">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">
                  Quantity
                </label>
                <div className="flex items-center gap-3 w-36 bg-slate-950 border border-slate-800 rounded-xl p-1 shadow-inner">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="flex-1 text-center text-sm font-mono font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="space-y-4 pt-4 border-t border-slate-800/80">
              <Button
                variant="primary"
                size="lg"
                className="w-full py-4 text-base font-black shadow-xl shadow-indigo-600/30 cursor-pointer"
                onClick={handleAddToCart}
                icon={ShoppingBag}
              >
                Add to Cart
              </Button>

              <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-400 font-semibold pt-1">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-400 shrink-0" /> Fast Standard Shipping
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" /> Verified Seller Protection
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Customer Reviews & Ratings Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-slate-800 p-6 md:p-10 shadow-2xl space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-1">
              <MessageSquare className="w-4 h-4" /> Community Insights
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Customer Reviews & Ratings</h2>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 shrink-0">
            <div className="text-3xl font-black text-white font-mono">{averageRating}</div>
            <div className="space-y-1">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(Number(averageRating))
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] font-semibold text-slate-400">Based on {reviews.length} feedback entries</p>
            </div>
          </div>
        </div>

        {/* Submit Review Box */}
        <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800/80 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Share Your Product Feedback
          </h3>

          {isAuthenticated ? (
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-2">
                  Select Rating
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-2">
                  Your Review
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe your experience with this item..."
                  className="w-full bg-slate-900 text-sm border border-slate-800 rounded-xl p-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={submittingReview}
                  icon={Send}
                  className="px-6 py-2.5 text-xs"
                >
                  Submit Review
                </Button>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="p-2 bg-indigo-950 text-indigo-400 rounded-lg">
                  <Lock className="w-4 h-4" />
                </div>
                <span>You must be signed in to post a product review.</span>
              </div>
              <Link
                to="/login"
                className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-colors shrink-0"
              >
                Sign In to Review
              </Link>
            </div>
          )}
        </div>

        {/* Review List Display */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
            Verified Customer Responses ({reviews.length})
          </h3>

          {reviews.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500 bg-slate-950/40 rounded-2xl border border-slate-800/40">
              No customer reviews posted yet. Be the first to share your experience!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {reviews.map((rev, index) => {
                // Extract author ID safely (handles both populated user object and raw string ID)
                const reviewAuthorId = typeof rev.user === 'object' ? rev.user?._id : rev.user;
                const loggedInUserId = user?._id || user?.id;

                // Check ownership logic
                const isAuthor = Boolean(
                  isAuthenticated && 
                  loggedInUserId && 
                  reviewAuthorId && 
                  String(loggedInUserId) === String(reviewAuthorId)
                );

                return (
                  <motion.div
                    key={rev._id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-black flex items-center justify-center text-xs">
                          {rev.user?.name ? rev.user.name[0].toUpperCase() : 'U'}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                            {rev.user?.name || 'Verified Customer'}
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          </h4>
                          <p className="text-[10px] text-slate-500 font-mono">
                            {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Recent'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-800'
                              }`}
                            />
                          ))}
                        </div>

                        {/* DELETE BUTTON: Rendered ONLY if current user created this comment */}
                        {isAuthor && (
                          <button
                            onClick={() => handleDeleteReview(rev._id)}
                            className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-900 transition-colors cursor-pointer"
                            title="Delete comment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pl-10">
                      {rev.comment}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* Auth Guard Modal */}
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
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 bg-indigo-950/80 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-800/50 shadow-inner">
                <Lock className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-white">Sign In Required</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You need an active NexCart account to add items to your cart, sync orders across devices, and check out.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  Sign In to Continue <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/register');
                  }}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Create New Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;