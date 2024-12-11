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

const currencies = [
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
  { label: 'GBP', value: 'gbp' },
];

const data = {
  '1h': [
    { time: '19:10', value: 35000 },
    { time: '19:20', value: 38000 },
    { time: '19:30', value: 32000 },
    { time: '19:40', value: 40000 },
    { time: '19:50', value: 35000 },
  ],
  '3h': [/* Similar data structure */],
  '1d': [/* Similar data structure */],
  '1w': [/* Similar data structure */],
  '1m': [/* Similar data structure */],
};

export default function ChartSection() {
  const [timeframe, setTimeframe] = useState('1h');
  const [currency, setCurrency] = useState('usd');

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-white">Price Chart</h2>
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
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-3 py-1 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencies.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="h-[400px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data[timeframe]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickLine={{ stroke: '#4B5563' }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickLine={{ stroke: '#4B5563' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
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
              formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#3B82F6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}