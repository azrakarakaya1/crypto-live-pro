import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useCallback } from 'react';

import Colors from '@/constants/Colors';
import { useMarketStore } from '@/store/useMarketStore';
import { getCoinChart } from '@/services/coingecko';
import { formatUSD, formatPercent } from '@/utils/formatters';
import LineChart from '@/components/markets/LineChart';
import CoinStatGrid from '@/components/markets/CoinStatGrid';

type Range = '1' | '7' | '30' | '365';
const RANGES: { label: string; value: Range }[] = [
  { label: '1D', value: '1' },
  { label: '7D', value: '7' },
  { label: '30D', value: '30' },
  { label: '1Y', value: '365' },
];

export default function CoinDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const coin = useMarketStore((s) => s.coins.find((c) => c.id === id));
  const watchlist = useMarketStore((s) => s.watchlist);
  const addToWatchlist = useMarketStore((s) => s.addToWatchlist);
  const removeFromWatchlist = useMarketStore((s) => s.removeFromWatchlist);

  const { width: screenWidth } = useWindowDimensions();

  const [range, setRange] = useState<Range>('7');
  const [prices, setPrices] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<number[]>([]);
  const [chartLoading, setChartLoading] = useState(false);

  const isWatchlisted = id ? watchlist.includes(id) : false;

  const loadChart = useCallback(async () => {
    if (!id) return;
    setChartLoading(true);
    try {
      const data = await getCoinChart(id, Number(range));
      const raw = data.prices as [number, number][];
      setTimestamps(raw.map(([t]) => t));
      setPrices(raw.map(([, p]) => p));
    } catch {
      // silently fail
    } finally {
      setChartLoading(false);
    }
  }, [id, range]);

  useEffect(() => {
    loadChart();
  }, [loadChart]);

  if (!coin) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const isUp = coin.price_change_percentage_24h >= 0;
  const changeColor = isUp ? Colors.green : Colors.red;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Nav bar */}
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.navCenter}>
          <Image source={{ uri: coin.image }} style={styles.navLogo} />
          <Text style={styles.navTitle}>{coin.name}</Text>
          <Text style={styles.navSymbol}>{coin.symbol.toUpperCase()}</Text>
        </View>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() =>
            isWatchlisted ? removeFromWatchlist(coin.id) : addToWatchlist(coin.id)
          }
        >
          <Ionicons
            name={isWatchlisted ? 'star' : 'star-outline'}
            size={22}
            color={isWatchlisted ? '#FBBF24' : Colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Price header */}
        <View style={styles.priceBlock}>
          <Text style={styles.price}>{formatUSD(coin.current_price)}</Text>
          <View style={[styles.changeBadge, { backgroundColor: isUp ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)' }]}>
            <Ionicons
              name={isUp ? 'arrow-up' : 'arrow-down'}
              size={13}
              color={changeColor}
            />
            <Text style={[styles.changeText, { color: changeColor }]}>
              {formatPercent(Math.abs(coin.price_change_percentage_24h))} (24h)
            </Text>
          </View>
        </View>

        {/* Range selector */}
        <View style={styles.rangeRow}>
          {RANGES.map((r) => (
            <TouchableOpacity
              key={r.value}
              style={[styles.rangeBtn, range === r.value && styles.rangeBtnActive]}
              onPress={() => setRange(r.value)}
            >
              <Text style={[styles.rangeBtnText, range === r.value && styles.rangeBtnTextActive]}>
                {r.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          {chartLoading ? (
            <View style={styles.chartPlaceholder}>
              <ActivityIndicator size="small" color={Colors.primary} />
            </View>
          ) : (
            <LineChart
              prices={prices}
              timestamps={timestamps}
              range={range}
              width={screenWidth - 32}
              height={200}
              color={isUp ? Colors.green : Colors.red}
            />
          )}
        </View>

        {/* Stats grid */}
        <Text style={styles.sectionTitle}>Market Stats</Text>
        <CoinStatGrid coin={coin} />

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  navBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  navLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  navSymbol: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  content: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  priceBlock: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  price: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.text,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  rangeRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  rangeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  rangeBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  rangeBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  rangeBtnTextActive: {
    color: Colors.text,
  },
  chartContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
    height: 200,
    justifyContent: 'center',
  },
  chartPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});
