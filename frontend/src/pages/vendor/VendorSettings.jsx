// src/pages/vendor/VendorSettings.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <VendorSidebar storeName={storeInfo?.storeName} />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Store Settings</h1>
          <p className="text-xs text-slate-500">
            Customize your vendor storefront branding, banners, and support details.
          </p>
        </div>

        <StoreSetupForm initialData={storeInfo || {}} />
      </main>
    </div>
  );
};

export default VendorSettings;