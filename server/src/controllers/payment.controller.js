import * as paymentService from '../services/payment.service.js';
import { successResponse } from '../utils/response.js';

export async function getPayments(req, res, next) {
  try {
    const { contractId, status } = req.query;
    const payments = await paymentService.getPayments({
      userId: req.user.id,
      role: req.user.role,
      contractId,
      status
    });
    return successResponse(res, 'Payments retrieved successfully.', { payments });
  } catch (error) {
    next(error);
  }
}

export async function getPaymentStats(req, res, next) {
  try {
    const stats = await paymentService.getPaymentStats();
    return successResponse(res, 'Payment statistics retrieved.', { stats });
  } catch (error) {
    next(error);
  }
}
