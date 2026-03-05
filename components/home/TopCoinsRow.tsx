import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { formatPercent } from '@/utils/formatters';
import { useFormatPrice } from '@/hooks/useFormatPrice';
import type { Coin } from '@/types';

interface Props {
  coins: Coin[];
}

export default function TopCoinsRow({ coins }: Props) {
  const btc = coins.find((c) => c.id === 'bitcoin');
  const eth = coins.find((c) => c.id === 'ethereum');

  if (!btc && !eth) return null;

  return (
    <View style={styles.row}>
      {btc && <CoinCard coin={btc} />}
      {eth && <CoinCard coin={eth} />}
    </View>
  );
}

function CoinCard({ coin }: { coin: Coin }) {
  const router = useRouter();
  const fmt = useFormatPrice();
  const isUp = coin.price_change_percentage_24h >= 0;
  const changeColor = isUp ? Colors.green : Colors.red;
  const changeBg = isUp ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)';

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}
      onPress={() => router.push(`/coin/${coin.id}`)}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: coin.image }} style={styles.logo} />
        <View style={styles.nameBlock}>
          <Text style={styles.symbol}>{coin.symbol.toUpperCase()}</Text>
          <Text style={styles.name}>{coin.name}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: changeBg }]}>
          <Ionicons name={isUp ? 'arrow-up' : 'arrow-down'} size={10} color={changeColor} />
          <Text style={[styles.badgeText, { color: changeColor }]}>
            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
          </Text>
        </View>
      </View>
      <Text style={styles.price}>{fmt(coin.current_price)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 14,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  nameBlock: {
    flex: 1,
  },
  symbol: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  name: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
});
