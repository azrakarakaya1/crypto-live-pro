import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import type { ChainNetworkStats } from '@/types';

interface Props {
  stats: ChainNetworkStats;
  chain: 'btc' | 'eth';
}

export default function FeeCard({ stats, chain }: Props) {
  const unit = chain === 'btc' ? 'sat/vB' : 'Gwei';

  const tiers = [
    { label: 'Low', value: stats.feeLow, color: Colors.green },
    { label: 'Medium', value: stats.feeMed, color: '#FBBF24' },
    { label: 'High', value: stats.feeHigh, color: Colors.red },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Fee Estimates</Text>
      <View style={styles.row}>
        {tiers.map((t) => (
          <View key={t.label} style={styles.tier}>
            <View style={[styles.dot, { backgroundColor: t.color }]} />
            <Text style={styles.tierLabel}>{t.label}</Text>
            <Text style={[styles.tierValue, { color: t.color }]}>
              {t.value}
            </Text>
            <Text style={styles.unit}>{unit}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 16,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  tier: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tierLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  tierValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  unit: {
    fontSize: 10,
    color: Colors.textMuted,
  },
});
