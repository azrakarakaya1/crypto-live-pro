import type { Currency } from '@/store/useSettingsStore';

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  usd: '$',
  eur: '€',
  gbp: '£',
  jpy: '¥',
  btc: '₿',
};

export function formatPrice(value: number | null | undefined, currency: Currency = 'usd', compact = false): string {
  if (value == null) return '—';
  if (currency === 'btc') {
    if (compact) {
      if (value >= 1) return `₿${value.toFixed(4)}`;
      return `₿${value.toPrecision(4)}`;
    }
    return `₿${value < 0.001 ? value.toPrecision(4) : value.toFixed(6)}`;
  }

  const symbol = CURRENCY_SYMBOLS[currency];

  if (compact) {
    if (value >= 1e12) return `${symbol}${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9)  return `${symbol}${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6)  return `${symbol}${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3)  return `${symbol}${(value / 1e3).toFixed(2)}K`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
}

/** Legacy alias — defaults to USD so existing callers don't break */
export function formatUSD(value: number, compact = false): string {
  return formatPrice(value, 'usd', compact);
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null) return '—';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatLargeNumber(value: number | null | undefined): string {
  if (value == null) return '—';
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9)  return `${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6)  return `${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3)  return `${(value / 1e3).toFixed(2)}K`;
  return value.toFixed(2);
}

export function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
