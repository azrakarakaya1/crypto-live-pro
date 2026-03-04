import type { FearGreedData } from '@/types';

const BASE_URL = 'https://api.alternative.me/fng/';

export async function getFearGreed(): Promise<FearGreedData> {
  const res = await fetch(`${BASE_URL}?limit=1`);
  if (!res.ok) throw new Error(`Fear & Greed error: ${res.status}`);
  const json = await res.json();
  const entry = json.data[0];
  return {
    value: Number(entry.value),
    classification: entry.value_classification,
    timestamp: entry.timestamp,
  };
}
