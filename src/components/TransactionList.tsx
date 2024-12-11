import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import type { Transaction } from '../types/transaction';

interface TransactionListProps {
  transactions: Transaction[];
  walletAddress: string;
}

export default function TransactionList({ transactions, walletAddress }: TransactionListProps) {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {transactions.map((tx) => (
          <div key={tx.hash} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {tx.from.toLowerCase() === walletAddress.toLowerCase() ? (
                  <ArrowUpRight className="text-red-500" />
                ) : (
                  <ArrowDownLeft className="text-green-500" />
                )}
                <div>
                  <p className="text-sm text-gray-600">
                    {tx.from.toLowerCase() === walletAddress.toLowerCase() ? 'To: ' : 'From: '}
                    <span className="font-mono">{tx.from.toLowerCase() === walletAddress.toLowerCase() ? tx.to : tx.from}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(tx.timestamp * 1000, { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{web3.utils.fromWei(tx.value, 'ether')} ETH</p>
                <p className="text-xs text-gray-500">Gas: {web3.utils.fromWei(tx.gasPrice, 'gwei')} gwei</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}