import type { FearGreedData } from '@/types';

export async function getFearGreed(): Promise<FearGreedData> {
  const gw = process.env.EXPO_PUBLIC_API_URL;

  if (gw) {
    // Route through gateway (avoids CORS on web)
    const res = await fetch(`${gw}/market/fear-greed`);
    if (!res.ok) throw new Error(`Fear & Greed error: ${res.status}`);
    const json = await res.json();
    return {
      value: json.value,
      classification: json.label,
      timestamp: String(Date.now()),
    };
  }

  // Direct fallback (native only)
  const res = await fetch('https://api.alternative.me/fng/?limit=1');
  if (!res.ok) throw new Error(`Fear & Greed error: ${res.status}`);
  const json = await res.json();
  const entry = json.data[0];
  return {
    value: Number(entry.value),
    classification: entry.value_classification,
    timestamp: entry.timestamp,
  };
}
