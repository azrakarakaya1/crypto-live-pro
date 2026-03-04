import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface Props {
  label: string;
  value?: string;
  onPress?: () => void;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  showChevron?: boolean;
  destructive?: boolean;
}

export default function SettingsRow({
  label,
  value,
  onPress,
  leftIcon,
  showChevron = true,
  destructive = false,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.left}>
        {leftIcon && (
          <View style={styles.iconWrap}>
            <Ionicons name={leftIcon} size={16} color={Colors.primary} />
          </View>
        )}
        <Text style={[styles.label, destructive && styles.labelDestructive]}>
          {label}
        </Text>
      </View>
      <View style={styles.right}>
        {value && <Text style={styles.value}>{value}</Text>}
        {showChevron && onPress && (
          <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
        )}
      </View>
    </TouchableOpacity>
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
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: 'rgba(139,92,246,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    color: Colors.text,
  },
  labelDestructive: {
    color: Colors.red,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  value: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
