import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { formatLargeNumber, formatPercent } from '@/utils/formatters';
import { useFormatPrice } from '@/hooks/useFormatPrice';
import type { Coin } from '@/types';

interface Props {
  coin: Coin;
}

interface StatItem {
  label: string;
  value: string;
  valueColor?: string;
}

export default function CoinStatGrid({ coin }: Props) {
  const fmt = useFormatPrice();
  const athChange = ((coin.current_price - coin.ath) / coin.ath) * 100;
  const atlChange = ((coin.current_price - coin.atl) / coin.atl) * 100;

  const stats: StatItem[] = [
    { label: 'Market Cap', value: fmt(coin.market_cap, true) },
    { label: '24h Volume', value: fmt(coin.total_volume, true) },
    {
      label: 'All-Time High',
      value: fmt(coin.ath),
    },
    {
      label: 'From ATH',
      value: formatPercent(athChange),
      valueColor: athChange >= 0 ? Colors.green : Colors.red,
    },
    {
      label: 'All-Time Low',
      value: fmt(coin.atl),
    },
    {
      label: 'From ATL',
      value: formatPercent(atlChange),
      valueColor: atlChange >= 0 ? Colors.green : Colors.red,
    },
    {
      label: 'Circulating Supply',
      value: `${formatLargeNumber(coin.circulating_supply)} ${coin.symbol.toUpperCase()}`,
    },
    { label: 'Rank', value: `#${coin.market_cap_rank}` },
  ];

  return (
    <View style={styles.grid}>
      {stats.map((s) => (
        <View key={s.label} style={styles.cell}>
          <Text style={styles.label}>{s.label}</Text>
          <Text style={[styles.value, s.valueColor ? { color: s.valueColor } : null]}>
            {s.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
  },
  cell: {
    width: '50%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    borderRightWidth: 1,
    borderRightColor: Colors.cardBorder,
  },
  label: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
});
