import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import type { Sentiment } from '@/types';

export type NewsFilter = 'all' | Sentiment;

const FILTERS: { key: NewsFilter; label: string }[] = [
  { key: 'all',      label: 'All' },
  { key: 'positive', label: 'Bullish' },
  { key: 'negative', label: 'Bearish' },
  { key: 'neutral',  label: 'Neutral' },
];

interface Props {
  active: NewsFilter;
  onChange: (f: NewsFilter) => void;
}

export default function FilterBar({ active, onChange }: Props) {
  return (
    <View style={styles.row}>
      {FILTERS.map((f) => {
        const isActive = active === f.key;
        return (
          <TouchableOpacity
            key={f.key}
            style={[styles.pill, isActive && styles.pillActive]}
            onPress={() => onChange(f.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
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
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  labelActive: {
    color: Colors.text,
  },
});
