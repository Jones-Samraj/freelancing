import { pool } from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';

export async function registerUser({ name, email, password, country_id, phone }) {
  // Check if email exists
  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    const error = new Error('An account with this email already exists.');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  // Strictly enforce 'user' role for self-registration. Frontend role parameters are ignored.
  const [result] = await pool.query(
    `INSERT INTO users (name, email, password, role, country_id, phone, email_verified, status)
     VALUES (?, ?, ?, 'user', ?, ?, TRUE, 'active')`,
    [name, email, hashedPassword, country_id || null, phone || null]
  );

  const userId = result.insertId;

  // Initialize empty user profile
  await pool.query(
    `INSERT INTO user_profiles (user_id, display_name, phone, profile_completion)
     VALUES (?, ?, ?, 50)`,
    [userId, name, phone || null]
  );

  // Send admin notification about new user registration
  await pool.query(
    `INSERT INTO notifications (user_id, title, message, type, link)
     SELECT id, 'New User Registered', CONCAT(?, ' has registered an account.'), 'admin', CONCAT('/admin/users/', ?)
     FROM users WHERE role = 'admin'`,
    [name, userId]
  );

  const [userRows] = await pool.query(
    `SELECT u.id, u.name, u.email, u.role, u.country_id, u.avatar, u.phone, u.email_verified, u.status,
            c.name AS country_name, c.iso_code AS country_code, c.currency, c.currency_symbol
     FROM users u
     LEFT JOIN countries c ON u.country_id = c.id
     WHERE u.id = ?`,
    [userId]
  );

  const user = userRows[0];
  const token = signToken({ id: user.id, email: user.email, role: user.role });

  return { user, token };
}

export async function loginUser({ email, password }) {
  const [rows] = await pool.query(
    `SELECT u.id, u.name, u.email, u.password, u.role, u.country_id, u.avatar, u.phone, u.email_verified, u.status,
            c.name AS country_name, c.iso_code AS country_code, c.currency, c.currency_symbol
     FROM users u
     LEFT JOIN countries c ON u.country_id = c.id
     WHERE u.email = ?`,
    [email]
  );

  if (rows.length === 0) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const user = rows[0];

  if (user.status === 'suspended') {
    const error = new Error('Your account has been suspended. Please contact platform administration.');
    error.statusCode = 403;
    throw error;
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  // Remove password hash from returned user object
  delete user.password;

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { user, token };
}

export async function getMe(userId) {
  const [rows] = await pool.query(
    `SELECT u.id, u.name, u.email, u.role, u.country_id, u.avatar, u.phone, u.email_verified, u.status, u.created_at,
            p.display_name, p.bio, p.company_name, p.company_website, p.city, p.state, p.timezone, p.profile_completion,
            c.name AS country_name, c.iso_code AS country_code, c.currency, c.currency_symbol, c.phone_code
     FROM users u
     LEFT JOIN user_profiles p ON u.id = p.user_id
     LEFT JOIN countries c ON u.country_id = c.id
     WHERE u.id = ?`,
    [userId]
  );

  if (rows.length === 0) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  return rows[0];
}
