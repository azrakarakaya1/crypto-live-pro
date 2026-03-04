import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { formatLargeNumber } from '@/utils/formatters';
import type { BtcMempoolStats } from '@/types';

interface Props {
  stats: BtcMempoolStats;
}

export default function MempoolCard({ stats }: Props) {
  const sizeMB = (stats.vsizeBytes / 1_000_000).toFixed(2);
  const totalFeeBtc = (stats.totalFeeSat / 1e8).toFixed(4);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Mempool</Text>
      <View style={styles.row}>
        <StatCell label="Pending Txs" value={formatLargeNumber(stats.count)} />
        <StatCell label="Size" value={`${sizeMB} MB`} />
        <StatCell label="Total Fees" value={`${totalFeeBtc} BTC`} />
      </View>
    </View>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.cell}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
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
  cell: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    gap: 6,
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
});
