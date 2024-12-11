import Web3Provider from './Web3Provider';
import { Transaction } from '../../types/transaction';
import { toast } from 'react-hot-toast';

export class WalletService {
  private web3Provider = Web3Provider.getInstance();

  async getBalance(address: string): Promise<string> {
    try {
      const web3 = await this.web3Provider.getWeb3();
      
      if (!web3.utils.isAddress(address)) {
        throw new Error('Invalid Ethereum address');
      }

      const balance = await web3.eth.getBalance(address);
      return web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Error fetching balance:', error);
      toast.error('Failed to fetch wallet balance');
      return '0';
    }
  }

  async getTransactionHistory(address: string): Promise<Transaction[]> {
    try {
      const web3 = await this.web3Provider.getWeb3();
      
      if (!web3.utils.isAddress(address)) {
        throw new Error('Invalid Ethereum address');
      }

      const blockNumber = await web3.eth.getBlockNumber();
      const startBlock = Math.max(0, blockNumber - 10000); // Get last 10000 blocks

      const logs = await web3.eth.getPastLogs({
        fromBlock: startBlock,
        toBlock: 'latest',
        address,
      });

      const transactions = await Promise.all(
        logs.map(async (log) => {
          try {
            const tx = await web3.eth.getTransaction(log.transactionHash);
            const block = await web3.eth.getBlock(log.blockNumber);
            
            if (!tx || !block) return null;

            return {
              hash: tx.hash,
              from: tx.from,
              to: tx.to || '',
              value: tx.value.toString(),
              timestamp: block.timestamp,
              gasPrice: tx.gasPrice?.toString() || '0',
              gasUsed: '0',
            };
          } catch (error) {
            console.error('Error processing transaction:', error);
            return null;
          }
        })
      );

      return transactions.filter((tx): tx is Transaction => tx !== null);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to fetch transaction history');
      return [];
    }
  }

  async isValidAddress(address: string): Promise<boolean> {
    try {
      const web3 = await this.web3Provider.getWeb3();
      return web3.utils.isAddress(address);
    } catch (error) {
      return false;
    }
  }
}

export const walletService = new WalletService();