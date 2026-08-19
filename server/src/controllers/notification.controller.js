import * as notifService from '../services/notification.service.js';
import { successResponse } from '../utils/response.js';

export async function getNotifications(req, res, next) {
  try {
    const notifications = await notifService.getUserNotifications(req.user.id);
    const unreadCount = await notifService.getUnreadCount(req.user.id);
    return successResponse(res, 'Notifications retrieved.', { notifications, unreadCount });
  } catch (error) {
    next(error);
  }
}

export async function markAsRead(req, res, next) {
  try {
    const { id } = req.params;
    await notifService.markNotificationAsRead(id, req.user.id);
    return successResponse(res, 'Notification marked as read.');
  } catch (error) {
    next(error);
  }
}

export async function markAllAsRead(req, res, next) {
  try {
    await notifService.markAllNotificationsAsRead(req.user.id);
    return successResponse(res, 'All notifications marked as read.');
  } catch (error) {
    next(error);
  }
}
