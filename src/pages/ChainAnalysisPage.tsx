import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WalletInput from '../components/WalletInput';
import RiskIndicators from '../components/ChainAnalysis/RiskIndicators';
import TransactionGraph from '../components/ChainAnalysis/TransactionGraph';
import AnalysisReport from '../components/ChainAnalysis/AnalysisReport';
import { analyzeTransactionPattern, generateTransactionGraph, calculateRiskMetrics } from '../utils/chainAnalysis';
import { getTransactionHistory } from '../utils/web3';
import { Transaction } from '../types/transaction';
import toast from 'react-hot-toast';

export default function ChainAnalysisPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<{
    walletAddress: string;
    riskScore: number;
    flags: string[];
    patterns: string[];
    recommendations: string[];
    graph: { nodes: string[]; edges: any[] };
    metrics: any;
  } | null>(null);

  const handleAnalyze = async (address: string) => {
    setIsLoading(true);
    try {
      // Fetch transaction history
      const transactions = await getTransactionHistory(address);
      
      // Perform chain analysis
      const analysis = await analyzeTransactionPattern(transactions);
      
      // Generate transaction graph
      const graph = await generateTransactionGraph(transactions);
      
      // Calculate metrics
      const metrics = calculateRiskMetrics(transactions);

      setAnalysisData({
        walletAddress: address,
        ...analysis,
        graph,
        metrics,
      });

      toast.success('Analysis completed successfully');
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Failed to analyze wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-gray-800 p-6 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Chain Analysis</h2>
        <WalletInput onSubmit={handleAnalyze} />
      </motion.div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      {analysisData && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <RiskIndicators
            riskScore={analysisData.riskScore}
            flags={analysisData.flags}
            patterns={analysisData.patterns}
            recommendations={analysisData.recommendations}
          />

          <TransactionGraph
            nodes={analysisData.graph.nodes}
            edges={analysisData.graph.edges}
          />

          <AnalysisReport
            walletAddress={analysisData.walletAddress}
            riskScore={analysisData.riskScore}
            flags={analysisData.flags}
            patterns={analysisData.patterns}
            recommendations={analysisData.recommendations}
            metrics={analysisData.metrics}
          />
        </motion.div>
      )}
    </div>
  );
}