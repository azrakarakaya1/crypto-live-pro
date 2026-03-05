import { useCallback } from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { formatPrice } from '@/utils/formatters';

/**
 * Returns a `fmt(value, compact?)` function pre-bound to the user's selected currency.
 * Use this instead of formatUSD in any component that shows prices.
 */
export function useFormatPrice() {
  const currency = useSettingsStore((s) => s.currency);
  return useCallback(
    (value: number, compact = false) => formatPrice(value, currency, compact),
    [currency]
  );
}
