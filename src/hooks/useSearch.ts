import { useState, useCallback } from 'react';
import { SearchResult } from '../types/search';
import { searchService } from '../services/searchService';

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      const searchResults = await searchService.search(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  return {
    results,
    isLoading,
    search,
    clearResults,
  };
}