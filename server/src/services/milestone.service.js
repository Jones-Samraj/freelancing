import { pool } from '../config/database.js';

export async function submitMilestone(milestoneId, adminId, { submissionNotes }) {
  const [mRows] = await pool.query(
    `SELECT m.*, c.user_id AS client_id, c.project_id, p.title AS project_title
     FROM milestones m
     JOIN contracts c ON m.contract_id = c.id
     JOIN projects p ON c.project_id = p.id
     WHERE m.id = ?`,
    [milestoneId]
  );

  if (mRows.length === 0) {
    const err = new Error('Milestone not found');
    err.statusCode = 404;
    throw err;
  }

  const milestone = mRows[0];

  await pool.query(
    `UPDATE milestones SET status = 'submitted', submission_notes = ?, updated_at = NOW() WHERE id = ?`,
    [submissionNotes || null, milestoneId]
  );

  // Notify Client
  await pool.query(
    `INSERT INTO notifications (user_id, title, message, type, link)
     VALUES (?, 'Milestone Submitted for Review', CONCAT('Admin submitted "', ?, '" for project "', ?, '". Please review and approve.'), 'milestone', CONCAT('/projects/', ?))`,
    [milestone.client_id, milestone.title, milestone.project_title, milestone.project_id]
  );

  return milestone;
}

export async function approveMilestone(milestoneId, userId) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const [mRows] = await connection.query(
      `SELECT m.*, c.id AS contract_id, c.user_id AS client_id, c.project_id, c.currency, p.title AS project_title
       FROM milestones m
       JOIN contracts c ON m.contract_id = c.id
       JOIN projects p ON c.project_id = p.id
       WHERE m.id = ?`,
      [milestoneId]
    );

    if (mRows.length === 0) {
      const err = new Error('Milestone not found');
      err.statusCode = 404;
      throw err;
    }

    const milestone = mRows[0];

    // Check user permission
    if (milestone.client_id !== userId) {
      const err = new Error('Access denied: You are not authorized to approve this milestone.');
      err.statusCode = 403;
      throw err;
    }

    // 1. Mark Milestone as Completed
    await connection.query(
      `UPDATE milestones SET status = 'completed', completed_at = NOW() WHERE id = ?`,
      [milestoneId]
    );

    // 2. Create Payment Record (Simulated Payment Architecture)
    const transactionId = `tx_wf_${Date.now().toString(36).toUpperCase()}_${Math.floor(Math.random() * 1000)}`;
    const [payResult] = await connection.query(
      `INSERT INTO payments (contract_id, milestone_id, user_id, amount, currency, payment_method, transaction_id, status, paid_at)
       VALUES (?, ?, ?, ?, ?, 'Direct Payment / Platform Escrow', ?, 'completed', NOW())
       ON DUPLICATE KEY UPDATE status = 'completed', paid_at = NOW(), transaction_id = VALUES(transaction_id)`,
      [milestone.contract_id, milestoneId, userId, milestone.amount, milestone.currency || 'USD', transactionId]
    );

    // 3. Create Transaction Ledger Entry
    await connection.query(
      `INSERT INTO transactions (payment_id, user_id, amount, currency, type, status, reference_id)
       VALUES (?, ?, ?, ?, 'payment', 'success', ?)`,
      [payResult.insertId, userId, milestone.amount, milestone.currency || 'USD', transactionId]
    );

    // 4. Calculate project progress and check if all milestones are completed
    const [allMilestones] = await connection.query(
      'SELECT id, status FROM milestones WHERE contract_id = ?',
      [milestone.contract_id]
    );

    const totalCount = allMilestones.length;
    const completedCount = allMilestones.filter(m => m.status === 'completed').length;
    const progressPct = Math.round((completedCount / totalCount) * 100);

    const isAllCompleted = completedCount === totalCount;

    // Update next pending milestone to in_progress if any
    const nextPending = allMilestones.find(m => m.status === 'pending');
    if (nextPending) {
      await connection.query('UPDATE milestones SET status = "in_progress" WHERE id = ?', [nextPending.id]);
    }

    // Update project progress
    if (isAllCompleted) {
      await connection.query(
        `UPDATE projects SET status = 'completed', progress_percentage = 100 WHERE id = ?`,
        [milestone.project_id]
      );
      await connection.query(
        `UPDATE contracts SET status = 'completed' WHERE id = ?`,
        [milestone.contract_id]
      );

      // Notify User to review completed project
      await connection.query(
        `INSERT INTO notifications (user_id, title, message, type, link)
         VALUES (?, 'Project Successfully Completed! 🎉', CONCAT('All milestones for "', ?, '" have been delivered. Please share your rating and review!'), 'project', CONCAT('/projects/', ?))`,
        [userId, milestone.project_title, milestone.project_id]
      );
    } else {
      await connection.query(
        `UPDATE projects SET progress_percentage = ? WHERE id = ?`,
        [progressPct, milestone.project_id]
      );
    }

    // Notify Admin of milestone approval
    await connection.query(
      `INSERT INTO notifications (user_id, title, message, type, link)
       SELECT id, 'Milestone Approved & Paid', CONCAT('Client approved "', ?, '" for project "', ?, '". Payment of $', ?, ' registered.'), 'admin', CONCAT('/admin/projects/', ?)
       FROM users WHERE role = 'admin'`,
      [milestone.title, milestone.project_title, milestone.amount, milestone.project_id]
    );

    await connection.commit();
    connection.release();

    return { success: true, milestoneId, isAllCompleted, progressPct };
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw error;
  }
}

export async function createMilestoneTask(milestoneId, { title, description, due_date }) {
  const [result] = await pool.query(
    `INSERT INTO tasks (milestone_id, title, description, status, due_date)
     VALUES (?, ?, ?, 'todo', ?)`,
    [milestoneId, title, description || null, due_date || null]
  );
  return { id: result.insertId, milestone_id: milestoneId, title, description, status: 'todo' };
}

export async function updateTaskStatus(taskId, status) {
  await pool.query('UPDATE tasks SET status = ? WHERE id = ?', [status, taskId]);
  return { id: taskId, status };
}
