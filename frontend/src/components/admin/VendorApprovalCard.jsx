
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, Check, X, Tag } from 'lucide-react';
import Button from '../common/Button';

const VendorApprovalCard = ({ product, onApprove, onReject, isLoading = false }) => {
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const primaryImage = product?.images?.[0] || 'https://via.placeholder.com/150?text=No+Image';

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) return;
    onReject(product._id, rejectReason);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-slate-800 p-5 shadow-2xl flex flex-col justify-between space-y-4 text-slate-100"
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3.5">
          <img
            src={primaryImage}
            alt={product.name || product.title}
            className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-950/80 border border-amber-800/60 px-2 py-0.5 rounded-md inline-block mb-1 uppercase">
              Pending Review
            </span>
            <h4 className="font-extrabold text-white text-sm truncate">{product.name || product.title}</h4>
            <p className="text-xs font-black text-indigo-400 font-mono mt-0.5">₹{product.price}</p>
          </div>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {product.description || 'No description provided.'}
        </p>

        <div className="space-y-1.5 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
          {product.store && (
            <div className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">Store: <strong className="text-white">{product.store.name}</strong></span>
            </div>
          )}
          {product.category && (
            <div className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Category: <strong className="text-white">{typeof product.category === 'object' ? product.category.name : product.category}</strong></span>
            </div>
          )}
        </div>

        {showRejectInput && (
          <div className="pt-2 space-y-2">
            <textarea
              placeholder="Reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full text-xs p-3 border border-slate-800 bg-slate-950 text-slate-100 rounded-xl focus:outline-none focus:border-rose-500 placeholder:text-slate-500"
              rows="2"
            />
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 text-xs border-slate-800 text-slate-300" onClick={() => setShowRejectInput(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                variant="danger"
                className="flex-1 text-xs"
                onClick={handleRejectSubmit}
                isLoading={isLoading}
              >
                Confirm Reject
              </Button>
            </div>
          </div>
        )}
      </div>

      {!showRejectInput && (
        <div className="flex gap-2 pt-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 border-none text-xs font-bold cursor-pointer"
            onClick={() => onApprove(product._id)}
            isLoading={isLoading}
            icon={Check}
          >
            Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="flex-1 text-xs font-bold cursor-pointer"
            onClick={() => setShowRejectInput(true)}
            isLoading={isLoading}
            icon={X}
          >
            Reject
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default VendorApprovalCard;