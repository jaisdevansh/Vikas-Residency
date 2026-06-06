# 🏨 Vikas Residency — Varanasi Premium Homestay App

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20Express-green?style=for-the-badge&logo=node.js)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Neon-cyan?style=for-the-badge&logo=postgresql)](https://neon.tech/)

A modern, highly responsive, and premium web application built for **Vikas Residency**, a deluxe homestay located in the spiritual heart of India — **Varanasi**. This application features an immersive guest experience portal, real-time booking integrations, and a robust admin dashboard for properties, reviews, galleries, blogs, and room management.

---

## 🌟 Key Features

### 🌐 Public Guest Experience
* **Immersive Design:** Elegant typography, curated color palettes, smooth scroll animations powered by `framer-motion`, and high-quality image/video galleries.
* **Interactive Room Details:** Complete information, features checklist, price calculations, and media slides for premium Ganga-view rooms, deluxe suites, and budget options.
* **Dynamic Booking Form:** No upfront credit card details required to reserve a room, bringing user trust and high-conversion leads.
* **Travel Diary (Blog):** Curated local insider tips (top ghats to visit, food maps, Kashi Vishwanath Darshan guides) to enhance guests' stays.
* **SEO Optimized:** Built-in SEO metadata configurations, descriptive page titles, semantic HTML, and dynamic routes.

### 🛡️ Admin Management Portal
* **Dashboard Overview:** Comprehensive stats for bookings, active rooms, and pending actions.
* **Rooms Manager:** Add, edit, or remove room configurations, pricing structures, and feature lists.
* **Bookings Tracker:** View customer booking requests, status tracking, and guest contact details.
* **Interactive Gallery Admin:** Upload, view, or delete images showcased in the gallery grid.
* **Reviews Hub:** Moderate guest reviews, verify guest experiences, and control what shows up on the homepage.
* **Secure Auth:** JWT-secured dashboard access to protect administration operations.

---

## 🏗️ Architecture Overview

The project is structured as a monorepo containing:
1. `frontend/` — Built on **Next.js 16 (App Router)** & **React 19** with Tailwind CSS styling and type-safe components.
2. `backend/` — Built on **Express.js (Node.js)** with TypeScript, featuring a RESTful API structure, Zod request validation, Winston logging, and Neon Serverless PostgreSQL.

```
vikas-residency/
├── frontend/             # Next.js App Router Frontend
│   ├── src/
│   │   ├── app/          # Pages, Routing & API proxies
│   │   ├── components/   # UI elements & custom page sections
│   │   ├── context/      # Theme providers & performance contexts
│   │   └── lib/          # Utilities
│   └── public/           # Static assets (images, videos)
└── backend/              # Node/Express API Backend
    ├── src/
    │   ├── controllers/  # API business logic handlers
    │   ├── routes/       # Express route controllers
    │   ├── services/     # DB queries and business layer
    │   └── middlewares/  # JWT Auth, Validation, & Error handling
    └── data/             # Mock/JSON fallbacks
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended) along with `npm`.

### 1. Set Up the Backend
Navigate to the `backend/` folder:
```bash
cd backend
npm install
```

Configure the environment variables by creating a `.env` file in the `backend/` directory:
```env
PORT=5000
DATABASE_URL=your_postgresql_neon_connection_string
JWT_SECRET=your_jwt_signing_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

Run the development server:
```bash
npm run dev
```
The API server will launch at `http://localhost:5000`.

---

### 2. Set Up the Frontend
Navigate to the `frontend/` folder:
```bash
cd ../frontend
npm install
```

Configure the environment variables by creating a `.env` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BACKEND_URL=http://localhost:5000
JWT_SECRET=your_jwt_signing_secret
```

Validate and run the frontend:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧪 Development Commands

| Directory | Command | Description |
| :--- | :--- | :--- |
| **Backend** | `npm run dev` | Runs the Express API with hot-reloading (`tsx watch`). |
| **Backend** | `npm run build` | Compiles TypeScript files into JS inside the `dist/` directory. |
| **Backend** | `npm start` | Launches the compiled production backend server. |
| **Frontend** | `npm run dev` | Launches the Next.js development server. |
| **Frontend** | `npm run build` | Builds the production Next.js optimized bundle. |
| **Frontend** | `npx tsc --noEmit` | Runs strict type checking on the Next.js codebase. |

---

## 🔒 Security Practices
* **Rate Limiting:** Protects backend endpoints from brute-force/DDoS requests using `express-rate-limit`.
* **Helmet Security:** Automatically configures essential HTTP response headers to defend against script injections and sniff attacks.
* **CORS Settings:** Strictly configured to allow designated frontend origins only.
* **Input Validation:** Every payload is sanitized and validated through `zod` schemas prior to database operations.

---

## 📝 License
This project is proprietary and custom-designed for Vikas Residency. All rights reserved.
