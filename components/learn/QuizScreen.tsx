import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import QuizCard from './QuizCard';
import QuizResult from './QuizResult';
import { DAILY_QUIZ } from './data';

export default function QuizScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const question = DAILY_QUIZ[currentIndex];
  const isLastQuestion = currentIndex === DAILY_QUIZ.length - 1;

  function handleSelect(index: number) {
    setSelectedIndex(index);
    setIsLocked(true);
  }

  function handleNext() {
    const correct = selectedIndex === question.correctIndex;
    const newAnswers = [...answers, correct];

    if (isLastQuestion) {
      setAnswers(newAnswers);
      setIsComplete(true);
    } else {
      setAnswers(newAnswers);
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setIsLocked(false);
    }
  }

  function handleRetry() {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setIsLocked(false);
    setAnswers([]);
    setIsComplete(false);
  }

  if (isComplete) {
    return (
      <QuizResult
        score={answers.filter(Boolean).length}
        totalQuestions={DAILY_QUIZ.length}
        answers={answers}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <QuizCard
        question={question}
        questionNumber={currentIndex + 1}
        totalQuestions={DAILY_QUIZ.length}
        selectedIndex={selectedIndex}
        isLocked={isLocked}
        onSelect={handleSelect}
      />

      {isLocked && (
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  nextBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
});
