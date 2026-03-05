import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import type { PriceAlert } from '@/types';

interface Props {
  alert: PriceAlert;
  onRemove: (id: string) => void;
}

export default function AlertRow({ alert, onRemove }: Props) {
  const isAbove = alert.direction === 'above';
  const color = alert.triggered
    ? Colors.textMuted
    : isAbove ? Colors.green : Colors.red;

  return (
    <View style={[styles.row, alert.triggered && styles.rowTriggered]}>
      <View style={[styles.iconWrap, { backgroundColor: alert.triggered ? 'rgba(255,255,255,0.05)' : isAbove ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)' }]}>
        <Ionicons
          name={isAbove ? 'arrow-up' : 'arrow-down'}
          size={14}
          color={color}
        />
      </View>

      <View style={styles.info}>
        <Text style={[styles.symbol, alert.triggered && styles.dimmed]}>
          {alert.symbol.toUpperCase()}
        </Text>
        <Text style={[styles.condition, { color }]}>
          {isAbove ? 'Above' : 'Below'} ${alert.targetPrice.toLocaleString()}
        </Text>
      </View>

      {alert.triggered && (
        <View style={styles.triggeredBadge}>
          <Text style={styles.triggeredText}>Triggered</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => onRemove(alert.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close" size={18} color={Colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    gap: 12,
  },
  rowTriggered: {
    opacity: 0.6,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  symbol: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  condition: {
    fontSize: 12,
    fontWeight: '600',
  },
  dimmed: {
    color: Colors.textSecondary,
  },
  triggeredBadge: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  triggeredText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
  },
});
