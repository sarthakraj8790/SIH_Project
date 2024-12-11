import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, FileText, Search } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'analysis',
    title: 'Wallet Analysis Completed',
    description: 'Analysis of wallet 0x1234...5678 completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    icon: Search,
    color: 'text-blue-500',
  },
  {
    id: 2,
    type: 'alert',
    title: 'Suspicious Activity Detected',
    description: 'High-value transaction detected in monitored wallet',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    icon: AlertTriangle,
    color: 'text-yellow-500',
  },
  {
    id: 3,
    type: 'report',
    title: 'Monthly Report Generated',
    description: 'March 2024 security report has been generated',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    icon: FileText,
    color: 'text-green-500',
  },
];

export default function ProfileActivity() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        <button className="text-blue-500 hover:text-blue-400 text-sm">View All</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="bg-gray-700 p-4 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 bg-gray-600 rounded-lg ${activity.color}`}>
                <activity.icon size={16} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{activity.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{activity.description}</p>
                <span className="text-gray-500 text-xs mt-2 block">
                  {activity.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}