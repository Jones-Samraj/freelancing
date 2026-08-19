import { pool } from '../config/database.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function getDashboardStats(req, res, next) {
  try {
    // 1. Core KPIs
    const [userCounts] = await pool.query(`
      SELECT 
        COUNT(*) AS total_users,
        COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) AS new_users_30d
      FROM users WHERE role = 'user'
    `);

    const [projectCounts] = await pool.query(`
      SELECT 
        COUNT(*) AS total_projects,
        COUNT(CASE WHEN status = 'submitted' THEN 1 END) AS pending_requests,
        COUNT(CASE WHEN status = 'under_review' THEN 1 END) AS under_review,
        COUNT(CASE WHEN status = 'quotation_sent' THEN 1 END) AS quotation_sent,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) AS in_progress,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed
      FROM projects
    `);

    const [paymentCounts] = await pool.query(`
      SELECT 
        COALESCE(SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END), 0) AS total_revenue,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) AS pending_revenue
      FROM payments
    `);

    // 2. Chart: Projects by Type
    const [projectsByType] = await pool.query(`
      SELECT project_type, COUNT(*) AS count
      FROM projects
      GROUP BY project_type
    `);

    // 3. Chart: Projects by Status
    const [projectsByStatus] = await pool.query(`
      SELECT status, COUNT(*) AS count
      FROM projects
      GROUP BY status
    `);

    // 4. Chart: Monthly Revenue (Last 6 Months)
    const [monthlyRevenue] = await pool.query(`
      SELECT 
        DATE_FORMAT(paid_at, '%b %Y') AS month,
        SUM(amount) AS revenue
      FROM payments
      WHERE status = 'completed' AND paid_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(paid_at, '%b %Y'), YEAR(paid_at), MONTH(paid_at)
      ORDER BY YEAR(paid_at) ASC, MONTH(paid_at) ASC
    `);

    // 5. Recent Activity Stream
    const [recentProjects] = await pool.query(`
      SELECT p.id, p.title, p.project_type, p.status, p.created_at, u.name AS client_name
      FROM projects p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC LIMIT 5
    `);

    return successResponse(res, 'Admin dashboard stats retrieved.', {
      stats: {
        totalUsers: userCounts[0].total_users || 0,
        newUsers: userCounts[0].new_users_30d || 0,
        totalProjects: projectCounts[0].total_projects || 0,
        pendingRequests: projectCounts[0].pending_requests || 0,
        underReview: projectCounts[0].under_review || 0,
        quotationSent: projectCounts[0].quotation_sent || 0,
        inProgress: projectCounts[0].in_progress || 0,
        completed: projectCounts[0].completed || 0,
        totalRevenue: parseFloat(paymentCounts[0].total_revenue) || 0,
        pendingRevenue: parseFloat(paymentCounts[0].pending_revenue) || 0
      },
      charts: {
        projectsByType,
        projectsByStatus,
        monthlyRevenue
      },
      recentProjects
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const { search = '', status = '', country_id = '' } = req.query;

    const conditions = ["u.role = 'user'"];
    const params = [];

    if (search) {
      conditions.push('(u.name LIKE ? OR u.email LIKE ? OR up.company_name LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
      conditions.push('u.status = ?');
      params.push(status);
    }

    if (country_id) {
      conditions.push('u.country_id = ?');
      params.push(country_id);
    }

    const whereClause = `WHERE ${conditions.join(' AND ')}`;

    const [users] = await pool.query(
      `SELECT u.id, u.name, u.email, u.role, u.country_id, u.avatar, u.phone, u.status, u.created_at,
              c.name AS country_name, c.iso_code AS country_code,
              up.company_name, up.city, up.profile_completion,
              (SELECT COUNT(*) FROM projects p WHERE p.user_id = u.id) AS total_projects,
              (SELECT COALESCE(SUM(pm.amount), 0) FROM payments pm WHERE pm.user_id = u.id AND pm.status = 'completed') AS total_spent
       FROM users u
       LEFT JOIN countries c ON u.country_id = c.id
       LEFT JOIN user_profiles up ON u.id = up.user_id
       ${whereClause}
       ORDER BY u.created_at DESC`,
      params
    );

    return successResponse(res, 'Users retrieved.', { users });
  } catch (error) {
    next(error);
  }
}

export async function getUserDetails(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.role, u.country_id, u.avatar, u.phone, u.email_verified, u.status, u.created_at,
              c.name AS country_name, c.iso_code AS country_code, c.currency, c.currency_symbol,
              up.display_name, up.bio, up.company_name, up.company_website, up.city, up.state, up.timezone, up.profile_completion
       FROM users u
       LEFT JOIN countries c ON u.country_id = c.id
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return errorResponse(res, 'User not found.', 404);
    }

    const user = rows[0];

    const [projects] = await pool.query(
      'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
      [id]
    );

    const [payments] = await pool.query(
      'SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC',
      [id]
    );

    return successResponse(res, 'User details retrieved.', { user, projects, payments });
  } catch (error) {
    next(error);
  }
}

export async function updateUserStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'suspended', 'pending'].includes(status)) {
      return errorResponse(res, 'Invalid status. Choose active, suspended, or pending.', 400);
    }

    // Prevent suspending the primary admin
    const [targetUser] = await pool.query('SELECT role FROM users WHERE id = ?', [id]);
    if (targetUser.length === 0) return errorResponse(res, 'User not found.', 404);
    if (targetUser[0].role === 'admin') return errorResponse(res, 'Cannot change status of an Administrator.', 400);

    await pool.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
    return successResponse(res, `User status changed to ${status}.`);
  } catch (error) {
    next(error);
  }
}

// CATEGORIES CRUD
export async function getCategories(req, res, next) {
  try {
    const [categories] = await pool.query(`
      SELECT c.*, (SELECT COUNT(*) FROM skills s WHERE s.category_id = c.id) AS skill_count
      FROM categories c
      ORDER BY c.name ASC
    `);
    return successResponse(res, 'Categories retrieved.', { categories });
  } catch (error) {
    next(error);
  }
}

export async function createCategory(req, res, next) {
  try {
    const { name, description, icon = 'Layers', status = 'active' } = req.body;
    if (!name) return errorResponse(res, 'Category name is required.', 400);

    const [result] = await pool.query(
      'INSERT INTO categories (name, description, icon, status) VALUES (?, ?, ?, ?)',
      [name, description, icon, status]
    );
    return successResponse(res, 'Category created.', { id: result.insertId, name, description, icon, status }, 201);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, icon, status } = req.body;
    await pool.query(
      'UPDATE categories SET name = COALESCE(?, name), description = COALESCE(?, description), icon = COALESCE(?, icon), status = COALESCE(?, status) WHERE id = ?',
      [name, description, icon, status, id]
    );
    return successResponse(res, 'Category updated.');
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    return successResponse(res, 'Category deleted.');
  } catch (error) {
    next(error);
  }
}

// SKILLS CRUD
export async function getSkills(req, res, next) {
  try {
    const [skills] = await pool.query(`
      SELECT s.*, c.name AS category_name
      FROM skills s
      LEFT JOIN categories c ON s.category_id = c.id
      ORDER BY s.name ASC
    `);
    return successResponse(res, 'Skills retrieved.', { skills });
  } catch (error) {
    next(error);
  }
}

export async function createSkill(req, res, next) {
  try {
    const { name, category_id, status = 'active' } = req.body;
    if (!name) return errorResponse(res, 'Skill name is required.', 400);

    const [result] = await pool.query(
      'INSERT INTO skills (name, category_id, status) VALUES (?, ?, ?)',
      [name, category_id || null, status]
    );
    return successResponse(res, 'Skill created.', { id: result.insertId, name, category_id, status }, 201);
  } catch (error) {
    next(error);
  }
}

export async function updateSkill(req, res, next) {
  try {
    const { id } = req.params;
    const { name, category_id, status } = req.body;
    await pool.query(
      'UPDATE skills SET name = COALESCE(?, name), category_id = COALESCE(?, category_id), status = COALESCE(?, status) WHERE id = ?',
      [name, category_id, status, id]
    );
    return successResponse(res, 'Skill updated.');
  } catch (error) {
    next(error);
  }
}

export async function deleteSkill(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM skills WHERE id = ?', [id]);
    return successResponse(res, 'Skill deleted.');
  } catch (error) {
    next(error);
  }
}

// COUNTRIES CRUD
export async function getCountries(req, res, next) {
  try {
    const [countries] = await pool.query('SELECT * FROM countries ORDER BY name ASC');
    return successResponse(res, 'Countries retrieved.', { countries });
  } catch (error) {
    next(error);
  }
}

export async function createCountry(req, res, next) {
  try {
    const { name, iso_code, phone_code, currency = 'USD', currency_symbol = '$', timezone = 'UTC', status = 'active' } = req.body;
    if (!name || !iso_code || !phone_code) return errorResponse(res, 'Name, ISO code, and phone code are required.', 400);

    const [result] = await pool.query(
      'INSERT INTO countries (name, iso_code, phone_code, currency, currency_symbol, timezone, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, iso_code, phone_code, currency, currency_symbol, timezone, status]
    );
    return successResponse(res, 'Country created.', { id: result.insertId, name, iso_code }, 201);
  } catch (error) {
    next(error);
  }
}

export async function updateCountry(req, res, next) {
  try {
    const { id } = req.params;
    const { name, iso_code, phone_code, currency, currency_symbol, timezone, status } = req.body;
    await pool.query(
      `UPDATE countries SET 
        name = COALESCE(?, name),
        iso_code = COALESCE(?, iso_code),
        phone_code = COALESCE(?, phone_code),
        currency = COALESCE(?, currency),
        currency_symbol = COALESCE(?, currency_symbol),
        timezone = COALESCE(?, timezone),
        status = COALESCE(?, status)
       WHERE id = ?`,
      [name, iso_code, phone_code, currency, currency_symbol, timezone, status, id]
    );
    return successResponse(res, 'Country updated.');
  } catch (error) {
    next(error);
  }
}

// CONTACT MESSAGES
export async function submitContactMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return errorResponse(res, 'All fields (name, email, subject, message) are required.', 400);
    }
    const [result] = await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    return successResponse(res, 'Thank you! Your message has been received. Our team will get back to you shortly.', { id: result.insertId }, 201);
  } catch (error) {
    next(error);
  }
}

export async function getContactMessages(req, res, next) {
  try {
    const [messages] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    return successResponse(res, 'Contact messages retrieved.', { messages });
  } catch (error) {
    next(error);
  }
}

export async function updateContactMessageStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE contact_messages SET status = ? WHERE id = ?', [status, id]);
    return successResponse(res, 'Message status updated.');
  } catch (error) {
    next(error);
  }
}
