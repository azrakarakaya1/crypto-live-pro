import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Colors from '@/constants/Colors';
import { useMarketStore } from '@/store/useMarketStore';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import type { Coin } from '@/types';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function AddHoldingModal({ visible, onClose }: Props) {
  const coins = useMarketStore((s) => s.coins);
  const addEntry = usePortfolioStore((s) => s.addEntry);

  const [query, setQuery] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [amount, setAmount] = useState('');
  const [costBasis, setCostBasis] = useState('');

  const filtered = query.trim().length === 0
    ? coins.slice(0, 30)
    : coins.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.symbol.toLowerCase().includes(query.toLowerCase())
      );

  function handleSave() {
    if (!selectedCoin || !amount || !costBasis) return;
    const parsedAmount = parseFloat(amount);
    const parsedCost = parseFloat(costBasis);
    if (isNaN(parsedAmount) || isNaN(parsedCost) || parsedAmount <= 0 || parsedCost <= 0) return;

    addEntry({
      id: Math.random().toString(36).slice(2),
      coinId: selectedCoin.id,
      symbol: selectedCoin.symbol,
      name: selectedCoin.name,
      amount: parsedAmount,
      costBasis: parsedCost,
      addedAt: Date.now(),
    });

    handleClose();
  }

  function handleClose() {
    setQuery('');
    setSelectedCoin(null);
    setAmount('');
    setCostBasis('');
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.sheet}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Holding</Text>
            <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Step 1: Coin search */}
          {!selectedCoin ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Search coin..."
                placeholderTextColor={Colors.textMuted}
                value={query}
                onChangeText={setQuery}
                autoFocus
              />
              <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                keyboardShouldPersistTaps="handled"
                style={styles.list}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.coinRow}
                    onPress={() => setSelectedCoin(item)}
                  >
                    <View style={styles.coinRank}>
                      <Text style={styles.rankText}>{item.market_cap_rank}</Text>
                    </View>
                    <View style={styles.coinInfo}>
                      <Text style={styles.coinName}>{item.name}</Text>
                      <Text style={styles.coinSymbol}>{item.symbol.toUpperCase()}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </>
          ) : (
            /* Step 2: Amount + cost basis */
            <View style={styles.form}>
              <View style={styles.selectedCoin}>
                <Text style={styles.selectedLabel}>Selected coin</Text>
                <View style={styles.selectedRow}>
                  <Text style={styles.selectedName}>{selectedCoin.name}</Text>
                  <TouchableOpacity onPress={() => setSelectedCoin(null)}>
                    <Text style={styles.changeBtn}>Change</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.inputLabel}>Amount</Text>
              <TextInput
                style={styles.input}
                placeholder={`e.g. 0.5 ${selectedCoin.symbol.toUpperCase()}`}
                placeholderTextColor={Colors.textMuted}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                autoFocus
              />

              <Text style={styles.inputLabel}>Average buy price (USD)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 45000"
                placeholderTextColor={Colors.textMuted}
                value={costBasis}
                onChangeText={setCostBasis}
                keyboardType="decimal-pad"
              />

              <TouchableOpacity
                style={[styles.saveBtn, (!amount || !costBasis) && styles.saveBtnDisabled]}
                onPress={handleSave}
                disabled={!amount || !costBasis}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
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
    maxHeight: '80%',
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
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
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  closeBtn: {
    fontSize: 18,
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
    marginHorizontal: 16,
    marginTop: 12,
  },
  list: {
    marginTop: 8,
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    gap: 12,
  },
  coinRank: {
    width: 32,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  coinInfo: {
    flex: 1,
  },
  coinName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  coinSymbol: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  form: {
    padding: 16,
    gap: 4,
  },
  selectedCoin: {
    marginBottom: 16,
  },
  selectedLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  selectedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  changeBtn: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 12,
    marginLeft: 2,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
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
