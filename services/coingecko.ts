import type { Coin, GlobalMarketData, TrendingCoin } from '@/types';

const DIRECT = 'https://api.coingecko.com/api/v3';

/** Returns gateway base when EXPO_PUBLIC_API_URL is set, else falls back to direct CoinGecko. */
function base() {
  const gw = process.env.EXPO_PUBLIC_API_URL;
  return gw ? `${gw}/market` : DIRECT;
}

export async function getCoins(
  page = 1,
  perPage = 100,
  currency = 'usd'
): Promise<Coin[]> {
  const b = base();
  const url = b.includes('/market')
    ? `${b}/coins/markets?currency=${currency}&page=${page}&per_page=${perPage}`
    : `${b}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  return res.json();
}

export async function getGlobalData(): Promise<GlobalMarketData> {
  const b = base();
  if (b.includes('/market')) {
    const res = await fetch(`${b}/global`);
    if (!res.ok) throw new Error(`Market service error: ${res.status}`);
    return res.json();
  }
  const res = await fetch(`${b}/global`);
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  const json = await res.json();
  const d = json.data;
  return {
    total_market_cap_usd: d.total_market_cap.usd,
    total_volume_usd: d.total_volume.usd,
    btc_dominance: d.market_cap_percentage.btc,
    eth_dominance: d.market_cap_percentage.eth,
    market_cap_change_percentage_24h: d.market_cap_change_percentage_24h_usd,
  };
}

export async function getTrending(): Promise<TrendingCoin[]> {
  const b = base();
  if (b.includes('/market')) {
    const res = await fetch(`${b}/trending`);
    if (!res.ok) throw new Error(`Market service error: ${res.status}`);
    return res.json();
  }
  const res = await fetch(`${b}/search/trending`);
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  const json = await res.json();
  return (json.coins as { item: Record<string, unknown> }[]).map(({ item }) => ({
    id: item.id as string,
    name: item.name as string,
    symbol: item.symbol as string,
    thumb: item.thumb as string,
    market_cap_rank: (item.market_cap_rank as number) ?? 0,
    price_btc: (item.price_btc as number) ?? 0,
  }));
}

export async function getCoinDetail(id: string) {
  const res = await fetch(
    `${DIRECT}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`
  );
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  return res.json();
}

export async function getCoinChart(id: string, days: number | 'max', currency = 'usd') {
  const b = base();
  const url = b.includes('/market')
    ? `${b}/coins/${id}/chart?days=${days}&currency=${currency}`
    : `${b}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  return res.json();
}
