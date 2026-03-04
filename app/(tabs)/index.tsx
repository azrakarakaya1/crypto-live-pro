import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Image,
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
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.appName}>Crypto Live Pro</Text>
            <Text style={styles.date}>{dateStr}</Text>
          </View>
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>

        {/* ── Divider ── */}
        <View style={styles.divider} />

        {/* ── Error banner ── */}
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* ── First load spinner ── */}
        {loading && !globalData && (
          <View style={styles.loadingBlock}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading market data…</Text>
          </View>
        )}

        {/* ── BTC + ETH price cards ── */}
        {coins.length > 0 && <TopCoinsRow coins={coins} />}

        {/* ── Market stats ── */}
        {globalData && <MarketStatsCard data={globalData} />}

        {/* ── Fear & Greed ── */}
        {fearGreed && <FearGreedCard data={fearGreed} />}

        {/* ── Top Gainers ── */}
        {coins.length > 0 && <TopMovers coins={coins} />}

        {/* ── Trending ── */}
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
    paddingBottom: 40,
  },

  // ── Header ──────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
    gap: 12,
  },
  logoWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#E8F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.3)',
  },
  logoImage: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  titleBlock: {
    flex: 1,
  },
  appName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  date: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(34,197,94,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.25)',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.green,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.green,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginBottom: 16,
  },

  // ── States ──────────────────────────────
  errorBanner: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(239,68,68,0.12)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.25)',
    padding: 12,
  },
  errorText: {
    color: Colors.red,
    fontSize: 13,
  },
  loadingBlock: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
