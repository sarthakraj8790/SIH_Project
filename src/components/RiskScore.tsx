import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface RiskScoreProps {
  score: number;
}

export default function RiskScore({ score }: RiskScoreProps) {
  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-green-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreText = (score: number) => {
    if (score < 30) return 'Low Risk';
    if (score < 70) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Risk Assessment</h3>
        {score < 30 ? (
          <ShieldCheck className="text-green-500" size={24} />
        ) : (
          <AlertTriangle className={getScoreColor(score)} size={24} />
        )}
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${getScoreColor(score)}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className={`font-medium ${getScoreColor(score)}`}>
            {getScoreText(score)}
          </span>
          <span className="text-gray-600 font-medium">{score}%</span>
        </div>
      </div>
    </div>
  );
}