// import React, { useEffect, useState } from 'react';
// import { useSearchParams, Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { CheckCircle2, ArrowRight, Package, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
// import Button from '../../components/common/Button';
// import Loader from '../../components/common/Loader';
// import { clearCart } from '../../redux/slices/cartSlice';
// import orderService from '../../services/orderService';

// const OrderConfirmationPage = () => {
//   const [searchParams] = useSearchParams();
//   const dispatch = useDispatch();
//   const orderId = searchParams.get('orderId');

//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // 1. Clear cart when user lands here after successful payment
//     dispatch(clearCart());

//     // 2. Fetch full order details if orderId is present in URL
//     if (orderId) {
//       orderService
//         .getOrderById(orderId)
//         .then((res) => {
//           setOrderDetails(res.data || res);
//         })
//         .catch((err) => {
//           console.error('Failed to load order details:', err);
//           setError('Could not fetch complete order details.');
//         })
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, [orderId, dispatch]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto my-12 px-4">
//       <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-center">
//         {/* Top Success Badge */}
//         <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
//           <CheckCircle2 className="w-10 h-10" />
//         </div>

//         <div className="space-y-1">
//           <h1 className="text-2xl font-bold text-slate-900">Order Confirmed!</h1>
//           <p className="text-xs text-slate-500">
//             Thank you for your purchase. We sent a receipt to your email address.
//           </p>
//         </div>

//         {/* Detailed Order Summary Card */}
//         {orderDetails ? (
//           <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left space-y-5 text-xs">
//             {/* Header / ID & Status */}
//             <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
//               <div>
//                 <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
//                   Order Reference
//                 </span>
//                 <span className="font-mono font-bold text-slate-900 text-sm">
//                   #{orderDetails._id?.slice(-8).toUpperCase()}
//                 </span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
//                   {orderDetails.isPaid ? 'Payment Confirmed' : 'Payment Processing'}
//                 </span>
//               </div>
//             </div>

//             {/* Purchased Items List */}
//             <div className="space-y-3">
//               <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
//                 <ShoppingBag className="w-3.5 h-3.5 text-blue-600" /> Items Purchased
//               </h4>
//               <div className="divide-y divide-slate-200/60 bg-white rounded-lg border border-slate-200 px-3 py-1">
//                 {orderDetails.orderItems?.map((item, idx) => (
//                   <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={item.image || 'https://via.placeholder.com/80'}
//                         alt={item.name}
//                         className="w-10 h-10 rounded-md object-cover border border-slate-100"
//                       />
//                       <div>
//                         <p className="font-semibold text-slate-900 text-xs line-clamp-1">{item.name}</p>
//                         <p className="text-[11px] text-slate-500">
//                           Qty: {item.quantity} × ${item.price?.toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="font-bold text-slate-800 text-xs">
//                       ${(item.quantity * item.price).toFixed(2)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Shipping & Payment Meta Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
//               {/* Shipping Address */}
//               {orderDetails.shippingAddress && (
//                 <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
//                   <h5 className="font-bold text-slate-700 text-[10px] uppercase tracking-wider flex items-center gap-1">
//                     <MapPin className="w-3 h-3 text-blue-600" /> Shipping Address
//                   </h5>
//                   <p className="text-slate-600 leading-tight">
//                     {orderDetails.shippingAddress.street}<br />
//                     {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}<br />
//                     {orderDetails.shippingAddress.country}
//                   </p>
//                 </div>
//               )}

//               {/* Payment Summary */}
//               <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
//                 <h5 className="font-bold text-slate-700 text-[10px] uppercase tracking-wider flex items-center gap-1">
//                   <CreditCard className="w-3 h-3 text-blue-600" /> Price Breakdown
//                 </h5>
//                 <div className="space-y-1 text-[11px]">
//                   <div className="flex justify-between text-slate-500">
//                     <span>Items Total:</span>
//                     <span>${orderDetails.itemsPrice?.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-slate-500">
//                     <span>Shipping:</span>
//                     <span>${orderDetails.shippingPrice?.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-slate-500">
//                     <span>Tax:</span>
//                     <span>${orderDetails.taxPrice?.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-1 mt-1">
//                     <span>Total Amount:</span>
//                     <span>${orderDetails.totalPrice?.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Fallback if details couldn't be loaded */
//           <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
//             <span className="text-slate-500">Order Reference: </span>
//             <span className="font-mono font-bold text-slate-900">
//               #{orderId ? orderId.slice(-8).toUpperCase() : 'N/A'}
//             </span>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="pt-2 flex flex-wrap justify-center gap-3">
//           <Link to="/orders">
//             <Button variant="outline" icon={Package}>
//               View All Orders
//             </Button>
//           </Link>

//           <Link to="/products">
//             <Button variant="primary" icon={ArrowRight}>
//               Continue Shopping
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmationPage;



import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CheckCircle2, ArrowRight, Package, MapPin, CreditCard, ShoppingBag, Sparkles } from 'lucide-react';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { clearCart } from '../../redux/slices/cartSlice';
import orderService from '../../services/orderService';

const OrderConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const orderId = searchParams.get('orderId');

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(clearCart());

    if (orderId) {
      orderService
        .getOrderById(orderId)
        .then((res) => {
          setOrderDetails(res.data || res);
        })
        .catch((err) => {
          console.error('Failed to load order details:', err);
          setError('Could not fetch complete order details.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderId, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" color="indigo" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-12 px-4 font-sans text-slate-100">
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-center">
        
        {/* Top Success Badge */}
        <div className="w-18 h-18 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            Order Confirmed! <Sparkles className="w-5 h-5 text-indigo-400" />
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Thank you for your purchase. An order receipt has been issued to your email.
          </p>
        </div>

        {/* Detailed Order Summary Card */}
        {orderDetails ? (
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-left space-y-5 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-slate-500 block text-[10px] font-mono font-bold uppercase tracking-wider">
                  Order Reference
                </span>
                <span className="font-mono font-black text-white text-sm">
                  #{orderDetails._id?.slice(-8).toUpperCase()}
                </span>
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {orderDetails.isPaid ? 'Payment Confirmed' : 'Payment Processing'}
                </span>
              </div>
            </div>

            {/* Purchased Items List */}
            <div className="space-y-3">
              <h4 className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] font-mono flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" /> Items Purchased
              </h4>
              <div className="divide-y divide-slate-800/80 bg-slate-900/60 rounded-xl border border-slate-800 px-3 py-1">
                {orderDetails.orderItems?.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || 'https://via.placeholder.com/80'}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-800"
                      />
                      <div>
                        <p className="font-bold text-white text-xs line-clamp-1">{item.name}</p>
                        <p className="text-[11px] font-mono text-slate-400">
                          Qty: {item.quantity} × ₹{item.price?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-white text-xs">
                      ₹{(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Pricing breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {orderDetails.shippingAddress && (
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <h5 className="font-mono font-bold text-indigo-400 text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Shipping Address
                  </h5>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {orderDetails.shippingAddress.street}<br />
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}<br />
                    {orderDetails.shippingAddress.country}
                  </p>
                </div>
              )}

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <h5 className="font-mono font-bold text-indigo-400 text-[10px] uppercase tracking-wider flex items-center gap-1">
                  <CreditCard className="w-3 h-3" /> Price Breakdown
                </h5>
                <div className="space-y-1 text-[11px] font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Items Total:</span>
                    <span>₹{orderDetails.itemsPrice?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping:</span>
                    <span>₹{orderDetails.shippingPrice?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tax (GST):</span>
                    <span>₹{orderDetails.taxPrice?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white border-t border-slate-800 pt-1 mt-1">
                    <span>Total Paid:</span>
                    <span>₹{orderDetails.totalPrice?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono">
            <span className="text-slate-400">Order Reference: </span>
            <span className="font-bold text-white">
              #{orderId ? orderId.slice(-8).toUpperCase() : 'N/A'}
            </span>
          </div>
        )}

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link to="/orders">
            <Button variant="outline" icon={Package} className="border-slate-800 text-slate-300 hover:bg-slate-800">
              View All Orders
            </Button>
          </Link>

          <Link to="/products">
            <Button variant="primary" icon={ArrowRight} className="shadow-lg shadow-indigo-600/30">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;