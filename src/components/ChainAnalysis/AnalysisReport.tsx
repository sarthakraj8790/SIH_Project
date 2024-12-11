import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface AnalysisReportProps {
  walletAddress: string;
  riskScore: number;
  flags: string[];
  patterns: string[];
  recommendations: string[];
  metrics: {
    totalVolume: number;
    averageValue: number;
    uniqueCounterparties: Set<string>;
    timeDistribution: Record<string, number>;
    largeTransactions: number;
  };
}

export default function AnalysisReport({
  walletAddress,
  riskScore,
  flags,
  patterns,
  recommendations,
  metrics,
}: AnalysisReportProps) {
  const generatePDF = () => {
    const doc = new jsPDF();
    const lineHeight = 10;
    let yPos = 20;

    // Title
    doc.setFontSize(20);
    doc.text('Chain Analysis Report', 20, yPos);
    yPos += lineHeight * 2;

    // Wallet Address
    doc.setFontSize(12);
    doc.text(`Wallet Address: ${walletAddress}`, 20, yPos);
    yPos += lineHeight * 1.5;

    // Risk Score
    doc.text(`Risk Score: ${riskScore}%`, 20, yPos);
    yPos += lineHeight * 2;

    // Flags
    doc.setFontSize(14);
    doc.text('Risk Flags:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(12);
    flags.forEach(flag => {
      doc.text(`• ${flag}`, 30, yPos);
      yPos += lineHeight;
    });
    yPos += lineHeight;

    // Patterns
    doc.setFontSize(14);
    doc.text('Detected Patterns:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(12);
    patterns.forEach(pattern => {
      doc.text(`• ${pattern}`, 30, yPos);
      yPos += lineHeight;
    });
    yPos += lineHeight;

    // Recommendations
    doc.setFontSize(14);
    doc.text('Recommendations:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(12);
    recommendations.forEach(rec => {
      doc.text(`• ${rec}`, 30, yPos);
      yPos += lineHeight;
    });

    // Metrics
    yPos += lineHeight;
    doc.setFontSize(14);
    doc.text('Key Metrics:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(12);
    doc.text(`Total Volume: ${metrics.totalVolume.toFixed(2)} ETH`, 30, yPos);
    yPos += lineHeight;
    doc.text(`Average Transaction: ${metrics.averageValue.toFixed(2)} ETH`, 30, yPos);
    yPos += lineHeight;
    doc.text(`Unique Counterparties: ${metrics.uniqueCounterparties.size}`, 30, yPos);
    yPos += lineHeight;
    doc.text(`Large Transactions: ${metrics.largeTransactions}`, 30, yPos);

    doc.save('chain-analysis-report.pdf');
  };

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FileText className="text-blue-500" size={24} />
          <h3 className="text-xl font-semibold text-white">Analysis Report</h3>
        </div>
        <button
          onClick={generatePDF}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={16} />
          <span>Download PDF</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Transaction Volume</h4>
            <p className="text-gray-300">{metrics.totalVolume.toFixed(2)} ETH</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Average Transaction</h4>
            <p className="text-gray-300">{metrics.averageValue.toFixed(2)} ETH</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Unique Counterparties</h4>
            <p className="text-gray-300">{metrics.uniqueCounterparties.size}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Large Transactions</h4>
            <p className="text-gray-300">{metrics.largeTransactions}</p>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-white font-medium mb-4">Time Distribution</h4>
          <div className="h-40">
            {/* Add a bar chart here using recharts or d3 */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}