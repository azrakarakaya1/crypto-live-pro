import { useState, useMemo } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import SearchBar from '@/components/markets/SearchBar';
import GlossaryItem from './GlossaryItem';
import { GLOSSARY_TERMS } from './data';
import type { GlossaryTerm } from '@/types';

export default function GlossaryList() {
  const [query, setQuery] = useState('');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const sections = useMemo(() => {
    const filtered = GLOSSARY_TERMS.filter(
      (t) =>
        t.term.toLowerCase().includes(query.toLowerCase()) ||
        t.definition.toLowerCase().includes(query.toLowerCase())
    );
    const grouped: Record<string, GlossaryTerm[]> = {};
    for (const term of filtered) {
      const letter = term.term[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(term);
    }
    return Object.keys(grouped)
      .sort()
      .map((letter) => ({ title: letter, data: grouped[letter] }));
  }, [query]);

  function handleToggle(term: string) {
    setExpandedTerm((prev) => (prev === term ? null : term));
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.term}
      stickySectionHeadersEnabled
      initialNumToRender={20}
      ListHeaderComponent={
        <View style={styles.searchWrapper}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Search terms…"
          />
        </View>
      }
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLetter}>{section.title}</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <GlossaryItem
          term={item}
          isExpanded={expandedTerm === item.term}
          onToggle={() => handleToggle(item.term)}
        />
      )}
      ListEmptyComponent={
        query.length > 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No terms match "{query}"</Text>
          </View>
        ) : null
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    paddingTop: 8,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: Colors.background,
  },
  sectionLetter: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
  },
  empty: {
    paddingTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
