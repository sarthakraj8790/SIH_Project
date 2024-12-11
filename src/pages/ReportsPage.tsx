import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Filter } from 'lucide-react';
import { saveAs } from 'file-saver';

const mockReports = [
  {
    id: 1,
    title: 'Monthly Transaction Analysis',
    description: 'Detailed analysis of transaction patterns and risk assessment',
    date: new Date(),
    type: 'analysis',
    downloadUrl: '#',
  },
  {
    id: 2,
    title: 'Suspicious Activity Report',
    description: 'Summary of detected suspicious activities and recommendations',
    date: new Date(Date.now() - 86400000),
    type: 'security',
    downloadUrl: '#',
  },
];

export default function ReportsPage() {
  const [reports] = useState(mockReports);
  const [filter, setFilter] = useState('all');

  const handleExportAll = () => {
    const csvContent = [
      ['Title', 'Description', 'Type', 'Date'],
      ...reports.map(report => [
        report.title,
        report.description,
        report.type,
        report.date.toISOString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'reports.csv');
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-gray-800 p-6 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Reports</h2>
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
            >
              <option value="all">All Reports</option>
              <option value="analysis">Analysis Reports</option>
              <option value="security">Security Reports</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportAll}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Download size={16} />
              <span>Export All</span>
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports
            .filter((report) => filter === 'all' || report.type === filter)
            .map((report) => (
              <motion.div
                key={report.id}
                className="bg-gray-700 p-6 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <FileText className="text-blue-500" size={20} />
                      <h3 className="text-white font-medium">{report.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm mt-2">{report.description}</p>
                    <span className="text-gray-400 text-xs mt-4 block">
                      Generated on: {report.date.toLocaleDateString()}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const blob = new Blob(
                        [`${report.title}\n\n${report.description}\n\nGenerated: ${report.date}`],
                        { type: 'text/plain;charset=utf-8' }
                      );
                      saveAs(blob, `${report.title.toLowerCase().replace(/\s+/g, '-')}.txt`);
                    }}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <Download size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}