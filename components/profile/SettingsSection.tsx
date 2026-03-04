import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function SettingsSection({ title, children }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginHorizontal: 16,
    marginBottom: 6,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
});
