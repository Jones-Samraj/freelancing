# WorkForge — Managed Tech Service & Freelancing Platform

**WorkForge** is a full-stack, enterprise-grade managed technology services and freelancing marketplace.

Unlike traditional peer-to-peer bidding marketplaces with freelance spam and quality disputes, WorkForge operates on a **strictly two-role model** (`USER` and `ADMIN`). The platform **Admin** acts as the dedicated technical lead and delivery manager directly coordinating execution with the client.

---

## 🚀 Technology Stack

### Frontend
- **Framework**: React 19, Vite
- **Styling**: Vanilla Tailwind CSS with custom design system, glassmorphism, and dark/light mode engine
- **Routing**: React Router 7
- **Networking**: Axios with automatic JWT interceptors
- **Icons**: Lucide React
- **Analytics & Telemetry**: Recharts
- **State & Context**: `AuthContext`, `ThemeContext`, `NotificationContext`

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MySQL with `mysql2/promise` connection pooling
- **Security & Auth**: JWT (`jsonwebtoken`), `bcryptjs` password hashing, `helmet`, `cors`, `express-rate-limit`
- **Validation**: `express-validator`
- **File Uploads**: `multer` with MIME type enforcement and dedicated directory routing

---

## 👥 Role Architecture (Strict 2-Role System)

1. **USER (Client / Customer)**
   - Self-registration with country and currency mapping
   - Profile management & completeness scoring
   - Multi-step project wizard (Build, Support, Maintenance, Bug Fix, Improvement, Consulting, Other)
   - Quotation review (Accept / Decline with feedback / Ask question)
   - Contract & Milestone tracking with progress bars
   - Direct 1-on-1 messaging with WorkForge Admin
   - Milestone deliverable review & escrow payment approval
   - 5-Star rating & review submission upon project completion

2. **ADMIN (Platform Manager & Technical Lead)**
   - Comprehensive telemetry dashboard with Recharts revenue and category distribution
   - Review project requests queue
   - Interactive line-item quotation builder (auto-calculates subtotals, tax, discounts, and grand totals)
   - Automatic contract & milestone generation upon quotation acceptance
   - Milestone submission with deliverable links & staging notes
   - Task checklists management
   - Client user management (View, Suspend, Activate)
   - Platform classifications CRUD (Categories, Skills, Countries)
   - Contact form RFP inquiry management

---

## 🗄️ Database Tables (20 Relational Tables)

The database schema (`database/schema.sql`) implements complete relational integrity in MySQL:

| # | Table Name | Purpose |
|---|---|---|
| 1 | `countries` | Global jurisdictions, ISO codes, phone prefixes, currency symbols |
| 2 | `users` | Secure authentication table with strictly enforced ENUM role (`user`, `admin`) |
| 3 | `user_profiles` | Client company name, city, state, bio, completeness percentage |
| 4 | `categories` | Project domains (Web, Mobile, Cloud, Maintenance, UI/UX, etc.) |
| 5 | `skills` | Technology registry (React, Node.js, AWS, Docker, Python, etc.) |
| 6 | `projects` | Project requests, types, budgets, statuses, progress percentages |
| 7 | `project_skills` | Many-to-many link between projects and required technologies |
| 8 | `project_files` | Uploaded wireframes, PDFs, docs, ZIPs, and architecture diagrams |
| 9 | `quotations` | Official technical proposals with validity dates and pricing |
| 10 | `quotation_items` | Itemized billable deliverables and unit prices |
| 11 | `contracts` | Formal contracts generated automatically upon quotation acceptance |
| 12 | `milestones` | Delivery phases, target due dates, and client approval statuses |
| 13 | `tasks` | Actionable checklist items inside milestones |
| 14 | `messages` | Direct client-to-admin project workspace messages and attachments |
| 15 | `notifications` | In-app alerts for quote arrivals, milestone submissions, and status changes |
| 16 | `payments` | Milestone payment tracking and platform escrow records |
| 17 | `transactions` | Financial audit ledger for completed disbursements |
| 18 | `reviews` | Client ratings (1-5 stars) and feedback on completed projects |
| 19 | `contact_messages` | Public contact inquiry form submissions and RFPs |
| 20 | `reports` | Administrative telemetry and summary snapshots |

---

## 🔑 Demo Accounts

Use these development credentials to access the platform:

| Role | Email | Password | Access Capabilities |
|---|---|---|---|
| **Administrator** | `admin@workforge.dev` | `Admin@123` | Control center, Quotation builder, Milestone management, User controls, Reports |
| **Client (User)** | `user@workforge.dev` | `User@123` | Client dashboard, Post projects, Accept quotes, Approve milestones, Reviews |
| **Client 2 (Sarah)** | `sarah.chen@fintechpulse.com` | `Client@123` | Completed project showcase with 5-star rating |

---

## ⚙️ Configuration & Ports

### Backend (`server/.env`)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5174

DB_HOST=127.0.0.1
DB_PORT=3307
DB_USER=root
DB_PASSWORD=Sam@2028
DB_NAME=freelancing

JWT_SECRET=workforge_jwt_super_secure_secret_key_2026_!@#
JWT_EXPIRES_IN=7d
```

### Centralized Site Config (`client/src/config/siteConfig.js`)
All public branding, support emails, and social links are managed in a single file without hardcoded personal info:
- `client/src/config/siteConfig.js`

---

## 🛠️ Running the Platform

1. **Database Initialization & Seeding**:
   ```bash
   cd server
   node src/scripts/initDb.js
   node src/scripts/seedDb.js
   ```

2. **Start Backend Server**:
   ```bash
   cd server
   node src/server.js
   # Running on http://localhost:5000
   ```

3. **Start Frontend Client**:
   ```bash
   cd client
   npm run dev
   # Running on http://localhost:5174
   ```

---

## 🔄 Core Business Workflow Walkthrough

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
All Milestones Completed ──► Project Marked Complete ──► Client Rates & Reviews WorkForge
```
