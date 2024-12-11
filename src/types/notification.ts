export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success';
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}