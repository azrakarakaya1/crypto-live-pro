import { create } from 'zustand';

export type Currency = 'usd' | 'eur' | 'gbp' | 'jpy' | 'btc';

export const CURRENCY_LABELS: Record<Currency, string> = {
  usd: 'USD — US Dollar',
  eur: 'EUR — Euro',
  gbp: 'GBP — British Pound',
  jpy: 'JPY — Japanese Yen',
  btc: 'BTC — Bitcoin',
};

interface SettingsState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  currency: 'usd',
  setCurrency: (currency) => set({ currency }),
}));
