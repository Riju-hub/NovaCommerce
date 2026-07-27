// src/pages/admin/AdminDashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DollarSign, Users, Store, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AnalyticsChart from '../../components/common/AnalyticsChart';
import { fetchAllUsers, fetchPendingVendors } from '../../redux/slices/adminSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, pendingVendors } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchPendingVendors());
  }, [dispatch]);

  const platformRevenueData = [
    { label: 'Jan', value: 12400 },
    { label: 'Feb', value: 18900 },
    { label: 'Mar', value: 15600 },
    { label: 'Apr', value: 24000 },
    { label: 'May', value: 28500 },
    { label: 'Jun', value: 31200 },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform Control Center</h1>
          <p className="text-xs text-slate-500">
            System metrics, user accounts, and multi-vendor platform health.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform GMV</p>
              <h3 className="text-xl font-black text-slate-900 mt-1">$130,600.00</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Accounts</p>
              <h3 className="text-xl font-black text-slate-900 mt-1">{users?.length || 42}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Sellers</p>
              <h3 className="text-xl font-black text-amber-600 mt-1">{pendingVendors?.length || 3}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Orders</p>
              <h3 className="text-xl font-black text-slate-900 mt-1">1,420</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnalyticsChart title="Gross Merchandise Volume (GMV)" data={platformRevenueData} color="emerald" />
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Pending Actions</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{pendingVendors.length} Vendors Awaiting Review</h4>
                  <p className="text-[11px] text-slate-500">Approve store applications</p>
                </div>
                <Link to="/admin/vendors" className="p-1.5 text-blue-600 hover:bg-white rounded transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">System Logs & Reports</h4>
                  <p className="text-[11px] text-slate-500">Download audit traces</p>
                </div>
                <Link to="/admin/reports" className="p-1.5 text-blue-600 hover:bg-white rounded transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;