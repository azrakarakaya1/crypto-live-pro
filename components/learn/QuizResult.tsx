import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface Props {
  score: number;
  totalQuestions: number;
  answers: boolean[];
  onRetry: () => void;
}

function getGrade(score: number): { icon: keyof typeof Ionicons.glyphMap; color: string; label: string } {
  if (score === 5) return { icon: 'trophy', color: '#F59E0B', label: 'Perfect score!' };
  if (score >= 4) return { icon: 'star', color: Colors.primary, label: 'Well done!' };
  if (score >= 3) return { icon: 'checkmark-circle', color: Colors.green, label: 'Good effort!' };
  return { icon: 'refresh-circle', color: Colors.textSecondary, label: 'Keep learning!' };
}

export default function QuizResult({ score, totalQuestions, answers, onRetry }: Props) {
  const { icon, color, label } = getGrade(score);

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={color} style={styles.icon} />
      <Text style={styles.score}>{score} / {totalQuestions}</Text>
      <Text style={styles.label}>{label}</Text>

      {/* Per-question dots */}
      <View style={styles.dots}>
        {answers.map((correct, i) => (
          <View
            key={i}
            style={[styles.dot, correct ? styles.dotCorrect : styles.dotWrong]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  icon: {
    marginBottom: 16,
  },
  score: {
    fontSize: 52,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 28,
  },
  dots: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 40,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  dotCorrect: {
    backgroundColor: Colors.green,
  },
  dotWrong: {
    backgroundColor: Colors.red,
  },
  retryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
  },
  retryText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
});
