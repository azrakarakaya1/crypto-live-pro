import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { formatLargeNumber } from '@/utils/formatters';
import type { ChainNetworkStats } from '@/types';

interface Props {
  stats: ChainNetworkStats;
  chain: 'btc' | 'eth';
}

export default function NetworkCard({ stats, chain }: Props) {
  const feeUnit = chain === 'btc' ? 'sat/vB' : 'Gwei';

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Network</Text>
      <View style={styles.row}>
        <Stat icon="cube-outline" label="Block Height" value={`#${formatLargeNumber(stats.blockHeight)}`} />
        <Stat icon="people-outline" label="Peers" value={formatLargeNumber(stats.peerCount)} />
      </View>
      <View style={styles.row}>
        <Stat
          icon="time-outline"
          label="Unconfirmed Txs"
          value={formatLargeNumber(stats.unconfirmedCount)}
        />
        <Stat
          icon="flash-outline"
          label="Fast Fee"
          value={`${stats.feeHigh} ${feeUnit}`}
          valueColor={Colors.red}
        />
      </View>
    </View>
  );
}

function Stat({
  icon,
  label,
  value,
  valueColor,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View style={styles.stat}>
      <View style={styles.statHeader}>
        <Ionicons name={icon} size={14} color={Colors.textMuted} />
        <Text style={styles.statLabel}>{label}</Text>
      </View>
      <Text style={[styles.statValue, valueColor ? { color: valueColor } : null]}>
        {value}
      </Text>
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
    gap: 12,
    marginBottom: 12,
  },
  stat: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
});
