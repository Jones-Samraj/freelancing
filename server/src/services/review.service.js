import { pool } from '../config/database.js';

export async function createReview(userId, { project_id, rating, comment }) {
  // 1. Verify project exists, belongs to user, and is completed
  const [pRows] = await pool.query(
    'SELECT user_id, status, title FROM projects WHERE id = ?',
    [project_id]
  );

  if (pRows.length === 0) {
    const err = new Error('Project not found');
    err.statusCode = 404;
    throw err;
  }

  const project = pRows[0];

  if (project.user_id !== userId) {
    const err = new Error('Access denied: You can only review your own projects.');
    err.statusCode = 403;
    throw err;
  }

  if (project.status !== 'completed') {
    const err = new Error('Reviews can only be submitted for completed projects.');
    err.statusCode = 400;
    throw err;
  }

  // Check if review already exists
  const [existing] = await pool.query('SELECT id FROM reviews WHERE project_id = ?', [project_id]);
  if (existing.length > 0) {
    const err = new Error('You have already submitted a review for this project.');
    err.statusCode = 400;
    throw err;
  }

  const [result] = await pool.query(
    `INSERT INTO reviews (project_id, user_id, rating, comment) VALUES (?, ?, ?, ?)`,
    [project_id, userId, parseInt(rating, 10), comment]
  );

  // Notify Admin
  await pool.query(
    `INSERT INTO notifications (user_id, title, message, type, link)
     SELECT id, 'New Project Review Received ⭐', CONCAT('Client left a ', ?, '-star review for "', ?, '".'), 'admin', CONCAT('/admin/reviews')
     FROM users WHERE role = 'admin'`,
    [rating, project.title]
  );

  return {
    id: result.insertId,
    project_id,
    user_id: userId,
    rating: parseInt(rating, 10),
    comment
  };
}

export async function getAllReviews({ limit = 50 } = {}) {
  const [rows] = await pool.query(
    `SELECT r.*,
            p.title AS project_title, p.project_type,
            u.name AS reviewer_name, u.avatar AS reviewer_avatar,
            up.company_name, up.city,
            c.name AS country_name, c.iso_code AS country_code
     FROM reviews r
     JOIN projects p ON r.project_id = p.id
     JOIN users u ON r.user_id = u.id
     LEFT JOIN user_profiles up ON u.id = up.user_id
     LEFT JOIN countries c ON u.country_id = c.id
     ORDER BY r.created_at DESC
     LIMIT ?`,
    [parseInt(limit, 10)]
  );
  return rows;
}
