import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { formatUSD, formatPercent } from '@/utils/formatters';
import type { PortfolioEntry } from '@/types';

interface Props {
  entry: PortfolioEntry;
  currentPrice: number;
  onRemove: (id: string) => void;
}

export default function HoldingRow({ entry, currentPrice, onRemove }: Props) {
  const value = entry.amount * currentPrice;
  const cost = entry.amount * entry.costBasis;
  const pnl = value - cost;
  const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
  const isPositive = pnl >= 0;

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.symbolCircle}>
          <Text style={styles.symbolText}>{entry.symbol.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{entry.name}</Text>
          <Text style={styles.amount}>
            {entry.amount} {entry.symbol.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.value}>{formatUSD(value)}</Text>
        <View style={[styles.badge, isPositive ? styles.badgeGreen : styles.badgeRed]}>
          <Text style={[styles.badgeText, { color: isPositive ? Colors.green : Colors.red }]}>
            {isPositive ? '+' : ''}{formatPercent(pnlPct)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onRemove(entry.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.deleteIcon}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 72,
    paddingHorizontal: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  symbolCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  info: {
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  amount: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
    marginRight: 12,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeGreen: {
    backgroundColor: 'rgba(34,197,94,0.15)',
  },
  badgeRed: {
    backgroundColor: 'rgba(239,68,68,0.15)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  deleteBtn: {
    padding: 4,
  },
  deleteIcon: {
    fontSize: 16,
  },
});
