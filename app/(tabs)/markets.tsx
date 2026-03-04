import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { useMarketStore } from '@/store/useMarketStore';
import CoinRow from '@/components/ui/CoinRow';
import SearchBar from '@/components/markets/SearchBar';
import SortBar, { type SortKey } from '@/components/markets/SortBar';
import type { Coin } from '@/types';

type ViewMode = 'all' | 'watchlist';

export default function MarketsScreen() {
  const { coins, watchlist, loading, error } = useMarketStore();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('market_cap');
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [refreshing, setRefreshing] = useState(false);

  const filteredCoins = useMemo(() => {
    const q = query.toLowerCase().trim();
    let list: Coin[] = viewMode === 'watchlist'
      ? coins.filter((c) => watchlist.includes(c.id))
      : [...coins];

    if (q) {
      list = list.filter(
        (c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      if (sortKey === 'price_change_percentage_24h') {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      }
      return b[sortKey] - a[sortKey];
    });

    return list;
  }, [coins, watchlist, query, sortKey, viewMode]);

  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }

  const subtitle =
    viewMode === 'watchlist'
      ? `${watchlist.length} starred`
      : `${coins.length} coins`;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Markets</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.modeToggle}>
          <TouchableOpacity
            style={[styles.modeBtn, viewMode === 'all' && styles.modeBtnActive]}
            onPress={() => setViewMode('all')}
          >
            <Text style={[styles.modeBtnText, viewMode === 'all' && styles.modeBtnTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeBtn, viewMode === 'watchlist' && styles.modeBtnActive]}
            onPress={() => setViewMode('watchlist')}
          >
            <Ionicons
              name="star"
              size={12}
              color={viewMode === 'watchlist' ? Colors.text : Colors.textSecondary}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.modeBtnText, viewMode === 'watchlist' && styles.modeBtnTextActive]}>
              Watchlist
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar value={query} onChangeText={setQuery} />
      <SortBar selected={sortKey} onSelect={setSortKey} />

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

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
            <View style={styles.emptyBlock}>
              {viewMode === 'watchlist' && watchlist.length === 0 ? (
                <>
                  <Ionicons name="star-outline" size={40} color={Colors.textMuted} />
                  <Text style={styles.emptyText}>No starred coins yet</Text>
                  <Text style={styles.emptyHint}>
                    Tap ☆ on any coin detail page to add it here
                  </Text>
                </>
              ) : (
                <Text style={styles.emptyText}>No coins match "{query}"</Text>
              )}
            </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 3,
    gap: 3,
  },
  modeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  modeBtnActive: {
    backgroundColor: Colors.primary,
  },
  modeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  modeBtnTextActive: {
    color: Colors.text,
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
    paddingVertical: 60,
    gap: 10,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  emptyHint: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
