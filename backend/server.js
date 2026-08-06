import dotenv from 'dotenv';
dotenv.config();
import dns from 'dns';
import express from 'express';
import cors from 'cors';

// Config & Database
import connectDB from './config/db.js';

// Controller Imports
import { handleStripeWebhook } from './utils/stripeWebhookHandler.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Middleware
import errorHandler from './middlewares/errorHandler.js';



dns.setServers(['8.8.8.8', '8.8.4.4']);

// Connect to MongoDB
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

const API_PREFIX = '/api/v1';

// ⚠️ STRIPE WEBHOOK MUST BE BEFORE express.json() to capture raw buffer
app.post(
  `${API_PREFIX}/payments/webhook`,
  express.raw({ type: 'application/json' }),
  handleStripeWebhook
);

// Body Parsers for standard JSON/URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check / Base Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get(`${API_PREFIX}/health`, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Backend API is connected and working!',
    timestamp: new Date(),
  });
});

// Register Standard Routes
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/vendors`, vendorRoutes);
app.use(`${API_PREFIX}/categories`, categoryRoutes);
app.use(`${API_PREFIX}/products`, productRoutes);
app.use(`${API_PREFIX}/cart`, cartRoutes);
app.use(`${API_PREFIX}/orders`, orderRoutes);
app.use(`${API_PREFIX}/payments`, paymentRoutes);
app.use(`${API_PREFIX}/admin`, adminRoutes);

// Central Error Handler (must be registered last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});