import { web3Service } from './web3Service';
import { Transaction } from '../types/transaction';

class ChainAnalysisService {
  async analyzeWallet(address: string) {
    try {
      const transactions = await web3Service.getTransactionHistory(address);
      const balance = await web3Service.getWalletBalance(address);
      
      const analysis = await this.analyzeTransactions(transactions);
      const riskScore = this.calculateRiskScore(analysis);
      const patterns = this.detectPatterns(transactions);

      return {
        address,
        balance,
        riskScore,
        analysis,
        patterns,
        transactions
      };
    } catch (error) {
      console.error('Error analyzing wallet:', error);
      throw error;
    }
  }

  private async analyzeTransactions(transactions: Transaction[]) {
    const analysis = {
      totalVolume: 0,
      averageValue: 0,
      uniqueCounterparties: new Set<string>(),
      largeTransactions: 0,
      suspiciousPatterns: [] as string[]
    };

    transactions.forEach(tx => {
      const value = parseFloat(web3Service.web3.utils.fromWei(tx.value, 'ether'));
      analysis.totalVolume += value;
      analysis.uniqueCounterparties.add(tx.from).add(tx.to);

      if (value > 10) {
        analysis.largeTransactions++;
      }
    });

    analysis.averageValue = analysis.totalVolume / transactions.length;

    return analysis;
  }

  private calculateRiskScore(analysis: any): number {
    let score = 0;

    // Large transactions factor
    if (analysis.largeTransactions > 0) {
      score += Math.min(analysis.largeTransactions * 5, 30);
    }

    // Unique counterparties factor
    const counterpartyRatio = analysis.uniqueCounterparties.size / analysis.totalVolume;
    if (counterpartyRatio > 0.8) {
      score += 20;
    }

    // Volume factor
    if (analysis.totalVolume > 100) {
      score += 25;
    }

    // Average value factor
    if (analysis.averageValue > 10) {
      score += 15;
    }

    return Math.min(score, 100);
  }

  private detectPatterns(transactions: Transaction[]) {
    const patterns = [];

    // Time-based patterns
    const timeIntervals = transactions.reduce((acc, tx) => {
      const hour = new Date(tx.timestamp * 1000).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const maxTransactionsPerHour = Math.max(...Object.values(timeIntervals));
    if (maxTransactionsPerHour > 10) {
      patterns.push('High-frequency trading detected');
    }

    // Value-based patterns
    const values = transactions.map(tx => 
      parseFloat(web3Service.web3.utils.fromWei(tx.value, 'ether'))
    );
    
    const hasRoundNumbers = values.some(v => v % 1 === 0 && v > 1);
    if (hasRoundNumbers) {
      patterns.push('Round number transactions detected');
    }

    return patterns;
  }
}

export const chainAnalysisService = new ChainAnalysisService();