import Web3 from 'web3';
import type { Transaction } from '../types/transaction';

// Initialize Web3 with Infura endpoint
const web3 = new Web3('https://mainnet.infura.io/v3/c0c8a3f5f1494cca9d9505f84ea08c75');

export const isValidAddress = (address: string): boolean => {
  return web3.utils.isAddress(address);
};

export const getTransactionHistory = async (address: string): Promise<Transaction[]> => {
  try {
    const blockNumber = await web3.eth.getBlockNumber();
    const startBlock = blockNumber - 10000; // Get last 10000 blocks

    const transactions = await web3.eth.getPastLogs({
      fromBlock: startBlock,
      toBlock: 'latest',
      address,
    });

    const processedTxs = await Promise.all(
      transactions.map(async (tx) => {
        const transaction = await web3.eth.getTransaction(tx.transactionHash || '');
        const block = await web3.eth.getBlock(tx.blockNumber || 0);
        
        return {
          hash: tx.transactionHash || '',
          from: transaction?.from || '',
          to: transaction?.to || '',
          value: transaction?.value?.toString() || '0',
          timestamp: block?.timestamp || 0,
          gasPrice: transaction?.gasPrice?.toString() || '0',
          gasUsed: '0', // Would need receipt for actual gas used
        };
      })
    );

    return processedTxs;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const getWalletBalance = async (address: string): Promise<string> => {
  try {
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
};

export const getGasPrice = async (): Promise<string> => {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    return web3.utils.fromWei(gasPrice, 'gwei');
  } catch (error) {
    console.error('Error fetching gas price:', error);
    return '0';
  }
};

export const subscribeToNewTransactions = (
  address: string,
  callback: (transaction: Transaction) => void
) => {
  const subscription = web3.eth.subscribe('logs', {
    address,
  }, (error, log) => {
    if (error) {
      console.error('Subscription error:', error);
      return;
    }

    web3.eth.getTransaction(log.transactionHash || '')
      .then(async (transaction) => {
        if (transaction) {
          const block = await web3.eth.getBlock(log.blockNumber || 0);
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
      })
      .catch(console.error);
  });

  return () => {
    subscription.unsubscribe((error, success) => {
      if (error) console.error('Unsubscribe error:', error);
    });
  };
};