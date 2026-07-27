// src/pages/admin/ReportsPage.jsx
import React from 'react';
import { Download, FileText, BarChart3, TrendingUp } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Button from '../../components/common/Button';

const ReportsPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform Reports</h1>
          <p className="text-xs text-slate-500">
            Export site metrics, transaction logs, and commission statements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Sales & Revenue Audit</h3>
              <p className="text-xs text-slate-500 mt-1">Detailed summary of GMV and vendor commission cuts.</p>
            </div>
            <Button variant="outline" size="sm" className="w-full" icon={Download}>
              Export CSV
            </Button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Vendor Performance</h3>
              <p className="text-xs text-slate-500 mt-1">Order completion rates and fulfillment analytics.</p>
            </div>
            <Button variant="outline" size="sm" className="w-full" icon={Download}>
              Export CSV
            </Button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">User Growth Ledger</h3>
              <p className="text-xs text-slate-500 mt-1">Customer signups, active vendors, and retention metrics.</p>
            </div>
            <Button variant="outline" size="sm" className="w-full" icon={Download}>
              Export CSV
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;