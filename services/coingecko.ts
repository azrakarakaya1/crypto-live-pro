import type { Coin, GlobalMarketData, TrendingCoin } from '@/types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export async function getCoins(
  page = 1,
  perPage = 100,
  currency = 'usd'
): Promise<Coin[]> {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`
  );
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  return res.json();
}

export async function getGlobalData(): Promise<GlobalMarketData> {
  const res = await fetch(`${BASE_URL}/global`);
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
  const res = await fetch(`${BASE_URL}/search/trending`);
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
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`
  );
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  return res.json();
}

export async function getCoinChart(
  id: string,
  days: number | 'max',
  currency = 'usd'
) {
  const res = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
  );
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  return res.json();
}
