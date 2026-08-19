import { pool } from '../config/database.js';

export async function createQuotation(adminId, quotationData) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const {
      project_id,
      title,
      description,
      items = [],
      tax = 0,
      discount = 0,
      currency = 'USD',
      valid_until = null,
      status = 'draft',
      admin_notes = null
    } = quotationData;

    // Calculate subtotal from items
    let subtotal = 0;
    items.forEach(item => {
      const lineTotal = (parseInt(item.quantity, 10) || 1) * (parseFloat(item.unit_price) || 0);
      subtotal += lineTotal;
    });

    const parsedTax = parseFloat(tax) || 0;
    const parsedDiscount = parseFloat(discount) || 0;
    const grandTotal = Math.max(0, subtotal + parsedTax - parsedDiscount);

    // 1. Insert Quotation
    const [qResult] = await connection.query(
      `INSERT INTO quotations (
        project_id, created_by, title, description, subtotal, tax, discount,
        total, currency, valid_until, status, admin_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        project_id,
        adminId,
        title,
        description || null,
        subtotal,
        parsedTax,
        parsedDiscount,
        grandTotal,
        currency,
        valid_until || null,
        status,
        admin_notes || null
      ]
    );

    const quotationId = qResult.insertId;

    // 2. Insert Line Items
    if (items.length > 0) {
      const itemValues = items.map(item => {
        const qty = parseInt(item.quantity, 10) || 1;
        const price = parseFloat(item.unit_price) || 0;
        return [
          quotationId,
          item.title,
          item.description || null,
          qty,
          price,
          qty * price
        ];
      });

      await connection.query(
        'INSERT INTO quotation_items (quotation_id, title, description, quantity, unit_price, total) VALUES ?',
        [itemValues]
      );
    }

    // If status is 'sent', update project status and notify client
    if (status === 'sent') {
      await connection.query('UPDATE projects SET status = "quotation_sent" WHERE id = ?', [project_id]);

      const [projRows] = await connection.query('SELECT user_id, title FROM projects WHERE id = ?', [project_id]);
      if (projRows.length > 0) {
        const { user_id, title: projTitle } = projRows[0];
        await connection.query(
          `INSERT INTO notifications (user_id, title, message, type, link)
           VALUES (?, 'Quotation Ready for Review', CONCAT('WorkForge Admin has generated an official quotation for "', ?, '".'), 'quotation', CONCAT('/quotations/', ?))`,
          [user_id, projTitle, quotationId]
        );
      }
    }

    await connection.commit();
    connection.release();

    return await getQuotationById(quotationId);
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw error;
  }
}

export async function getQuotationById(quotationId, requestingUser = null) {
  const [rows] = await pool.query(
    `SELECT q.*,
            p.title AS project_title, p.project_type, p.user_id AS client_id, p.currency AS project_currency,
            u.name AS client_name, u.email AS client_email,
            adm.name AS created_by_name
     FROM quotations q
     JOIN projects p ON q.project_id = p.id
     JOIN users u ON p.user_id = u.id
     JOIN users adm ON q.created_by = adm.id
     WHERE q.id = ?`,
    [quotationId]
  );

  if (rows.length === 0) {
    const err = new Error('Quotation not found');
    err.statusCode = 404;
    throw err;
  }

  const quotation = rows[0];

  // Role authorization
  if (requestingUser && requestingUser.role !== 'admin' && quotation.client_id !== requestingUser.id) {
    const err = new Error('Access denied: You are not authorized to view this quotation.');
    err.statusCode = 403;
    throw err;
  }

  // Line items
  const [items] = await pool.query(
    'SELECT * FROM quotation_items WHERE quotation_id = ? ORDER BY id ASC',
    [quotationId]
  );
  quotation.items = items;

  return quotation;
}

export async function getQuotations({ userId = null, role = 'user', projectId = null, status = '' }) {
  const conditions = [];
  const params = [];

  if (role !== 'admin' && userId) {
    conditions.push('p.user_id = ?');
    params.push(userId);
  }

  if (projectId) {
    conditions.push('q.project_id = ?');
    params.push(projectId);
  }

  if (status) {
    conditions.push('q.status = ?');
    params.push(status);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const [quotations] = await pool.query(
    `SELECT q.*,
            p.title AS project_title, p.project_type, p.user_id AS client_id,
            u.name AS client_name, u.email AS client_email
     FROM quotations q
     JOIN projects p ON q.project_id = p.id
     JOIN users u ON p.user_id = u.id
     ${whereClause}
     ORDER BY q.created_at DESC`,
    params
  );

  return quotations;
}

export async function respondToQuotation(quotationId, userId, { status, reason = '' }) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const [qRows] = await connection.query(
      `SELECT q.*, p.user_id AS client_id, p.title AS project_title, p.currency AS project_currency
       FROM quotations q
       JOIN projects p ON q.project_id = p.id
       WHERE q.id = ?`,
      [quotationId]
    );

    if (qRows.length === 0) {
      const err = new Error('Quotation not found');
      err.statusCode = 404;
      throw err;
    }

    const quote = qRows[0];

    // Ensure only the project owner can accept/reject
    if (quote.client_id !== userId) {
      const err = new Error('Access denied: You are not authorized to respond to this quotation.');
      err.statusCode = 403;
      throw err;
    }

    if (quote.status === 'accepted') {
      const err = new Error('This quotation has already been accepted.');
      err.statusCode = 400;
      throw err;
    }

    // Update Quotation Status
    await connection.query('UPDATE quotations SET status = ? WHERE id = ?', [status, quotationId]);

    if (status === 'accepted') {
      // 1. Update Project Status
      await connection.query('UPDATE projects SET status = "in_progress", progress_percentage = 10 WHERE id = ?', [quote.project_id]);

      // 2. Automatically Create Contract
      const [contractResult] = await connection.query(
        `INSERT INTO contracts (project_id, user_id, quotation_id, start_date, expected_end_date, total_amount, currency, status)
         VALUES (?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 60 DAY), ?, ?, 'active')`,
        [quote.project_id, userId, quotationId, quote.total, quote.currency]
      );
      const contractId = contractResult.insertId;

      // 3. Create Default Milestones from Quotation Items
      const [items] = await connection.query('SELECT * FROM quotation_items WHERE quotation_id = ? ORDER BY id ASC', [quotationId]);
      
      if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const milestoneStatus = i === 0 ? 'in_progress' : 'pending';
          const [mResult] = await connection.query(
            `INSERT INTO milestones (contract_id, title, description, amount, due_date, status)
             VALUES (?, ?, ?, ?, DATE_ADD(CURDATE(), INTERVAL ? DAY), ?)`,
            [
              contractId,
              item.title,
              item.description || `Milestone for ${item.title}`,
              item.total,
              (i + 1) * 14,
              milestoneStatus
            ]
          );

          // Create an initial task for the milestone
          await connection.query(
            `INSERT INTO tasks (milestone_id, title, description, status)
             VALUES (?, CONCAT('Complete deliverables for ', ?), ?, 'in_progress')`,
            [mResult.insertId, item.title, item.description || 'Execution phase']
          );
        }
      } else {
        // Fallback: 2 equal milestones
        const half = quote.total / 2;
        await connection.query(
          `INSERT INTO milestones (contract_id, title, description, amount, due_date, status) VALUES
           (?, 'Milestone 1: Foundation & Core Deliverables', 'Initial setup and core modules', ?, DATE_ADD(CURDATE(), INTERVAL 14 DAY), 'in_progress'),
           (?, 'Milestone 2: Final Delivery & Deployment', 'Final testing, handover, and launch', ?, DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'pending')`,
          [contractId, half, contractId, half]
        );
      }

      // 4. Notify Admin
      await connection.query(
        `INSERT INTO notifications (user_id, title, message, type, link)
         SELECT id, 'Quotation Accepted & Contract Active!', CONCAT('Client accepted quotation for "', ?, '". Contract #', ?, ' is now active.'), 'admin', CONCAT('/admin/projects/', ?)
         FROM users WHERE role = 'admin'`,
        [quote.project_title, contractId, quote.project_id]
      );

      // 5. Notify User
      await connection.query(
        `INSERT INTO notifications (user_id, title, message, type, link)
         VALUES (?, 'Quotation Accepted - Project Started', CONCAT('You accepted the proposal for "', ?, '". Contract & milestones are ready.'), 'project', CONCAT('/projects/', ?))`,
        [userId, quote.project_title, quote.project_id]
      );
    } else {
      // Rejected
      await connection.query('UPDATE projects SET status = "under_review" WHERE id = ?', [quote.project_id]);

      await connection.query(
        `INSERT INTO notifications (user_id, title, message, type, link)
         SELECT id, 'Quotation Declined by Client', CONCAT('Client declined quotation for "', ?, '". Reason: ', ?), 'admin', CONCAT('/admin/projects/', ?)
         FROM users WHERE role = 'admin'`,
        [quote.project_title, reason || 'No specific reason provided', quote.project_id]
      );
    }

    await connection.commit();
    connection.release();

    return await getQuotationById(quotationId);
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw error;
  }
}
