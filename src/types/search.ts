export interface SearchResult {
  id: string;
  type: 'wallet' | 'transaction' | 'alert';
  title: string;
  description: string;
}