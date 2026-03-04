import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export type SortKey = 'market_cap' | 'current_price' | 'price_change_percentage_24h' | 'total_volume';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'market_cap', label: 'Market Cap' },
  { key: 'current_price', label: 'Price' },
  { key: 'price_change_percentage_24h', label: '24h %' },
  { key: 'total_volume', label: 'Volume' },
];

interface SortBarProps {
  selected: SortKey;
  onSelect: (key: SortKey) => void;
}

export default function SortBar({ selected, onSelect }: SortBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={styles.container}
    >
      {SORT_OPTIONS.map((opt) => {
        const active = selected === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            style={[styles.pill, active && styles.pillActive]}
            onPress={() => onSelect(opt.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.pillText, active && styles.pillTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },
  row: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 6,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  pillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  pillTextActive: {
    color: Colors.text,
  },
});
