
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Store, Globe, Mail, Phone, Save, Sparkles, Cpu } from 'lucide-react';
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

  // Reusable dark input class targeting the rendered input element
  const darkInputClasses = "[&_label]:text-slate-300 [&_input]:!bg-slate-950 [&_input]:!text-slate-100 [&_input]:!placeholder-slate-500 [&_input]:!border-slate-800 focus-within:[&_input]:!border-indigo-500 focus-within:[&_input]:!ring-indigo-500/20";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl max-w-3xl mx-auto text-slate-100"
    >
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-950/80 text-indigo-400 rounded-xl border border-indigo-800/50 shadow-inner shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-1.5">
              Store Branding & Profile <Sparkles className="w-4 h-4 text-indigo-400" />
            </h2>
            <p className="text-xs text-slate-400">Manage public storefront metadata and contact nodes.</p>
          </div>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full">
          <Cpu className="w-3 h-3 text-emerald-400" /> Live Storefront Active
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Store Name Input */}
        <InputField
          label="Store Name"
          name="storeName"
          placeholder="e.g. Apex Tech Essentials"
          value={formData.storeName}
          onChange={handleChange}
          icon={Store}
          required
          className={darkInputClasses}
        />

        {/* Description Textarea */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
            Store Description
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Tell customers what your store offers..."
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
          />
        </div>

        {/* Branding Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Logo Image URL"
            name="logoUrl"
            placeholder="https://..."
            value={formData.logoUrl}
            onChange={handleChange}
            className={darkInputClasses}
          />
          <InputField
            label="Banner Image URL"
            name="bannerUrl"
            placeholder="https://..."
            value={formData.bannerUrl}
            onChange={handleChange}
            className={darkInputClasses}
          />
        </div>

        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Contact Email"
            name="contactEmail"
            type="email"
            placeholder="support@store.com"
            value={formData.contactEmail}
            onChange={handleChange}
            icon={Mail}
            className={darkInputClasses}
          />
          <InputField
            label="Contact Phone"
            name="contactPhone"
            placeholder="+1 555-0192"
            value={formData.contactPhone}
            onChange={handleChange}
            icon={Phone}
            className={darkInputClasses}
          />
          <InputField
            label="Website URL"
            name="website"
            placeholder="https://yourbrand.com"
            value={formData.website}
            onChange={handleChange}
            icon={Globe}
            className={darkInputClasses}
          />
        </div>

        {/* Action Button */}
        <div className="pt-4 flex justify-end">
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={loading} 
            icon={Save} 
            className="px-7 py-3 shadow-lg shadow-indigo-600/30 text-white font-bold cursor-pointer"
          >
            Save Store Settings
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default StoreSetupForm;