import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { formatUSD, formatPercent } from '@/utils/formatters';
import type { Coin } from '@/types';

interface Props {
  coins: Coin[];
}

export default function TopMovers({ coins }: Props) {
  if (coins.length === 0) return null;

  const gainers = [...coins]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 6);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.heading}>Top Gainers</Text>
        <Text style={styles.subheading}>24h</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {gainers.map((coin) => (
          <MoverCard key={coin.id} coin={coin} />
        ))}
      </ScrollView>
    </View>
  );
}

function MoverCard({ coin }: { coin: Coin }) {
  const router = useRouter();
  const isUp = coin.price_change_percentage_24h >= 0;
  const changeColor = isUp ? Colors.green : Colors.red;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}
      onPress={() => router.push(`/coin/${coin.id}`)}
    >
      <Image source={{ uri: coin.image }} style={styles.logo} />
      <Text style={styles.symbol} numberOfLines={1}>
        {coin.symbol.toUpperCase()}
      </Text>
      <Text style={styles.price} numberOfLines={1}>
        {formatUSD(coin.current_price)}
      </Text>
      <View style={styles.changeBadge}>
        <Ionicons
          name={isUp ? 'arrow-up' : 'arrow-down'}
          size={10}
          color={changeColor}
        />
        <Text style={[styles.changeText, { color: changeColor }]}>
          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  subheading: {
    fontSize: 12,
    color: Colors.textMuted,
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
    width: 100,
    alignItems: 'center',
    gap: 6,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  symbol: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  price: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(34,197,94,0.12)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
