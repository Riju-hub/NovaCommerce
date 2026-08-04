import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, CheckCircle2, ShieldCheck, Cpu, AlertCircle } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';

const CheckoutForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    paymentMethod: 'card',
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (formError) setFormError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.street.trim()) newErrors.street = 'Street Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip / Postal Code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setFormError('Please fill in all required shipping details before proceeding.');
      return false;
    }

    setFormError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  // Base input class targeting the inner input element
  const darkInputClasses = "[&_label]:text-slate-300 [&_input]:!bg-slate-950 [&_input]:!text-slate-100 [&_input]:!placeholder-slate-500 [&_input]:!border-slate-800 focus-within:[&_input]:!border-indigo-500 focus-within:[&_input]:!ring-indigo-500/20";
  
  // Class applied when a specific field fails validation
  const errorInputClasses = "[&_label]:text-rose-400 [&_input]:!bg-slate-950 [&_input]:!text-slate-100 [&_input]:!placeholder-slate-500 [&_input]:!border-rose-500/80 focus-within:[&_input]:!border-rose-500 focus-within:[&_input]:!ring-rose-500/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-slate-100 font-sans" noValidate>
      {/* Validation Alert Banner */}
      <AnimatePresence>
        {formError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-rose-950/90 border border-rose-800/80 text-rose-300 text-xs px-4 py-3.5 rounded-2xl flex items-center gap-2.5 shadow-lg"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-medium">{formError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shipping Address Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2">
            <Truck className="w-4 h-4 text-indigo-400 shrink-0" /> Shipping Destination
          </h3>
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-indigo-400 shrink-0" /> Automated Route Verification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            name="fullName"
            placeholder="Jane Doe"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
            className={errors.fullName ? errorInputClasses : darkInputClasses}
          />
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            className={errors.email ? errorInputClasses : darkInputClasses}
          />
        </div>

        <InputField
          label="Street Address"
          name="street"
          placeholder="742 Evergreen Terrace"
          value={formData.street}
          onChange={handleChange}
          error={errors.street}
          required
          className={errors.street ? errorInputClasses : darkInputClasses}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="City"
            name="city"
            placeholder="Springfield"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            required
            className={errors.city ? errorInputClasses : darkInputClasses}
          />
          <InputField
            label="State"
            name="state"
            placeholder="OR"
            value={formData.state}
            onChange={handleChange}
            error={errors.state}
            required
            className={errors.state ? errorInputClasses : darkInputClasses}
          />
          <InputField
            label="Zip / Postal Code"
            name="zipCode"
            placeholder="97477"
            value={formData.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
            required
            className={errors.zipCode ? errorInputClasses : darkInputClasses}
          />
        </div>

        <InputField
          label="Country"
          name="country"
          placeholder="United States"
          value={formData.country}
          onChange={handleChange}
          error={errors.country}
          required
          className={errors.country ? errorInputClasses : darkInputClasses}
        />
      </motion.div>

      {/* Payment Selector Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-indigo-400 shrink-0" /> Payment Node
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> PCI-DSS Compliant
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label
            className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
              formData.paymentMethod === 'card'
                ? 'border-indigo-500 bg-indigo-950/80 text-white shadow-lg shadow-indigo-500/20'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={handleChange}
              className="accent-indigo-500 cursor-pointer"
            />
            <span className="text-xs font-extrabold">Credit / Debit Card (Stripe)</span>
          </label>

          <label
            className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
              formData.paymentMethod === 'cod'
                ? 'border-indigo-500 bg-indigo-950/80 text-white shadow-lg shadow-indigo-500/20'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === 'cod'}
              onChange={handleChange}
              className="accent-indigo-500 cursor-pointer"
            />
            <span className="text-xs font-extrabold">Cash on Delivery</span>
          </label>
        </div>
      </motion.div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full py-4 text-base font-black shadow-xl shadow-indigo-600/30 text-white cursor-pointer"
        icon={CheckCircle2}
      >
        {formData.paymentMethod === 'card' ? 'Proceed to Payment' : 'Complete Order'}
      </Button>
    </form>
  );
};

export default CheckoutForm;