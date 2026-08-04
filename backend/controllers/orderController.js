import Order from '../models/Order.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';
import { getOrderConfirmationTemplate } from '../utils/emailTemplates.js';

export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items specified' });
    }

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // 📧 Send confirmation email for Cash on Delivery (COD) orders
    const normalizedMethod = paymentMethod?.toUpperCase();
    if (normalizedMethod === 'COD' || normalizedMethod === 'CASH ON DELIVERY') {
      try {
        // Retrieve logged-in user's email
        const user = await User.findById(req.user.id);
        const recipientEmail = user?.email || req.user.email;

        if (recipientEmail) {
          const htmlContent = getOrderConfirmationTemplate(order);
          await sendEmail({
            email: recipientEmail,
            subject: `Order Confirmation #${order._id.toString().slice(-8).toUpperCase()} (COD)`,
            message: `Thank you for your order! Total amount: $${order.totalPrice.toFixed(2)} (Cash on Delivery)`,
            html: htmlContent,
          });
          console.log(`📧 COD Order confirmation email sent to ${recipientEmail}`);
        }
      } catch (emailErr) {
        console.error(`❌ Failed to send COD order confirmation email: ${emailErr.message}`);
      }
    }

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};