import React, { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import popper from 'cytoscape-popper';
import tippy from 'tippy.js';
import { Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

// Register the layout and popper extensions
cytoscape.use(cola);
cytoscape.use(popper);

interface GraphData {
  nodes: Array<{
    data: {
      id: string;
      label: string;
      type: string;
      value: number;
      suspicious?: boolean;
    };
  }>;
  edges: Array<{
    data: {
      id: string;
      source: string;
      target: string;
      weight: number;
      timestamp: number;
      value: number;
    };
  }>;
}

interface GraphVisualizationProps {
  data: GraphData;
  onNodeClick?: (nodeId: string) => void;
}

export default function GraphVisualization({ data, onNodeClick }: GraphVisualizationProps) {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const graphStyle: cytoscape.Stylesheet[] = [
    {
      selector: 'node',
      style: {
        'background-color': '#4F46E5',
        'label': 'data(label)',
        'width': 'mapData(value, 0, 100, 20, 60)',
        'height': 'mapData(value, 0, 100, 20, 60)',
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
      selector: 'node[suspicious]',
      style: {
        'background-color': '#EF4444',
        'border-color': '#991B1B'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 'mapData(weight, 0, 100, 1, 5)',
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

  useEffect(() => {
    if (!cyRef.current) return;

    // Add tooltips
    cyRef.current.nodes().forEach(node => {
      const ref = node.popperRef();
      const content = `
        <div class="bg-gray-800 p-2 rounded-lg shadow-lg">
          <p class="text-white text-sm">${node.data('label')}</p>
          <p class="text-gray-300 text-xs">Value: ${node.data('value')}</p>
        </div>
      `;

      tippy(ref, {
        content,
        trigger: 'manual',
        placement: 'top',
        arrow: true,
        theme: 'dark'
      });
    });

    // Show/hide tooltips on hover
    cyRef.current.on('mouseover', 'node', event => {
      const node = event.target;
      const tip = node.scratch('_tippy');
      if (tip) tip.show();
    });

    cyRef.current.on('mouseout', 'node', event => {
      const node = event.target;
      const tip = node.scratch('_tippy');
      if (tip) tip.hide();
    });

    // Handle node clicks
    cyRef.current.on('tap', 'node', event => {
      const nodeId = event.target.id();
      if (onNodeClick) onNodeClick(nodeId);
    });

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [data, onNodeClick]);

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
        elements={[...data.nodes, ...data.edges]}
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