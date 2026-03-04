import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { GlobalMarketData } from '@/types';
import { formatUSD, formatPercent } from '@/utils/formatters';
import Colors from '@/constants/Colors';

interface Props {
  data: GlobalMarketData;
}

export default function MarketStatsCard({ data }: Props) {
  const capChange = data.market_cap_change_percentage_24h;
  const isUp = capChange >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <StatCell
          label="Global Market Cap"
          value={formatUSD(data.total_market_cap_usd, true)}
          sub={formatPercent(capChange)}
          subColor={isUp ? Colors.green : Colors.red}
          subIcon={isUp ? 'arrow-up' : 'arrow-down'}
        />
        <View style={styles.vDivider} />
        <StatCell label="24h Volume" value={formatUSD(data.total_volume_usd, true)} />
      </View>
      <View style={styles.hDivider} />
      <View style={styles.row}>
        <StatCell
          label="BTC Dominance"
          value={`${data.btc_dominance.toFixed(1)}%`}
          icon="logo-bitcoin"
          iconColor="#F7931A"
        />
        <View style={styles.vDivider} />
        <StatCell
          label="ETH Dominance"
          value={`${data.eth_dominance.toFixed(1)}%`}
          icon="diamond-outline"
          iconColor="#627EEA"
        />
      </View>
    </View>
  );
}

function StatCell({
  label,
  value,
  sub,
  subColor,
  subIcon,
  icon,
  iconColor,
}: {
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
  subIcon?: keyof typeof Ionicons.glyphMap;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
}) {
  return (
    <View style={styles.cell}>
      <View style={styles.cellLabel}>
        {icon && <Ionicons name={icon} size={11} color={iconColor ?? Colors.textMuted} />}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      {sub && (
        <View style={styles.subRow}>
          {subIcon && (
            <Ionicons name={subIcon} size={10} color={subColor ?? Colors.textMuted} />
          )}
          <Text style={[styles.sub, { color: subColor }]}>{sub}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 14,
    gap: 4,
  },
  cellLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 10,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  sub: {
    fontSize: 11,
    fontWeight: '600',
  },
  vDivider: {
    width: 1,
    backgroundColor: Colors.cardBorder,
  },
  hDivider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
  },
});
