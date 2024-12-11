import { useState, useEffect } from 'react';
import { fetchCryptoPrice } from '../utils/api';

interface CryptoData {
  price: number;
  change24h: number;
  loading: boolean;
  error: string | null;
}

export function useCryptoData(symbol: string) {
  const [data, setData] = useState<CryptoData>({
    price: 0,
    change24h: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const price = await fetchCryptoPrice(symbol);
        if (mounted) {
          setData({
            price,
            change24h: 0, // In a real app, you'd fetch this from the API
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (mounted) {
          setData(prev => ({
            ...prev,
            loading: false,
            error: 'Failed to fetch crypto data',
          }));
        }
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [symbol]);

  return data;
}