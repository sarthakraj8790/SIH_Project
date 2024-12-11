import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';

const mockAlerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Suspicious Transaction Pattern Detected',
    description: 'Multiple high-value transactions detected in short succession',
    timestamp: new Date(),
    status: 'unread',
  },
  {
    id: 2,
    type: 'warning',
    title: 'New Wallet Connection',
    description: 'Unknown wallet address connected to monitored address',
    timestamp: new Date(Date.now() - 3600000),
    status: 'read',
  },
  // Add more mock alerts
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState('all');

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="text-red-500" />;
      case 'warning':
        return <Bell className="text-yellow-500" />;
      default:
        return <Info className="text-blue-500" />;
    }
  };

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'read' } : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.status === filter
  );

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-gray-800 p-6 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Alerts</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
          >
            <option value="all">All Alerts</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              className={`bg-gray-700 p-4 rounded-lg ${
                alert.status === 'unread' ? 'border-l-4 border-blue-500' : ''
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <h3 className="text-white font-medium">{alert.title}</h3>
                    <p className="text-gray-300 text-sm mt-1">{alert.description}</p>
                    <span className="text-gray-400 text-xs mt-2 block">
                      {alert.timestamp.toLocaleString()}
                    </span>
                  </div>
                </div>
                {alert.status === 'unread' && (
                  <button
                    onClick={() => markAsRead(alert.id)}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <CheckCircle size={20} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}