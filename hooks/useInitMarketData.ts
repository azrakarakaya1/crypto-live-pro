import { useEffect } from 'react';
import { getCoins, getGlobalData, getTrending } from '@/services/coingecko';
import { getFearGreed } from '@/services/feargreed';
import { useMarketStore } from '@/store/useMarketStore';
import { useSettingsStore } from '@/store/useSettingsStore';

export function useInitMarketData() {
  const { setCoins, setGlobalData, setTrending, setFearGreed, setLoading, setError } =
    useMarketStore();
  const currency = useSettingsStore((s) => s.currency);

  useEffect(() => {
    let active = true;

    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const [coins, globalData, trending, fearGreed] = await Promise.all([
          getCoins(1, 100, currency),
          getGlobalData(),
          getTrending(),
          getFearGreed(),
        ]);
        if (!active) return;
        setCoins(coins);
        setGlobalData(globalData);
        setTrending(trending);
        setFearGreed(fearGreed);
      } catch (e) {
        if (!active) return;
        setError(e instanceof Error ? e.message : 'Failed to load market data');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchAll();
    const interval = setInterval(fetchAll, 60_000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [currency]);
}
