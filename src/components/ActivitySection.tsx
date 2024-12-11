import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight } from 'lucide-react';

const activityData = [
  { day: 'Mo', value: 1000, transactions: 145 },
  { day: 'Tu', value: 2000, transactions: 232 },
  { day: 'We', value: 3000, transactions: 321 },
  { day: 'Th', value: 4000, transactions: 445 },
  { day: 'Fr', value: 3500, transactions: 398 },
  { day: 'Sa', value: 2500, transactions: 265 },
  { day: 'Su', value: 1500, transactions: 178 },
];

export default function ActivitySection() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Weekly Activity</h2>
          <p className="text-gray-400 text-sm mt-1">Transaction volume and count</p>
        </div>
        <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-400 text-sm">
          <span>Detailed Report</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="day"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickLine={{ stroke: '#4B5563' }}
            />
            <YAxis
              yAxisId="left"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickLine={{ stroke: '#4B5563' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickLine={{ stroke: '#4B5563' }}
              tickFormatter={(value) => `${value} tx`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelStyle={{ color: '#9CA3AF' }}
              itemStyle={{ color: '#E5E7EB' }}
            />
            <Bar
              yAxisId="left"
              dataKey="value"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              name="Volume"
            />
            <Bar
              yAxisId="right"
              dataKey="transactions"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              name="Transactions"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}