import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function seed() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'workforge_db';

  console.log(`Connecting to database ${database}...`);
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
    multipleStatements: true
  });

  try {
    // 1. Run seed.sql for Countries, Categories, Skills
    const seedSqlPath = path.join(__dirname, '../../../database/seed.sql');
    if (fs.existsSync(seedSqlPath)) {
      const seedSql = fs.readFileSync(seedSqlPath, 'utf8');
      await connection.query(seedSql);
      console.log('Seeded Countries, Categories, and Skills.');
    }

    // 2. Hash passwords
    const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
    const userPasswordHash = await bcrypt.hash('User@123', 10);

    // 3. Seed Admin User
    await connection.query(`
      INSERT INTO users (id, name, email, password, role, country_id, phone, email_verified, status)
      VALUES (1, 'WorkForge Admin', 'admin@workforge.dev', ?, 'admin', 1, '+1 (555) 019-2834', TRUE, 'active')
      ON DUPLICATE KEY UPDATE name=VALUES(name), password=VALUES(password), role='admin', email_verified=TRUE, status='active';
    `, [adminPasswordHash]);

    // Admin Profile
    await connection.query(`
      INSERT INTO user_profiles (user_id, display_name, bio, company_name, company_website, phone, city, state, timezone, profile_completion)
      VALUES (1, 'Lead Service Operations', 'Official WorkForge Technical Management and Delivery Lead.', 'WorkForge Global Inc.', 'https://workforge.dev', '+1 (555) 019-2834', 'San Francisco', 'California', 'America/Los_Angeles', 100)
      ON DUPLICATE KEY UPDATE display_name=VALUES(display_name), bio=VALUES(bio);
    `);

    // 4. Seed Demo Client User
    await connection.query(`
      INSERT INTO users (id, name, email, password, role, country_id, phone, email_verified, status)
      VALUES (2, 'Jones Samraj', 'user@workforge.dev', ?, 'user', 2, '+91 98765 43210', TRUE, 'active')
      ON DUPLICATE KEY UPDATE name=VALUES(name), password=VALUES(password), role='user', email_verified=TRUE, status='active';
    `, [userPasswordHash]);

    // User Profile
    await connection.query(`
      INSERT INTO user_profiles (user_id, display_name, bio, company_name, company_website, phone, city, state, timezone, profile_completion)
      VALUES (2, 'Jones Samraj', 'Product Director at InnovateX Technologies. Looking for expert developers for high-impact web and mobile applications.', 'InnovateX Labs', 'https://innovatex.io', '+91 98765 43210', 'Bengaluru', 'Karnataka', 'Asia/Kolkata', 90)
      ON DUPLICATE KEY UPDATE display_name=VALUES(display_name), bio=VALUES(bio), company_name=VALUES(company_name);
    `);

    // 5. Seed Demo Client 2 for variety
    const client2PasswordHash = await bcrypt.hash('Client@123', 10);
    await connection.query(`
      INSERT INTO users (id, name, email, password, role, country_id, phone, email_verified, status)
      VALUES (3, 'Sarah Chen', 'sarah.chen@fintechpulse.com', ?, 'user', 7, '+65 9123 4567', TRUE, 'active')
      ON DUPLICATE KEY UPDATE name=VALUES(name), password=VALUES(password), role='user';
    `, [client2PasswordHash]);

    await connection.query(`
      INSERT INTO user_profiles (user_id, display_name, bio, company_name, company_website, phone, city, state, timezone, profile_completion)
      VALUES (3, 'Sarah Chen', 'CTO at FinTech Pulse Singapore. We build institutional DeFi analytics and high-frequency trading dashboards.', 'FinTech Pulse Pte Ltd', 'https://fintechpulse.sg', '+65 9123 4567', 'Singapore', 'Central', 'Asia/Singapore', 85)
      ON DUPLICATE KEY UPDATE display_name=VALUES(display_name);
    `);

    // 6. Seed Projects
    // Project 1: Build E-Commerce Platform (In Progress with Contract and Milestones)
    await connection.query(`
      INSERT INTO projects (id, user_id, category_id, title, project_type, description, requirements, budget_type, budget_min, budget_max, currency, duration, location_type, country_id, status, priority, progress_percentage, admin_notes)
      VALUES (
        1, 2, 1, 
        'Enterprise Multi-Vendor E-Commerce Platform', 
        'build', 
        'We require a high-throughput multi-vendor marketplace with real-time inventory synchronization, Stripe Connect split payments, and comprehensive analytics dashboard.',
        'Requirements:\n- React 19 + Tailwind CSS frontend\n- Node.js/Express backend with Redis caching\n- MySQL relational inventory database\n- Stripe Connect & Webhooks\n- Admin & Vendor role panels',
        'fixed', 8000.00, 12000.00, 'USD', '8 Weeks', 'remote', 2, 'in_progress', 'high', 60,
        'Client requirements verified. Quotation approved. Milestone 1 and 2 completed. Currently in Development for Milestone 3.'
      )
      ON DUPLICATE KEY UPDATE title=VALUES(title), status=VALUES(status);
    `);

    // Skills for Project 1
    await connection.query(`
      INSERT INTO project_skills (project_id, skill_id) VALUES (1, 1), (1, 2), (1, 14), (1, 17), (1, 18)
      ON DUPLICATE KEY UPDATE skill_id=VALUES(skill_id);
    `);

    // Project 2: Bug Fix (Quotation Sent)
    await connection.query(`
      INSERT INTO projects (id, user_id, category_id, title, project_type, description, requirements, budget_type, budget_min, budget_max, currency, duration, location_type, country_id, status, priority, progress_percentage, admin_notes)
      VALUES (
        2, 2, 6, 
        'Production Memory Leak & High Latency Fix in Node.js API', 
        'bug_fix', 
        'Our primary auth and checkout API experiences memory creep under 5,000 req/sec, causing 504 Gateway Timeouts during peak sale hours.',
        'Deliverables:\n- Memory heap dump analysis\n- Query optimization and connection leak fix\n- Load test verification (5,000+ rps with <150ms p99)',
        'fixed', 1500.00, 2500.00, 'USD', '1 Week', 'remote', 2, 'quotation_sent', 'urgent', 15,
        'Diagnostic analysis complete. Prepared official quotation for expedited 5-day resolution.'
      )
      ON DUPLICATE KEY UPDATE title=VALUES(title), status=VALUES(status);
    `);

    // Skills for Project 2
    await connection.query(`
      INSERT INTO project_skills (project_id, skill_id) VALUES (2, 2), (2, 14), (2, 22)
      ON DUPLICATE KEY UPDATE skill_id=VALUES(skill_id);
    `);

    // Project 3: Cloud Consulting (Submitted / Under Review)
    await connection.query(`
      INSERT INTO projects (id, user_id, category_id, title, project_type, description, requirements, budget_type, budget_min, budget_max, currency, duration, location_type, country_id, status, priority, progress_percentage)
      VALUES (
        3, 2, 3, 
        'AWS Multi-Region Kubernetes & Disaster Recovery Architecture', 
        'consulting', 
        'We need an enterprise cloud architecture blueprint and terraform infrastructure for active-active failover across us-east-1 and eu-west-1.',
        'Deliverables:\n- Architecture diagrams & AWS Well-Architected Review\n- Terraform EKS multi-cluster blueprints\n- Route53 latency routing and RDS cross-region replication config',
        'fixed', 4000.00, 6000.00, 'USD', '3 Weeks', 'remote', 2, 'submitted', 'medium', 5
      )
      ON DUPLICATE KEY UPDATE title=VALUES(title);
    `);

    // Skills for Project 3
    await connection.query(`
      INSERT INTO project_skills (project_id, skill_id) VALUES (3, 10), (3, 11), (3, 12), (3, 13)
      ON DUPLICATE KEY UPDATE skill_id=VALUES(skill_id);
    `);

    // Project 4: Mobile App for Client 2 (Completed with 5-star Review)
    await connection.query(`
      INSERT INTO projects (id, user_id, category_id, title, project_type, description, requirements, budget_type, budget_min, budget_max, currency, duration, location_type, country_id, status, priority, progress_percentage)
      VALUES (
        4, 3, 2, 
        'Cross-Platform Crypto & Stock Portfolio Tracker', 
        'build', 
        'Full mobile application built in React Native with biometric security, live WebSocket price feeds, and custom Candlestick charts.',
        'Shipped on App Store and Google Play Store with 99.9% crash-free sessions.',
        'fixed', 7500.00, 9500.00, 'USD', '6 Weeks', 'remote', 7, 'completed', 'high', 100
      )
      ON DUPLICATE KEY UPDATE title=VALUES(title), status=VALUES(status);
    `);

    // 7. Seed Quotation for Project 1 (Accepted)
    await connection.query(`
      INSERT INTO quotations (id, project_id, created_by, title, description, subtotal, tax, discount, total, currency, valid_until, status)
      VALUES (
        1, 1, 1, 
        'Comprehensive Quotation: Enterprise E-Commerce Platform',
        'Full execution proposal covering UI/UX architecture, frontend components, backend APIs, Stripe integrations, and cloud deployment.',
        9000.00, 450.00, 450.00, 9000.00, 'USD', DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'accepted'
      )
      ON DUPLICATE KEY UPDATE title=VALUES(title), status=VALUES(status);
    `);

    // Quotation Items for Quote 1
    await connection.query(`
      INSERT INTO quotation_items (id, quotation_id, title, description, quantity, unit_price, total) VALUES
      (1, 1, 'Architecture & Database Design', 'Schema design, ER diagrams, caching architecture, and security specs', 1, 1200.00, 1200.00),
      (2, 1, 'Frontend Development (React 19 & Tailwind)', 'Responsive storefront, vendor portal, cart, and checkout workflows', 1, 3200.00, 3200.00),
      (3, 1, 'Backend API & Payments (Express & Stripe)', 'REST microservices, Stripe Connect webhook processing, and inventory locks', 1, 3000.00, 3000.00),
      (4, 1, 'Automated Testing & Cloud CI/CD', 'Jest unit suites, Cypress e2e, Docker containerization & AWS deployment', 1, 1600.00, 1600.00)
      ON DUPLICATE KEY UPDATE title=VALUES(title);
    `);

    // Seed Quotation for Project 2 (Sent - Pending User Review)
    await connection.query(`
      INSERT INTO quotations (id, project_id, created_by, title, description, subtotal, tax, discount, total, currency, valid_until, status)
      VALUES (
        2, 2, 1, 
        'Emergency Performance & Memory Leak Remediation',
        'Direct diagnostics, query profiling, memory leak patch, and high-load verification benchmark report.',
        1800.00, 90.00, 90.00, 1800.00, 'USD', DATE_ADD(CURDATE(), INTERVAL 14 DAY), 'sent'
      )
      ON DUPLICATE KEY UPDATE title=VALUES(title), status=VALUES(status);
    `);

    await connection.query(`
      INSERT INTO quotation_items (id, quotation_id, title, description, quantity, unit_price, total) VALUES
      (5, 2, 'Diagnostic Heap Profiling & Root Cause Analysis', 'Isolating garbage collection traps and connection pool leaks', 1, 600.00, 600.00),
      (6, 2, 'Core Code & Database Optimization', 'Refactoring query patterns, indices, and Express event handlers', 1, 800.00, 800.00),
      (7, 2, 'High-Concurrency Load Testing & Signed Report', 'Simulating 10,000 rps with k6 and Grafana monitoring', 1, 400.00, 400.00)
      ON DUPLICATE KEY UPDATE title=VALUES(title);
    `);

    // 8. Seed Contract for Project 1
    await connection.query(`
      INSERT INTO contracts (id, project_id, user_id, quotation_id, start_date, expected_end_date, total_amount, currency, status)
      VALUES (
        1, 1, 2, 1,
        DATE_SUB(CURDATE(), INTERVAL 20 DAY), DATE_ADD(CURDATE(), INTERVAL 36 DAY),
        9000.00, 'USD', 'active'
      )
      ON DUPLICATE KEY UPDATE status=VALUES(status);
    `);

    // 9. Seed Milestones for Contract 1
    await connection.query(`
      INSERT INTO milestones (id, contract_id, title, description, amount, due_date, status, submission_notes, completed_at) VALUES
      (1, 1, 'Milestone 1: Architecture & DB Specs', 'Database normalization, authentication flow, and wireframes.', 1200.00, DATE_SUB(CURDATE(), INTERVAL 14 DAY), 'completed', 'Delivered schema diagrams and approved API docs.', DATE_SUB(CURDATE(), INTERVAL 14 DAY)),
      (2, 1, 'Milestone 2: Frontend Storefront & Vendor Hub', 'Complete UI implementation in React & Tailwind with mock datasets.', 3200.00, DATE_SUB(CURDATE(), INTERVAL 5 DAY), 'completed', 'Storefront UI ready and reviewed by client.', DATE_SUB(CURDATE(), INTERVAL 5 DAY)),
      (3, 1, 'Milestone 3: Backend APIs & Stripe Integration', 'Live checkout with test cards, inventory syncing, and webhooks.', 3000.00, DATE_ADD(CURDATE(), INTERVAL 15 DAY), 'in_progress', NULL, NULL),
      (4, 1, 'Milestone 4: QA, Load Testing & Cloud Deployment', 'Comprehensive testing, staging approval, and production cutover.', 1600.00, DATE_ADD(CURDATE(), INTERVAL 35 DAY), 'pending', NULL, NULL)
      ON DUPLICATE KEY UPDATE title=VALUES(title), status=VALUES(status);
    `);

    // Seed Tasks for Milestone 3
    await connection.query(`
      INSERT INTO tasks (id, milestone_id, title, description, status) VALUES
      (1, 3, 'Implement Stripe Connect Split Payments', 'Direct vendor onboarding and platform commission handling', 'in_progress'),
      (2, 3, 'Setup Webhook Idempotency & Queue', 'BullMQ with Redis for resilient payment event ingestion', 'todo'),
      (3, 3, 'Create Order Summary & Invoice Generator', 'Automatic PDF generation on successful payment', 'todo')
      ON DUPLICATE KEY UPDATE title=VALUES(title);
    `);

    // 10. Seed Payments & Transactions
    await connection.query(`
      INSERT INTO payments (id, contract_id, milestone_id, user_id, amount, currency, payment_method, transaction_id, status, paid_at) VALUES
      (1, 1, 1, 2, 1200.00, 'USD', 'Credit Card', 'tx_wf_982341209', 'completed', DATE_SUB(CURDATE(), INTERVAL 14 DAY)),
      (2, 1, 2, 2, 3200.00, 'USD', 'Credit Card', 'tx_wf_982349811', 'completed', DATE_SUB(CURDATE(), INTERVAL 5 DAY)),
      (3, 1, 3, 2, 3000.00, 'USD', 'Credit Card', 'tx_wf_pending_03', 'pending', NULL)
      ON DUPLICATE KEY UPDATE status=VALUES(status);
    `);

    await connection.query(`
      INSERT INTO transactions (id, payment_id, user_id, amount, currency, type, status, reference_id) VALUES
      (1, 1, 2, 1200.00, 'USD', 'payment', 'success', 'ref_018239012'),
      (2, 2, 2, 3200.00, 'USD', 'payment', 'success', 'ref_018239088')
      ON DUPLICATE KEY UPDATE status=VALUES(status);
    `);

    // 11. Seed Project 4 Contract, Payment & Review
    await connection.query(`
      INSERT INTO contracts (id, project_id, user_id, quotation_id, start_date, expected_end_date, total_amount, currency, status)
      VALUES (2, 4, 3, 1, DATE_SUB(CURDATE(), INTERVAL 60 DAY), DATE_SUB(CURDATE(), INTERVAL 10 DAY), 8500.00, 'USD', 'completed')
      ON DUPLICATE KEY UPDATE status=VALUES(status);
    `);

    await connection.query(`
      INSERT INTO reviews (id, project_id, user_id, rating, comment)
      VALUES (
        1, 4, 3, 5,
        'WorkForge delivered our crypto portfolio app ahead of schedule! The architecture is ultra-clean, zero crashes in production, and communication with the admin team was exceptional throughout.'
      )
      ON DUPLICATE KEY UPDATE rating=VALUES(rating), comment=VALUES(comment);
    `);

    // 12. Seed Messages for Project 1
    await connection.query(`
      INSERT INTO messages (id, project_id, sender_id, receiver_id, message, is_read, created_at) VALUES
      (1, 1, 2, 1, 'Hello Admin! Excited to start the E-Commerce project. When will the backend APIs be ready for staging testing?', TRUE, DATE_SUB(NOW(), INTERVAL 2 DAY)),
      (2, 1, 1, 2, 'Hi Jones! Milestone 2 frontend is completed. Our backend team is currently implementing the Stripe Connect webhooks and we expect staging deployment by next Tuesday.', TRUE, DATE_SUB(NOW(), INTERVAL 1 DAY)),
      (3, 1, 2, 1, 'Sounds perfect. Looking forward to reviewing the staging link.', TRUE, DATE_SUB(NOW(), INTERVAL 18 HOUR))
      ON DUPLICATE KEY UPDATE message=VALUES(message);
    `);

    // 13. Seed Notifications for Demo User
    await connection.query(`
      INSERT INTO notifications (id, user_id, title, message, type, link, is_read) VALUES
      (1, 2, 'New Quotation Received', 'WorkForge Admin sent an official quotation for "Production Memory Leak & High Latency Fix".', 'quotation', '/quotations/2', FALSE),
      (2, 2, 'Milestone Approved', 'Milestone 2 "Frontend Storefront & Vendor Hub" was successfully approved.', 'milestone', '/projects/1', TRUE),
      (3, 2, 'Project Started', 'Contract signed and project "Enterprise Multi-Vendor E-Commerce Platform" is officially in progress.', 'project', '/projects/1', TRUE),
      (4, 1, 'New Project Request', 'Jones Samraj submitted a new project request "AWS Multi-Region Kubernetes Architecture".', 'admin', '/admin/projects/3', FALSE)
      ON DUPLICATE KEY UPDATE title=VALUES(title);
    `);

    // 14. Seed Contact Messages
    await connection.query(`
      INSERT INTO contact_messages (id, name, email, subject, message, status) VALUES
      (1, 'Marcus Vance', 'marcus@vancetech.co', 'Enterprise Support Agreement Inquiry', 'We are looking for ongoing 24/7 database and backend maintenance for our SaaS application with 50k active users.', 'unread')
      ON DUPLICATE KEY UPDATE subject=VALUES(subject);
    `);

    console.log('Database seeded successfully with Demo Accounts and Projects!');
    console.log('--- DEMO CREDENTIALS ---');
    console.log('Admin: admin@workforge.dev / Admin@123');
    console.log('User:  user@workforge.dev  / User@123');
    console.log('------------------------');

    await connection.end();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
