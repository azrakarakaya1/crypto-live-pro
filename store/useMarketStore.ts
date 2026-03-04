import { create } from 'zustand';
import type { Coin, GlobalMarketData, TrendingCoin, FearGreedData } from '@/types';

interface MarketState {
  coins: Coin[];
  globalData: GlobalMarketData | null;
  trending: TrendingCoin[];
  fearGreed: FearGreedData | null;
  watchlist: string[]; // coin ids
  loading: boolean;
  error: string | null;

  setCoins: (coins: Coin[]) => void;
  setGlobalData: (data: GlobalMarketData) => void;
  setTrending: (trending: TrendingCoin[]) => void;
  setFearGreed: (data: FearGreedData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addToWatchlist: (coinId: string) => void;
  removeFromWatchlist: (coinId: string) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  coins: [],
  globalData: null,
  trending: [],
  fearGreed: null,
  watchlist: [],
  loading: false,
  error: null,

  setCoins: (coins) => set({ coins }),
  setGlobalData: (globalData) => set({ globalData }),
  setTrending: (trending) => set({ trending }),
  setFearGreed: (fearGreed) => set({ fearGreed }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  addToWatchlist: (coinId) =>
    set((state) => ({
      watchlist: state.watchlist.includes(coinId)
        ? state.watchlist
        : [...state.watchlist, coinId],
    })),
  removeFromWatchlist: (coinId) =>
    set((state) => ({
      watchlist: state.watchlist.filter((id) => id !== coinId),
    })),
}));
