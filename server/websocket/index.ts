import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { verifyToken } from '../utils/auth';
import { NotificationService } from '../services/NotificationService';

export function initializeWebSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? 'https://your-production-domain.com' 
        : 'http://localhost:5173',
      credentials: true
    }
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        throw new Error('Authentication error');
      }
      const decoded = verifyToken(token);
      socket.data.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  // Handle connections
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Subscribe to user-specific notifications
    socket.join(`user:${socket.data.userId}`);

    // Handle mark as read
    socket.on('markAsRead', async (notificationId: string) => {
      try {
        await NotificationService.markAsRead(notificationId, socket.data.userId);
        io.to(`user:${socket.data.userId}`).emit('notificationUpdated', {
          id: notificationId,
          read: true
        });
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    });

    // Handle mark all as read
    socket.on('markAllAsRead', async () => {
      try {
        await NotificationService.markAllAsRead(socket.data.userId);
        io.to(`user:${socket.data.userId}`).emit('allNotificationsRead');
      } catch (error) {
        console.error('Error marking all notifications as read:', error);
      }
    });

    // Handle clear notifications
    socket.on('clearNotifications', async () => {
      try {
        await NotificationService.clearNotifications(socket.data.userId);
        io.to(`user:${socket.data.userId}`).emit('notificationsCleared');
      } catch (error) {
        console.error('Error clearing notifications:', error);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}