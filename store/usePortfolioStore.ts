import { create } from 'zustand';
import type { PortfolioEntry, PriceAlert } from '@/types';

interface PortfolioState {
  entries: PortfolioEntry[];
  alerts: PriceAlert[];

  addEntry: (entry: PortfolioEntry) => void;
  updateEntry: (id: string, patch: Partial<PortfolioEntry>) => void;
  removeEntry: (id: string) => void;

  addAlert: (alert: PriceAlert) => void;
  removeAlert: (id: string) => void;
  triggerAlert: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  entries: [],
  alerts: [],

  addEntry: (entry) =>
    set((state) => ({ entries: [...state.entries, entry] })),
  updateEntry: (id, patch) =>
    set((state) => ({
      entries: state.entries.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    })),
  removeEntry: (id) =>
    set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),

  addAlert: (alert) =>
    set((state) => ({ alerts: [...state.alerts, alert] })),
  removeAlert: (id) =>
    set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) })),
  triggerAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, triggered: true } : a
      ),
    })),
}));
