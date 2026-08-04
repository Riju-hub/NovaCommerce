const getBaseLayout = (content) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Ecommerce</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6f8; padding: 40px 10px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
            
            <!-- Header -->
            <tr>
              <td style="background-color: #4f46e5; padding: 28px 32px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">Nova Ecommerce</h1>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 36px 32px; color: #1f2937; line-height: 1.6; font-size: 15px;">
                ${content}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f9fafb; padding: 20px 32px; text-align: center; border-top: 1px solid #f3f4f6; color: #6b7280; font-size: 13px;">
                <p style="margin: 0 0 6px 0;">Need help? Contact our support team.</p>
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} Nova Ecommerce. All rights reserved.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

export const getWelcomeTemplate = (name) => {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; background-color: #e0e7ff; border-radius: 50%; padding: 16px; margin-bottom: 12px;">
        <span style="font-size: 32px;">🎉</span>
      </div>
      <h2 style="margin: 0; color: #111827; font-size: 22px; font-weight: 700;">Welcome, ${name}!</h2>
    </div>

    <p style="margin: 0 0 16px 0; color: #4b5563;">We’re thrilled to have you on board! Explore thousands of high-quality products directly from independent vendors worldwide.</p>

    <div style="text-align: center; margin-top: 32px;">
      <a href="${process.env.CLIENT_URL || '#'}" style="display: inline-block; padding: 14px 28px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);">Start Shopping</a>
    </div>
  `;
  return getBaseLayout(content);
};

export const getLoginAlertTemplate = (name, date) => {
  const content = `
    <div style="margin-bottom: 20px;">
      <h2 style="margin: 0 0 8px 0; color: #111827; font-size: 20px; font-weight: 700;">Security Alert: New Login</h2>
      <p style="margin: 0; color: #4b5563;">Hello <strong>${name}</strong>,</p>
    </div>

    <p style="margin: 0 0 16px 0; color: #4b5563;">A successful login to your Nova Ecommerce account was detected on:</p>

    <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; border-left: 4px solid #4f46e5; font-size: 14px; font-weight: 600; color: #1f2937; margin-bottom: 20px;">
      🕒 ${date}
    </div>

    <p style="margin: 0; color: #6b7280; font-size: 13px;">If this was you, no action is needed. If you didn't initiate this login, please secure your account immediately.</p>
  `;
  return getBaseLayout(content);
};

export const getOrderConfirmationTemplate = (order) => {
  const itemsList = order.orderItems
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #374151;">
            <strong>${item.name}</strong> <span style="color: #9ca3af;">x ${item.quantity}</span>
          </td>
          <td align="right" style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600;">
            $${(item.price * item.quantity).toFixed(2)}
          </td>
        </tr>
      `
    )
    .join('');

  const content = `
    <div style="margin-bottom: 24px; text-align: center;">
      <div style="display: inline-block; background-color: #d1fae5; border-radius: 50%; padding: 16px; margin-bottom: 12px;">
        <span style="font-size: 28px;">✅</span>
      </div>
      <h2 style="margin: 0; color: #111827; font-size: 22px; font-weight: 700;">Order Confirmed!</h2>
      <p style="margin: 6px 0 0 0; color: #6b7280; font-size: 14px;">Order ID: #${order._id.toString().slice(-8).toUpperCase()}</p>
    </div>

    <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 20px; font-size: 14px;">
      <thead>
        <tr>
          <th align="left" style="padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; color: #6b7280; font-size: 12px; text-transform: uppercase;">Item</th>
          <th align="right" style="padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; color: #6b7280; font-size: 12px; text-transform: uppercase;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemsList}
      </tbody>
    </table>

    <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-top: 16px;">
      <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 15px;">
        <tr>
          <td style="color: #111827; font-weight: 700;">Total Amount</td>
          <td align="right" style="color: #10b981; font-weight: 700; font-size: 18px;">$${order.totalPrice.toFixed(2)}</td>
        </tr>
      </table>
    </div>
  `;
  return getBaseLayout(content);
};

export const getPasswordResetTemplate = (resetUrl) => {
  const content = `
    <div style="margin-bottom: 20px;">
      <h2 style="margin: 0 0 8px 0; color: #111827; font-size: 20px; font-weight: 700;">Password Reset Request</h2>
      <p style="margin: 0; color: #4b5563;">You recently requested to reset your password for your account.</p>
    </div>

    <p style="margin: 0 0 24px 0; color: #4b5563;">Click the button below to choose a new password:</p>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${resetUrl}" style="display: inline-block; padding: 14px 28px; background-color: #ef4444; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);">Reset Password</a>
    </div>

    <p style="margin: 0; color: #6b7280; font-size: 13px;">If you didn't request a password reset, you can safely ignore this email.</p>
  `;
  return getBaseLayout(content);
};

export const getProductCreatedTemplate = (vendorName, product) => {
  const content = `
    <div style="margin-bottom: 20px;">
      <h2 style="margin: 0 0 8px 0; color: #111827; font-size: 20px; font-weight: 700;">Product Listed Successfully 📦</h2>
      <p style="margin: 0; color: #4b5563;">Hello <strong>${vendorName}</strong>,</p>
    </div>

    <p style="margin: 0 0 16px 0; color: #4b5563;">Your product <strong>"${product.name}"</strong> is live on Nova Ecommerce.</p>

    <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
      <table width="100%" cellspacing="0" cellpadding="4" style="font-size: 14px; color: #374151;">
        <tr>
          <td><strong>Price:</strong></td>
          <td align="right" style="font-weight: 600; color: #111827;">$${product.price.toFixed(2)}</td>
        </tr>
        <tr>
          <td><strong>Initial Stock:</strong></td>
          <td align="right" style="font-weight: 600; color: #111827;">${product.stock || 0} units</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center;">
      <a href="${process.env.CLIENT_URL || '#'}/vendor/products" style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Manage Products</a>
    </div>
  `;
  return getBaseLayout(content);
};