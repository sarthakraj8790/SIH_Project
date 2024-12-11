import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react';

const recentTransactions = [
  {
    id: 1,
    type: 'received',
    amount: '0.25 ETH',
    from: '0x1234...5678',
    time: '2 min ago',
    value: '$450.25',
  },
  {
    id: 2,
    type: 'sent',
    amount: '0.5 BTC',
    to: '0x8765...4321',
    time: '5 min ago',
    value: '$21,450.75',
  },
  {
    id: 3,
    type: 'received',
    amount: '100 SOL',
    from: '0x2468...1357',
    time: '10 min ago',
    value: '$1,250.00',
  },
];

export default function TransactionSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = recentTransactions.filter(
    (tx) =>
      tx.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.to?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
          <button className="text-blue-500 hover:text-blue-400 text-sm">View All</button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
        
        <div className="space-y-4 mt-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {transaction.type === 'received' ? (
                  <div className="p-2 bg-green-500/20 rounded-full">
                    <ArrowDownLeft className="text-green-500" size={20} />
                  </div>
                ) : (
                  <div className="p-2 bg-red-500/20 rounded-full">
                    <ArrowUpRight className="text-red-500" size={20} />
                  </div>
                )}
                <div>
                  <p className="text-white text-sm font-medium">
                    {transaction.type === 'received' ? 'From: ' : 'To: '}
                    <span className="text-gray-400 font-mono">
                      {transaction.type === 'received' ? transaction.from : transaction.to}
                    </span>
                  </p>
                  <p className="text-gray-400 text-xs">{transaction.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{transaction.amount}</p>
                <p className="text-gray-400 text-sm">{transaction.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}