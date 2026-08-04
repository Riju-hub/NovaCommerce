import stripe from '../config/stripe.js';
import Order from '../models/Order.js';

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.orderItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/order-confirmation?orderId=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/checkout`,
      metadata: { orderId: order._id.toString() },
    });

    res.status(200).json({ success: true, id: session.id, url: session.url });
  } catch (error) {
    next(error);
  }
};