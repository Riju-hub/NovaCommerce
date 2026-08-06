
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Settings, Sparkles, Store } from 'lucide-react';
import VendorSidebar from '../../components/vendor/VendorSidebar';
import StoreSetupForm from '../../components/vendor/StoreSetupForm';
import { fetchVendorProfile } from '../../redux/slices/vendorSlice';

const VendorSettings = () => {
  const dispatch = useDispatch();
  const { storeInfo } = useSelector((state) => state.vendor);

  useEffect(() => {
    dispatch(fetchVendorProfile());
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 font-sans">
      <VendorSidebar storeName={storeInfo?.storeName} />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto w-full min-w-0">
        {/* Header Section */}
        <div className="border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-1">
            <Store className="w-4 h-4" /> Store Configuration
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            Store Settings <Sparkles className="w-5 h-5 text-indigo-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Customize your vendor storefront branding, banners, and support contact details.
          </p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl max-w-4xl"
        >
          <StoreSetupForm initialData={storeInfo || {}} />
        </motion.div>
      </main>
    </div>
  );
};

export default VendorSettings;