import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import type { LearningModule, ModuleChapter } from '@/types';

interface Props {
  module: LearningModule;
  onOpenChapter: (chapter: ModuleChapter, moduleTitle: string) => void;
}

export default function ModuleCard({ module, onOpenChapter }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      {/* Card header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded((v) => !v)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{module.title}</Text>
          <Text style={styles.description}>{module.description}</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {module.chapters.length} chapter{module.chapters.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={Colors.textSecondary}
        />
      </TouchableOpacity>

      {/* Chapter list */}
      {expanded && (
        <View style={styles.chapterList}>
          {module.chapters.map((chapter, index) => (
            <TouchableOpacity
              key={chapter.id}
              style={[
                styles.chapterRow,
                index < module.chapters.length - 1 && styles.chapterRowBorder,
              ]}
              onPress={() => onOpenChapter(chapter, module.title)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="book-outline"
                size={16}
                color={Colors.primary}
                style={styles.chapterIcon}
              />
              <Text style={styles.chapterTitle} numberOfLines={2}>
                {chapter.title}
              </Text>
              <Ionicons name="arrow-forward" size={14} color={Colors.textSecondary} />
            </TouchableOpacity>
          ))}
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
    marginBottom: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  countBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139,92,246,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  countText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
  },
  chapterList: {
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  chapterRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  chapterIcon: {
    flexShrink: 0,
  },
  chapterTitle: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
});
