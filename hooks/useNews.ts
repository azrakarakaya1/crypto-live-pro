import { useState, useEffect, useCallback } from 'react';
import { getNews } from '@/services/cryptopanic';
import type { NewsArticle } from '@/types';

export function useNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!process.env.EXPO_PUBLIC_CRYPTOPANIC_KEY) {
      setError('no_key');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getNews();
      setArticles(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load news');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { articles, loading, error, refresh };
}
