import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import type { Sentiment } from '@/types';

const CONFIG: Record<Sentiment, { label: string; color: string; bg: string }> = {
  positive: { label: 'Bullish', color: Colors.green, bg: 'rgba(34,197,94,0.15)' },
  negative: { label: 'Bearish', color: Colors.red, bg: 'rgba(239,68,68,0.15)' },
  neutral:  { label: 'Neutral', color: Colors.textSecondary, bg: 'rgba(156,163,175,0.15)' },
};

export default function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
  const { label, color, bg } = CONFIG[sentiment];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});
