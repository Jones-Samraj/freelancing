import React from 'react';
import { Bell, Check, ExternalLink } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { Card, Button, Badge } from '../../components/common';
import { Link } from 'react-router-dom';

export function Notifications() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-blue-600" />
            Notifications Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            System updates, quotation alerts, and milestone review requests.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button size="sm" variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <Card className="divide-y divide-slate-100 dark:divide-slate-800">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            You are all caught up! No notifications.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                !n.is_read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
              }`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{n.title}</h4>
                  {!n.is_read && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.message}</p>
                <span className="text-[10px] text-slate-400 block pt-1">
                  {new Date(n.created_at).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {n.link && (
                  <Link
                    to={n.link}
                    onClick={() => markAsRead(n.id)}
                    className="p-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>View</span> <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
                {!n.is_read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Mark read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}
