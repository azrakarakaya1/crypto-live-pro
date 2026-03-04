/**
 * News Service — port 3002
 * Aggregates crypto news from free RSS feeds (no API key required).
 * Sources: CoinDesk, Cointelegraph, CryptoSlate
 */
import { createService } from '../lib/server.js';

const PORT = 3002;

const FEEDS = [
  { name: 'CoinDesk',       url: 'https://www.coindesk.com/arc/outboundfeeds/rss/' },
  { name: 'Cointelegraph',  url: 'https://cointelegraph.com/rss' },
  { name: 'CryptoSlate',    url: 'https://cryptoslate.com/feed/' },
];

/** Extract text between first occurrence of XML tag. */
function tag(xml, name) {
  const m = xml.match(new RegExp(`<${name}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${name}>`, 'i'))
         ?? xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'));
  return m ? m[1].trim() : '';
}

function parseRss(xml, sourceName) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  let id = 0;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title       = tag(block, 'title');
    const link        = tag(block, 'link') || tag(block, 'guid');
    const pubDate     = tag(block, 'pubDate') || tag(block, 'dc:date') || '';
    const description = tag(block, 'description');

    if (!title || !link || !link.startsWith('http')) continue;

    items.push({
      id:          `${sourceName}-${++id}-${Date.now()}`,
      title,
      url:         link,
      source:      sourceName,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      sentiment:   'neutral',
      currencies:  [],
      description: description.replace(/<[^>]+>/g, '').slice(0, 200),
    });
  }
  return items;
}

const cache = { data: null, expiresAt: 0 };

async function fetchAllNews() {
  if (cache.data && Date.now() < cache.expiresAt) return cache.data;

  const results = await Promise.allSettled(
    FEEDS.map(async ({ name, url }) => {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'CryptoLivePro/1.0' },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`${name} feed ${res.status}`);
      const xml = await res.text();
      return parseRss(xml, name);
    })
  );

  const articles = results
    .filter((r) => r.status === 'fulfilled')
    .flatMap((r) => r.value)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  cache.data = articles;
  cache.expiresAt = Date.now() + 5 * 60_000; // 5 min cache
  return articles;
}

createService(PORT, 'news-service', async (_req, url) => {
  if (url.pathname !== '/posts') {
    return { status: 404, body: { error: 'Not found' } };
  }
  const body = await fetchAllNews();
  return { body };
});
