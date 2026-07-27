export const getWelcomeTemplate = (name) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #333;">Welcome to Our Platform, ${name}! 🎉</h2>
      <p>We are excited to have you join us. Explore thousands of products from top independent vendors.</p>
      <a href="${process.env.CLIENT_URL || '#'}" style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: #fff; text-decoration: none; border-radius: 4px;">Start Shopping</a>
    </div>
  `;
};

export const getOrderConfirmationTemplate = (order) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #10B981;">Order Confirmed! # ${order._id}</h2>
      <p>Thank you for your purchase. Total amount: <strong>$${order.totalPrice.toFixed(2)}</strong></p>
      <p>Items in your order:</p>
      <ul>
        ${order.orderItems.map((item) => `<li>${item.name} x ${item.quantity} - $${item.price}</li>`).join('')}
      </ul>
    </div>
  `;
};

export const getPasswordResetTemplate = (resetUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2>Password Reset Request</h2>
      <p>You requested a password reset. Please click the button below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #EF4444; color: #fff; text-decoration: none; border-radius: 4px;">Reset Password</a>
      <p style="margin-top: 15px; color: #777;">If you did not request this, please ignore this email.</p>
    </div>
  `;
};