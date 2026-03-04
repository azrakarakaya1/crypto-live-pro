import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import type { ModuleChapter } from '@/types';

interface Props {
  chapter: ModuleChapter;
  moduleTitle: string;
  onClose: () => void;
}

export default function ChapterView({ chapter, moduleTitle, onClose }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const quiz = chapter.quiz;
  const isCorrect = quiz ? selectedIndex === quiz.correctIndex : false;

  function handleOptionPress(index: number) {
    if (isLocked) return;
    setSelectedIndex(index);
    setIsLocked(true);
  }

  function getOptionStyle(i: number) {
    if (!quiz) return styles.optionDefault;
    if (!isLocked) {
      return i === selectedIndex ? styles.optionSelected : styles.optionDefault;
    }
    if (i === quiz.correctIndex) return styles.optionCorrect;
    if (i === selectedIndex && selectedIndex !== quiz.correctIndex) return styles.optionWrong;
    return styles.optionFaded;
  }

  function getOptionTextColor(i: number) {
    if (!quiz || !isLocked) return Colors.text;
    if (i === quiz.correctIndex) return Colors.green;
    if (i === selectedIndex && selectedIndex !== quiz.correctIndex) return Colors.red;
    return Colors.textMuted;
  }

  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safe} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="arrow-back" size={22} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.moduleTitle} numberOfLines={1}>{moduleTitle}</Text>
            <Text style={styles.chapterTitle} numberOfLines={2}>{chapter.title}</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Content */}
          <Text style={styles.body}>{chapter.content}</Text>

          {/* Chapter quiz */}
          {quiz && (
            <View style={styles.quizSection}>
              <Text style={styles.quizHeading}>Chapter Quiz</Text>
              <Text style={styles.quizQuestion}>{quiz.question}</Text>

              {quiz.options.map((option, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.option, getOptionStyle(i)]}
                  onPress={() => handleOptionPress(i)}
                  activeOpacity={isLocked ? 1 : 0.7}
                >
                  <Text style={[styles.optionText, { color: getOptionTextColor(i) }]}>
                    {option}
                  </Text>
                  {isLocked && i === quiz.correctIndex && (
                    <Ionicons name="checkmark-circle" size={16} color={Colors.green} />
                  )}
                  {isLocked && i === selectedIndex && selectedIndex !== quiz.correctIndex && (
                    <Ionicons name="close-circle" size={16} color={Colors.red} />
                  )}
                </TouchableOpacity>
              ))}

              {isLocked && (
                <View style={[styles.explanation, isCorrect ? styles.explanationCorrect : styles.explanationWrong]}>
                  <Ionicons
                    name="information-circle"
                    size={15}
                    color={isCorrect ? Colors.green : Colors.red}
                    style={{ marginTop: 1 }}
                  />
                  <Text style={[styles.explanationText, { color: isCorrect ? Colors.green : Colors.red }]}>
                    {quiz.explanation}
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 24,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 48,
  },
  body: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  quizSection: {
    marginTop: 32,
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  quizHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  quizQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
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
  optionText: {
    fontSize: 14,
    flex: 1,
  },
  explanation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  explanationCorrect: {
    backgroundColor: 'rgba(34,197,94,0.1)',
  },
  explanationWrong: {
    backgroundColor: 'rgba(239,68,68,0.1)',
  },
  explanationText: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
});
