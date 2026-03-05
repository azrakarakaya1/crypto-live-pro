import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { useMarketStore } from '@/store/useMarketStore';
import type { PortfolioEntry } from '@/types';

interface Props {
  entry: PortfolioEntry | null;
  onClose: () => void;
}

export default function EditHoldingModal({ entry, onClose }: Props) {
  const updateEntry = usePortfolioStore((s) => s.updateEntry);
  const coin = useMarketStore((s) => s.coins.find((c) => c.id === entry?.coinId));

  const [amount, setAmount] = useState('');
  const [costBasis, setCostBasis] = useState('');

  useEffect(() => {
    if (entry) {
      setAmount(String(entry.amount));
      setCostBasis(String(entry.costBasis));
    }
  }, [entry]);

  function handleSave() {
    if (!entry) return;
    const parsedAmount = parseFloat(amount);
    const parsedCost = parseFloat(costBasis);
    if (isNaN(parsedAmount) || isNaN(parsedCost) || parsedAmount <= 0 || parsedCost <= 0) return;
    updateEntry(entry.id, { amount: parsedAmount, costBasis: parsedCost });
    onClose();
  }

  if (!entry) return null;

  return (
    <Modal visible={!!entry} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.sheet}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Edit Holding</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close" size={22} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Coin info */}
          <View style={styles.coinRow}>
            {coin?.image ? (
              <Image source={{ uri: coin.image }} style={styles.logo} />
            ) : (
              <View style={styles.logoFallback}>
                <Text style={styles.logoFallbackText}>{entry.symbol.charAt(0).toUpperCase()}</Text>
              </View>
            )}
            <View>
              <Text style={styles.coinName}>{entry.name}</Text>
              <Text style={styles.coinSymbol}>{entry.symbol.toUpperCase()}</Text>
            </View>
          </View>

          <Text style={styles.inputLabel}>Amount</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            autoFocus
          />

          <Text style={styles.inputLabel}>Average buy price (USD)</Text>
          <TextInput
            style={styles.input}
            value={costBasis}
            onChangeText={setCostBasis}
            keyboardType="decimal-pad"
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
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
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  logoFallback: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFallbackText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  coinName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  coinSymbol: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
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
    marginTop: 4,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
});
