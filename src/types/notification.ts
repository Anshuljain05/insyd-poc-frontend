export type NotificationType = 'social' | 'collaboration' | 'system';

export interface Notification {
  id: string;
  recipientId: string;
  type: NotificationType;
  title: string;
  body: string;
  dataJson: Record<string, unknown>;
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  channels: {
    in_app: boolean;
    email: boolean;
  };
  types: {
    [key in NotificationType]: boolean;
  };
  digest_cadence: 'none' | 'daily' | 'weekly';
}
