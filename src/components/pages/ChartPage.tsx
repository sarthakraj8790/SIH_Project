import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as Tabs from '@radix-ui/react-tabs';

const timeframes = [
  { label: '1h', value: '1h' },
  { label: '3h', value: '3h' },
  { label: '1d', value: '1d' },
  { label: '1w', value: '1w' },
  { label: '1m', value: '1m' },
];

const chartTypes = [
  { label: 'Line', value: 'line' },
  { label: 'Candlestick', value: 'candlestick' },
  { label: 'Bar', value: 'bar' },
];

export default function ChartPage() {
  const [timeframe, setTimeframe] = useState('1h');
  const [chartType, setChartType] = useState('line');

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-white">Advanced Chart Analysis</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Tabs.Root value={timeframe} onValueChange={setTimeframe}>
            <Tabs.List className="flex space-x-2 bg-gray-700 rounded-lg p-1">
              {timeframes.map(({ label, value }) => (
                <Tabs.Trigger
                  key={value}
                  value={value}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    timeframe === value
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>

          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-3 py-1 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {chartTypes.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={[]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
              }}
            />
            <Line type="monotone" dataKey="value" stroke="#3B82F6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}