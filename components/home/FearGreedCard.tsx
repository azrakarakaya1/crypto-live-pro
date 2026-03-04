import { View, Text, StyleSheet } from 'react-native';
import type { FearGreedData } from '@/types';
import Colors from '@/constants/Colors';

interface FearGreedCardProps {
  data: FearGreedData;
}

function getColor(value: number): string {
  if (value <= 25) return '#EF4444';   // red — Extreme Fear
  if (value <= 45) return '#F97316';   // orange — Fear
  if (value <= 55) return '#EAB308';   // yellow — Neutral
  if (value <= 75) return '#84CC16';   // lime — Greed
  return '#22C55E';                     // green — Extreme Greed
}

export default function FearGreedCard({ data }: FearGreedCardProps) {
  const color = getColor(data.value);

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Fear & Greed Index</Text>
      <Text style={[styles.number, { color }]}>{data.value}</Text>
      <Text style={[styles.classification, { color }]}>{data.classification}</Text>

      {/* Progress bar */}
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${data.value}%` as `${number}%`, backgroundColor: color }]} />
        <View style={[styles.marker, { left: `${data.value}%` as `${number}%` }]} />
      </View>

      <View style={styles.scaleRow}>
        <Text style={styles.scaleLabel}>Extreme Fear</Text>
        <Text style={styles.scaleLabel}>Extreme Greed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  number: {
    fontSize: 56,
    fontWeight: '800',
    lineHeight: 60,
  },
  classification: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  barTrack: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.cardBorder,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  marker: {
    position: 'absolute',
    top: -3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.text,
    marginLeft: -7,
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 6,
  },
  scaleLabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
});
