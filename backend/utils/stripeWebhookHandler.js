import stripe from '../config/stripe.js';
import Order from '../models/Order.js';
import sendEmail from './sendEmail.js';
import { getOrderConfirmationTemplate } from './emailTemplates.js';

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      // Fetch order and populate user info for email fallback
      const order = await Order.findById(orderId).populate('user', 'email name');

      if (order) {
        const recipientEmail = session.customer_details?.email || order.user?.email;

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: session.payment_intent,
          status: session.payment_status,
          emailAddress: recipientEmail,
        };
        await order.save();
        console.log(`✅ Order ${orderId} marked as paid via Stripe Webhook.`);

        // 📧 Send Email Confirmation using your existing template
        if (recipientEmail) {
          try {
            const htmlContent = getOrderConfirmationTemplate(order);
            await sendEmail({
              email: recipientEmail,
              subject: `Order Confirmation #${order._id.toString().slice(-8).toUpperCase()}`,
              message: `Thank you for your purchase! Total amount: $${order.totalPrice.toFixed(2)}`,
              html: htmlContent,
            });
            console.log(`📧 Receipt sent to ${recipientEmail}`);
          } catch (emailErr) {
            console.error(`❌ Failed to send order receipt email: ${emailErr.message}`);
          }
        }
      }
    }
  }

  res.status(200).json({ received: true });
};