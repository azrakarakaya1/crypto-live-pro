import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { useMarketStore } from '@/store/useMarketStore';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import PortfolioSummaryCard from '@/components/portfolio/PortfolioSummaryCard';
import HoldingRow from '@/components/portfolio/HoldingRow';
import AddHoldingModal from '@/components/portfolio/AddHoldingModal';
import type { PortfolioEntry } from '@/types';

export default function PortfolioScreen() {
  const coins = useMarketStore((s) => s.coins);
  const entries = usePortfolioStore((s) => s.entries);
  const removeEntry = usePortfolioStore((s) => s.removeEntry);

  const [modalVisible, setModalVisible] = useState(false);

  function getCurrentPrice(coinId: string): number {
    return coins.find((c) => c.id === coinId)?.current_price ?? 0;
  }

  const totalValue = entries.reduce(
    (sum, e) => sum + e.amount * getCurrentPrice(e.coinId),
    0
  );
  const totalCost = entries.reduce((sum, e) => sum + e.amount * e.costBasis, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Portfolio</Text>
        </View>

        <FlatList<PortfolioEntry>
          data={entries}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <PortfolioSummaryCard totalValue={totalValue} totalCost={totalCost} />
          }
          renderItem={({ item }) => (
            <HoldingRow
              entry={item}
              currentPrice={getCurrentPrice(item.coinId)}
              onRemove={removeEntry}
            />
          )}
          ListEmptyComponent={null}
          contentContainerStyle={entries.length === 0 && styles.emptyContent}
          showsVerticalScrollIndicator={false}
        />

        {/* FAB */}
        <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>

        <AddHoldingModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      </View>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  emptyContent: {
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    fontSize: 28,
    color: Colors.text,
    lineHeight: 32,
  },
});
