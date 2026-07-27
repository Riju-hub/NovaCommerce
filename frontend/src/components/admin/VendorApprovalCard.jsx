import React, { useState } from 'react';
import { Store, Check, X, Tag, AlertCircle } from 'lucide-react';
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
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <img
            src={primaryImage}
            alt={product.name || product.title}
            className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full inline-block mb-1 uppercase">
              Pending Review
            </span>
            <h4 className="font-bold text-slate-900 text-sm truncate">{product.name || product.title}</h4>
            <p className="text-xs font-semibold text-blue-600 mt-0.5">${product.price}</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {product.description || 'No description provided.'}
        </p>

        <div className="space-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
          {product.store && (
            <div className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">Store: <strong>{product.store.name}</strong></span>
            </div>
          )}
          {product.category && (
            <div className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>Category: <strong>{typeof product.category === 'object' ? product.category.name : product.category}</strong></span>
            </div>
          )}
        </div>

        {showRejectInput && (
          <div className="pt-2 space-y-2">
            <textarea
              placeholder="Reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
              rows="2"
            />
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => setShowRejectInput(false)}>
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
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 border-none"
            onClick={() => onApprove(product._id)}
            isLoading={isLoading}
            icon={Check}
          >
            Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="flex-1"
            onClick={() => setShowRejectInput(true)}
            isLoading={isLoading}
            icon={X}
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};

export default VendorApprovalCard;