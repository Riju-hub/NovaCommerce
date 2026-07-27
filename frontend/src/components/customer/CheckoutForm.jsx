// src/components/customer/CheckoutForm.jsx
import React, { useState } from 'react';
import { CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';

const CheckoutForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <Truck className="w-4 h-4 text-blue-600" /> Shipping Address
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            name="fullName"
            placeholder="Jane Doe"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <InputField
          label="Street Address"
          name="address"
          placeholder="742 Evergreen Terrace"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="City"
            name="city"
            placeholder="Springfield"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <InputField
            label="Postal Code"
            name="postalCode"
            placeholder="97477"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <CreditCard className="w-4 h-4 text-blue-600" /> Payment Method
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label
            className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
              formData.paymentMethod === 'card'
                ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs font-semibold">Credit / Debit Card</span>
          </label>

          <label
            className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
              formData.paymentMethod === 'cod'
                ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === 'cod'}
              onChange={handleChange}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs font-semibold">Cash on Delivery</span>
          </label>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full"
        icon={CheckCircle2}
      >
        Complete Order
      </Button>
    </form>
  );
};

export default CheckoutForm;