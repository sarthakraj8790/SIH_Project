import React from 'react';
import { Shield, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

interface RiskIndicatorsProps {
  riskScore: number;
  flags: string[];
  patterns: string[];
  recommendations: string[];
}

export default function RiskIndicators({ riskScore, flags, patterns, recommendations }: RiskIndicatorsProps) {
  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className={getRiskColor(riskScore)} size={24} />
          <h3 className="text-xl font-semibold text-white">Risk Score: {riskScore}%</h3>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
          <div
            className={`h-2.5 rounded-full ${getRiskColor(riskScore)}`}
            style={{ width: `${riskScore}%` }}
          />
        </div>
        <div className="space-y-2">
          {flags.map((flag, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-300">
              <AlertTriangle size={16} className="text-yellow-500" />
              <span>{flag}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="text-blue-500" size={24} />
          <h3 className="text-xl font-semibold text-white">Detected Patterns</h3>
        </div>
        <div className="space-y-2">
          {patterns.map((pattern, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-300">
              <Activity size={16} className="text-blue-500" />
              <span>{pattern}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-300">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}