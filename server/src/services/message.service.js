import { pool } from '../config/database.js';

export async function getProjectMessages(projectId, userId, role) {
  // First verify access
  const [proj] = await pool.query('SELECT user_id, title FROM projects WHERE id = ?', [projectId]);
  if (proj.length === 0) {
    const err = new Error('Project not found');
    err.statusCode = 404;
    throw err;
  }

  if (role !== 'admin' && proj[0].user_id !== userId) {
    const err = new Error('Access denied to project messages.');
    err.statusCode = 403;
    throw err;
  }

  // Mark received unread messages as read
  await pool.query(
    'UPDATE messages SET is_read = TRUE WHERE project_id = ? AND receiver_id = ? AND is_read = FALSE',
    [projectId, userId]
  );

  const [messages] = await pool.query(
    `SELECT m.*,
            s.name AS sender_name, s.avatar AS sender_avatar, s.role AS sender_role,
            r.name AS receiver_name, r.avatar AS receiver_avatar, r.role AS receiver_role
     FROM messages m
     JOIN users s ON m.sender_id = s.id
     JOIN users r ON m.receiver_id = r.id
     WHERE m.project_id = ?
     ORDER BY m.created_at ASC`,
    [projectId]
  );

  return messages;
}

export async function sendMessage(projectId, senderId, senderRole, { message, attachment = null }) {
  const [proj] = await pool.query('SELECT user_id, title FROM projects WHERE id = ?', [projectId]);
  if (proj.length === 0) {
    const err = new Error('Project not found');
    err.statusCode = 404;
    throw err;
  }

  let receiverId;
  if (senderRole === 'admin') {
    // Admin sending to Client
    receiverId = proj[0].user_id;
  } else {
    // Client sending to Admin (pick main admin)
    const [adminRows] = await pool.query('SELECT id FROM users WHERE role = "admin" ORDER BY id ASC LIMIT 1');
    receiverId = adminRows.length > 0 ? adminRows[0].id : 1;
  }

  const [result] = await pool.query(
    `INSERT INTO messages (project_id, sender_id, receiver_id, message, attachment, is_read)
     VALUES (?, ?, ?, ?, ?, FALSE)`,
    [projectId, senderId, receiverId, message, attachment]
  );

  const messageId = result.insertId;

  // Send Notification to recipient
  const senderTitle = senderRole === 'admin' ? 'WorkForge Technical Admin' : 'Client';
  await pool.query(
    `INSERT INTO notifications (user_id, title, message, type, link)
     VALUES (?, CONCAT('New Message from ', ?), CONCAT('New message regarding project "', ?, '": ', ?), 'message', ?)`,
    [
      receiverId,
      senderTitle,
      proj[0].title,
      message.length > 60 ? message.substring(0, 57) + '...' : message,
      senderRole === 'admin' ? `/projects/${projectId}` : `/admin/projects/${projectId}`
    ]
  );

  const [msgRows] = await pool.query(
    `SELECT m.*,
            s.name AS sender_name, s.avatar AS sender_avatar, s.role AS sender_role,
            r.name AS receiver_name, r.avatar AS receiver_avatar, r.role AS receiver_role
     FROM messages m
     JOIN users s ON m.sender_id = s.id
     JOIN users r ON m.receiver_id = r.id
     WHERE m.id = ?`,
    [messageId]
  );

  return msgRows[0];
}
