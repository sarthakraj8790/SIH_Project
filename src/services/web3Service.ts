import Web3 from 'web3';
import { Transaction } from '../types/transaction';

class Web3Service {
  private web3: Web3;

  constructor() {
    this.web3 = new Web3(`https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`);
  }

  async getTransactionHistory(address: string): Promise<Transaction[]> {
    try {
      const blockNumber = await this.web3.eth.getBlockNumber();
      const startBlock = blockNumber - 10000; // Get last 10000 blocks

      const transactions = await this.web3.eth.getPastLogs({
        fromBlock: startBlock,
        toBlock: 'latest',
        address,
      });

      const processedTxs = await Promise.all(
        transactions.map(async (tx) => {
          const transaction = await this.web3.eth.getTransaction(tx.transactionHash || '');
          const block = await this.web3.eth.getBlock(tx.blockNumber || 0);
          
          return {
            hash: tx.transactionHash || '',
            from: transaction?.from || '',
            to: transaction?.to || '',
            value: transaction?.value?.toString() || '0',
            timestamp: block?.timestamp || 0,
            gasPrice: transaction?.gasPrice?.toString() || '0',
            gasUsed: '0',
          };
        })
      );

      return processedTxs;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  async getWalletBalance(address: string): Promise<string> {
    try {
      const balance = await this.web3.eth.getBalance(address);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  }

  async getGasPrice(): Promise<string> {
    try {
      const gasPrice = await this.web3.eth.getGasPrice();
      return this.web3.utils.fromWei(gasPrice, 'gwei');
    } catch (error) {
      console.error('Error fetching gas price:', error);
      throw error;
    }
  }

  isValidAddress(address: string): boolean {
    return this.web3.utils.isAddress(address);
  }

  subscribeToNewTransactions(address: string, callback: (transaction: Transaction) => void) {
    const subscription = this.web3.eth.subscribe('logs', {
      address,
    }, async (error, log) => {
      if (error) {
        console.error('Subscription error:', error);
        return;
      }

      try {
        const transaction = await this.web3.eth.getTransaction(log.transactionHash || '');
        if (transaction) {
          const block = await this.web3.eth.getBlock(log.blockNumber || 0);
          callback({
            hash: transaction.hash,
            from: transaction.from,
            to: transaction.to || '',
            value: transaction.value.toString(),
            timestamp: block?.timestamp || 0,
            gasPrice: transaction.gasPrice?.toString() || '0',
            gasUsed: '0',
          });
        }
      } catch (error) {
        console.error('Error processing transaction:', error);
      }
    });

    return () => {
      subscription.unsubscribe((error, success) => {
        if (error) console.error('Unsubscribe error:', error);
      });
    };
  }
}

export const web3Service = new Web3Service();