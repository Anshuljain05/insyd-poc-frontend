'use client';

import { useEffect, useState } from 'react';
import { NotificationApi } from '@/lib/notification-api';
import { NotificationSocket } from '@/lib/notification-socket';
import { Notification } from '@/types/notification';
import { NotificationItem } from './NotificationItem';

interface NotificationListProps {
  userId: string;
  apiUrl: string;
  refreshTrigger?: number;
}

export function NotificationList({ userId, apiUrl, refreshTrigger }: NotificationListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const api = new NotificationApi(apiUrl, userId);
    // Initialize WebSocket connection
    const socket = new NotificationSocket(userId, apiUrl);
    
    socket.onNotification((newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
    });

    socket.connect();

    // Load initial notifications
    const loadNotifications = async () => {
      try {
        const data = await api.getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Failed to load notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();

    return () => {
      socket.disconnect();
    };
  }, [userId, apiUrl]);

  // Refresh notifications when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      const api = new NotificationApi(apiUrl, userId);
      api.getNotifications()
        .then(data => setNotifications(data))
        .catch(error => console.error('Failed to refresh notifications:', error));
    }
  }, [refreshTrigger, userId, apiUrl]);

  const handleMarkAsRead = async (id: string) => {
    try {
      const api = new NotificationApi(apiUrl, userId);
      await api.markAsRead(id);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const api = new NotificationApi(apiUrl, userId);
      await api.markAllAsRead();
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center space-x-3 text-slate-400">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
          <span>Loading notifications...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-white">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium">
              {unreadCount} unread
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-slate-800/50 rounded-lg p-8 text-center border border-slate-700/50">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-lg font-medium text-white mb-2">No notifications yet</h3>
            <p className="text-slate-400">
              Use the demo controls above to create some notifications and see them appear here in real-time.
            </p>
          </div>
        ) : (
          notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        )}
      </div>
    </div>
  );
}
