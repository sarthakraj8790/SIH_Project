import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Activity, AlertTriangle } from 'lucide-react';
import { SearchResult } from '../../types/search';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  onClose: () => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'wallet':
      return <Wallet className="text-blue-500" size={16} />;
    case 'transaction':
      return <Activity className="text-green-500" size={16} />;
    case 'alert':
      return <AlertTriangle className="text-yellow-500" size={16} />;
    default:
      return null;
  }
};

export default function SearchResults({ results, isLoading, onClose }: SearchResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
    >
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="py-2">
          {results.map((result) => (
            <motion.button
              key={result.id}
              className="w-full px-4 py-2 hover:bg-gray-700 flex items-center space-x-3 text-left"
              whileHover={{ x: 4 }}
            >
              {getIcon(result.type)}
              <div>
                <p className="text-white font-medium">{result.title}</p>
                <p className="text-gray-400 text-sm">{result.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-400">
          No results found
        </div>
      )}
    </motion.div>
  );
}