// src/pages/admin/ManageVendorsPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import VendorApprovalCard from '../../components/admin/VendorApprovalCard';
import { fetchPendingVendors, approveVendor } from '../../redux/slices/adminSlice';

const ManageVendorsPage = () => {
  const dispatch = useDispatch();
  const { pendingVendors, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchPendingVendors());
  }, [dispatch]);

  const handleApprove = (id) => {
    dispatch(approveVendor(id));
  };

  const handleReject = (id) => {
    if (window.confirm('Reject this vendor application?')) {
      // rejection logic
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vendor Approvals</h1>
          <p className="text-xs text-slate-500">
            Review applicant store details and grant selling privileges.
          </p>
        </div>

        {pendingVendors.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
            <Store className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">No Pending Applications</p>
            <p className="text-xs text-slate-400 mt-0.5">All vendor applications have been processed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingVendors.map((vendor) => (
              <VendorApprovalCard
                key={vendor._id}
                vendor={vendor}
                onApprove={handleApprove}
                onReject={handleReject}
                isLoading={loading}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageVendorsPage;