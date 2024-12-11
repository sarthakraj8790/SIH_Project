import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Clock, DollarSign, AlertTriangle } from 'lucide-react';

interface GraphControlsProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  minAmount: number;
  setMinAmount: (amount: number) => void;
  showSuspicious: boolean;
  setShowSuspicious: (show: boolean) => void;
}

export default function GraphControls({
  timeRange,
  setTimeRange,
  minAmount,
  setMinAmount,
  showSuspicious,
  setShowSuspicious,
}: GraphControlsProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-medium flex items-center">
          <Filter size={16} className="mr-2" />
          Filters
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Clock size={16} className="inline mr-2" />
            Time Range
          </label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="all">All time</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <DollarSign size={16} className="inline mr-2" />
            Minimum Amount
          </label>
          <input
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(Number(e.target.value))}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount..."
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
            <AlertTriangle size={16} />
            <span>Show Suspicious Only</span>
            <motion.button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                showSuspicious ? 'bg-blue-600' : 'bg-gray-600'
              }`}
              onClick={() => setShowSuspicious(!showSuspicious)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showSuspicious ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </motion.button>
          </label>
        </div>
      </div>
    </div>
  );
}