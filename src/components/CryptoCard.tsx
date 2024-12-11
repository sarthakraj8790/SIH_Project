import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoCardProps {
  name: string;
  symbol: string;
  price: string;
  change: string;
  trend: 'up' | 'down';
}

export default function CryptoCard({ name, symbol, price, change, trend }: CryptoCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-gray-400">{symbol}</span>
        </div>
        {trend === 'up' ? (
          <TrendingUp className="text-green-500" size={20} />
        ) : (
          <TrendingDown className="text-red-500" size={20} />
        )}
      </div>
      <div className="mb-2">
        <h3 className="text-2xl font-bold text-white">${price}</h3>
        <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}