
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Phone, MapPin, Save, UserCircle, Lock, KeyRound, 
  Mail, CheckCircle2, AlertCircle, ShieldCheck, Eye, EyeOff 
} from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import Toast from '../common/Toast';
import useAuth from '../../hooks/useAuth';
import axiosInstance from '../../services/axiosInstance';
import authService from '../../services/authService';

const ProfileForm = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security'

  // Personal Info Form State
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || user?.address || '',
    city: user?.address?.city || user?.city || '',
    postalCode: user?.address?.zipCode || user?.postalCode || '',
  });

  // Password Change Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // General States
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleProfileChange = (e) => {
    setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit Profile Information Update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.put('/auth/profile', profileData);
      setToast({ message: 'Profile details saved successfully!', type: 'success' });
    } catch (err) {
      setToast({
        message: err.response?.data?.message || 'Failed to update profile info.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Submit Direct Password Change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword.length < 6) {
      setToast({ message: 'New password must be at least 6 characters.', type: 'error' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setToast({ message: 'New passwords do not match.', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setToast({ message: 'Password updated successfully!', type: 'success' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setToast({
        message: err.response?.data?.message || 'Failed to update password. Verify current password.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Request Reset Password Link via Email
  const handleSendResetEmail = async () => {
    setResetLoading(true);
    try {
      await authService.forgotPassword(user?.email);
      setToast({
        message: `Password reset link sent to ${user?.email}`,
        type: 'success',
      });
    } catch (err) {
      setToast({
        message: err.response?.data?.message || 'Failed to send reset email.',
        type: 'error',
      });
    } finally {
      setResetLoading(false);
    }
  };

  const darkInputClasses =
    "[&_label]:text-slate-300 [&_input]:!bg-slate-950/80 [&_input]:!text-slate-100 [&_input]:!placeholder-slate-500 [&_input]:!border-slate-800 focus-within:[&_input]:!border-indigo-500 focus-within:[&_input]:!ring-indigo-500/20";

  return (
    <div className="space-y-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Modern Sub-Header Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800/80 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
          }`}
        >
          <UserCircle className="w-4 h-4" /> Personal Profile
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'security'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
          }`}
        >
          <KeyRound className="w-4 h-4" /> Password & Security
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: Personal Details */}
        {activeTab === 'profile' && (
          <motion.div
            key="profile-tab"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl text-slate-100"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
              <div className="p-2.5 bg-indigo-950/80 text-indigo-400 rounded-xl border border-indigo-800/50 shadow-inner">
                <UserCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white tracking-tight">Account Details</h2>
                <p className="text-xs text-slate-400">Update your account profile and delivery information.</p>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Full Name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  icon={User}
                  required
                  className={darkInputClasses}
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={profileData.email}
                  disabled
                  helperText="Primary email cannot be changed."
                  className="[&_label]:text-slate-300 [&_input]:!bg-slate-950/40 [&_input]:!text-slate-500 [&_input]:!border-slate-800/60 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Phone Number"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  icon={Phone}
                  className={darkInputClasses}
                />

                <InputField
                  label="Postal Code"
                  name="postalCode"
                  placeholder="10001"
                  value={profileData.postalCode}
                  onChange={handleProfileChange}
                  className={darkInputClasses}
                />
              </div>

              <InputField
                label="Street Address"
                name="address"
                placeholder="123 Main Street, Suite 4B"
                value={profileData.address}
                onChange={handleProfileChange}
                icon={MapPin}
                className={darkInputClasses}
              />

              <InputField
                label="City"
                name="city"
                placeholder="New York"
                value={profileData.city}
                onChange={handleProfileChange}
                className={darkInputClasses}
              />

              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={loading}
                  icon={Save}
                  className="px-6 py-2.5 shadow-lg shadow-indigo-600/30 text-white font-bold cursor-pointer"
                >
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 2: Password Security & Reset */}
        {activeTab === 'security' && (
          <motion.div
            key="security-tab"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Action Card: Reset Password Email Trigger */}
            <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 p-6 rounded-3xl border border-indigo-800/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Mail className="w-4 h-4" /> Reset Password via Link
                </div>
                <p className="text-xs text-slate-400 max-w-md">
                  Send a secure password recovery URL to your registered email address (<span className="text-slate-200 font-semibold">{user?.email}</span>).
                </p>
              </div>

              <Button
                type="button"
                onClick={handleSendResetEmail}
                isLoading={resetLoading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                Send Reset Email Link
              </Button>
            </div>

            {/* Direct Change Password Form */}
            <div className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl text-slate-100">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
                <div className="p-2.5 bg-indigo-950/80 text-indigo-400 rounded-xl border border-indigo-800/50 shadow-inner">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-white tracking-tight">Change Password</h2>
                  <p className="text-xs text-slate-400">Update your current account password directly.</p>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <InputField
                    label="Current Password"
                    name="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    icon={Lock}
                    required
                    className={darkInputClasses}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <InputField
                      label="New Password"
                      name="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Min. 6 characters"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      icon={Lock}
                      required
                      className={darkInputClasses}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <InputField
                    label="Confirm New Password"
                    name="confirmPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Re-enter new password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    icon={Lock}
                    required
                    className={darkInputClasses}
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={loading}
                    icon={Save}
                    className="px-6 py-2.5 shadow-lg shadow-indigo-600/30 text-white font-bold cursor-pointer"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileForm;