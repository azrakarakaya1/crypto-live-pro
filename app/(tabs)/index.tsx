import { StyleSheet, View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import Colors from '@/constants/Colors';
import { useMarketStore } from '@/store/useMarketStore';
import MarketStatsCard from '@/components/home/MarketStatsCard';
import FearGreedCard from '@/components/home/FearGreedCard';
import TrendingSection from '@/components/home/TrendingSection';

export default function HomeScreen() {
  const { globalData, fearGreed, trending, loading, error } = useMarketStore();
  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    // Visual-only refresh — the 60s interval handles actual data refresh
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
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
          <Text style={styles.title}>Crypto Live Pro</Text>
          <Text style={styles.subtitle}>Live market overview</Text>
        </View>

        {/* Error banner */}
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Loading spinner (first load only) */}
        {loading && !globalData && (
          <View style={styles.loadingBlock}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading market data…</Text>
          </View>
        )}

        {/* Market Stats */}
        {globalData && <MarketStatsCard data={globalData} />}

        {/* Fear & Greed */}
        {fearGreed && <FearGreedCard data={fearGreed} />}

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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
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
