import { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import {
  getBtcNetworkStats,
  getEthNetworkStats,
  getBtcMempoolStats,
  getBtcDifficultyStats,
} from '@/services/onchain';
import type { ChainNetworkStats, BtcMempoolStats, BtcDifficultyStats } from '@/types';
import ChainSelector, { type Chain } from '@/components/onchain/ChainSelector';
import NetworkCard from '@/components/onchain/NetworkCard';
import FeeCard from '@/components/onchain/FeeCard';
import MempoolCard from '@/components/onchain/MempoolCard';
import DifficultyCard from '@/components/onchain/DifficultyCard';

export default function OnChainScreen() {
  const [chain, setChain] = useState<Chain>('btc');

  const [networkStats, setNetworkStats] = useState<ChainNetworkStats | null>(null);
  const [mempoolStats, setMempoolStats] = useState<BtcMempoolStats | null>(null);
  const [difficultyStats, setDifficultyStats] = useState<BtcDifficultyStats | null>(null);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);
      setError(null);
      try {
        if (chain === 'btc') {
          const [net, mempool, diff] = await Promise.all([
            getBtcNetworkStats(),
            getBtcMempoolStats(),
            getBtcDifficultyStats(),
          ]);
          setNetworkStats(net);
          setMempoolStats(mempool);
          setDifficultyStats(diff);
        } else {
          const net = await getEthNetworkStats();
          setNetworkStats(net);
          setMempoolStats(null);
          setDifficultyStats(null);
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Failed to load on-chain data');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [chain]
  );

  useEffect(() => {
    load();
  }, [load]);

  function onRefresh() {
    setRefreshing(true);
    load(true);
  }

  function renderContent() {
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading {chain.toUpperCase()} data…</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Ionicons name="cloud-offline-outline" size={48} color={Colors.textMuted} />
          <Text style={styles.errorTitle}>Failed to load</Text>
          <Text style={styles.errorBody}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => load()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!networkStats) return null;

    return (
      <>
        <NetworkCard stats={networkStats} chain={chain} />
        <FeeCard stats={networkStats} chain={chain} />

        {chain === 'btc' && mempoolStats && (
          <MempoolCard stats={mempoolStats} />
        )}

        {chain === 'btc' && difficultyStats && (
          <DifficultyCard stats={difficultyStats} />
        )}

        {chain === 'eth' && (
          <View style={styles.comingSoonCard}>
            <Ionicons name="construct-outline" size={32} color={Colors.textMuted} />
            <Text style={styles.comingSoonTitle}>More ETH metrics coming soon</Text>
            <Text style={styles.comingSoonBody}>
              Gas history, staking APR, and whale flow data are planned for Phase 2.
            </Text>
          </View>
        )}
      </>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>On-Chain</Text>
        <Text style={styles.subtitle}>Live network metrics</Text>
      </View>

      <ChainSelector selected={chain} onChange={setChain} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {renderContent()}
        <View style={{ height: 24 }} />
      </ScrollView>
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
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  scrollContent: {
    flexGrow: 1,
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
  comingSoonCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 24,
    alignItems: 'center',
    gap: 10,
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  comingSoonBody: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
