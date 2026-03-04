import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ModuleCard from './ModuleCard';
import ChapterView from './ChapterView';
import { LEARNING_MODULES } from './data';
import type { ModuleChapter } from '@/types';

export default function ModuleList() {
  const [activeChapter, setActiveChapter] = useState<{
    chapter: ModuleChapter;
    moduleTitle: string;
  } | null>(null);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {LEARNING_MODULES.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onOpenChapter={(chapter, moduleTitle) =>
              setActiveChapter({ chapter, moduleTitle })
            }
          />
        ))}
      </ScrollView>

      {activeChapter && (
        <ChapterView
          chapter={activeChapter.chapter}
          moduleTitle={activeChapter.moduleTitle}
          onClose={() => setActiveChapter(null)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingBottom: 40,
  },
});
