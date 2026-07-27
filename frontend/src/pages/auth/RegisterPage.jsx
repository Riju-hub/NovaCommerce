// src/pages/auth/RegisterPage.jsx
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const isVendor = searchParams.get('role') === 'vendor';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 w-full max-w-md space-y-6">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="bg-blue-600 text-white font-black p-2 rounded-lg text-lg tracking-wider">
              NEX
            </div>
            <span className="font-bold text-2xl text-slate-900">NexCart</span>
          </Link>
          <h1 className="text-xl font-bold text-slate-900 pt-2">
            {isVendor ? 'Start Selling on NexCart' : 'Create Your Account'}
          </h1>
          <p className="text-xs text-slate-500">
            {isVendor
              ? 'Join our multi-vendor marketplace and set up your storefront today.'
              : 'Join thousands of shoppers and discover products from independent sellers.'}
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;