import Constants from 'expo-constants';
import type { NewsArticle } from '@/types';

const DIRECT = 'https://cryptopanic.com/api/developer/v2';

function getApiKey(): string {
  const fromConstants = (Constants.expoConfig?.extra as Record<string, string> | undefined)
    ?.cryptoPanicKey;
  if (fromConstants) return fromConstants;
  return process.env.EXPO_PUBLIC_CRYPTOPANIC_KEY ?? '';
}

function gatewayUrl(): string | null {
  const gw = (Constants.expoConfig?.extra as Record<string, string> | undefined)?.apiUrl
    ?? process.env.EXPO_PUBLIC_API_URL
    ?? '';
  return gw ? `${gw}/news` : null;
}

export async function getNews(currencies?: string[]): Promise<NewsArticle[]> {
  const gw = gatewayUrl();

  if (gw) {
    // Route through news microservice — API key stays on the server
    const params = new URLSearchParams();
    if (currencies?.length) params.set('currencies', currencies.join(','));
    const url = `${gw}/posts${params.toString() ? `?${params}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`News service error: ${res.status}`);
    return res.json();
  }

  // Direct fallback
  const key = getApiKey();
  if (!key) throw new Error('no_key');
  const params = new URLSearchParams({ auth_token: key, public: 'true', kind: 'news' });
  if (currencies?.length) params.set('currencies', currencies.join(','));
  const res = await fetch(`${DIRECT}/posts/?${params}`);
  if (!res.ok) throw new Error(`CryptoPanic error: ${res.status}`);
  const json = await res.json();
  return (json.results ?? [])
    .map((item: any) => ({
      id: String(item.id),
      title: item.title,
      url: item.url ?? item.source?.url ?? null,
      source: item.source?.title ?? '',
      publishedAt: item.published_at,
      sentiment: mapSentiment(item.votes),
      currencies: (item.currencies ?? []).map((c: any) => c.code),
    }))
    .filter((item: NewsArticle) => !!item.url);
}

function mapSentiment(votes: any): 'positive' | 'negative' | 'neutral' {
  if (!votes) return 'neutral';
  if (votes.positive > votes.negative) return 'positive';
  if (votes.negative > votes.positive) return 'negative';
  return 'neutral';
}
