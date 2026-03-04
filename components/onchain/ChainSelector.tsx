import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export type Chain = 'btc' | 'eth';

interface Props {
  selected: Chain;
  onChange: (chain: Chain) => void;
}

export default function ChainSelector({ selected, onChange }: Props) {
  return (
    <View style={styles.row}>
      {(['btc', 'eth'] as Chain[]).map((chain) => (
        <TouchableOpacity
          key={chain}
          style={[styles.btn, selected === chain && styles.btnActive]}
          onPress={() => onChange(chain)}
        >
          <Text style={[styles.label, selected === chain && styles.labelActive]}>
            {chain.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 4,
    gap: 4,
  },
  btn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 7,
    alignItems: 'center',
  },
  btnActive: {
    backgroundColor: Colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  labelActive: {
    color: Colors.text,
  },
});
