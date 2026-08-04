import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutForm from '../../components/customer/CheckoutForm';
import CartSummary from '../../components/customer/CartSummary';
import { createOrder } from '../../redux/slices/orderSlice';
import { clearCart } from '../../redux/slices/cartSlice';
import useCart from '../../hooks/useCart';
import paymentService from '../../services/paymentService';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { loading: orderLoading } = useSelector((state) => state.order);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleCheckoutSubmit = async (formData) => {
    try {
      // 1. Calculate price totals
      const itemsPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const taxPrice = Number((itemsPrice * 0.08).toFixed(2)); // 8% Tax example
      const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
      const totalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));

      // 2. Build backend-compliant payload
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          product: item._id || item.product || item.id,
          store: item.store || item.storeId || item.vendor || item.vendorId, // Required Store ID
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image || item.images?.[0] || 'https://via.placeholder.com/150',
          selectedVariant: item.selectedVariant || {},
        })),
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod === 'card' ? 'Stripe' : 'COD',
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      // 3. Send to API
      const result = await dispatch(createOrder(orderPayload));

      if (result.type.endsWith('/fulfilled')) {
        const responseData = result.payload;
        const createdOrder = responseData.data || responseData;

        // 4. Stripe Redirection if Card Payment
        if (formData.paymentMethod === 'card') {
          setIsRedirecting(true);
          const paymentData = await paymentService.createCheckoutSession(createdOrder._id);

          if (paymentData?.url) {
            window.location.href = paymentData.url;
            return;
          }
        }

        // 5. Cash on Delivery
        dispatch(clearCart());
        navigate(`/order-confirmation?orderId=${createdOrder._id}`, {
          state: { order: createdOrder },
        });
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      setIsRedirecting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 pb-3 border-b border-slate-200">
        Checkout & Payment
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <CheckoutForm
            onSubmit={handleCheckoutSubmit}
            isLoading={orderLoading || isRedirecting}
          />
        </div>

        <div className="lg:col-span-1">
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;