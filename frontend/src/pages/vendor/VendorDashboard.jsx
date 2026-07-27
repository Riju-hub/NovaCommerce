// src/pages/vendor/VendorDashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react';
import VendorSidebar from '../../components/vendor/VendorSidebar';
import AnalyticsChart from '../../components/common/AnalyticsChart';
import Loader from '../../components/common/Loader';
import { fetchVendorProfile } from '../../redux/slices/vendorSlice';

const VendorDashboard = () => {
  const dispatch = useDispatch();
  const { storeInfo, stats, loading } = useSelector((state) => state.vendor);

  useEffect(() => {
    dispatch(fetchVendorProfile());
  }, [dispatch]);

  const chartData = [
    { label: 'Mon', value: 420 },
    { label: 'Tue', value: 680 },
    { label: 'Wed', value: 510 },
    { label: 'Thu', value: 890 },
    { label: 'Fri', value: 1200 },
    { label: 'Sat', value: 950 },
    { label: 'Sun', value: 1100 },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)]">
        <VendorSidebar storeName={storeInfo?.storeName} />
        <div className="flex-1 flex items-center justify-center">
          <Loader size="lg" color="blue" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <VendorSidebar storeName={storeInfo?.storeName || 'My Vendor Store'} />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vendor Dashboard</h1>
          <p className="text-xs text-slate-500">
            Welcome back! Here is an overview of your store's performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sales</p>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                ${parseFloat(stats?.totalSales || 12450).toFixed(2)}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Orders</p>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                {stats?.totalOrders || 128}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Items</p>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                {stats?.activeProducts || 24}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Growth Rate</p>
              <h3 className="text-xl font-black text-emerald-600 mt-1">+18.4%</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnalyticsChart title="Weekly Store Revenue ($)" data={chartData} color="blue" />
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Store Status</h3>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-xs text-emerald-800 space-y-1">
              <span className="font-bold block">✓ Store Active & Public</span>
              <p className="text-emerald-700">
                Your listings are visible to buyers across all catalog pages.
              </p>
            </div>
            <div className="pt-2 text-xs text-slate-500 space-y-2">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span>Commission Rate:</span>
                <span className="font-semibold text-slate-900">5% per sale</span>
              </div>
              <div className="flex justify-between">
                <span>Payout Schedule:</span>
                <span className="font-semibold text-slate-900">Weekly (Every Mon)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;