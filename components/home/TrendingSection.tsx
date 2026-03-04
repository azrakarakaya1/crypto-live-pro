import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import type { TrendingCoin } from '@/types';
import Colors from '@/constants/Colors';

interface TrendingSectionProps {
  coins: TrendingCoin[];
}

export default function TrendingSection({ coins }: TrendingSectionProps) {
  if (coins.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Trending</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {coins.map((coin) => (
          <TrendingCard key={coin.id} coin={coin} />
        ))}
      </ScrollView>
    </View>
  );
}

function TrendingCard({ coin }: { coin: TrendingCoin }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: coin.thumb }} style={styles.thumb} />
      <Text style={styles.symbol} numberOfLines={1}>{coin.symbol.toUpperCase()}</Text>
      <Text style={styles.name} numberOfLines={1}>{coin.name}</Text>
      {coin.market_cap_rank > 0 && (
        <Text style={styles.rank}>#{coin.market_cap_rank}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  row: {
    paddingHorizontal: 16,
    gap: 10,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 14,
    width: 110,
    alignItems: 'center',
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  symbol: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  name: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  rank: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
});
