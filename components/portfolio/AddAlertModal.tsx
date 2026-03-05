import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import type { AlertDirection } from '@/types';

interface Props {
  visible: boolean;
  coinId: string;
  coinSymbol: string;
  currentPrice: number;
  onClose: () => void;
}

export default function AddAlertModal({ visible, coinId, coinSymbol, currentPrice, onClose }: Props) {
  const addAlert = usePortfolioStore((s) => s.addAlert);
  const [price, setPrice] = useState('');
  const [direction, setDirection] = useState<AlertDirection>('above');

  function handleSave() {
    const target = parseFloat(price);
    if (isNaN(target) || target <= 0) return;
    addAlert({
      id: Math.random().toString(36).slice(2),
      coinId,
      symbol: coinSymbol,
      targetPrice: target,
      direction,
      createdAt: Date.now(),
      triggered: false,
    });
    handleClose();
  }

  function handleClose() {
    setPrice('');
    setDirection('above');
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.sheet}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Set Price Alert</Text>
            <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close" size={22} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.currentPrice}>
            Current price: <Text style={styles.priceValue}>${currentPrice.toLocaleString()}</Text>
          </Text>

          {/* Direction toggle */}
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleBtn, direction === 'above' && styles.toggleBtnActive]}
              onPress={() => setDirection('above')}
            >
              <Ionicons
                name="arrow-up"
                size={14}
                color={direction === 'above' ? Colors.text : Colors.textSecondary}
              />
              <Text style={[styles.toggleText, direction === 'above' && styles.toggleTextActive]}>
                Above
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, direction === 'below' && styles.toggleBtnActiveRed]}
              onPress={() => setDirection('below')}
            >
              <Ionicons
                name="arrow-down"
                size={14}
                color={direction === 'below' ? Colors.text : Colors.textSecondary}
              />
              <Text style={[styles.toggleText, direction === 'below' && styles.toggleTextActive]}>
                Below
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Target price (USD)</Text>
          <TextInput
            style={styles.input}
            placeholder={`e.g. ${currentPrice > 1 ? Math.round(currentPrice * 1.1).toLocaleString() : (currentPrice * 1.1).toPrecision(4)}`}
            placeholderTextColor={Colors.textMuted}
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            autoFocus
          />

          <TouchableOpacity
            style={[styles.saveBtn, !price && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={!price}
          >
            <Ionicons name="notifications" size={16} color={Colors.text} />
            <Text style={styles.saveBtnText}>Set Alert</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  currentPrice: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  priceValue: {
    color: Colors.text,
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  toggleBtnActive: {
    backgroundColor: 'rgba(34,197,94,0.15)',
    borderColor: Colors.green,
  },
  toggleBtnActiveRed: {
    backgroundColor: 'rgba(239,68,68,0.15)',
    borderColor: Colors.red,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  toggleTextActive: {
    color: Colors.text,
  },
  inputLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Colors.text,
    fontSize: 15,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  saveBtnDisabled: {
    opacity: 0.4,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
});
