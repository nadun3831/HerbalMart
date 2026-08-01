# Product Requirements Document

# HerbalMart — Herbal Products E-Commerce Platform

**Version:** 1.0
**Date:** August 2026
**Tech Stack:** React.js (Frontend) + Laravel (Backend API) + MySQL

---

## 1. Executive Summary

HerbalMart is a web-based e-commerce platform built to sell herbal / ayurvedic products online. The platform gives administrators full control over the product catalog and gives them visibility into how products are performing (sales, stock, revenue). Customers can browse herbal products, view detailed product information, receive and see discounts on their dashboard, and purchase products online.

This document defines the scope, features, technical architecture and implementation plan for building the platform using React.js on the frontend and Laravel (PHP) as the backend REST API, with MySQL as the database.

---

## 2. Goals & Objectives

- Build an online store for herbal / ayurvedic / natural products.
- Give admins complete control to add, edit, remove and organize products.
- Give admins a sales dashboard so they can see which products sell well, revenue, and stock levels.
- Allow admins to create discounts / promotions on products or categories.
- Show active discounts to customers on their personal dashboard so they know what offers apply to them.
- Let customers browse, search and view detailed product information (ingredients, usage, benefits, price, stock).
- Provide a smooth cart & checkout flow so customers can purchase products online.
- Build a scalable, secure, mobile-responsive platform using React + Laravel.

---

## 3. User Roles

### 3.1 Administrator
Manages the entire store: products, categories, stock, discounts, orders, and views sales analytics.

### 3.2 Customer
Registers/logs in, browses herbal products, views product details, adds items to cart, applies/receives discounts, checks out, and tracks orders through a personal dashboard.

### 3.3 (Optional, future) Staff / Delivery Coordinator
A limited-permission role that can view and update order/delivery status without full admin access. Recommended for Phase 2+.

---

## 4. Functional Requirements

### 4.1 Admin Module

#### 4.1.1 Product Management
- Add new herbal products with: name, category, description, ingredients, usage instructions, health benefits, price, discount price, stock quantity, unit (e.g. 100g, 250ml), SKU, and multiple product images.
- Edit / update existing product details and images.
- Delete or deactivate (soft-disable) a product without losing historical order data.
- Organize products into categories & sub-categories (e.g. Herbal Teas, Oils, Powders, Capsules, Skin Care).
- Manage stock levels; low-stock alerts/notifications.
- Bulk import/export products via CSV (recommended for Phase 2).

#### 4.1.2 Sales & Product Performance Dashboard
This is the admin's idea of "how the products are selling" — a visual analytics dashboard.
- Overview cards: total revenue, total orders, total customers, total products sold (daily/weekly/monthly/custom range).
- Best-selling products list (top 10 by quantity sold and by revenue).
- Low-performing / slow-moving products list.
- Sales trend chart (line/bar chart) over time.
- Sales breakdown by category.
- Stock vs. sales report — helps decide restocking.
- Discount performance — which discounts drove the most orders/revenue.
- Order status summary (pending, processing, shipped, delivered, cancelled, returned).

#### 4.1.3 Discount / Promotion Management
- Create discounts at product level (e.g. 20% off a specific herbal oil) or category level (e.g. 15% off all teas).
- Discount types: percentage (%) or fixed amount (Rs.).
- Set discount start date & end date (auto-activate / auto-expire).
- Optional coupon codes customers can apply at checkout, in addition to automatic discounts.
- Set minimum purchase amount / usage limits for a discount (optional, Phase 2).
- Enable/disable a discount at any time.
- Discounts must automatically reflect on: the product listing, the product detail page, the cart, and the customer dashboard.

#### 4.1.4 Order & Customer Management
- View and update order status (pending → processing → shipped → delivered).
- View customer list, order history, and basic customer details.
- View/respond to returns or cancellations (Phase 2).

### 4.2 Customer Module

#### 4.2.1 Product Browsing & Details
- Home page showing featured herbal products, categories, and active promotions/discount banners.
- Product listing page with search, filter (category, price range, discount) and sort (price, popularity, newest).
- Product detail page: images, description, ingredients, usage instructions, health benefits, price, discounted price (if any), stock availability, and customer reviews (Phase 2).

#### 4.2.2 Cart & Checkout
- Add to cart / update quantity / remove from cart.
- Cart automatically applies any active product/category discount and shows original price (strikethrough) vs. discounted price.
- Apply a coupon code at checkout, if applicable.
- Checkout with delivery address and payment method (COD initially; online payment gateway e.g. PayHere/Stripe in a later phase).
- Order confirmation and email/SMS notification.

#### 4.2.3 Customer Dashboard
A logged-in area for the customer with the following sections:
- **My Discounts / Offers** — a clear list of currently active discounts and coupon codes the customer can use, with product/category and expiry date.
- **My Orders** — order history with status tracking.
- **My Profile** — manage name, address, contact details, password.
- **Wishlist / Saved items** (Phase 2).
- Order tracking detail view for each order.

---

## 5. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Product listing pages should load within 2 seconds under normal load. |
| Security | Passwords hashed (bcrypt), Laravel Sanctum/JWT for API auth, HTTPS everywhere, role-based access control (admin vs customer). |
| Scalability | REST API architecture allows scaling frontend and backend independently; supports future mobile app using the same API. |
| Responsiveness | Fully responsive UI — usable on desktop, tablet and mobile. |
| Availability | Target 99.5% uptime; automated DB backups. |
| Usability | Simple, clean UI; herbal/natural brand feel; minimal steps to checkout. |
| Maintainability | Clear API documentation, modular Laravel structure (Controllers, Services, Requests), reusable React components. |

---

## 6. Proposed Technical Architecture

### 6.1 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router, Redux Toolkit / Context API, Axios, TailwindCSS |
| Backend API | Laravel 11 (PHP), Laravel Sanctum for auth, RESTful API |
| Database | MySQL |
| File/Image Storage | Laravel filesystem (local for MVP) → S3-compatible storage for production |
| Admin & Customer Dashboards | Both built as React apps consuming the same Laravel API (separate route guards by role) |
| Charts (Admin Analytics) | Chart.js or Recharts (React) |
| Payment (later phase) | PayHere / Stripe integration |
| Hosting | Backend: VPS or cloud (e.g. DigitalOcean/AWS). Frontend: Vercel/Netlify or same server |

### 6.2 High-Level Architecture Flow
- React SPA (Customer site) → calls → Laravel REST API → MySQL Database
- React SPA (Admin panel) → calls → Laravel REST API (protected admin routes) → MySQL Database
- Laravel handles: authentication, product/discount business logic, order processing, and exposes JSON APIs consumed by both React apps.

### 6.3 Core Database Tables (indicative)

| Table | Key Fields |
|---|---|
| users | id, name, email, password, role (admin/customer), phone, address |
| categories | id, name, slug, parent_id |
| products | id, category_id, name, slug, description, ingredients, usage_info, price, stock_qty, sku, status |
| product_images | id, product_id, image_path, is_primary |
| discounts | id, name, type (percentage/fixed), value, coupon_code, start_date, end_date, status |
| discount_products | discount_id, product_id (or category_id — many-to-many) |
| orders | id, user_id, total_amount, discount_amount, status, delivery_address, payment_method |
| order_items | id, order_id, product_id, quantity, unit_price, discount_applied |
| carts / cart_items | id, user_id, product_id, quantity |

### 6.4 Sample Key API Endpoints

| Method & Endpoint | Purpose |
|---|---|
| POST /api/register, /api/login | Customer & admin authentication |
| GET /api/products, /api/products/{id} | Public product listing & detail |
| POST /api/admin/products | Admin: create product |
| PUT /api/admin/products/{id} | Admin: update product |
| DELETE /api/admin/products/{id} | Admin: delete/deactivate product |
| GET /api/admin/dashboard/stats | Admin: sales & performance analytics |
| POST /api/admin/discounts | Admin: create discount |
| GET /api/customer/discounts | Customer: active discounts for dashboard |
| POST /api/cart, /api/checkout | Customer: cart & order placement |
| GET /api/customer/orders | Customer: order history |

---

## 7. Implementation Plan

Recommended phased delivery — approx. 10–12 weeks for MVP, assuming a small team (1 backend / Laravel developer, 1 frontend / React developer, part-time UI/UX).

### Phase 0 — Planning & Design (Week 1)
- Finalize requirements (this PRD), wireframes for admin panel & customer site.
- Database schema design & ER diagram.
- API contract design (endpoints, request/response shapes).
- UI design system (herbal/green brand theme, components) in Figma.

### Phase 1 — Core Backend Setup (Weeks 2–3)
- Laravel project setup, authentication (Sanctum), role middleware (admin/customer).
- Database migrations & seeders for products, categories, users.
- Product CRUD API + image upload.
- Category CRUD API.

### Phase 2 — Core Frontend Setup (Weeks 3–4, parallel)
- React project setup, routing, shared component library, Tailwind theme.
- Customer-facing product listing & product detail pages wired to API.
- Admin panel shell with authentication & protected routes.

### Phase 3 — Admin Product & Sales Dashboard (Weeks 5–6)
- Admin product management UI (add/edit/delete products, manage stock).
- Sales analytics API (aggregation queries) + admin dashboard UI with charts (revenue, best sellers, stock vs sales).

### Phase 4 — Discount Engine (Weeks 6–7)
- Discount CRUD API (product-level & category-level, date-based activation).
- Apply-discount logic in product listing, product detail, and cart/checkout pricing.
- Customer dashboard "My Discounts" section.

### Phase 5 — Cart, Checkout & Customer Dashboard (Weeks 7–9)
- Cart management (add/update/remove, persisted per user).
- Checkout flow, order creation, order confirmation.
- Customer dashboard: order history, order tracking, profile management.

### Phase 6 — Testing, QA & Deployment (Weeks 10–11)
- Functional testing (admin flows, customer flows, discount edge cases).
- Performance & security review (auth, input validation, rate limiting).
- Deploy backend (VPS/cloud) & frontend (Vercel/Netlify or same server), configure domain, HTTPS.

### Phase 7 — Launch & Iteration (Week 12+)
- Soft launch, monitor real orders & analytics.
- Collect feedback, fix bugs.
- Plan Phase 2 features: reviews/ratings, wishlist, online payment gateway, CSV bulk import, staff role, SMS/email notifications.

### 7.1 Milestone Summary

| Milestone | Target Week | Deliverable |
|---|---|---|
| M1 | Week 1 | Approved PRD, wireframes, DB schema |
| M2 | Week 4 | Working product catalog (admin + customer, no discounts/checkout yet) |
| M3 | Week 6 | Admin sales dashboard live |
| M4 | Week 7 | Discount engine live end-to-end |
| M5 | Week 9 | Full cart/checkout + customer dashboard |
| M6 | Week 11 | QA complete, deployed to production |
| M7 | Week 12 | Public launch |

---

## 8. Success Metrics (KPIs)
- Number of active products listed and % of products with complete details/images.
- Monthly revenue and order count growth.
- Discount redemption rate (orders using a discount / total orders).
- Cart-to-checkout conversion rate.
- Average order value (AOV).
- Admin time saved managing products vs. previous manual process.

---

## 9. Risks & Assumptions
- Assumption: initial payment method is Cash on Delivery (COD); online payment gateway added in a later phase.
- Assumption: single-language (Sinhala/English) UI is acceptable for MVP; multi-language can be added later.
- Risk: discount rules can get complex (stacking coupons + product discounts) — MVP scope limits to one active discount type per product to avoid conflicts.
- Risk: image storage on local disk won't scale — plan migration to cloud storage (S3-compatible) before high traffic.
- Dependency: hosting, domain, and payment gateway account access must be provided by the business owner before Phase 6.

---

## 10. Next Steps
1. Review and approve this PRD.
2. Approve UI wireframes/design system.
3. Confirm hosting & domain details.
4. Kick off Phase 0 (planning & design).
