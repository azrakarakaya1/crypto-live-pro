import { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { useNews } from '@/hooks/useNews';
import FilterBar, { type NewsFilter } from '@/components/news/FilterBar';
import NewsCard from '@/components/news/NewsCard';

export default function NewsScreen() {
  const { articles, loading, error, refresh } = useNews();
  const [filter, setFilter] = useState<NewsFilter>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return articles;
    return articles.filter((a) => a.sentiment === filter);
  }, [articles, filter]);

  function renderContent() {
    if (loading && articles.length === 0) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading news…</Text>
        </View>
      );
    }

    if (error === 'no_key') {
      return (
        <View style={styles.center}>
          <Ionicons name="key-outline" size={48} color={Colors.textMuted} />
          <Text style={styles.errorTitle}>API Key Missing</Text>
          <Text style={styles.errorBody}>
            Add your CryptoPanic key to{' '}
            <Text style={styles.code}>.env</Text>:{'\n\n'}
            <Text style={styles.code}>EXPO_PUBLIC_CRYPTOPANIC_KEY=your_key</Text>
            {'\n\n'}Get a free key at cryptopanic.com
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Ionicons name="cloud-offline-outline" size={48} color={Colors.textMuted} />
          <Text style={styles.errorTitle}>Failed to load</Text>
          <Text style={styles.errorBody}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={refresh}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsCard article={item} />}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No {filter !== 'all' ? filter : ''} articles found.</Text>
          </View>
        }
        refreshing={loading}
        onRefresh={refresh}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>News</Text>
      </View>
      <FilterBar active={filter} onChange={setFilter} />
      {renderContent()}
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
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  list: {
    paddingTop: 4,
    paddingBottom: 32,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 80,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  errorBody: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  code: {
    fontFamily: 'monospace',
    color: Colors.primary,
  },
  retryBtn: {
    marginTop: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
