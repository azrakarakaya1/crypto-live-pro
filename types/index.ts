// ─── Coin / Market ────────────────────────────────────────────────────────────

export interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  thumb: string; // small thumbnail URL
  market_cap_rank: number;
  price_btc: number;
}

export interface FearGreedData {
  value: number;           // 0–100
  classification: string;  // e.g. "Fear", "Greed"
  timestamp: string;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  circulating_supply: number;
  ath: number;
  atl: number;
}

export interface GlobalMarketData {
  total_market_cap_usd: number;
  total_volume_usd: number;
  btc_dominance: number;
  eth_dominance: number;
  market_cap_change_percentage_24h: number;
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

export interface PortfolioEntry {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
  amount: number;
  costBasis: number; // average buy price in USD
  addedAt: number;   // timestamp
}

// ─── Price Alert ──────────────────────────────────────────────────────────────

export type AlertDirection = 'above' | 'below';

export interface PriceAlert {
  id: string;
  coinId: string;
  symbol: string;
  targetPrice: number;
  direction: AlertDirection;
  createdAt: number;
  triggered: boolean;
}

// ─── News ─────────────────────────────────────────────────────────────────────

export type Sentiment = 'positive' | 'negative' | 'neutral';

export interface NewsArticle {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment: Sentiment;
  summary?: string;
  description?: string;
  currencies: string[];
}

// ─── On-Chain ─────────────────────────────────────────────────────────────────

export interface WhaleTransaction {
  id: string;
  hash: string;
  blockchain: string;
  symbol: string;
  amount: number;
  amountUsd: number;
  from: string;
  to: string;
  timestamp: number;
}

export interface ChainNetworkStats {
  blockHeight: number;
  peerCount: number;
  unconfirmedCount: number;
  feeHigh: number;
  feeMed: number;
  feeLow: number;
}

export interface BtcMempoolStats {
  count: number;
  vsizeBytes: number;
  totalFeeSat: number;
}

export interface BtcDifficultyStats {
  progressPercent: number;
  difficultyChange: number;
  remainingBlocks: number;
  estimatedRetargetDate: number; // unix ms
}

// ─── Learn Hub ────────────────────────────────────────────────────────────────

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  chapters: ModuleChapter[];
}

export interface ModuleChapter {
  id: string;
  title: string;
  content: string;
}
