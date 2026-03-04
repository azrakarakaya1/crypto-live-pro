import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import type { BtcDifficultyStats } from '@/types';

interface Props {
  stats: BtcDifficultyStats;
}

export default function DifficultyCard({ stats }: Props) {
  const pct = Math.min(100, Math.max(0, stats.progressPercent));
  const isIncrease = stats.difficultyChange >= 0;
  const changeColor = isIncrease ? Colors.red : Colors.green; // higher difficulty = harder for miners

  const retargetDate = new Date(stats.estimatedRetargetDate);
  const daysLeft = Math.ceil(
    (stats.estimatedRetargetDate - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const dateStr = retargetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Difficulty Adjustment</Text>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pct}%` }]} />
      </View>
      <View style={styles.progressLabels}>
        <Text style={styles.progressPct}>{pct.toFixed(1)}% complete</Text>
        <Text style={styles.progressBlocks}>{stats.remainingBlocks} blocks left</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.cellLabel}>Est. Change</Text>
          <Text style={[styles.cellValue, { color: changeColor }]}>
            {isIncrease ? '+' : ''}{stats.difficultyChange.toFixed(2)}%
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellLabel}>Retarget Date</Text>
          <Text style={styles.cellValue}>{dateStr}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellLabel}>Days Left</Text>
          <Text style={styles.cellValue}>{daysLeft}d</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 16,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.background,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  progressPct: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  progressBlocks: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  cell: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    gap: 5,
    alignItems: 'center',
  },
  cellLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  cellValue: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
});
