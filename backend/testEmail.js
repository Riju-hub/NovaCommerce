import dotenv from 'dotenv';
import sendEmail from './utils/sendEmail.js';

dotenv.config();

const runTest = async () => {
  console.log('⏳ Sending test email...');
  
  const result = await sendEmail({
    email: 'montagemcoma99@gmail.com', // 👈 Put your real personal email here to check your inbox
    subject: 'Nova Ecommerce - SMTP Test',
    message: 'If you see this, your Nodemailer and Gmail SMTP configuration is working perfectly!',
    html: '<h1>🎉 Success!</h1><p>Your Nodemailer integration with <strong>Nova Ecommerce</strong> is fully operational!</p>',
  });

  console.log('Result:', result);
};

runTest();