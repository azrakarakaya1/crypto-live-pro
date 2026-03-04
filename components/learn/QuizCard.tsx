import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import type { QuizQuestion } from '@/types';

interface Props {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedIndex: number | null;
  isLocked: boolean;
  onSelect: (index: number) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  selectedIndex,
  isLocked,
  onSelect,
}: Props) {
  function getOptionStyle(i: number) {
    if (!isLocked) {
      return i === selectedIndex ? styles.optionSelected : styles.optionDefault;
    }
    if (i === question.correctIndex) return styles.optionCorrect;
    if (i === selectedIndex && selectedIndex !== question.correctIndex) {
      return styles.optionWrong;
    }
    return styles.optionFaded;
  }

  function getOptionTextColor(i: number) {
    if (!isLocked) return Colors.text;
    if (i === question.correctIndex) return Colors.green;
    if (i === selectedIndex && selectedIndex !== question.correctIndex) return Colors.red;
    return Colors.textMuted;
  }

  const isCorrect = selectedIndex === question.correctIndex;

  return (
    <View style={styles.card}>
      {/* Progress */}
      <View style={styles.progressRow}>
        <Text style={styles.progressLabel}>
          Question {questionNumber} of {totalQuestions}
        </Text>
      </View>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${(questionNumber / totalQuestions) * 100}%` },
          ]}
        />
      </View>

      {/* Question */}
      <Text style={styles.question}>{question.question}</Text>

      {/* Options */}
      {question.options.map((option, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.option, getOptionStyle(i)]}
          onPress={() => !isLocked && onSelect(i)}
          activeOpacity={isLocked ? 1 : 0.7}
        >
          <View style={styles.optionLeft}>
            <View style={[styles.letterCircle, isLocked && i === question.correctIndex && styles.letterCircleCorrect]}>
              <Text style={[styles.letterText, { color: getOptionTextColor(i) }]}>
                {OPTION_LETTERS[i]}
              </Text>
            </View>
            <Text style={[styles.optionText, { color: getOptionTextColor(i) }]}>
              {option}
            </Text>
          </View>
          {isLocked && i === question.correctIndex && (
            <Ionicons name="checkmark-circle" size={18} color={Colors.green} />
          )}
          {isLocked && i === selectedIndex && selectedIndex !== question.correctIndex && (
            <Ionicons name="close-circle" size={18} color={Colors.red} />
          )}
        </TouchableOpacity>
      ))}

      {/* Explanation */}
      {isLocked && (
        <View style={[styles.explanation, isCorrect ? styles.explanationCorrect : styles.explanationWrong]}>
          <Ionicons
            name="information-circle"
            size={16}
            color={isCorrect ? Colors.green : Colors.red}
            style={styles.explanationIcon}
          />
          <Text style={[styles.explanationText, { color: isCorrect ? Colors.green : Colors.red }]}>
            {question.explanation}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginHorizontal: 16,
    padding: 20,
  },
  progressRow: {
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.cardBorder,
    borderRadius: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  question: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  optionDefault: {
    backgroundColor: Colors.background,
    borderColor: Colors.cardBorder,
  },
  optionSelected: {
    backgroundColor: 'rgba(139,92,246,0.15)',
    borderColor: Colors.primary,
  },
  optionCorrect: {
    backgroundColor: 'rgba(34,197,94,0.12)',
    borderColor: Colors.green,
  },
  optionWrong: {
    backgroundColor: 'rgba(239,68,68,0.12)',
    borderColor: Colors.red,
  },
  optionFaded: {
    backgroundColor: Colors.background,
    borderColor: Colors.cardBorder,
    opacity: 0.45,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  letterCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterCircleCorrect: {
    backgroundColor: 'rgba(34,197,94,0.2)',
  },
  letterText: {
    fontSize: 12,
    fontWeight: '700',
  },
  optionText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 18,
  },
  explanation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  explanationCorrect: {
    backgroundColor: 'rgba(34,197,94,0.1)',
  },
  explanationWrong: {
    backgroundColor: 'rgba(239,68,68,0.1)',
  },
  explanationIcon: {
    marginTop: 1,
  },
  explanationText: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
});
