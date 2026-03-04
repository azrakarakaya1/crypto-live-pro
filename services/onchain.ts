import type { ChainNetworkStats, BtcMempoolStats, BtcDifficultyStats } from '@/types';

// BlockCypher — free, no API key required
const BLOCKCYPHER = 'https://api.blockcypher.com/v1';

// mempool.space — free, no API key required
const MEMPOOL = 'https://mempool.space/api';

export async function getBtcNetworkStats(): Promise<ChainNetworkStats> {
  const res = await fetch(`${BLOCKCYPHER}/btc/main`);
  if (!res.ok) throw new Error(`BlockCypher BTC error: ${res.status}`);
  const d = await res.json();
  return {
    blockHeight: d.height,
    peerCount: d.peer_count,
    unconfirmedCount: d.unconfirmed_count,
    // BlockCypher gives fee per KB in satoshis; convert to sat/vB (÷1000)
    feeHigh: Math.round(d.high_fee_per_kb / 1000),
    feeMed: Math.round(d.medium_fee_per_kb / 1000),
    feeLow: Math.round(d.low_fee_per_kb / 1000),
  };
}

export async function getEthNetworkStats(): Promise<ChainNetworkStats> {
  const res = await fetch(`${BLOCKCYPHER}/eth/main`);
  if (!res.ok) throw new Error(`BlockCypher ETH error: ${res.status}`);
  const d = await res.json();
  return {
    blockHeight: d.height,
    peerCount: d.peer_count,
    unconfirmedCount: d.unconfirmed_count,
    // ETH fees are in wei per byte; convert to Gwei (÷1e9) then ÷1000 for per-byte→per-KB
    feeHigh: Math.round(d.high_fee_per_kb / 1e9 / 1000),
    feeMed: Math.round(d.medium_fee_per_kb / 1e9 / 1000),
    feeLow: Math.round(d.low_fee_per_kb / 1e9 / 1000),
  };
}

export async function getBtcMempoolStats(): Promise<BtcMempoolStats> {
  const res = await fetch(`${MEMPOOL}/mempool`);
  if (!res.ok) throw new Error(`mempool.space mempool error: ${res.status}`);
  const d = await res.json();
  return {
    count: d.count,
    vsizeBytes: d.vsize,
    totalFeeSat: d.total_fee,
  };
}

export async function getBtcDifficultyStats(): Promise<BtcDifficultyStats> {
  const res = await fetch(`${MEMPOOL}/v1/difficulty-adjustment`);
  if (!res.ok) throw new Error(`mempool.space difficulty error: ${res.status}`);
  const d = await res.json();
  return {
    progressPercent: d.progressPercent,
    difficultyChange: d.difficultyChange,
    remainingBlocks: d.remainingBlocks,
    estimatedRetargetDate: d.estimatedRetargetDate * 1000, // s → ms
  };
}
