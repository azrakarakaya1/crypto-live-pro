import { StyleSheet, View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo } from 'react';

import Colors from '@/constants/Colors';
import { useMarketStore } from '@/store/useMarketStore';
import CoinRow from '@/components/ui/CoinRow';
import SearchBar from '@/components/markets/SearchBar';
import SortBar, { type SortKey } from '@/components/markets/SortBar';
import type { Coin } from '@/types';

export default function MarketsScreen() {
  const { coins, loading, error } = useMarketStore();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('market_cap');
  const [refreshing, setRefreshing] = useState(false);

  const filteredCoins = useMemo(() => {
    const q = query.toLowerCase().trim();
    let list: Coin[] = q
      ? coins.filter(
          (c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
        )
      : [...coins];

    list.sort((a, b) => {
      if (sortKey === 'price_change_percentage_24h') {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      }
      return b[sortKey] - a[sortKey];
    });

    return list;
  }, [coins, query, sortKey]);

  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Markets</Text>
        <Text style={styles.subtitle}>{coins.length} coins</Text>
      </View>

      <SearchBar value={query} onChangeText={setQuery} />
      <SortBar selected={sortKey} onSelect={setSortKey} />

      {/* Error banner */}
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Loading spinner (first load only) */}
      {loading && coins.length === 0 ? (
        <View style={styles.loadingBlock}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading coins…</Text>
        </View>
      ) : (
        <FlatList
          data={filteredCoins}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CoinRow coin={item} />}
          initialNumToRender={20}
          windowSize={10}
          maxToRenderPerBatch={20}
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
          ListEmptyComponent={
            query.length > 0 ? (
              <View style={styles.emptyBlock}>
                <Text style={styles.emptyText}>No coins match "{query}"</Text>
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
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
  list: {
    flex: 1,
  },
  errorBanner: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: 'rgba(239,68,68,0.15)',
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    color: Colors.red,
    fontSize: 13,
  },
  loadingBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  emptyBlock: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
