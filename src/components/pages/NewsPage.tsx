import React, { useState } from 'react';
import { Newspaper, TrendingUp, Filter } from 'lucide-react';

const newsCategories = [
  'All',
  'Bitcoin',
  'Ethereum',
  'DeFi',
  'NFTs',
  'Regulation',
];

const mockNews = [
  {
    id: 1,
    title: 'Major Cryptocurrency Exchange Reports Suspicious Activity',
    summary: 'Security experts identify potential threats and recommend increased vigilance.',
    category: 'Security',
    source: 'CryptoNews',
    timestamp: new Date(),
    trending: true,
  },
  {
    id: 2,
    title: 'New Blockchain Analysis Tools Released for Law Enforcement',
    summary: 'Advanced features help track and prevent cryptocurrency-related crimes.',
    category: 'Technology',
    source: 'BlockchainDaily',
    timestamp: new Date(),
    trending: true,
  },
  // Add more mock news items
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = mockNews.filter(
    (news) =>
      (selectedCategory === 'All' || news.category === selectedCategory) &&
      (news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.summary.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-white">Cryptocurrency News</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {newsCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Newspaper className="text-blue-500" size={20} />
                  <span className="text-sm text-gray-400">{news.source}</span>
                  {news.trending && (
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <TrendingUp size={16} />
                      <span className="text-xs">Trending</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{news.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{news.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {news.timestamp.toLocaleDateString()}
                  </span>
                  <button className="text-blue-500 hover:text-blue-400 text-sm">
                    Read more
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}