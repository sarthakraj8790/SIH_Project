import React, { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import { saveAs } from 'file-saver';
import WalletInput from '../WalletInput';
import TransactionList from '../TransactionList';
import { Transaction } from '../../types/transaction';
import { getTransactionHistory } from '../../utils/web3';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState('all');

  const handleWalletSubmit = async (address: string) => {
    setIsLoading(true);
    try {
      const txs = await getTransactionHistory(address);
      setTransactions(txs);
      setWalletAddress(address);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Hash', 'From', 'To', 'Value (ETH)', 'Gas Price (Gwei)', 'Timestamp'],
      ...transactions.map(tx => [
        tx.hash,
        tx.from,
        tx.to,
        web3.utils.fromWei(tx.value, 'ether'),
        web3.utils.fromWei(tx.gasPrice, 'gwei'),
        new Date(tx.timestamp * 1000).toISOString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `transactions-${walletAddress}.csv`);
  };

  const filteredTransactions = transactions.filter(tx => {
    if (dateRange === 'all') return true;
    const txDate = new Date(tx.timestamp * 1000);
    const now = new Date();
    const daysDiff = (now.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= parseInt(dateRange);
  });

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Transaction Analysis</h2>
        <WalletInput onSubmit={handleWalletSubmit} />
      </div>

      {walletAddress && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Filter className="text-gray-400" size={20} />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <TransactionList transactions={filteredTransactions} walletAddress={walletAddress} />
          )}
        </div>
      )}
    </div>
  );
}