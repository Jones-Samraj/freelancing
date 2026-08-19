import * as projectService from '../services/project.service.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';

export async function createProject(req, res, next) {
  try {
    const uploadedFiles = req.files || [];
    const project = await projectService.createProject(req.user.id, req.body, uploadedFiles);
    return successResponse(res, 'Project submitted successfully for admin review.', { project }, 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function getProjects(req, res, next) {
  try {
    const { search, status, project_type, category_id, country_id, page = 1, limit = 20 } = req.query;
    const result = await projectService.getProjects({
      userId: req.user.id,
      role: req.user.role,
      search,
      status,
      project_type,
      category_id,
      country_id,
      page,
      limit
    });
    return paginatedResponse(res, 'Projects retrieved.', result.items, result.pagination);
  } catch (error) {
    next(error);
  }
}

export async function getPublicProjects(req, res, next) {
  try {
    const { search, project_type, page = 1, limit = 12 } = req.query;
    const result = await projectService.getProjects({
      userId: null,
      role: 'admin', // Allow querying public completed/active showcase
      search,
      project_type,
      page,
      limit
    });
    return paginatedResponse(res, 'Public projects retrieved.', result.items, result.pagination);
  } catch (error) {
    next(error);
  }
}

export async function getProjectById(req, res, next) {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id, req.user);
    return successResponse(res, 'Project details retrieved.', { project });
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function updateProjectStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, admin_notes, progress_percentage } = req.body;
    const updated = await projectService.updateProjectStatus(id, status, admin_notes, progress_percentage);
    return successResponse(res, 'Project status updated successfully.', { project: updated });
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function uploadFile(req, res, next) {
  try {
    const { id } = req.params;
    if (!req.file) {
      return errorResponse(res, 'No file uploaded.', 400);
    }
    const fileRecord = await projectService.addProjectFile(id, req.file, req.user.id);
    return successResponse(res, 'File uploaded successfully.', { file: fileRecord }, 201);
  } catch (error) {
    next(error);
  }
}
