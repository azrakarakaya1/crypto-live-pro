import { View, Text, StyleSheet } from 'react-native';
import type { GlobalMarketData } from '@/types';
import { formatUSD, formatPercent } from '@/utils/formatters';
import Colors from '@/constants/Colors';

interface MarketStatsCardProps {
  data: GlobalMarketData;
}

export default function MarketStatsCard({ data }: MarketStatsCardProps) {
  const capChange = data.market_cap_change_percentage_24h;
  const capChangeColor = capChange >= 0 ? Colors.green : Colors.red;

  return (
    <View style={styles.card}>
      <StatItem
        label="Market Cap"
        value={formatUSD(data.total_market_cap_usd, true)}
        sub={formatPercent(capChange)}
        subColor={capChangeColor}
      />
      <View style={styles.divider} />
      <StatItem
        label="BTC Dom."
        value={`${data.btc_dominance.toFixed(1)}%`}
      />
      <View style={styles.divider} />
      <StatItem
        label="24h Volume"
        value={formatUSD(data.total_volume_usd, true)}
      />
    </View>
  );
}

function StatItem({
  label,
  value,
  sub,
  subColor,
}: {
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
}) {
  return (
    <View style={styles.stat}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {sub ? <Text style={[styles.sub, { color: subColor }]}>{sub}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 14,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: 4,
  },
  label: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  sub: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});
