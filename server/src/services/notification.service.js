import { pool } from '../config/database.js';

export async function getUserNotifications(userId, limit = 30) {
  const [rows] = await pool.query(
    `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`,
    [userId, parseInt(limit, 10)]
  );
  return rows;
}

export async function markNotificationAsRead(notificationId, userId) {
  await pool.query('UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?', [notificationId, userId]);
  return true;
}

export async function markAllNotificationsAsRead(userId) {
  await pool.query('UPDATE notifications SET is_read = TRUE WHERE user_id = ?', [userId]);
  return true;
}

export async function getUnreadCount(userId) {
  const [rows] = await pool.query('SELECT COUNT(*) AS unread FROM notifications WHERE user_id = ? AND is_read = FALSE', [userId]);
  return rows[0].unread;
}
