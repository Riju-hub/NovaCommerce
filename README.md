# 🛒 NovaEcommerce — Multi-Tenant E-Commerce Platform (SaaS)

> A scalable, cloud-native Multi-Tenant E-Commerce SaaS platform enabling independent merchants to launch digital storefronts while empowering administrators with centralized oversight.

[![Frontend Deployment](https://img.shields.io/badge/Frontend-Vercel-black?style=flat&logo=vercel)](https://nova-commerce-th.vercel.app)
[![Backend Deployment](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat&logo=render)](https://novacommerce-qreu.onrender.com)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/cloud/atlas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [System & Deployment Architecture](#-system--deployment-architecture)
- [Project Directory Structure](#-project-directory-structure)
- [User Roles & Permissions](#-user-roles--permissions)
- [Security Architecture](#-security-architecture)
- [Database Models](#-database-models)
- [Environment Configuration](#-environment-configuration)
- [Installation & Local Setup](#-installation--local-setup)
- [Third-Party Integrations](#-third-party-integrations)
- [4-Week Development Timeline](#-4-week-development-timeline)
- [Production Deployment](#-production-deployment)
- [QA & Testing Checklist](#-qa--testing-checklist)
- [Future Enhancements](#-future-enhancements)
- [Engineering Team & Organization](#-engineering-team--organization)

---

## 🌐 Overview

**NexCart** is a full-stack multi-tenant SaaS e-commerce solution designed for modern digital commerce. Developed by **Zaalima Development Pvt Ltd**, the platform provides decentralized digital storefront capabilities for independent retail vendors while consolidating governance, data compliance, and platform metrics under a unified Super Admin control plane.

### 🎯 Core Objectives
- Enable small-to-medium enterprises (SMEs) to launch standalone digital storefronts with zero infrastructure overhead.
- Provide strict tenant data isolation, granular Role-Based Access Control (RBAC), and automated payment and fulfillment workflows.
- Deliver sub-millisecond route transitions and real-time sales reporting via interactive analytical dashboards.

---

## ✨ Key Features

- **🏪 Multi-Vendor Storefronts:** Merchants can independently register, customize storefront branding, and manage catalog data.
- **👥 Role-Based Access Control (RBAC):** Distinct permission boundaries for **Customer**, **Vendor**, and **Super Admin** personas.
- **🔐 Secure Authentication:** Stateless JSON Web Token (JWT) sessions and cryptographic password hashing.
- **📦 Inventory & Variant Management:** Complete CRUD workflows for products, pricing tiers, variant attributes, stock-level triggers, and media assets.
- **🛒 Global Shopping Cart & Checkout:** Powered by Redux Toolkit for immutable state, local persistence, and unified checkout.
- **💳 Stripe Payment Processing:** End-to-end checkout sessions with webhook verification for automated order status transitions.
- **☁️ Cloudinary Media Pipeline:** Automated image optimization, transformation, and CDN distribution.
- **📧 Transactional Email Engine:** Automated verification, password reset, and HTML receipt delivery via Nodemailer.
- **📊 Interactive Analytics:** Super Admin and Vendor dashboard metric visualization powered by Recharts.
- **🏢 Tenant-Aware Data Scoping:** Custom middleware dynamically scopes data queries by store boundaries to guarantee tenant isolation.

---

## 🧰 Technology Stack

### Frontend
| Technology | Version / Purpose |
| :--- | :--- |
| **React.js** | Single Page Application (SPA) User Interface |
| **Vite** | Next-generation frontend tooling and production bundler |
| **Redux Toolkit** | Centralized, immutable global state management (Auth, Cart, Orders, Admin) |
| **Tailwind CSS** | Utility-first responsive design system |
| **React Router DOM** | Declarative client-side routing with route guards |
| **Axios** | Promised-based HTTP client with request/response interceptors |
| **Recharts / Chart.js** | Data visualization for order volume and gross revenue metrics |
| **Lucide Icons** | Clean, modern UI iconography |

### Backend
| Technology | Version / Purpose |
| :--- | :--- |
| **Node.js** | Event-driven, asynchronous JavaScript runtime environment |
| **Express.js** | Modular RESTful API routing and middleware framework |
| **Mongoose** | Schema-based object data modeling (ODM) for MongoDB |
| **JSON Web Tokens (JWT)** | Stateless cross-origin API authorization |
| **Bcrypt.js** | Cryptographic salt generation and password hashing |
| **Multer** | Multipart/form-data middleware for file uploads |
| **Helmet.js** | HTTP security response header hardening |
| **Express Rate Limit** | IP-level brute-force and DDoS mitigation |

### Database & External Services
| Layer | Service / Provider | Functionality |
| :--- | :--- | :--- |
| **Database** | MongoDB Atlas | Scalable document-oriented cloud database cluster |
| **Payments** | Stripe API | Secure payment gateway & raw-body webhook listener |
| **Media Storage** | Cloudinary | High-availability cloud media CDN |
| **Transactional Email** | Nodemailer (Gmail SMTP) | Email delivery engine for receipts and notifications |

---

## 🏗️ System & Deployment Architecture

### High-Level System Architecture
```text
                         ┌─────────────────────────┐
                         │       USERS / CLIENTS   │
                         │                         │
                         │ Customer | Vendor |     │
                         │ Super Admin             │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │    REACT FRONTEND       │
                         │                         │
                         │ Vite                    │
                         │ Redux Toolkit           │
                         │ React Router            │
                         │ Tailwind CSS            │
                         │ Axios                   │
                         └────────────┬────────────┘
                                      │
                                      │ HTTPS / REST API
                                      ▼
                         ┌─────────────────────────┐
                         │     NODE + EXPRESS      │
                         │                         │
                         │ Authentication (JWT)    │
                         │ RBAC Middleware         │
                         │ Tenant Middleware       │
                         │ Central Error Handler   │
                         │ Rate Limiter / Security │
                         └────────────┬────────────┘
                                      │
                     ┌────────────────┼─────────────────┐
                     │                │                 │
                     ▼                ▼                 ▼
              ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
              │ MongoDB     │ │ Cloudinary  │ │   Stripe    │
              │ Atlas       │ │             │ │             │
              │             │ │ Images      │ │ Payments    │
              │ App Data    │ │ Media CDN   │ │ Webhooks    │
              └─────────────┘ └─────────────┘ └─────────────┘
                                      │
                                      ▼
                              ┌─────────────┐
                              │ Nodemailer  │
                              │             │
                              │ SMTP Emails │
                              └─────────────┘
```

### 🌐 Production Deployment Topology

```text
 [ React Frontend (Vite) ]
            │
            ▼
    Hosted on Vercel (Edge CDN)
            │
            │ HTTPS API Calls (CORS Protected)
            ▼
 [ Node.js + Express API ]
            │
            ▼
    Hosted on Render (Web Service)
            │
            ├───► MongoDB Atlas (Encrypted Cluster)
            ├───► Cloudinary (Media Assets)
            ├───► Stripe API (Checkout & Webhooks)
            └───► Nodemailer (SMTP Gateway)
```

## 📁 Project Directory Structure

```text
NexCart/
├── frontend/                                    # React Frontend (Vite SPA)
│   ├── public/
│   │   ├── favicon.ico
│   │   └── nex_logo.png
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   ├── components/
│   │   │   ├── common/                          # Reusable UI Primitives
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── InputField.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   └── AnalyticsChart.jsx
│   │   │   ├── auth/                            # Authentication Forms
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   └── ProfileForm.jsx
│   │   │   ├── vendor/                          # Merchant Portal Components
│   │   │   │   ├── VendorSidebar.jsx
│   │   │   │   ├── StoreSetupForm.jsx
│   │   │   │   ├── ProductForm.jsx
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── VariantManager.jsx
│   │   │   │   └── ImageUploader.jsx
│   │   │   ├── customer/                        # Storefront & Checkout Components
│   │   │   │   ├── HeroBanner.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   ├── ProductDetails.jsx
│   │   │   │   ├── CartItem.jsx
│   │   │   │   ├── CartSummary.jsx
│   │   │   │   └── CheckoutForm.jsx
│   │   │   └── admin/                           # Super Admin Control Components
│   │   │       ├── AdminSidebar.jsx
│   │   │       ├── UserTable.jsx
│   │   │       ├── VendorApprovalCard.jsx
│   │   │       └── OrderTable.jsx
│   │   ├── pages/
│   │   │   ├── auth/                            # Login, Register, Profile Pages
│   │   │   ├── vendor/                          # Vendor Dashboard, Catalog, Settings
│   │   │   ├── customer/                        # Home, Storefront, Cart, Checkout, Orders
│   │   │   ├── admin/                           # Admin Dashboard, Vendors, Users, Reports
│   │   │   └── NotFoundPage.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/                          # auth, vendor, product, cart, order, admin
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── services/                            # Axios API Service Modules
│   │   ├── hooks/                               # useAuth, useCart, useVendor
│   │   ├── utils/                               # formatCurrency, validators, constants
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── vite.config.js
│   └── package.json
│
├── backend/                                     # Node.js + Express REST API
│   ├── config/
│   │   ├── db.js                                # MongoDB Atlas Connection
│   │   ├── cloudinary.js                        # Cloudinary SDK Configuration
│   │   ├── stripe.js                            # Stripe API Gateway
│   │   └── nodemailer.js                        # SMTP Mailer Configuration
│   ├── seeds/
│   │   ├── mockData.js
│   │   └── seedDatabase.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Store.js
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   └── Transaction.js
│   ├── controllers/                             # Business Logic Layer
│   ├── routes/                                  # Express API Endpoints
│   ├── middlewares/
│   │   ├── authMiddleware.js                    # JWT Verification
│   │   ├── roleMiddleware.js                    # RBAC Authorization
│   │   ├── tenantMiddleware.js                  # Store/Tenant Query Scoping
│   │   ├── uploadMiddleware.js                  # Multer File Storage
│   │   ├── errorHandler.js                      # Global Exception Filter
│   │   └── rateLimiter.js                       # API Rate Limiting
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── hashPassword.js
│   │   ├── sendEmail.js
│   │   ├── emailTemplates.js
│   │   ├── apiFeatures.js
│   │   └── stripeWebhookHandler.js
│   ├── validators/                              # Request Validation Rules
│   ├── server.js                                # Application Entry Point
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## 👥 User Roles & Permissions

| Role | Scope & Permissions | Key Operations |
| :--- | :--- | :--- |
| **👤 Customer** | Public Storefront & Orders | Browse stores, search catalog, manage cart, Stripe checkout, order tracking, submit reviews. |
| **🏪 Vendor** | Isolated Storefront Portal | Store setup, catalog CRUD, variant/SKU configuration, Cloudinary uploads, store order management, store analytics. |
| **🛡️ Super Admin** | Platform-Wide Governance | Global user/vendor administration, merchant approval workflows, platform-wide order monitoring, gross revenue analytics, system reports. |

---

## 🔐 Security Architecture

- **Stateless Authentication:** JSON Web Tokens (JWT) signed with HMAC-SHA256, supported by configurable expiration windows.
- **Password Protection:** Cryptographic hashing using `bcryptjs` with adaptive salt rounds[cite: 2].
- **Tenant Middleware:** Dynamically injects tenant boundaries (`storeId`) to query filters, eliminating cross-tenant data leaks[cite: 2].
- **Defense in Depth:** Header security via `Helmet.js`, request sanitization, IP rate-limiting on sensitive endpoints, and strict CORS policies[cite: 2].
- **Protected Frontend Routing:** Role-aware `PrivateRoute.jsx` guards UI access based on authenticated Redux state.

---

## 🗄️ Database Models

| Model | Collection | Key Fields & Relationships |
| :--- | :--- | :--- |
| **`User`** | `users` | `name`, `email`, `password`, `role` (customer/vendor/superadmin), `avatar`, `isVerified`[cite: 2] |
| **`Store`** | `stores` | `name`, `slug`, `vendor` (ref: User), `description`, `logo`, `banner`, `status`[cite: 2] |
| **`Category`** | `categories` | `name`, `slug`, `image`, `store` (ref: Store)[cite: 2] |
| **`Product`** | `products` | `title`, `slug`, `price`, `discountPrice`, `stock`, `variants`, `images`, `store` (ref: Store), `category`[cite: 2] |
| **`Order`** | `orders` | `customer` (ref: User), `orderItems` (store-scoped), `shippingAddress`, `totalAmount`, `orderStatus`, `paymentStatus`[cite: 2] |
| **`Transaction`** | `transactions` | `order` (ref: Order), `paymentMethod`, `paymentResult` (Stripe Session/ID), `status`[cite: 2] |
| **`Review`** | `reviews` | `product` (ref: Product), `user` (ref: User), `rating`, `comment`[cite: 2] |

## ⚙️ Environment Configuration

### Backend Setup (`backend/.env`)

```ini
# Server & Network Environment
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
# Production URL: CLIENT_URL=[https://nova-commerce-th.vercel.app](https://nova-commerce-th.vercel.app)

# Database Connection (MongoDB Atlas)
MONGO_URI=mongodb+srv://<username>:<password>@ecommerce.<cluster>.mongodb.net/?appName=Ecommerce

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51...your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_...your_webhook_secret

# Nodemailer SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=novacommerce.orders@gmail.com
SMTP_PASSWORD=your_app_specific_password
FROM_EMAIL=novacommerce.orders@gmail.com
FROM_NAME="NexCart"

# Optional Email Validation
ABSTRACT_EMAIL_API_KEY=your_abstract_api_key
```

### Backend Setup (`backend/.env`)

```
# API Base URL
VITE_API_BASE_URL=http://localhost:5000/api/v1
# Production URL: VITE_API_BASE_URL=[https://novacommerce-qreu.onrender.com/api/v1](https://novacommerce-qreu.onrender.com/api/v1)

# Application Identity
VITE_APP_NAME="NexCart"

# Stripe Publishable Key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51...your_publishable_key
```

## 🚀 Installation & Local Setup

### 1. Prerequisites
- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **MongoDB Atlas** Account or Local MongoDB Instance

### 2. Clone Repository
```bash
git clone [https://github.com/your-username/NexCart.git](https://github.com/your-username/NexCart.git)
cd NexCart
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure your environment variables
cp .env.example .env

# (Optional) Seed the database with mock records
node seeds/seedDatabase.js

# Start backend development server
npm run dev
```
Backend runs on: http://localhost:5000 (API endpoint: http://localhost:5000/api/v1)

### 3. Frontend Setup

```bash
# Open a new terminal instance and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Configure your environment variables
cp .env.example .env

# Start frontend development server
npm run dev
```
Frontend runs on: http://localhost:5173

## 💳 Third-Party Integrations

### Stripe Checkout & Webhook Pipeline

```text
Customer ──► Checkout Form ──► Stripe Session ──► Secure Payment
                                                       │
                                                       ▼
Backend Controller ◄── DB Update ◄── Webhook Handler (Verified Raw Signature)
```
### Cloudinary Asset Delivery

```text
Vendor File Upload ──► Multer Memory Storage ──► Cloudinary SDK ──► Optimized CDN URL ──► MongoDB Document
```

## 📅 4-Week Development Timeline

```text
Week 1: Architecture & Auth  [████████████████████] 100%
Week 2: Store & Inventory    [████████████████████] 100%
Week 3: Cart, Orders & Pay   [████████████████████] 100%
Week 4: Analytics & Deploy   [████████████████████] 100%
```
| Timeline | Phase Focus | Key Deliverables & Outcomes |
| :--- | :--- | :--- |
| **Week 1** | Architecture & Core Auth | System design, Mongoose schema modeling, JWT authentication, RBAC middleware, React Vite scaffolding[cite: 2]. |
| **Week 2** | Inventory & Store Engine | Vendor store CRUD, Cloudinary upload pipeline, variant management, Vendor Dashboard UI, isolation testing[cite: 2]. |
| **Week 3** | Cart, Checkout & Payments | Redux Toolkit cart, Stripe Checkout integration, raw-body webhook listener, order confirmation email templates[cite: 2]. |
| **Week 4** | Analytics & Production Release | Super Admin suite, Recharts metrics, MongoDB index optimization, rate limiting, Vercel & Render production deployment[cite: 2]. |

## 🚀 Production Deployment

| Service | Hosting Provider | Live URL | Configuration Summary |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | **Vercel** | [https://nova-commerce-th.vercel.app](https://nova-commerce-th.vercel.app)[cite: 2] | Global Edge CDN, SPA rewrites, environment secrets[cite: 2] |
| **Backend API** | **Render** | [https://novacommerce-qreu.onrender.com/api/v1](https://novacommerce-qreu.onrender.com/api/v1)[cite: 2] | Auto-deploy on main branch, TLS/SSL termination[cite: 2] |
| **Database** | **MongoDB Atlas** | Cloud M0 Cluster | Multi-region replication, encrypted at rest[cite: 2] |

## 🧪 QA & Testing Checklist

- [x] Customer registration, login, and JWT verification[cite: 2]
- [x] Vendor onboarding and Storefront initialization[cite: 2]
- [x] Super Admin authorization and Vendor approval workflows[cite: 2]
- [x] Strict tenant data scoping via `tenantMiddleware.js`[cite: 2]
- [x] Product CRUD and multi-image Cloudinary uploads[cite: 2]
- [x] Dynamic SKU and variant configuration[cite: 2]
- [x] Redux state persistence for shopping cart operations[cite: 2]
- [x] Stripe Checkout session creation and test card processing[cite: 2]
- [x] Stripe webhook fulfillment for order status updates[cite: 2]
- [x] Nodemailer transactional delivery for order receipts[cite: 2]
- [x] Recharts dashboard rendering for platform & vendor revenue[cite: 2]
- [x] Full production cross-origin communication between Vercel & Render[cite: 2]

## ✨ Conclusion & Strategic Impact

**NexCart** represents a scalable, enterprise-grade multi-tenant e-commerce solution engineered to bridge the gap between centralized administrative control and decentralized vendor independence[cite: 2]. By leveraging a modern MERN stack architecture paired with **Stripe**, **Cloudinary**, and **Nodemailer**, the platform eliminates the high infrastructure and maintenance costs typically associated with multi-vendor commerce[cite: 2].

### Key Takeaways
- **Robust Multi-Tenancy:** Guaranteed logical tenant isolation through custom middleware ensures vendor operations remain private and secure[cite: 2].
- **High Performance & Modern UX:** React.js, Vite, and Redux Toolkit deliver fast load times, smooth route transitions, and responsive interfaces across all user roles[cite: 2].
- **Production-Ready & Scalable:** Deployed seamlessly across **Vercel** and **Render**, providing a reliable foundation ready for commercial SaaS scaling and future feature expansions[cite: 2].

---
