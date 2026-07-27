// src/components/auth/ProfileForm.jsx
import React, { useState } from 'react';
import { User, Phone, MapPin, Save } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import Toast from '../common/Toast';
import useAuth from '../../hooks/useAuth';
import axiosInstance from '../../services/axiosInstance';

const ProfileForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.put('/auth/profile', formData);
      setToast({ message: 'Profile updated successfully!', type: 'success' });
    } catch (err) {
      setToast({
        message: err.response?.data?.message || 'Failed to update profile',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs max-w-2xl mx-auto">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2 className="text-lg font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
        Personal Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={User}
            required
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            disabled
            helperText="Email address cannot be changed."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Phone Number"
            name="phone"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
            icon={Phone}
          />

          <InputField
            label="Postal Code"
            name="postalCode"
            placeholder="10001"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>

        <InputField
          label="Street Address"
          name="address"
          placeholder="123 Main Street, Suite 4B"
          value={formData.address}
          onChange={handleChange}
          icon={MapPin}
        />

        <InputField
          label="City"
          name="city"
          placeholder="New York"
          value={formData.city}
          onChange={handleChange}
        />

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            icon={Save}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;