import { View, StyleSheet, Dimensions } from 'react-native';
import Colors from '@/constants/Colors';

interface PriceChartProps {
  prices: number[];
  height?: number;
}

const SCREEN_W = Dimensions.get('window').width;

export default function PriceChart({ prices, height = 100 }: PriceChartProps) {
  if (!prices.length) return <View style={{ height }} />;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  const isUp = prices[prices.length - 1] >= prices[0];
  const color = isUp ? Colors.green : Colors.red;

  // Downsample so we have at most one bar per 3px
  const barCount = Math.floor((SCREEN_W - 32) / 3);
  const step = Math.max(1, Math.floor(prices.length / barCount));
  const sampled: number[] = [];
  for (let i = 0; i < prices.length; i += step) sampled.push(prices[i]);

  return (
    <View style={[styles.container, { height }]}>
      {sampled.map((price, i) => {
        const barH = Math.max(2, ((price - min) / range) * height);
        const opacity = 0.35 + (i / sampled.length) * 0.65;
        return (
          <View
            key={i}
            style={[styles.bar, { height: barH, backgroundColor: color, opacity }]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 1,
  },
  bar: {
    flex: 1,
    borderRadius: 1,
  },
});
