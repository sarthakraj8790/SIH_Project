import Web3 from 'web3';
import { Transaction } from '../types/transaction';

const web3 = new Web3(`https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`);

interface GraphNode {
  data: {
    id: string;
    label: string;
    type: string;
    value: number;
    suspicious?: boolean;
  };
}

interface GraphEdge {
  data: {
    id: string;
    source: string;
    target: string;
    weight: number;
    timestamp: number;
    value: number;
  };
}

export async function getTransactionGraph(
  timeRange: string,
  minAmount: number,
  showSuspicious: boolean
): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
  try {
    // Get the block number range based on time range
    const latestBlock = await web3.eth.getBlockNumber();
    let fromBlock = latestBlock;

    switch (timeRange) {
      case '24h':
        fromBlock = latestBlock - 5760; // Approximately 24 hours of blocks
        break;
      case '7d':
        fromBlock = latestBlock - 40320; // Approximately 7 days of blocks
        break;
      case '30d':
        fromBlock = latestBlock - 172800; // Approximately 30 days of blocks
        break;
    }

    // Get transactions
    const transactions = await web3.eth.getPastLogs({
      fromBlock,
      toBlock: 'latest',
    });

    // Process transactions into nodes and edges
    const nodes = new Map<string, GraphNode>();
    const edges: GraphEdge[] = [];
    const addressValues = new Map<string, number>();

    for (const tx of transactions) {
      const transaction = await web3.eth.getTransaction(tx.transactionHash);
      if (!transaction || !transaction.value) continue;

      const value = parseFloat(web3.utils.fromWei(transaction.value, 'ether'));
      if (value < minAmount) continue;

      // Update address values
      addressValues.set(
        transaction.from,
        (addressValues.get(transaction.from) || 0) + value
      );
      if (transaction.to) {
        addressValues.set(
          transaction.to,
          (addressValues.get(transaction.to) || 0) + value
        );
      }

      // Add nodes
      if (!nodes.has(transaction.from)) {
        nodes.set(transaction.from, {
          data: {
            id: transaction.from,
            label: `${transaction.from.slice(0, 6)}...${transaction.from.slice(-4)}`,
            type: 'wallet',
            value: 0,
            suspicious: Math.random() > 0.8, // Mock suspicious flag
          },
        });
      }

      if (transaction.to && !nodes.has(transaction.to)) {
        nodes.set(transaction.to, {
          data: {
            id: transaction.to,
            label: `${transaction.to.slice(0, 6)}...${transaction.to.slice(-4)}`,
            type: 'wallet',
            value: 0,
            suspicious: Math.random() > 0.8, // Mock suspicious flag
          },
        });
      }

      // Add edge
      if (transaction.to) {
        edges.push({
          data: {
            id: tx.transactionHash,
            source: transaction.from,
            target: transaction.to,
            weight: value,
            timestamp: Date.now(), // Mock timestamp
            value: value,
          },
        });
      }
    }

    // Update node values
    for (const [address, value] of addressValues) {
      const node = nodes.get(address);
      if (node) {
        node.data.value = value;
      }
    }

    // Filter suspicious nodes if needed
    let filteredNodes = Array.from(nodes.values());
    if (showSuspicious) {
      filteredNodes = filteredNodes.filter((node) => node.data.suspicious);
    }

    return {
      nodes: filteredNodes,
      edges,
    };
  } catch (error) {
    console.error('Error generating transaction graph:', error);
    return { nodes: [], edges: [] };
  }
}

export function analyzeGraphPatterns(nodes: GraphNode[], edges: GraphEdge[]) {
  const patterns = {
    highValueNodes: [] as string[],
    suspiciousPatterns: [] as string[],
    clusters: [] as string[][],
  };

  // Identify high-value nodes
  const valueThreshold = 100; // ETH
  patterns.highValueNodes = nodes
    .filter((node) => node.data.value > valueThreshold)
    .map((node) => node.data.id);

  // Identify suspicious patterns
  const edgesByNode = new Map<string, GraphEdge[]>();
  edges.forEach((edge) => {
    const { source, target } = edge.data;
    if (!edgesByNode.has(source)) edgesByNode.set(source, []);
    if (!edgesByNode.has(target)) edgesByNode.set(target, []);
    edgesByNode.get(source)?.push(edge);
    edgesByNode.get(target)?.push(edge);
  });

  // Check for high-frequency trading
  edgesByNode.forEach((edges, nodeId) => {
    if (edges.length > 50) { // Arbitrary threshold
      patterns.suspiciousPatterns.push(`High-frequency trading detected for ${nodeId}`);
    }
  });

  return patterns;
}