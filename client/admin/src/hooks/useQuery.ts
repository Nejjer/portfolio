import { useState } from 'react';

export function useQuery<T>(query: () => Promise<T>) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const response = await query();
    try {
      setData(response);
    } catch (e) {
      console.error(e);
      setError(true);
    }
    setLoading(false);
  };

  const isDataLoaded = (data: T | null): data is T => loading && data !== null;

  return { loading, data, fetch, error, isDataLoaded };
}
