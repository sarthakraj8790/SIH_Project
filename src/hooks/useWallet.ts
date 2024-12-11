import { useState, useCallback } from 'react';
import { walletService } from '../services/web3/WalletService';
import { Transaction } from '../types/transaction';
import { toast } from 'react-hot-toast';

export function useWallet() {
  const [balance, setBalance] = useState<string>('0');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string>('');

  const fetchWalletData = useCallback(async (address: string) => {
    if (!address || address === currentAddress) return;
    
    setIsLoading(true);
    setError(null);

    const loadingToast = toast.loading('Fetching wallet data...');

    try {
      // Validate address first
      const isValid = await walletService.isValidAddress(address);
      if (!isValid) {
        throw new Error('Invalid Ethereum address');
      }

      setCurrentAddress(address);

      // Fetch data in parallel
      const [newBalance, txHistory] = await Promise.all([
        walletService.getBalance(address),
        walletService.getTransactionHistory(address)
      ]);

      setBalance(newBalance);
      setTransactions(txHistory);

      toast.success('Wallet data loaded successfully', {
        id: loadingToast,
      });

      if (txHistory.length === 0) {
        toast.info('No transactions found for this address');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch wallet data';
      setError(errorMessage);
      toast.error(errorMessage, {
        id: loadingToast,
      });
      
      // Reset state on error
      setBalance('0');
      setTransactions([]);
      setCurrentAddress('');
    } finally {
      setIsLoading(false);
    }
  }, [currentAddress]);

  return {
    balance,
    transactions,
    isLoading,
    error,
    currentAddress,
    fetchWalletData
  };
}