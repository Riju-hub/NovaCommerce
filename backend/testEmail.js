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


// ecommerce-platform/
// │
// ├── frontend/                                    # React Frontend
// │   ├── public/
// │   │   ├── favicon.ico
// │   │   └── nex_logo.png
// │   │
// │   ├── src/
// │   │   ├── assets/
// │   │   │   ├── images/
// │   │   │   └── icons/
// │   │   │
// │   │   ├── components/
// │   │   │   ├── common/
// │   │   │   │   ├── Navbar.jsx
// │   │   │   │   ├── Footer.jsx
// │   │   │   │   ├── Button.jsx
// │   │   │   │   ├── InputField.jsx
// │   │   │   │   ├── Loader.jsx
// │   │   │   │   ├── Modal.jsx
// │   │   │   │   ├── Toast.jsx
// │   │   │   │   └── AnalyticsChart.jsx
// │   │   │   │
// │   │   │   ├── auth/
// │   │   │   │   ├── LoginForm.jsx
// │   │   │   │   ├── RegisterForm.jsx
// │   │   │   │   ├── ForgotPassword.jsx
// │   │   │   │   └── ProfileForm.jsx
// │   │   │   │
// │   │   │   ├── vendor/
// │   │   │   │   ├── VendorSidebar.jsx
// │   │   │   │   ├── StoreSetupForm.jsx
// │   │   │   │   ├── ProductForm.jsx
// │   │   │   │   ├── ProductList.jsx
// │   │   │   │   ├── VariantManager.jsx
// │   │   │   │   └── ImageUploader.jsx
// │   │   │   │
// │   │   │   ├── customer/
// │   │   │   │   ├── HeroBanner.jsx
// │   │   │   │   ├── ProductCard.jsx
// │   │   │   │   ├── ProductGrid.jsx
// │   │   │   │   ├── ProductDetails.jsx
// │   │   │   │   ├── CartItem.jsx
// │   │   │   │   ├── CartSummary.jsx
// │   │   │   │   └── CheckoutForm.jsx
// │   │   │   │
// │   │   │   └── admin/
// │   │   │       ├── AdminSidebar.jsx
// │   │   │       ├── UserTable.jsx
// │   │   │       ├── VendorApprovalCard.jsx
// │   │   │       └── OrderTable.jsx
// │   │   │
// │   │   ├── pages/
// │   │   │   ├── auth/
// │   │   │   │   ├── LoginPage.jsx
// │   │   │   │   ├── RegisterPage.jsx
// │   │   │   │   └── ProfilePage.jsx
// │   │   │   │
// │   │   │   ├── vendor/
// │   │   │   │   ├── VendorDashboard.jsx
// │   │   │   │   ├── ManageProducts.jsx
// │   │   │   │   └── VendorSettings.jsx
// │   │   │   │
// │   │   │   ├── customer/
// │   │   │   │   ├── HomePage.jsx
// │   │   │   │   ├── StoreFrontPage.jsx
// │   │   │   │   ├── ProductListingPage.jsx
// │   │   │   │   ├── ProductDetailsPage.jsx
// │   │   │   │   ├── CartPage.jsx
// │   │   │   │   ├── CheckoutPage.jsx
// │   │   │   │   └── OrderConfirmationPage.jsx
// |   |   |   |   |-- OrderHistoryPage.jsx
// │   │   │   │
// │   │   │   ├── admin/
// │   │   │   │   ├── AdminDashboard.jsx
// │   │   │   │   ├── ManageUsersPage.jsx
// │   │   │   │   ├── ManageVendorsPage.jsx
// │   │   │   │   ├── OrderManagementPage.jsx
// │   │   │   │   └── ReportsPage.jsx
// │   │   │   │
// │   │   │   └── NotFoundPage.jsx
// │   │   │
// │   │   ├── redux/
// │   │   │   ├── store.js
// │   │   │   └── slices/
// │   │   │       ├── authSlice.js
// │   │   │       ├── vendorSlice.js
// │   │   │       ├── productSlice.js
// │   │   │       ├── cartSlice.js
// │   │   │       ├── orderSlice.js
// │   │   │       └── adminSlice.js
// │   │   │
// │   │   ├── routes/
// │   │   │   ├── AppRoutes.jsx
// │   │   │   └── PrivateRoute.jsx
// │   │   │
// │   │   ├── services/
// │   │   │   ├── axiosInstance.js
// │   │   │   ├── authService.js
// │   │   │   ├── vendorService.js
// │   │   │   ├── productService.js
// │   │   │   ├── categoryService.js
// │   │   │   ├── orderService.js
// │   │   │   ├── paymentService.js
// │   │   │   └── adminService.js
// │   │   │
// │   │   ├── hooks/
// │   │   │   ├── useAuth.js
// │   │   │   ├── useCart.js
// │   │   │   └── useVendor.js
// │   │   │
// │   │   ├── utils/
// │   │   │   ├── formatCurrency.js
// │   │   │   ├── validators.js
// │   │   │   └── constants.js
// │   │   │
// │   │   ├── App.jsx
// │   │   ├── main.jsx
// │   │   └── index.css
// │   │
// │   ├── .env
// │   ├── eslint.config.js
// │   ├── vite.config.js
// │   └── package.json
// │
// ├── backend/
// │   │   ├── config/
// │   │   │   ├── db.js
// │   │   │   ├── cloudinary.js
// │   │   │   ├── stripe.js
// │   │   │   └── nodemailer.js
// │   │   │
// │   │   ├── seeds/
// │   │   │   ├── mockData.js
// │   │   │   └── seedDatabase.js
// │   │   │
// │   │   ├── models/
// │   │   │   ├── User.js
// │   │   │   ├── Store.js
// │   │   │   ├── Category.js
// │   │   │   ├── Product.js
// │   │   │   ├── Order.js
// │   │   │   ├── Review.js
// │   │   │   └── Transaction.js
// │   │   │
// │   │   ├── controllers/
// │   │   │   ├── authController.js
// │   │   │   ├── userController.js
// │   │   │   ├── vendorController.js
// │   │   │   ├── categoryController.js
// │   │   │   ├── productController.js
// │   │   │   ├── cartController.js
// │   │   │   ├── orderController.js
// │   │   │   ├── paymentController.js
// │   │   │   ├── adminController.js
// │   │   │   └── analyticsController.js
// │   │   │   └── reviewController.js
// │   │   │
// │   │   │
// │   │   ├── routes/
// │   │   │   ├── authRoutes.js
// │   │   │   ├── userRoutes.js
// │   │   │   ├── vendorRoutes.js
// │   │   │   ├── categoryRoutes.js
// │   │   │   ├── productRoutes.js
// │   │   │   ├── cartRoutes.js
// │   │   │   ├── orderRoutes.js
// │   │   │   ├── paymentRoutes.js
// │   │   │   ├── adminRoutes.js
// │   │   │   └── analyticsRoutes.js
// │   │   │   └── reviewRoutes.js
// │   │   │ 
// │   │   ├── middlewares/
// │   │   │   ├── authMiddleware.js
// │   │   │   ├── roleMiddleware.js
// │   │   │   ├── tenantMiddleware.js
// │   │   │   ├── uploadMiddleware.js
// │   │   │   ├── errorHandler.js
// │   │   │   └── rateLimiter.js
// │   │   │
// │   │   ├── utils/
// │   │   │   ├── generateToken.js
// │   │   │   ├── hashPassword.js
// │   │   │   ├── sendEmail.js
// │   │   │   ├── emailTemplates.js
// │   │   │   ├── apiFeatures.js
// │   │   │   └── stripeWebhookHandler.js
// │   │   │
// │   │   ├── validators/
// │   │   │   ├── authValidator.js
// │   │   │   ├── productValidator.js
// │   │   │   ├── storeValidator.js
// │   │   │   └── orderValidator.js
// │   │   
// │   │
// │   ├── server.js
// │   ├── .env
// │   └── package.json
// │
// │
// │
// ├── .gitignore
// └── README.md