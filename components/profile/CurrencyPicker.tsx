import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useSettingsStore, CURRENCY_LABELS, type Currency } from '@/store/useSettingsStore';

const CURRENCIES = Object.keys(CURRENCY_LABELS) as Currency[];

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function CurrencyPicker({ visible, onClose }: Props) {
  const { currency, setCurrency } = useSettingsStore();

  function handleSelect(c: Currency) {
    setCurrency(c);
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Display Currency</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {CURRENCIES.map((c) => {
            const isSelected = c === currency;
            return (
              <TouchableOpacity
                key={c}
                style={styles.row}
                onPress={() => handleSelect(c)}
                activeOpacity={0.7}
              >
                <Text style={[styles.label, isSelected && styles.labelActive]}>
                  {CURRENCY_LABELS[c]}
                </Text>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  closeBtn: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  label: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  labelActive: {
    color: Colors.text,
    fontWeight: '600',
  },
});
