import * as messageService from '../services/message.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function getProjectMessages(req, res, next) {
  try {
    const { projectId } = req.params;
    const messages = await messageService.getProjectMessages(projectId, req.user.id, req.user.role);
    return successResponse(res, 'Messages retrieved.', { messages });
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function sendMessage(req, res, next) {
  try {
    const { projectId } = req.params;
    const { message } = req.body;
    const attachment = req.file ? req.file.filename : null;

    if (!message && !attachment) {
      return errorResponse(res, 'Message text or attachment is required.', 400);
    }

    const newMsg = await messageService.sendMessage(projectId, req.user.id, req.user.role, {
      message: message || (attachment ? 'Sent an attachment' : ''),
      attachment
    });

    return successResponse(res, 'Message sent successfully.', { message: newMsg }, 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
