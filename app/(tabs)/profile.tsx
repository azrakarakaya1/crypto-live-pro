import { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { useSettingsStore, CURRENCY_LABELS } from '@/store/useSettingsStore';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import SettingsSection from '@/components/profile/SettingsSection';
import SettingsRow from '@/components/profile/SettingsRow';
import CurrencyPicker from '@/components/profile/CurrencyPicker';

const APP_VERSION = '1.0.0';

export default function ProfileScreen() {
  const currency = useSettingsStore((s) => s.currency);
  const removeAllEntries = usePortfolioStore((s) => s.entries);
  const removeEntry = usePortfolioStore((s) => s.removeEntry);

  const [currencyPickerVisible, setCurrencyPickerVisible] = useState(false);

  function handleClearPortfolio() {
    Alert.alert(
      'Clear Portfolio',
      'This will remove all your holdings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => removeAllEntries.forEach((e) => removeEntry(e.id)),
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>₿</Text>
          </View>
          <Text style={styles.appName}>Crypto Live Pro</Text>
          <Text style={styles.appTagline}>Your crypto companion</Text>
        </View>

        {/* Preferences */}
        <SettingsSection title="Preferences">
          <SettingsRow
            label="Display Currency"
            value={currency.toUpperCase()}
            leftIcon="cash-outline"
            onPress={() => setCurrencyPickerVisible(true)}
          />
        </SettingsSection>

        {/* Portfolio */}
        <SettingsSection title="Portfolio">
          <SettingsRow
            label="Clear All Holdings"
            leftIcon="trash-outline"
            showChevron={false}
            destructive
            onPress={handleClearPortfolio}
          />
        </SettingsSection>

        {/* About */}
        <SettingsSection title="About">
          <SettingsRow
            label="Version"
            value={APP_VERSION}
            leftIcon="information-circle-outline"
            showChevron={false}
          />
          <SettingsRow
            label="Privacy Policy"
            leftIcon="shield-outline"
            onPress={() => Linking.openURL('https://cryptopanic.com/privacy')}
          />
          <SettingsRow
            label="Terms of Use"
            leftIcon="document-text-outline"
            onPress={() => Linking.openURL('https://cryptopanic.com/terms')}
          />
        </SettingsSection>

        {/* Data sources */}
        <SettingsSection title="Data Sources">
          <SettingsRow
            label="Prices"
            value="CoinGecko"
            leftIcon="trending-up-outline"
            showChevron={false}
          />
          <SettingsRow
            label="News"
            value="RSS Feeds"
            leftIcon="newspaper-outline"
            showChevron={false}
          />
          <SettingsRow
            label="On-Chain"
            value="mempool.space"
            leftIcon="link-outline"
            showChevron={false}
          />
          <SettingsRow
            label="Sentiment"
            value="Alternative.me"
            leftIcon="happy-outline"
            showChevron={false}
          />
        </SettingsSection>

        <Text style={styles.footer}>
          Made with ♥ · Data by CoinGecko, mempool.space & RSS
        </Text>
      </ScrollView>

      <CurrencyPicker
        visible={currencyPickerVisible}
        onClose={() => setCurrencyPickerVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 32,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    color: Colors.text,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 8,
    paddingHorizontal: 16,
  },
});
