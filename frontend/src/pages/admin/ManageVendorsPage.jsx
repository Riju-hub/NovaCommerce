// // src/pages/admin/ManageVendorsPage.jsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Store } from 'lucide-react';
// import AdminSidebar from '../../components/admin/AdminSidebar';
// import VendorApprovalCard from '../../components/admin/VendorApprovalCard';
// import { fetchPendingVendors, approveVendor } from '../../redux/slices/adminSlice';

// const ManageVendorsPage = () => {
//   const dispatch = useDispatch();
//   const { pendingVendors, loading } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchPendingVendors());
//   }, [dispatch]);

//   const handleApprove = (id) => {
//     dispatch(approveVendor(id));
//   };

//   const handleReject = (id) => {
//     if (window.confirm('Reject this vendor application?')) {
//       // rejection logic
//     }
//   };

//   return (
//     <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
//       <AdminSidebar />

//       <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Vendor Approvals</h1>
//           <p className="text-xs text-slate-500">
//             Review applicant store details and grant selling privileges.
//           </p>
//         </div>

//         {pendingVendors.length === 0 ? (
//           <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
//             <Store className="w-10 h-10 text-slate-300 mx-auto mb-2" />
//             <p className="text-sm font-semibold text-slate-800">No Pending Applications</p>
//             <p className="text-xs text-slate-400 mt-0.5">All vendor applications have been processed.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {pendingVendors.map((vendor) => (
//               <VendorApprovalCard
//                 key={vendor._id}
//                 vendor={vendor}
//                 onApprove={handleApprove}
//                 onReject={handleReject}
//                 isLoading={loading}
//               />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ManageVendorsPage;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store, Sparkles } from 'lucide-react';
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
      // Rejection logic handled by backend API or dispatch
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto w-full min-w-0">
        <div className="border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-1">
            <Store className="w-4 h-4" /> Merchant Onboarding
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            Vendor Approvals <Sparkles className="w-5 h-5 text-amber-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review applicant store details and grant selling privileges.
          </p>
        </div>

        {pendingVendors.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 shadow-2xl flex flex-col items-center justify-center gap-3">
            <div className="p-3.5 bg-emerald-950 text-emerald-400 rounded-2xl border border-emerald-800/50">
              <Store className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base font-extrabold text-white">No Pending Applications</p>
              <p className="text-xs text-slate-500 mt-1">All vendor applications have been processed.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingVendors.map((vendor) => (
              <VendorApprovalCard
                key={vendor._id}
                product={vendor}
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