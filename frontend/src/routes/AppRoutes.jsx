// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ProfilePage from '../pages/auth/ProfilePage';

import HomePage from '../pages/customer/HomePage';
import ProductListingPage from '../pages/customer/ProductListingPage';
import ProductDetailsPage from '../pages/customer/ProductDetailsPage';
import StoreFrontPage from '../pages/customer/StoreFrontPage';
import CartPage from '../pages/customer/CartPage';
import CheckoutPage from '../pages/customer/CheckoutPage';
import OrderConfirmationPage from '../pages/customer/OrderConfirmationPage';

import VendorDashboard from '../pages/vendor/VendorDashboard';
import ManageProducts from '../pages/vendor/ManageProducts';
import VendorSettings from '../pages/vendor/VendorSettings';

import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsersPage from '../pages/admin/ManageUsersPage';
import ManageVendorsPage from '../pages/admin/ManageVendorsPage';
import OrderManagementPage from '../pages/admin/OrderManagementPage';
import ReportsPage from '../pages/admin/ReportsPage';

import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/store/:vendorId" element={<StoreFrontPage />} />
      <Route path="/cart" element={<CartPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute allowedRoles={['customer', 'vendor', 'admin']} />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={['vendor']} />}>
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/products" element={<ManageProducts />} />
        <Route path="/vendor/settings" element={<VendorSettings />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsersPage />} />
        <Route path="/admin/vendors" element={<ManageVendorsPage />} />
        <Route path="/admin/orders" element={<OrderManagementPage />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;