import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, FileText } from 'lucide-react';

const stats = [
  {
    label: 'Monitored Transactions',
    value: '1,234',
    icon: Activity,
    color: 'text-blue-500',
  },
  {
    label: 'Risk Alerts',
    value: '56',
    icon: AlertTriangle,
    color: 'text-yellow-500',
  },
  {
    label: 'Generated Reports',
    value: '89',
    icon: FileText,
    color: 'text-green-500',
  },
];

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-gray-700 p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
            <stat.icon className={`${stat.color}`} size={24} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}