import transporter from "../config/nodemailer.js";

const sendEmail = async ({ email, subject, message, html }) => {
  const info = await transporter.sendMail({
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject,
    text: message,
    html,
  });

  console.log("Email Sent:", info.messageId);
};

export default sendEmail;