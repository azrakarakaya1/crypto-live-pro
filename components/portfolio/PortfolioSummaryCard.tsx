import { StyleSheet, View, Text } from 'react-native';
import Colors from '@/constants/Colors';
import { formatPercent } from '@/utils/formatters';
import { useFormatPrice } from '@/hooks/useFormatPrice';

interface Props {
  totalValue: number;
  totalCost: number;
}

export default function PortfolioSummaryCard({ totalValue, totalCost }: Props) {
  const fmt = useFormatPrice();
  const pnl = totalValue - totalCost;
  const pnlPct = totalCost > 0 ? (pnl / totalCost) * 100 : 0;
  const isPositive = pnl >= 0;

  if (totalValue === 0 && totalCost === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.emptyTitle}>No holdings yet</Text>
        <Text style={styles.emptySubtitle}>Tap + to add your first holding</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total Portfolio Value</Text>
      <Text style={styles.value}>{fmt(totalValue)}</Text>
      <View style={styles.row}>
        <Text style={styles.costLabel}>Cost basis: {fmt(totalCost)}</Text>
        <View style={[styles.badge, isPositive ? styles.badgeGreen : styles.badgeRed]}>
          <Text style={[styles.badgeText, { color: isPositive ? Colors.green : Colors.red }]}>
            {isPositive ? '+' : ''}{fmt(pnl)} ({formatPercent(pnlPct)})
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  costLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeGreen: {
    backgroundColor: 'rgba(34,197,94,0.15)',
  },
  badgeRed: {
    backgroundColor: 'rgba(239,68,68,0.15)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
