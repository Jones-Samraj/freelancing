import { pool } from '../config/database.js';

export async function createProject(userId, projectData, uploadedFiles = []) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const {
      title,
      project_type,
      category_id,
      description,
      requirements,
      budget_type = 'fixed',
      budget_min = 0,
      budget_max = 0,
      currency = 'USD',
      duration,
      start_date,
      expected_completion,
      location_type = 'remote',
      country_id,
      priority = 'medium',
      skills = []
    } = projectData;

    // 1. Insert Project
    const [result] = await connection.query(
      `INSERT INTO projects (
        user_id, category_id, title, project_type, description, requirements,
        budget_type, budget_min, budget_max, currency, duration,
        start_date, expected_completion, location_type, country_id,
        status, priority, progress_percentage
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted', ?, 0)`,
      [
        userId,
        category_id ? parseInt(category_id, 10) : null,
        title,
        project_type,
        description,
        requirements || null,
        budget_type,
        parseFloat(budget_min) || 0,
        parseFloat(budget_max) || 0,
        currency,
        duration || null,
        start_date || null,
        expected_completion || null,
        location_type,
        country_id ? parseInt(country_id, 10) : null,
        priority
      ]
    );

    const projectId = result.insertId;

    // 2. Associate Skills
    let parsedSkillIds = [];
    if (typeof skills === 'string') {
      try {
        parsedSkillIds = JSON.parse(skills);
      } catch (e) {
        parsedSkillIds = skills.split(',').map(s => parseInt(s.trim(), 10)).filter(Boolean);
      }
    } else if (Array.isArray(skills)) {
      parsedSkillIds = skills.map(s => parseInt(s, 10)).filter(Boolean);
    }

    if (parsedSkillIds.length > 0) {
      const skillValues = parsedSkillIds.map(skillId => [projectId, skillId]);
      await connection.query(
        'INSERT IGNORE INTO project_skills (project_id, skill_id) VALUES ?',
        [skillValues]
      );
    }

    // 3. Attach Uploaded Files
    if (uploadedFiles && uploadedFiles.length > 0) {
      const fileValues = uploadedFiles.map(file => [
        projectId,
        file.originalname,
        file.filename,
        file.size,
        file.mimetype,
        userId
      ]);
      await connection.query(
        'INSERT INTO project_files (project_id, file_name, file_path, file_size, file_type, uploaded_by) VALUES ?',
        [fileValues]
      );
    }

    // 4. Notify Admin of New Project Request
    await connection.query(
      `INSERT INTO notifications (user_id, title, message, type, link)
       SELECT id, 'New Project Request Submitted', CONCAT('Project "', ?, '" has been submitted for review.'), 'admin', CONCAT('/admin/projects/', ?)
       FROM users WHERE role = 'admin'`,
      [title, projectId]
    );

    // 5. Notify User Confirmation
    await connection.query(
      `INSERT INTO notifications (user_id, title, message, type, link)
       VALUES (?, 'Project Request Received', CONCAT('Your project "', ?, '" is now under review by our technical team.'), 'project', CONCAT('/projects/', ?))`,
      [userId, title, projectId]
    );

    await connection.commit();
    connection.release();

    return await getProjectById(projectId);
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw error;
  }
}

export async function getProjects({ userId = null, role = 'user', search = '', status = '', project_type = '', category_id = '', country_id = '', page = 1, limit = 20 }) {
  const conditions = [];
  const params = [];

  if (role !== 'admin' && userId) {
    conditions.push('p.user_id = ?');
    params.push(userId);
  }

  if (search) {
    conditions.push('(p.title LIKE ? OR p.description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  if (status) {
    conditions.push('p.status = ?');
    params.push(status);
  }

  if (project_type) {
    conditions.push('p.project_type = ?');
    params.push(project_type);
  }

  if (category_id) {
    conditions.push('p.category_id = ?');
    params.push(category_id);
  }

  if (country_id) {
    conditions.push('p.country_id = ?');
    params.push(country_id);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const offset = (page - 1) * limit;

  const countQuery = `SELECT COUNT(*) AS total FROM projects p ${whereClause}`;
  const [countResult] = await pool.query(countQuery, params);
  const total = countResult[0].total;

  const dataQuery = `
    SELECT p.*,
           u.name AS client_name, u.email AS client_email, u.avatar AS client_avatar,
           c.name AS category_name, c.icon AS category_icon,
           cnt.name AS country_name, cnt.iso_code AS country_code,
           (SELECT COUNT(*) FROM project_files pf WHERE pf.project_id = p.id) AS files_count,
           (SELECT q.id FROM quotations q WHERE q.project_id = p.id ORDER BY q.id DESC LIMIT 1) AS latest_quotation_id,
           (SELECT q.status FROM quotations q WHERE q.project_id = p.id ORDER BY q.id DESC LIMIT 1) AS latest_quotation_status,
           (SELECT q.total FROM quotations q WHERE q.project_id = p.id ORDER BY q.id DESC LIMIT 1) AS quotation_total,
           (SELECT ct.id FROM contracts ct WHERE ct.project_id = p.id LIMIT 1) AS contract_id
    FROM projects p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN countries cnt ON p.country_id = cnt.id
    ${whereClause}
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `;

  const [projects] = await pool.query(dataQuery, [...params, limit, offset]);

  // Fetch skills for these projects
  if (projects.length > 0) {
    const projectIds = projects.map(p => p.id);
    const [skillsRows] = await pool.query(
      `SELECT ps.project_id, s.id AS skill_id, s.name AS skill_name
       FROM project_skills ps
       JOIN skills s ON ps.skill_id = s.id
       WHERE ps.project_id IN (?)`,
      [projectIds]
    );

    const skillsByProject = {};
    skillsRows.forEach(row => {
      if (!skillsByProject[row.project_id]) skillsByProject[row.project_id] = [];
      skillsByProject[row.project_id].push({ id: row.skill_id, name: row.skill_name });
    });

    projects.forEach(p => {
      p.skills = skillsByProject[p.id] || [];
    });
  }

  return {
    items: projects,
    pagination: {
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function getProjectById(projectId, requestingUser = null) {
  const [rows] = await pool.query(
    `SELECT p.*,
            u.id AS client_id, u.name AS client_name, u.email AS client_email, u.phone AS client_phone, u.avatar AS client_avatar,
            up.company_name AS client_company, up.city AS client_city, up.bio AS client_bio,
            c.name AS category_name, c.icon AS category_icon,
            cnt.name AS country_name, cnt.iso_code AS country_code, cnt.currency_symbol
     FROM projects p
     JOIN users u ON p.user_id = u.id
     LEFT JOIN user_profiles up ON u.id = up.user_id
     LEFT JOIN categories c ON p.category_id = c.id
     LEFT JOIN countries cnt ON p.country_id = cnt.id
     WHERE p.id = ?`,
    [projectId]
  );

  if (rows.length === 0) {
    const err = new Error('Project not found');
    err.statusCode = 404;
    throw err;
  }

  const project = rows[0];

  // Role check: User can only see their own projects
  if (requestingUser && requestingUser.role !== 'admin' && project.user_id !== requestingUser.id) {
    const err = new Error('Access denied: You do not have permission to view this project.');
    err.statusCode = 403;
    throw err;
  }

  // Fetch Skills
  const [skills] = await pool.query(
    `SELECT s.id, s.name, s.category_id
     FROM project_skills ps
     JOIN skills s ON ps.skill_id = s.id
     WHERE ps.project_id = ?`,
    [projectId]
  );
  project.skills = skills;

  // Fetch Project Files
  const [files] = await pool.query(
    `SELECT pf.*, u.name AS uploader_name, u.role AS uploader_role
     FROM project_files pf
     JOIN users u ON pf.uploaded_by = u.id
     WHERE pf.project_id = ?
     ORDER BY pf.created_at DESC`,
    [projectId]
  );
  project.files = files;

  // Fetch Latest Quotation if any
  const [quotations] = await pool.query(
    `SELECT q.*, u.name AS creator_name
     FROM quotations q
     JOIN users u ON q.created_by = u.id
     WHERE q.project_id = ?
     ORDER BY q.created_at DESC`,
    [projectId]
  );
  project.quotations = quotations;
  project.latest_quotation = quotations[0] || null;

  // Fetch Contract & Milestones if exists
  const [contracts] = await pool.query(
    `SELECT * FROM contracts WHERE project_id = ? ORDER BY id DESC LIMIT 1`,
    [projectId]
  );
  project.contract = contracts[0] || null;

  if (project.contract) {
    const [milestones] = await pool.query(
      `SELECT m.*,
              (SELECT COUNT(*) FROM tasks t WHERE t.milestone_id = m.id) AS total_tasks,
              (SELECT COUNT(*) FROM tasks t WHERE t.milestone_id = m.id AND t.status = 'completed') AS completed_tasks,
              p.status AS payment_status, p.id AS payment_id, p.transaction_id
       FROM milestones m
       LEFT JOIN payments p ON p.milestone_id = m.id
       WHERE m.contract_id = ?
       ORDER BY m.id ASC`,
      [project.contract.id]
    );

    // Fetch tasks for each milestone
    if (milestones.length > 0) {
      const milestoneIds = milestones.map(m => m.id);
      const [tasks] = await pool.query(
        `SELECT * FROM tasks WHERE milestone_id IN (?) ORDER BY id ASC`,
        [milestoneIds]
      );
      const tasksByMilestone = {};
      tasks.forEach(t => {
        if (!tasksByMilestone[t.milestone_id]) tasksByMilestone[t.milestone_id] = [];
        tasksByMilestone[t.milestone_id].push(t);
      });
      milestones.forEach(m => {
        m.tasks = tasksByMilestone[m.id] || [];
      });
    }

    project.milestones = milestones;
  } else {
    project.milestones = [];
  }

  // Fetch Review if exists
  const [reviews] = await pool.query(
    `SELECT r.*, u.name AS reviewer_name, u.avatar AS reviewer_avatar
     FROM reviews r
     JOIN users u ON r.user_id = u.id
     WHERE r.project_id = ?`,
    [projectId]
  );
  project.review = reviews[0] || null;

  return project;
}

export async function updateProjectStatus(projectId, status, adminNotes = null, progressPercentage = null) {
  const updates = ['status = ?'];
  const params = [status];

  if (adminNotes !== null) {
    updates.push('admin_notes = ?');
    params.push(adminNotes);
  }

  if (progressPercentage !== null) {
    updates.push('progress_percentage = ?');
    params.push(parseInt(progressPercentage, 10));
  }

  params.push(projectId);

  await pool.query(`UPDATE projects SET ${updates.join(', ')} WHERE id = ?`, params);

  // Send status update notification to project owner
  const [projectRows] = await pool.query('SELECT user_id, title FROM projects WHERE id = ?', [projectId]);
  if (projectRows.length > 0) {
    const proj = projectRows[0];
    const statusLabels = {
      under_review: 'is now under technical review',
      quotation_sent: 'has an official quotation ready for review',
      approved: 'has been approved',
      in_progress: 'is now in progress',
      completed: 'has been successfully completed! Please leave a review.',
      cancelled: 'has been marked as cancelled',
      rejected: 'was reviewed and rejected'
    };
    const message = `Your project "${proj.title}" ${statusLabels[status] || `status changed to ${status}`}.`;
    await pool.query(
      `INSERT INTO notifications (user_id, title, message, type, link) VALUES (?, 'Project Status Updated', ?, 'project', ?)`,
      [proj.user_id, message, `/projects/${projectId}`]
    );
  }

  return await getProjectById(projectId);
}

export async function addProjectFile(projectId, file, uploadedBy) {
  const [result] = await pool.query(
    `INSERT INTO project_files (project_id, file_name, file_path, file_size, file_type, uploaded_by)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [projectId, file.originalname, file.filename, file.size, file.mimetype, uploadedBy]
  );

  return {
    id: result.insertId,
    project_id: projectId,
    file_name: file.originalname,
    file_path: file.filename,
    file_size: file.size,
    file_type: file.mimetype,
    uploaded_by: uploadedBy
  };
}
