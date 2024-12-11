import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GraphVisualization from '../components/Graph/GraphVisualization';
import GraphControls from '../components/Graph/GraphControls';
import GraphLegend from '../components/Graph/GraphLegend';
import { getTransactionGraph } from '../utils/graphAnalysis';

export default function GraphAnalysisPage() {
  const [timeRange, setTimeRange] = useState('24h');
  const [minAmount, setMinAmount] = useState(0);
  const [showSuspicious, setShowSuspicious] = useState(false);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getTransactionGraph(timeRange, minAmount, showSuspicious);
        setGraphData(data);
      } catch (error) {
        console.error('Error fetching graph data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeRange, minAmount, showSuspicious]);

  return (
    <div className="h-full grid grid-cols-12 gap-6">
      <div className="col-span-3 space-y-6">
        <GraphControls
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          minAmount={minAmount}
          setMinAmount={setMinAmount}
          showSuspicious={showSuspicious}
          setShowSuspicious={setShowSuspicious}
        />
        <GraphLegend />
      </div>

      <motion.div
        className="col-span-9 bg-gray-800 rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
          </div>
        ) : (
          <GraphVisualization
            data={graphData}
            onNodeClick={(nodeId) => {
              console.log('Node clicked:', nodeId);
            }}
          />
        )}
      </motion.div>
    </div>
  );
}