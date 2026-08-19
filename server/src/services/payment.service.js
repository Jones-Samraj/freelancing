import { pool } from '../config/database.js';

export async function getPayments({ userId = null, role = 'user', contractId = null, status = '' }) {
  const conditions = [];
  const params = [];

  if (role !== 'admin' && userId) {
    conditions.push('p.user_id = ?');
    params.push(userId);
  }

  if (contractId) {
    conditions.push('p.contract_id = ?');
    params.push(contractId);
  }

  if (status) {
    conditions.push('p.status = ?');
    params.push(status);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const [rows] = await pool.query(
    `SELECT p.*,
            m.title AS milestone_title,
            c.project_id,
            proj.title AS project_title, proj.currency AS project_currency,
            u.name AS client_name, u.email AS client_email
     FROM payments p
     JOIN contracts c ON p.contract_id = c.id
     JOIN projects proj ON c.project_id = proj.id
     JOIN users u ON p.user_id = u.id
     LEFT JOIN milestones m ON p.milestone_id = m.id
     ${whereClause}
     ORDER BY p.created_at DESC`,
    params
  );

  return rows;
}

export async function getPaymentStats() {
  const [totalRevenueRow] = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) AS total_revenue FROM payments WHERE status = 'completed'`
  );
  const [pendingRevenueRow] = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) AS pending_revenue FROM payments WHERE status = 'pending'`
  );
  const [recentTransactions] = await pool.query(
    `SELECT t.*, u.name AS user_name, u.email AS user_email
     FROM transactions t
     JOIN users u ON t.user_id = u.id
     ORDER BY t.created_at DESC LIMIT 10`
  );

  return {
    totalRevenue: parseFloat(totalRevenueRow[0].total_revenue) || 0,
    pendingRevenue: parseFloat(pendingRevenueRow[0].pending_revenue) || 0,
    recentTransactions
  };
}
