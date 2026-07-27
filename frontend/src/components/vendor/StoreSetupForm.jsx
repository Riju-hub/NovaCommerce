// src/components/vendor/StoreSetupForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Store, Globe, Mail, Phone, Save } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import Toast from '../common/Toast';
import { updateStoreDetails } from '../../redux/slices/vendorSlice';

const StoreSetupForm = ({ initialData = {} }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    storeName: initialData.storeName || initialData.name || '',
    description: initialData.description || '',
    logoUrl: initialData.logoUrl || initialData.logo || '',
    bannerUrl: initialData.bannerUrl || initialData.banner || '',
    contactEmail: initialData.contactEmail || '',
    contactPhone: initialData.contactPhone || '',
    website: initialData.website || '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        storeName: initialData.storeName || initialData.name || '',
        description: initialData.description || '',
        logoUrl: initialData.logoUrl || initialData.logo || '',
        bannerUrl: initialData.bannerUrl || initialData.banner || '',
        contactEmail: initialData.contactEmail || '',
        contactPhone: initialData.contactPhone || '',
        website: initialData.website || '',
      });
    }
  }, [initialData]);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resultAction = await dispatch(updateStoreDetails(formData));
      
      if (updateStoreDetails.fulfilled.match(resultAction)) {
        setToast({ message: 'Store details updated successfully!', type: 'success' });
      } else {
        setToast({
          message: resultAction.payload || 'Failed to update store settings.',
          type: 'error',
        });
      }
    } catch (err) {
      setToast({ message: 'An unexpected error occurred.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs max-w-3xl mx-auto">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <h2 className="text-lg font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
        Store Branding & Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Store Name"
          name="storeName"
          placeholder="e.g. Apex Tech Essentials"
          value={formData.storeName}
          onChange={handleChange}
          icon={Store}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Store Description
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Tell customers what your store offers..."
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Logo Image URL"
            name="logoUrl"
            placeholder="https://..."
            value={formData.logoUrl}
            onChange={handleChange}
          />
          <InputField
            label="Banner Image URL"
            name="bannerUrl"
            placeholder="https://..."
            value={formData.bannerUrl}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Contact Email"
            name="contactEmail"
            type="email"
            placeholder="support@store.com"
            value={formData.contactEmail}
            onChange={handleChange}
            icon={Mail}
          />
          <InputField
            label="Contact Phone"
            name="contactPhone"
            placeholder="+1 555-0192"
            value={formData.contactPhone}
            onChange={handleChange}
            icon={Phone}
          />
          <InputField
            label="Website URL"
            name="website"
            placeholder="https://yourbrand.com"
            value={formData.website}
            onChange={handleChange}
            icon={Globe}
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" variant="primary" isLoading={loading} icon={Save}>
            Save Store Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StoreSetupForm;