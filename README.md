# Uzhaipu (உழைப்பு) — Managed Tech Service & Project Execution Platform

**Uzhaipu** is a modern, enterprise-grade full-stack managed technology services platform and project marketplace.

Unlike traditional unmanaged bidding portals where clients sift through hundreds of automated spam bids and risk unverified code quality, Uzhaipu operates on a **strictly two-role model** (`USER` and `ADMIN`). The platform **Admin** acts as the dedicated technical lead and delivery manager directly coordinating architecture, quotations, milestones, and delivery with the client.

---

## 🌟 Key Features

- **Strict 2-Role System**: Clean separation between **Client (`USER`)** and **Technical Lead (`ADMIN`)**.
- **Multi-Language Support (i18n)**: Instant language switching with localized typography for:
  - 🇺🇸 English (`en`)
  - 🇮🇳 தமிழ் - Tamil (`ta`) with `Noto Sans Tamil`
  - 🇮🇳 हिन्दी - Hindi (`hi`) with `Noto Sans Devanagari`
  - 🇪🇸 Español - Spanish (`es`)
  - 🇫🇷 Français - French (`fr`)
  - 🇩🇪 Deutsch - German (`de`)
  - 🇸🇦 العربية - Arabic (`ar` with automatic RTL text direction)
- **Multi-Step Project Posting Wizard**: Select service types (**Build**, **Support**, **Maintenance**, **Bug Fix**, **Improvement**, **Consulting**, or **Other**), attach files safely, set budgets, and define target deadlines.
- **Interactive Quotation Builder**: Admin constructs transparent, itemized line-item proposals with auto-calculated subtotals, taxes, discounts, and expiration dates.
- **Automated Contracts & Milestones**: Accepting a quotation automatically generates a digital contract and milestone schedule.
- **Escrow-Protected Payments**: Milestone-based disbursements released only after client review and sign-off.
- **Real-Time Project Workspaces**: 1-on-1 direct messaging, attachment sharing, task checklists, and live progress tracking.
- **Light & Dark Theme Engine**: Complete theme synchronization with CSS custom properties and smooth transitions.

---

## 🚀 Technology Stack

### Frontend
- **Framework**: React 19, Vite
- **Styling**: Tailwind CSS v4 with custom design tokens, glassmorphism, responsive breakpoints, and micro-animations
- **Typography**: Google Fonts (`Inter`, `Noto Sans Tamil`, `Noto Sans Devanagari`)
- **Routing**: React Router 7
- **Networking**: Axios with centralized JWT interceptors
- **Icons**: Lucide React + Custom Brand SVGs
- **Analytics & Telemetry**: Recharts
- **State Management & Contexts**:
  - `AuthContext` (JWT session management)
  - `ThemeContext` (Light / Dark mode)
  - `LanguageContext` (Multi-language i18n)
  - `NotificationContext` (In-app alerts)

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MySQL with `mysql2/promise` connection pooling
- **Security & Auth**: JWT (`jsonwebtoken`), `bcryptjs` password hashing, `helmet`, `cors`, `express-rate-limit`
- **Validation**: `express-validator`
- **File Uploads**: `multer` with MIME type filtering and secure directory routing

---

## 👥 Role Architecture (Strict 2-Role Model)

### 1. USER (Client / Customer)
- Self-registration with automatic country and currency mapping
- Profile management with completeness scoring
- Post projects across 7 service categories with file uploads
- Review proposals & quotations (Accept / Reject with feedback / Ask question)
- Contract & milestone tracking with live progress indicators
- Direct messaging with the Technical Lead
- Milestone deliverable review & escrow payment release
- 5-Star rating & review submission upon project completion

### 2. ADMIN (Platform Technical Lead & Operations)
- Executive analytics dashboard with revenue charts and service breakdowns
- Project request queue & diagnostic review
- Itemized quotation builder (line-item scope, unit prices, tax, discounts)
- Automatic contract and milestone generation upon quote acceptance
- Milestone deliverable submissions with staging links and notes
- Task checklists management
- Client user directory management (View, Suspend, Activate)
- System classifications CRUD (Categories, Skills, Countries)
- Inbound contact & RFP inquiry management

---

## 🗄️ Database Tables (20 Relational Tables)

The database schema (`database/schema.sql`) implements full relational integrity in MySQL:

| # | Table Name | Purpose |
|---|---|---|
| 1 | `countries` | Global jurisdictions, ISO codes, phone prefixes, currency symbols |
| 2 | `users` | Secure authentication with strictly enforced ENUM role (`user`, `admin`) |
| 3 | `user_profiles` | Client company name, city, state, bio, completeness percentage |
| 4 | `categories` | Project domains (Web, Mobile, Cloud, Maintenance, UI/UX, etc.) |
| 5 | `skills` | Technology registry (React, Node.js, AWS, Docker, Python, etc.) |
| 6 | `projects` | Project requests, types, budgets, statuses, progress percentages |
| 7 | `project_skills` | Many-to-many relationship between projects and technologies |
| 8 | `project_files` | Uploaded wireframes, PDFs, docs, ZIPs, and architecture diagrams |
| 9 | `quotations` | Official technical proposals with validity dates and pricing |
| 10 | `quotation_items` | Itemized billable deliverables and unit prices |
| 11 | `contracts` | Formal contracts generated automatically upon quote acceptance |
| 12 | `milestones` | Delivery phases, target due dates, and client approval statuses |
| 13 | `tasks` | Actionable checklist items inside milestones |
| 14 | `messages` | Direct client-to-admin workspace messages and attachments |
| 15 | `notifications` | In-app alerts for quote arrivals, milestone updates, and alerts |
| 16 | `payments` | Milestone payment tracking and platform escrow records |
| 17 | `transactions` | Financial audit ledger for completed disbursements |
| 18 | `reviews` | Client ratings (1-5 stars) and feedback on completed projects |
| 19 | `contact_messages` | Public contact inquiry form submissions and RFPs |
| 20 | `reports` | Administrative telemetry and analytics snapshots |

---

## 🔑 User Roles & Access

The platform provides two primary access roles:

| Role | Default Account Identifier | Access Capabilities |
|---|---|---|
| **Administrator** | `admin@uzhaipu.dev` | Control center, Quotation builder, Milestone management, User controls, Reports |
| **Client (User)** | `user@uzhaipu.dev` | Client dashboard, Post projects, Accept quotes, Approve milestones, Reviews |
| **Client 2 (Sarah)** | `sarah.chen@fintechpulse.com` | Completed project showcase with 5-star rating |

> 💡 **Login Autofill**: On the development Sign In page (`/login`), click the **"Demo Admin"** or **"Demo Client"** button to automatically populate credentials.

---

## ⚙️ Environment Configuration

### Backend (`server/.env`)
Create a `.env` file in the `server` directory based on `.env.example`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=uzhaipu_db

# Security & JWT
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRES_IN=7d

# File Upload Settings
MAX_FILE_SIZE_MB=15
UPLOAD_PATH=./uploads
```

### Centralized Site Config (`client/src/config/siteConfig.js`)
All public branding, support emails, and social links are managed centrally:
- `client/src/config/siteConfig.js`

---

## 🛠️ Installation & Quick Start

1. **Install Dependencies**:
   ```bash
   # In root
   cd server && npm install
   cd ../client && npm install
   ```

2. **Database Initialization & Seeding**:
   ```bash
   cd server
   node src/scripts/initDb.js
   node src/scripts/seedDb.js
   ```

3. **Start Backend Server**:
   ```bash
   cd server
   npm run dev
   # 🚀 Uzhaipu Server running on http://localhost:5000
   ```

4. **Start Frontend Client**:
   ```bash
   cd client
   npm run dev
   # 🚀 Client running on http://localhost:5173 (or http://localhost:5174)
   ```

---

## 🔄 Core Business Workflow

```
Client Registers with Country & Currency
       │
       ▼
Posts Technical Project (Build, Support, Maintenance, Bug Fix, Improvement, Consulting, Other)
       │
       ▼
Admin Receives Project in Review Queue & Discusses via Workspace Chat
       │
       ▼
Admin Prepares Line-Item Quotation with Subtotal, Tax, Discount & Total
       │
       ▼
Client Receives Notification & Reviews Proposal
       │
       ▼
Client Accepts Quotation ──► Automatic Contract & Milestones Generated
       │
       ▼
Admin Executes Development & Submits Deliverable Notes
       │
       ▼
Client Reviews Staging & Approves Milestone ──► Escrow Payment Settled
       │
       ▼
All Milestones Completed ──► Project Marked Complete ──► Client Rates & Reviews Uzhaipu
```

---

## 📄 License
MIT License © 2026 **Uzhaipu**. All rights reserved.
