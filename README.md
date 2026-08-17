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
