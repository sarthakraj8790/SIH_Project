import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import WalletInput from '../WalletInput';
import RiskScore from '../RiskScore';
import { useWallet } from '../../hooks/useWallet';
import TransactionList from '../TransactionList';

export default function WalletPage() {
  const { balance, transactions, isLoading, fetchWalletData } = useWallet();

  const handleWalletSubmit = async (address: string) => {
    await fetchWalletData(address);
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-gray-800 p-6 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Wallet Analysis</h2>
        <WalletInput onSubmit={handleWalletSubmit} />
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      ) : balance !== '0' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Wallet Overview</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Balance</label>
                <p className="text-white text-2xl font-semibold">{balance} ETH</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Transaction Count</label>
                <p className="text-white">{transactions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <RiskScore score={Math.floor(Math.random() * 100)} />
          </div>

          {transactions.length > 0 && (
            <div className="md:col-span-2">
              <TransactionList transactions={transactions} />
            </div>
          )}

          <div className="bg-gray-800 p-6 rounded-lg md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Security Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="text-green-500" size={20} />
                  <h4 className="text-white font-medium">Security Score</h4>
                </div>
                <p className="text-gray-300">
                  Based on transaction patterns and historical data
                </p>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="text-yellow-500" size={20} />
                  <h4 className="text-white font-medium">Risk Factors</h4>
                </div>
                <p className="text-gray-300">
                  Analysis of potential security concerns
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}