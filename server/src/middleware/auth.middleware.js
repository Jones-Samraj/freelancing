import { verifyToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/response.js';
import { pool } from '../config/database.js';

export async function requireAuth(req, res, next) {
  try {
    let token = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.query && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return errorResponse(res, 'Authentication required. No token provided.', 401);
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return errorResponse(res, 'Invalid or expired authentication token.', 401);
    }

    // Always fetch fresh user data from database to enforce revocation/suspension
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.role, u.country_id, u.avatar, u.phone, u.email_verified, u.status,
              c.name AS country_name, c.iso_code AS country_code, c.currency, c.currency_symbol
       FROM users u
       LEFT JOIN countries c ON u.country_id = c.id
       WHERE u.id = ?`,
      [decoded.id]
    );

    if (rows.length === 0) {
      return errorResponse(res, 'User account not found.', 401);
    }

    const user = rows[0];

    if (user.status === 'suspended') {
      return errorResponse(res, 'Your account has been suspended. Please contact support.', 403);
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('requireAuth error:', error);
    return errorResponse(res, 'Internal authentication error.', 500);
  }
}
