import Constants from 'expo-constants';
import type { NewsArticle } from '@/types';

const DIRECT = 'https://cryptopanic.com/api/developer/v2';

const RSS_FEEDS = [
  { name: 'CoinDesk',      url: 'https://www.coindesk.com/arc/outboundfeeds/rss/' },
  { name: 'Cointelegraph', url: 'https://cointelegraph.com/rss' },
  { name: 'CryptoSlate',   url: 'https://cryptoslate.com/feed/' },
];

function getGatewayUrl(): string {
  const extra = Constants.expoConfig?.extra as Record<string, string> | undefined;
  return extra?.apiUrl ?? process.env.EXPO_PUBLIC_API_URL ?? '';
}

// ── RSS parser ────────────────────────────────────────────────────────────────

function extractTag(block: string, name: string): string {
  const cdata = block.match(new RegExp(`<${name}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${name}>`, 'i'));
  if (cdata) return cdata[1].trim();
  const plain = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'));
  return plain ? plain[1].trim() : '';
}

function parseRss(xml: string, sourceName: string): NewsArticle[] {
  const items: NewsArticle[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title   = extractTag(block, 'title');
    const link    = extractTag(block, 'link') || extractTag(block, 'guid');
    const pubDate = extractTag(block, 'pubDate') || extractTag(block, 'dc:date');

    if (!title || !link || !link.startsWith('http')) continue;

    items.push({
      id:          `${sourceName}-${++idx}-${Date.now()}`,
      title,
      url:         link,
      source:      sourceName,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      sentiment:   'neutral',
      currencies:  [],
    });
  }
  return items;
}

async function fetchRssNews(): Promise<NewsArticle[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async ({ name, url }) => {
      const res = await fetch(url, { headers: { 'User-Agent': 'CryptoLivePro/1.0' } });
      if (!res.ok) throw new Error(`${name} ${res.status}`);
      const xml = await res.text();
      return parseRss(xml, name);
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<NewsArticle[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getNews(currencies?: string[]): Promise<NewsArticle[]> {
  const gw = getGatewayUrl();

  // Route through backend gateway when available
  if (gw) {
    const params = new URLSearchParams();
    if (currencies?.length) params.set('currencies', currencies.join(','));
    const url = `${gw}/news/posts${params.toString() ? `?${params}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`News service error: ${res.status}`);
    return res.json();
  }

  // Direct RSS fallback — no API key required
  return fetchRssNews();
}
