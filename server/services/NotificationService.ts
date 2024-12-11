import { AppDataSource } from '../config/database';
import { Notification } from '../entities/Notification';

export class NotificationService {
  private static notificationRepository = AppDataSource.getRepository(Notification);

  static async create(data: {
    userId: string;
    type: string;
    message: string;
  }) {
    const notification = this.notificationRepository.create({
      ...data,
      timestamp: new Date(),
      read: false
    });
    return await this.notificationRepository.save(notification);
  }

  static async markAsRead(id: string, userId: string) {
    return await this.notificationRepository.update(
      { id, userId },
      { read: true }
    );
  }

  static async markAllAsRead(userId: string) {
    return await this.notificationRepository.update(
      { userId, read: false },
      { read: true }
    );
  }

  static async clearNotifications(userId: string) {
    return await this.notificationRepository.delete({ userId });
  }

  static async getUnreadCount(userId: string) {
    return await this.notificationRepository.count({
      where: { userId, read: false }
    });
  }

  static async getUserNotifications(userId: string) {
    return await this.notificationRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' }
    });
  }
}