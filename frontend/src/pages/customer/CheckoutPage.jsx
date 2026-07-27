// src/pages/customer/CheckoutPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutForm from '../../components/customer/CheckoutForm';
import CartSummary from '../../components/customer/CartSummary';
import { createOrder } from '../../redux/slices/orderSlice';
import { clearCart } from '../../redux/slices/cartSlice';
import useCart from '../../hooks/useCart';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { loading } = useSelector((state) => state.order);

  const handleCheckoutSubmit = async (formData) => {
    const orderPayload = {
      items: cartItems,
      shippingAddress: formData,
      paymentMethod: formData.paymentMethod,
    };

    const result = await dispatch(createOrder(orderPayload));
    if (result.type.endsWith('/fulfilled')) {
      dispatch(clearCart());
      navigate('/order-confirmation', { state: { order: result.payload } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 pb-3 border-b border-slate-200">
        Checkout & Payment
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <CheckoutForm onSubmit={handleCheckoutSubmit} isLoading={loading} />
        </div>

        <div className="lg:col-span-1">
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;