import { useEffect } from 'react';
import { Alert } from 'react-native';
import { getCoins, getGlobalData, getTrending } from '@/services/coingecko';
import { getFearGreed } from '@/services/feargreed';
import { useMarketStore } from '@/store/useMarketStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function useInitMarketData() {
  const { setCoins, setGlobalData, setTrending, setFearGreed, setLoading, setError } =
    useMarketStore();
  const currency = useSettingsStore((s) => s.currency);
  const alerts = usePortfolioStore((s) => s.alerts);
  const triggerAlert = usePortfolioStore((s) => s.triggerAlert);

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

        // Check price alerts
        const activeAlerts = alerts.filter((a) => !a.triggered);
        for (const alert of activeAlerts) {
          const coin = coins.find((c) => c.id === alert.coinId);
          if (!coin) continue;
          const hit =
            (alert.direction === 'above' && coin.current_price >= alert.targetPrice) ||
            (alert.direction === 'below' && coin.current_price <= alert.targetPrice);
          if (hit) {
            triggerAlert(alert.id);
            Alert.alert(
              '🔔 Price Alert',
              `${alert.symbol.toUpperCase()} is now ${alert.direction} $${alert.targetPrice.toLocaleString()}\nCurrent price: $${coin.current_price.toLocaleString()}`
            );
          }
        }
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
