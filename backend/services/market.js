/**
 * Market Service — port 3001
 * Proxies CoinGecko API with in-memory caching to avoid rate limits.
 */
import { createService } from '../lib/server.js';

const BASE = 'https://api.coingecko.com/api/v3';
const PORT  = 3001;

// Simple TTL cache: { key -> { data, expiresAt } }
const cache = new Map();

async function fetchCached(url, ttlMs) {
  const hit = cache.get(url);
  if (hit && Date.now() < hit.expiresAt) return hit.data;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CoinGecko ${res.status}: ${url}`);
  const data = await res.json();
  cache.set(url, { data, expiresAt: Date.now() + ttlMs });
  return data;
}

createService(PORT, 'market-service', async (_req, url) => {
  const path = url.pathname;

  // GET /coins/markets?currency=usd&page=1&per_page=100
  if (path === '/coins/markets') {
    const currency = url.searchParams.get('currency') ?? 'usd';
    const page     = url.searchParams.get('page')     ?? '1';
    const perPage  = url.searchParams.get('per_page') ?? '100';
    const upstream = `${BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`;
    const body = await fetchCached(upstream, 60_000); // 1 min cache
    return { body };
  }

  // GET /coins/:id/chart?days=7&currency=usd
  const chartMatch = path.match(/^\/coins\/([^/]+)\/chart$/);
  if (chartMatch) {
    const id       = chartMatch[1];
    const days     = url.searchParams.get('days')     ?? '7';
    const currency = url.searchParams.get('currency') ?? 'usd';
    const upstream = `${BASE}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
    const body = await fetchCached(upstream, 5 * 60_000); // 5 min cache
    return { body };
  }

  // GET /global
  if (path === '/global') {
    const json = await fetchCached(`${BASE}/global`, 2 * 60_000);
    const d    = json.data;
    const body = {
      total_market_cap_usd: d.total_market_cap.usd,
      total_volume_usd: d.total_volume.usd,
      btc_dominance: d.market_cap_percentage.btc,
      eth_dominance: d.market_cap_percentage.eth,
      market_cap_change_percentage_24h: d.market_cap_change_percentage_24h_usd,
    };
    return { body };
  }

  // GET /trending
  if (path === '/trending') {
    const json = await fetchCached(`${BASE}/search/trending`, 10 * 60_000);
    const body = json.coins.map(({ item }) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      thumb: item.thumb,
      market_cap_rank: item.market_cap_rank ?? 0,
      price_btc: item.price_btc ?? 0,
    }));
    return { body };
  }

  // GET /fear-greed
  if (path === '/fear-greed') {
    const res  = await fetch('https://api.alternative.me/fng/?limit=1');
    const json = await res.json();
    const d    = json.data[0];
    return { body: { value: Number(d.value), label: d.value_classification } };
  }

  return { status: 404, body: { error: 'Not found' } };
});
