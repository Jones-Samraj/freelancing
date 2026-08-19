-- ========================================================================
-- WORKFORGE DATABASE SEED DATA
-- Default Countries, Categories, Skills, Admin & Demo Accounts, Projects
-- ========================================================================

USE freelancing;

-- 1. SEED COUNTRIES
INSERT INTO countries (id, name, iso_code, phone_code, currency, currency_symbol, timezone, status) VALUES
(1, 'United States', 'US', '+1', 'USD', '$', 'America/New_York', 'active'),
(2, 'India', 'IN', '+91', 'INR', '₹', 'Asia/Kolkata', 'active'),
(3, 'United Kingdom', 'GB', '+44', 'GBP', '£', 'Europe/London', 'active'),
(4, 'Canada', 'CA', '+1', 'CAD', 'CA$', 'America/Toronto', 'active'),
(5, 'Australia', 'AU', '+61', 'AUD', 'A$', 'Australia/Sydney', 'active'),
(6, 'Germany', 'DE', '+49', 'EUR', '€', 'Europe/Berlin', 'active'),
(7, 'Singapore', 'SG', '+65', 'SGD', 'S$', 'Asia/Singapore', 'active'),
(8, 'United Arab Emirates', 'AE', '+971', 'AED', 'AED', 'Asia/Dubai', 'active')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 2. SEED CATEGORIES
INSERT INTO categories (id, name, description, icon, status) VALUES
(1, 'Web Development', 'Full-stack web applications, SaaS platforms, and APIs', 'Globe', 'active'),
(2, 'Mobile App Development', 'Native and cross-platform iOS and Android apps', 'Smartphone', 'active'),
(3, 'Cloud & DevOps', 'Infrastructure management, CI/CD pipelines, AWS/GCP architecture', 'Cloud', 'active'),
(4, 'Database & Backend', 'High-performance database design, migrations, microservices', 'Database', 'active'),
(5, 'UI/UX Design & Frontend', 'Modern responsive user interfaces, animations, and design systems', 'Layout', 'active'),
(6, 'Maintenance & Security', 'Bug fixing, server hardening, vulnerability remediation, 24/7 support', 'ShieldCheck', 'active')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 3. SEED SKILLS
INSERT INTO skills (id, category_id, name, status) VALUES
(1, 1, 'React', 'active'),
(2, 1, 'Node.js', 'active'),
(3, 1, 'Express.js', 'active'),
(4, 1, 'Next.js', 'active'),
(5, 1, 'TypeScript', 'active'),
(6, 2, 'React Native', 'active'),
(7, 2, 'Flutter', 'active'),
(8, 2, 'iOS Swift', 'active'),
(9, 2, 'Android Kotlin', 'active'),
(10, 3, 'AWS', 'active'),
(11, 3, 'Docker', 'active'),
(12, 3, 'Kubernetes', 'active'),
(13, 3, 'CI/CD Pipelines', 'active'),
(14, 4, 'MySQL', 'active'),
(15, 4, 'PostgreSQL', 'active'),
(16, 4, 'MongoDB', 'active'),
(17, 4, 'Redis', 'active'),
(18, 5, 'Tailwind CSS', 'active'),
(19, 5, 'Figma', 'active'),
(20, 5, 'Vue.js', 'active'),
(21, 6, 'Penetration Testing', 'active'),
(22, 6, 'Performance Optimization', 'active'),
(23, 6, 'Python', 'active'),
(24, 6, 'Java', 'active')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Note: User accounts with exact bcrypt hashes are seeded via node scripts/seedDb.js for 100% hash salt consistency.
