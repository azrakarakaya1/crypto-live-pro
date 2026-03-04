import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import Colors from '@/constants/Colors';
import { useMarketStore } from '@/store/useMarketStore';
import MarketStatsCard from '@/components/home/MarketStatsCard';
import FearGreedCard from '@/components/home/FearGreedCard';
import TrendingSection from '@/components/home/TrendingSection';
import TopCoinsRow from '@/components/home/TopCoinsRow';
import TopMovers from '@/components/home/TopMovers';

export default function HomeScreen() {
  const { globalData, fearGreed, trending, coins, loading, error } = useMarketStore();
  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Crypto Live Pro</Text>
            <Text style={styles.date}>{dateStr}</Text>
          </View>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>

        {/* Error banner */}
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Loading (first load only) */}
        {loading && !globalData && (
          <View style={styles.loadingBlock}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading market data…</Text>
          </View>
        )}

        {/* BTC + ETH prominent prices */}
        {coins.length > 0 && <TopCoinsRow coins={coins} />}

        {/* Market stats bar */}
        {globalData && <MarketStatsCard data={globalData} />}

        {/* Fear & Greed */}
        {fearGreed && <FearGreedCard data={fearGreed} />}

        {/* Top Gainers */}
        {coins.length > 0 && <TopMovers coins={coins} />}

        {/* Trending */}
        <TrendingSection coins={trending} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
  },
  date: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 3,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(34,197,94,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.2)',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.green,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.green,
  },
  errorBanner: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(239,68,68,0.15)',
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    color: Colors.red,
    fontSize: 13,
  },
  loadingBlock: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
