import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, Info, Check } from 'lucide-react';
import { useNotifications } from './NotificationProvider';
import { format } from 'date-fns';
import { cn } from '../../utils/cn';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'alert':
      return <AlertTriangle className="text-red-500" size={16} />;
    case 'success':
      return <Check className="text-green-500" size={16} />;
    default:
      return <Info className="text-blue-500" size={16} />;
  }
};

export default function NotificationList() {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotifications();

  return (
    <div className="w-96 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="text-gray-400" size={20} />
          <h3 className="text-white font-medium">Notifications</h3>
          {notifications.length > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              {notifications.length}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={markAllAsRead}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Mark all as read
          </button>
          <button
            onClick={clearNotifications}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        <AnimatePresence>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className={cn(
                  'p-4 border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors',
                  !notification.read && 'bg-gray-700/30'
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white line-clamp-2">{notification.message}</p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {format(new Date(notification.timestamp), 'PPp')}
                    </span>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center text-gray-400"
            >
              <Bell className="mx-auto mb-3 text-gray-500" size={24} />
              <p>No notifications</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}