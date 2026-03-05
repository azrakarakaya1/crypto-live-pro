import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { formatPercent } from '@/utils/formatters';
import { useFormatPrice } from '@/hooks/useFormatPrice';
import { useMarketStore } from '@/store/useMarketStore';
import type { PortfolioEntry } from '@/types';

interface Props {
  entry: PortfolioEntry;
  currentPrice: number;
  onRemove: (id: string) => void;
  onEdit: (entry: PortfolioEntry) => void;
}

export default function HoldingRow({ entry, currentPrice, onRemove, onEdit }: Props) {
  const coin = useMarketStore((s) => s.coins.find((c) => c.id === entry.coinId));
  const fmt = useFormatPrice();

  const value = entry.amount * currentPrice;
  const cost = entry.amount * entry.costBasis;
  const pnl = value - cost;
  const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
  const isPositive = pnl >= 0;

  function confirmRemove() {
    Alert.alert(
      'Remove Holding',
      `Remove ${entry.name} from your portfolio?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onRemove(entry.id) },
      ]
    );
  }

  return (
    <Pressable style={styles.row} onLongPress={() => onEdit(entry)} delayLongPress={300}>
      {/* Logo */}
      {coin?.image ? (
        <Image source={{ uri: coin.image }} style={styles.logo} />
      ) : (
        <View style={styles.logoFallback}>
          <Text style={styles.logoFallbackText}>{entry.symbol.charAt(0).toUpperCase()}</Text>
        </View>
      )}

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{entry.name}</Text>
        <Text style={styles.amount}>
          {entry.amount} {entry.symbol.toUpperCase()}
        </Text>
      </View>

      {/* Value + P&L */}
      <View style={styles.right}>
        <Text style={styles.value}>{fmt(value)}</Text>
        <Text style={[styles.pnl, { color: isPositive ? Colors.green : Colors.red }]}>
          {isPositive ? '+' : ''}{formatPercent(pnlPct)}
        </Text>
      </View>

      {/* Delete */}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => onEdit(entry)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="create-outline" size={16} color={Colors.textMuted} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={confirmRemove}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="trash-outline" size={16} color={Colors.textMuted} />
      </TouchableOpacity>
    </Pressable>
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
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logoFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFallbackText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  info: {
    flex: 1,
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
    gap: 3,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  pnl: {
    fontSize: 12,
    fontWeight: '600',
  },
  editBtn: {
    padding: 4,
  },
  deleteBtn: {
    padding: 4,
  },
});
