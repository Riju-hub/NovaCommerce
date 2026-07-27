# 🛒 Multi-Tenant E-Commerce Platform

A full-stack **Multi-Tenant E-Commerce Platform** built with the **MERN Stack**, allowing multiple vendors to manage their own stores while customers can browse, purchase products, and track orders from a unified marketplace.

---

## 🚀 Features

### 👤 Authentication
- User Registration & Login
- JWT Authentication
- Role-Based Authorization
- Forgot & Reset Password
- User Profile Management

### 🛍️ Customer
- Browse Products
- Product Search & Filtering
- Shopping Cart
- Secure Checkout
- Order Tracking
- Product Reviews

### 🏪 Vendor
- Store Management
- Product CRUD Operations
- Product Variants
- Image Upload
- Sales Dashboard
- Order Management

### 🛠️ Admin
- Dashboard & Analytics
- User Management
- Vendor Approval
- Product Monitoring
- Order Management
- Sales Reports

### 💳 Payment
- Stripe Payment Gateway
- Secure Checkout
- Transaction Management

### 📧 Notifications
- Email Verification
- Password Reset Emails
- Order Confirmation Emails

---

# 🏗️ Tech Stack

## Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- Vite

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer
- Cloudinary
- Stripe

---

# 📁 Project Structure

```
ecommerce-platform/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── auth/
│   │   │   ├── customer/
│   │   │   ├── vendor/
│   │   │   └── admin/
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── customer/
│   │   │   ├── vendor/
│   │   │   └── admin/
│   │   │
│   │   ├── redux/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── utils/
│   ├── seeds/
│   ├── tests/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── .gitignore
```

---

# 📂 Folder Overview

## Frontend

| Folder | Description |
|---------|-------------|
| assets | Images, icons and static resources |
| components | Reusable UI components |
| pages | Application pages |
| redux | Redux Toolkit store & slices |
| routes | Route protection and routing |
| services | API service layer |
| hooks | Custom React hooks |
| utils | Helper functions & constants |

---

## Backend

| Folder | Description |
|---------|-------------|
| config | Database & third-party configurations |
| controllers | Business logic |
| middlewares | Authentication & error handling |
| models | MongoDB Models |
| routes | REST API Routes |
| validators | Request validation |
| utils | Helper utilities |
| seeds | Sample database data |
| tests | Unit & integration tests |

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/multi-tenant-ecommerce-platform.git

cd multi-tenant-ecommerce-platform
```

---

## Install Frontend

```bash
cd frontend

npm install
```

---

## Install Backend

```bash
cd backend

npm install
```

---

# 🔐 Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=

EMAIL_USER=

EMAIL_PASS=
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# ▶️ Run the Project

## Backend

```bash
cd backend

npm run dev
```

---

## Frontend

```bash
cd frontend

npm run dev
```

---

# 📦 API Modules

- Authentication
- Users
- Vendors
- Categories
- Products
- Cart
- Orders
- Payments
- Analytics
- Admin

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Role-Based Access Control
- Rate Limiting
- Protected Routes
- Input Validation
- Error Handling

---

# 📈 Future Improvements

- Wishlist
- Coupons & Discounts
- Multi-language Support
- AI Product Recommendation
- Real-Time Notifications
- Live Chat
- Inventory Forecasting
- Mobile Application

---

# 📄 License

This project is licensed under the **MIT License**.

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

Happy Coding! 🚀
