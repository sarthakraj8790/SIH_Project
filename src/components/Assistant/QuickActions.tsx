import React from 'react';
import { motion } from 'framer-motion';

interface QuickActionsProps {
  onSelect: (action: string) => void;
}

const quickActions = [
  'How to analyze a wallet?',
  'Check transaction risk',
  'View recent alerts',
  'Generate report'
];

export default function QuickActions({ onSelect }: QuickActionsProps) {
  return (
    <div className="p-4 border-t border-gray-700">
      <div className="flex flex-wrap gap-2">
        {quickActions.map((action) => (
          <motion.button
            key={action}
            onClick={() => onSelect(action)}
            className="bg-gray-700 text-white text-sm px-3 py-1 rounded-full hover:bg-gray-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {action}
          </motion.button>
        ))}
      </div>
    </div>
  );
}