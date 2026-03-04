import { View, Text, Image, StyleSheet } from 'react-native';
import type { Coin } from '@/types';
import { formatUSD, formatPercent } from '@/utils/formatters';
import Colors from '@/constants/Colors';

interface CoinRowProps {
  coin: Coin;
}

export default function CoinRow({ coin }: CoinRowProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <View style={styles.row}>
      <Text style={styles.rank}>{coin.market_cap_rank}</Text>
      <Image source={{ uri: coin.image }} style={styles.logo} />
      <View style={styles.nameBlock}>
        <Text style={styles.name} numberOfLines={1}>{coin.name}</Text>
        <Text style={styles.symbol}>{coin.symbol.toUpperCase()}</Text>
      </View>
      <View style={styles.priceBlock}>
        <Text style={styles.price}>{formatUSD(coin.current_price)}</Text>
        <View style={[styles.badge, isPositive ? styles.badgeGreen : styles.badgeRed]}>
          <Text style={[styles.badgeText, isPositive ? styles.badgeTextGreen : styles.badgeTextRed]}>
            {formatPercent(coin.price_change_percentage_24h)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  rank: {
    width: 28,
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'right',
    marginRight: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  nameBlock: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  symbol: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  badge: {
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeGreen: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
  },
  badgeRed: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextGreen: {
    color: Colors.green,
  },
  badgeTextRed: {
    color: Colors.red,
  },
});
