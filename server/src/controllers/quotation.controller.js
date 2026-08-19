import * as quotationService from '../services/quotation.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function createQuotation(req, res, next) {
  try {
    const quotation = await quotationService.createQuotation(req.user.id, req.body);
    return successResponse(res, 'Quotation generated successfully.', { quotation }, 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function getQuotationById(req, res, next) {
  try {
    const { id } = req.params;
    const quotation = await quotationService.getQuotationById(id, req.user);
    return successResponse(res, 'Quotation details retrieved.', { quotation });
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function getQuotations(req, res, next) {
  try {
    const { projectId, status } = req.query;
    const quotations = await quotationService.getQuotations({
      userId: req.user.id,
      role: req.user.role,
      projectId,
      status
    });
    return successResponse(res, 'Quotations retrieved.', { quotations });
  } catch (error) {
    next(error);
  }
}

export async function respondToQuotation(req, res, next) {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;
    const updated = await quotationService.respondToQuotation(id, req.user.id, { status, reason });
    return successResponse(res, `Quotation ${status} successfully.`, { quotation: updated });
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}
