// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/auth/ProfilePage';

// Customer Pages
import HomePage from './pages/customer/HomePage';
import ProductListingPage from './pages/customer/ProductListingPage';
import ProductDetailsPage from './pages/customer/ProductDetailsPage';
import StoreFrontPage from './pages/customer/StoreFrontPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import OrderConfirmationPage from './pages/customer/OrderConfirmationPage';

// Vendor Pages
import VendorDashboard from './pages/vendor/VendorDashboard';
import ManageProducts from './pages/vendor/ManageProducts';
import VendorSettings from './pages/vendor/VendorSettings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageVendorsPage from './pages/admin/ManageVendorsPage';
import OrderManagementPage from './pages/admin/OrderManagementPage';

// Not Found Page
import NotFoundPage from './pages/NotFoundPage';

// Route Guard
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Public Customer Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/store/:vendorId" element={<StoreFrontPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Customer Routes */}
            <Route element={<PrivateRoute allowedRoles={['customer', 'vendor', 'admin']} />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            </Route>

            {/* Protected Vendor Portal Routes */}
            <Route element={<PrivateRoute allowedRoles={['vendor']} />}>
              <Route path="/vendor" element={<Navigate to="/vendor/dashboard" replace />} />
              <Route path="/vendor/dashboard" element={<VendorDashboard />} />
              <Route path="/vendor/products" element={<ManageProducts />} />
              <Route path="/vendor/settings" element={<VendorSettings />} />
            </Route>

            {/* Protected Admin Portal Routes */}
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsersPage />} />
              <Route path="/admin/vendors" element={<ManageVendorsPage />} />
              <Route path="/admin/orders" element={<OrderManagementPage />} />
            </Route>

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;