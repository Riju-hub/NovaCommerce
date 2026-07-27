// src/pages/auth/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 w-full max-w-md space-y-6">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="bg-blue-600 text-white font-black p-2 rounded-lg text-lg tracking-wider">
              NEX
            </div>
            <span className="font-bold text-2xl text-slate-900">NexCart</span>
          </Link>
          <h1 className="text-xl font-bold text-slate-900 pt-2">Welcome Back</h1>
          <p className="text-xs text-slate-500">
            Sign in to access your orders, store account, or dashboard.
          </p>
        </div>

        <LoginForm />

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Are you a seller?{' '}
            <Link to="/register?role=vendor" className="font-semibold text-blue-600 hover:underline">
              Sign up as a Vendor
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;