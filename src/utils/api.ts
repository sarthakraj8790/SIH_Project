import { Transaction, WalletData } from '../types/transaction';

const API_BASE_URL = 'https://api.example.com/v1';

export async function fetchWalletData(address: string): Promise<WalletData> {
  try {
    const response = await fetch(`${API_BASE_URL}/wallet/${address}`);
    if (!response.ok) {
      throw new Error('Failed to fetch wallet data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    return {
      address,
      balance: '0',
      transactions: [],
      riskScore: 0,
    };
  }
}

export async function fetchCryptoPrice(symbol: string): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/price/${symbol}`);
    if (!response.ok) {
      throw new Error('Failed to fetch price data');
    }
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error('Error fetching price:', error);
    return 0;
  }
}