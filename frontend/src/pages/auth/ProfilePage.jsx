// src/pages/auth/ProfilePage.jsx
import React from 'react';
import { User, Shield, Store, ShoppingBag } from 'lucide-react';
import ProfileForm from '../../components/auth/ProfileForm';
import useAuth from '../../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return (
          <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Platform Administrator
          </span>
        );
      case 'vendor':
        return (
          <span className="bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5" /> Verified Vendor
          </span>
        );
      default:
        return (
          <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> Customer Account
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-md">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold text-slate-900">{user?.name || 'User Account'}</h1>
            <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
          </div>
        </div>

        <div>{getRoleBadge(user?.role)}</div>
      </div>

      <ProfileForm />
    </div>
  );
};

export default ProfilePage;