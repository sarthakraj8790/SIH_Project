export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  gasPrice: string;
  gasUsed: string;
}

export interface WalletData {
  address: string;
  balance: string;
  transactions: Transaction[];
  riskScore?: number;
}