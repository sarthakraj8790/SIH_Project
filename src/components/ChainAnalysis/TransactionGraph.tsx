import React, { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import { motion } from 'framer-motion';
import { Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';

// Register the layout extension
cytoscape.use(cola);

interface Node {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
  value: string;
}

interface TransactionGraphProps {
  nodes: string[];
  edges: Link[];
}

export default function TransactionGraph({ nodes, edges }: TransactionGraphProps) {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const graphStyle: cytoscape.Stylesheet[] = [
    {
      selector: 'node',
      style: {
        'background-color': '#4F46E5',
        'label': 'data(id)',
        'width': 30,
        'height': 30,
        'font-size': '10px',
        'color': '#fff',
        'text-wrap': 'wrap',
        'text-max-width': '80px',
        'text-valign': 'center',
        'text-halign': 'center',
        'border-width': 2,
        'border-color': '#312E81'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#6B7280',
        'target-arrow-color': '#6B7280',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    }
  ];

  const layout = {
    name: 'cola',
    animate: true,
    refresh: 1,
    maxSimulationTime: 4000,
    nodeSpacing: 50,
    edgeLength: 200,
    randomize: false
  };

  const handleZoomIn = () => {
    if (cyRef.current) {
      cyRef.current.zoom(cyRef.current.zoom() * 1.2);
    }
  };

  const handleZoomOut = () => {
    if (cyRef.current) {
      cyRef.current.zoom(cyRef.current.zoom() * 0.8);
    }
  };

  const handleReset = () => {
    if (cyRef.current) {
      cyRef.current.fit();
      cyRef.current.center();
    }
  };

  const handleExportImage = async () => {
    if (!containerRef.current) return;

    try {
      const dataUrl = await domtoimage.toJpeg(containerRef.current);
      saveAs(dataUrl, 'transaction-graph.jpg');
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  };

  const elements = [
    ...nodes.map(id => ({
      data: { id }
    })),
    ...edges.map(edge => ({
      data: {
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        weight: parseFloat(edge.value)
      }
    }))
  ];

  return (
    <div className="relative h-full" ref={containerRef}>
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleZoomIn}
          className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          <ZoomIn size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleZoomOut}
          className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          <ZoomOut size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          <RotateCcw size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportImage}
          className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          <Download size={20} />
        </motion.button>
      </div>

      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        stylesheet={graphStyle}
        layout={layout}
        cy={(cy) => {
          cyRef.current = cy;
        }}
        className="bg-gray-900 rounded-lg"
      />
    </div>
  );
}