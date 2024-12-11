import Web3 from 'web3';
import axios from 'axios';
import { Transaction } from '../types/transaction';

const web3 = new Web3(`https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`);

interface ChainAnalysisResult {
  riskScore: number;
  flags: string[];
  patterns: string[];
  recommendations: string[];
}

export async function analyzeTransactionPattern(transactions: Transaction[]): Promise<ChainAnalysisResult> {
  // Group transactions by time intervals
  const timeIntervals = transactions.reduce((acc, tx) => {
    const hour = new Date(tx.timestamp * 1000).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Detect high-frequency patterns
  const maxTransactionsPerHour = Math.max(...Object.values(timeIntervals));
  const isHighFrequency = maxTransactionsPerHour > 10;

  // Analyze transaction values
  const values = transactions.map(tx => parseFloat(web3.utils.fromWei(tx.value, 'ether')));
  const avgValue = values.reduce((a, b) => a + b, 0) / values.length;
  const hasRoundNumbers = values.some(v => v % 1 === 0 && v > 1);

  // Calculate risk score
  let riskScore = 0;
  const flags: string[] = [];
  const patterns: string[] = [];
  const recommendations: string[] = [];

  if (isHighFrequency) {
    riskScore += 30;
    flags.push('High-frequency trading detected');
    recommendations.push('Monitor closely for potential automated trading or suspicious activities');
  }

  if (hasRoundNumbers) {
    riskScore += 20;
    flags.push('Round number transactions detected');
    patterns.push('Multiple transactions with whole number values');
  }

  // Detect potential mixing patterns
  const uniqueCounterparties = new Set(
    transactions.map(tx => tx.from).concat(transactions.map(tx => tx.to))
  ).size;
  
  if (uniqueCounterparties > transactions.length * 0.8) {
    riskScore += 25;
    flags.push('Potential mixing activity');
    patterns.push('High number of unique counterparties');
    recommendations.push('Investigate possible connection to mixing services');
  }

  // Check for large value transfers
  const largeTransfers = values.filter(v => v > 10);
  if (largeTransfers.length > 0) {
    riskScore += 15;
    flags.push('Large value transfers detected');
    recommendations.push('Review large transfers for compliance purposes');
  }

  return {
    riskScore: Math.min(riskScore, 100),
    flags,
    patterns,
    recommendations
  };
}

export async function checkKnownAddresses(address: string): Promise<boolean> {
  try {
    // In a real implementation, this would check against known blacklists
    // For demo purposes, we'll simulate an API call
    const response = await axios.get(`https://api.example.com/check-address/${address}`);
    return response.data.isKnown;
  } catch (error) {
    console.error('Error checking known addresses:', error);
    return false;
  }
}

export async function generateTransactionGraph(transactions: Transaction[]) {
  const nodes = new Set<string>();
  const edges: Array<{ source: string; target: string; value: string }> = [];

  transactions.forEach(tx => {
    nodes.add(tx.from);
    nodes.add(tx.to);
    edges.push({
      source: tx.from,
      target: tx.to,
      value: web3.utils.fromWei(tx.value, 'ether')
    });
  });

  return {
    nodes: Array.from(nodes),
    edges
  };
}

export function calculateRiskMetrics(transactions: Transaction[]) {
  const metrics = {
    totalVolume: 0,
    averageValue: 0,
    uniqueCounterparties: new Set(),
    timeDistribution: {} as Record<string, number>,
    largeTransactions: 0
  };

  transactions.forEach(tx => {
    const value = parseFloat(web3.utils.fromWei(tx.value, 'ether'));
    metrics.totalVolume += value;
    metrics.uniqueCounterparties.add(tx.from).add(tx.to);

    const hour = new Date(tx.timestamp * 1000).getHours();
    metrics.timeDistribution[hour] = (metrics.timeDistribution[hour] || 0) + 1;

    if (value > 10) {
      metrics.largeTransactions++;
    }
  });

  metrics.averageValue = metrics.totalVolume / transactions.length;

  return metrics;
}