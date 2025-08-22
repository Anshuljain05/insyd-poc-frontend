import { Notification, NotificationPreferences } from '@/types/notification';

export class NotificationApi {
  constructor(private baseUrl: string, private userId: string) {}

  async getNotifications(isRead?: boolean, limit = 50): Promise<Notification[]> {
    const params = new URLSearchParams();
    params.append('userId', this.userId);
    if (isRead !== undefined) params.append('is_read', String(isRead));
    params.append('limit', String(limit));

    const response = await fetch(`${this.baseUrl}/v1/notifications?${params}`);
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return response.json();
  }

  async markAsRead(notificationId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/v1/notifications/${notificationId}/read`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to mark notification as read');
  }

  async markAllAsRead(): Promise<void> {
    const params = new URLSearchParams();
    params.append('userId', this.userId);
    
    const response = await fetch(`${this.baseUrl}/v1/notifications/read-all?${params}`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to mark all notifications as read');
  }

  async getPreferences(): Promise<NotificationPreferences> {
    const params = new URLSearchParams();
    params.append('userId', this.userId);
    
    const response = await fetch(`${this.baseUrl}/v1/notifications/preferences?${params}`);
    if (!response.ok) throw new Error('Failed to fetch preferences');
    return response.json();
  }

  async updatePreferences(preferences: NotificationPreferences): Promise<void> {
    const response = await fetch(`${this.baseUrl}/v1/notifications/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });
    if (!response.ok) throw new Error('Failed to update preferences');
  }
}
