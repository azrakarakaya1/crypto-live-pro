import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import type { GlossaryTerm } from '@/types';

interface Props {
  term: GlossaryTerm;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function GlossaryItem({ term, isExpanded, onToggle }: Props) {
  return (
    <View>
      <TouchableOpacity
        style={styles.row}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.term}>{term.term}</Text>
        <Ionicons
          name={isExpanded ? 'chevron-down' : 'chevron-forward'}
          size={16}
          color={Colors.textSecondary}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expanded}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{term.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.definition}>{term.definition}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  term: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  expanded: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 8,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139,92,246,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.8,
  },
  definition: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
