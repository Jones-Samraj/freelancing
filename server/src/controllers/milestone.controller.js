import * as milestoneService from '../services/milestone.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function submitMilestone(req, res, next) {
  try {
    const { id } = req.params;
    const { submissionNotes } = req.body;
    const result = await milestoneService.submitMilestone(id, req.user.id, { submissionNotes });
    return successResponse(res, 'Milestone submitted to client for approval.', { milestone: result });
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function approveMilestone(req, res, next) {
  try {
    const { id } = req.params;
    const result = await milestoneService.approveMilestone(id, req.user.id);
    return successResponse(res, 'Milestone approved and payment status updated.', result);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function createTask(req, res, next) {
  try {
    const { id } = req.params; // milestone id
    const task = await milestoneService.createMilestoneTask(id, req.body);
    return successResponse(res, 'Task created successfully.', { task }, 201);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const task = await milestoneService.updateTaskStatus(taskId, status);
    return successResponse(res, 'Task status updated.', { task });
  } catch (error) {
    next(error);
  }
}
