import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResults from './SearchResults';
import { useSearch } from '../../hooks/useSearch';

interface SearchBarProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  className?: string;
}

export default function SearchBar({ isExpanded, onToggle, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { results, isLoading, search, clearResults } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      search(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    clearResults();
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <motion.div
          initial={false}
          animate={{ width: isExpanded ? '100%' : '240px' }}
          className="relative"
        >
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search transactions, wallets..."
            className="w-full bg-gray-700 text-white pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </form>

      <AnimatePresence>
        {(query || results.length > 0) && (
          <SearchResults
            results={results}
            isLoading={isLoading}
            onClose={handleClear}
          />
        )}
      </AnimatePresence>
    </div>
  );
}