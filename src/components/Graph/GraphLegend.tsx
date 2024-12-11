import React from 'react';
import { motion } from 'framer-motion';

export default function GraphLegend() {
  return (
    <motion.div
      className="bg-gray-800 p-4 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-white font-medium mb-4">Legend</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full bg-indigo-600" />
          <span className="text-gray-300 text-sm">Normal Wallet</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full bg-red-600" />
          <span className="text-gray-300 text-sm">Suspicious Wallet</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-0.5 w-8 bg-gray-500" />
          <span className="text-gray-300 text-sm">Transaction</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-2 w-8 bg-gray-500" />
          <span className="text-gray-300 text-sm">High-value Transaction</span>
        </div>
      </div>
    </motion.div>
  );
}