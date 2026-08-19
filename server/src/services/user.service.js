import { pool } from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/password.js';

export async function getUserProfile(userId) {
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
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  return rows[0];
}

export async function updateUserProfile(userId, profileData, avatarPath = null) {
  const { name, display_name, bio, company_name, company_website, phone, city, state, country_id, timezone } = profileData;

  // Update user main table
  const userUpdates = [];
  const userParams = [];

  if (name !== undefined) {
    userUpdates.push('name = ?');
    userParams.push(name);
  }
  if (phone !== undefined) {
    userUpdates.push('phone = ?');
    userParams.push(phone);
  }
  if (country_id !== undefined) {
    userUpdates.push('country_id = ?');
    userParams.push(country_id ? parseInt(country_id, 10) : null);
  }
  if (avatarPath) {
    userUpdates.push('avatar = ?');
    userParams.push(avatarPath);
  }

  if (userUpdates.length > 0) {
    userParams.push(userId);
    await pool.query(`UPDATE users SET ${userUpdates.join(', ')} WHERE id = ?`, userParams);
  }

  // Calculate profile completion percentage
  let score = 30; // base for email & password
  if (name) score += 10;
  if (phone) score += 10;
  if (country_id) score += 10;
  if (bio) score += 10;
  if (company_name) score += 10;
  if (city) score += 10;
  if (avatarPath) score += 10;
  const profileCompletion = Math.min(100, score);

  // Update or insert user profile table
  await pool.query(
    `INSERT INTO user_profiles (user_id, display_name, bio, company_name, company_website, phone, city, state, timezone, profile_completion)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       display_name = COALESCE(?, display_name),
       bio = COALESCE(?, bio),
       company_name = COALESCE(?, company_name),
       company_website = COALESCE(?, company_website),
       phone = COALESCE(?, phone),
       city = COALESCE(?, city),
       state = COALESCE(?, state),
       timezone = COALESCE(?, timezone),
       profile_completion = ?`,
    [
      userId, display_name || null, bio || null, company_name || null, company_website || null, phone || null, city || null, state || null, timezone || 'UTC', profileCompletion,
      display_name || null, bio || null, company_name || null, company_website || null, phone || null, city || null, state || null, timezone || null, profileCompletion
    ]
  );

  return await getUserProfile(userId);
}

export async function changeUserPassword(userId, currentPassword, newPassword) {
  const [rows] = await pool.query('SELECT password FROM users WHERE id = ?', [userId]);
  if (rows.length === 0) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }

  const isMatch = await comparePassword(currentPassword, rows[0].password);
  if (!isMatch) {
    const err = new Error('Incorrect current password.');
    err.statusCode = 400;
    throw err;
  }

  const hashed = await hashPassword(newPassword);
  await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId]);
  return true;
}

export async function getAllCountries() {
  const [rows] = await pool.query('SELECT * FROM countries WHERE status = "active" ORDER BY name ASC');
  return rows;
}
