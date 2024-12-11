import { SearchResult } from '../types/search';

class SearchService {
  async search(query: string): Promise<SearchResult[]> {
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
      {
        id: '1',
        type: 'wallet',
        title: '0x1234...5678',
        description: 'High-value wallet with recent activity',
      },
      {
        id: '2',
        type: 'transaction',
        title: 'Transaction 0xabcd...efgh',
        description: '2.5 ETH transferred 5 minutes ago',
      },
      {
        id: '3',
        type: 'alert',
        title: 'Suspicious Activity',
        description: 'Multiple high-value transactions detected',
      },
    ].filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const searchService = new SearchService();