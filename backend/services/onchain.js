/**
 * On-Chain Service — port 3003
 * Aggregates BlockCypher (BTC/ETH) + mempool.space (BTC fees/mempool/difficulty).
 * No API keys required.
 */
import { createService } from '../lib/server.js';

const PORT = 3003;
const BLOCKCYPHER = 'https://api.blockcypher.com/v1';
const MEMPOOL     = 'https://mempool.space/api';

const cache = new Map();
async function fetchCached(url, ttlMs) {
  const hit = cache.get(url);
  if (hit && Date.now() < hit.expiresAt) return hit.data;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Upstream ${res.status}: ${url}`);
  const data = await res.json();
  cache.set(url, { data, expiresAt: Date.now() + ttlMs });
  return data;
}

createService(PORT, 'onchain-service', async (_req, url) => {
  // GET /btc
  if (url.pathname === '/btc') {
    const [chain, fees, mempool, difficulty] = await Promise.all([
      fetchCached(`${BLOCKCYPHER}/btc/main`, 2 * 60_000),
      fetchCached(`${MEMPOOL}/v1/fees/recommended`, 60_000),
      fetchCached(`${MEMPOOL}/mempool`,             60_000),
      fetchCached(`${MEMPOOL}/v1/difficulty-adjustment`, 5 * 60_000),
    ]);
    return {
      body: {
        chain: {
          name:           'Bitcoin',
          height:         chain.height,
          hash_rate:      chain.hash_rate,
          peer_count:     chain.peer_count,
          unconfirmed_tx: chain.unconfirmed_count,
        },
        fees: {
          fastest:  fees.fastestFee,
          halfHour: fees.halfHourFee,
          hour:     fees.hourFee,
          economy:  fees.economyFee,
          minimum:  fees.minimumFee,
        },
        mempool: {
          count: mempool.count,
          vsize: mempool.vsize,
          fee_histogram: mempool.fee_histogram?.slice(0, 8) ?? [],
        },
        difficulty: {
          progress:          difficulty.progressPercent,
          estimated_change:  difficulty.estimatedRetargetDate,
          change_percent:    difficulty.difficultyChange,
          remaining_blocks:  difficulty.remainingBlocks,
        },
      },
    };
  }

  // GET /eth
  if (url.pathname === '/eth') {
    const chain = await fetchCached(`${BLOCKCYPHER}/eth/main`, 2 * 60_000);
    return {
      body: {
        name:           'Ethereum',
        height:         chain.height,
        hash_rate:      chain.hash_rate,
        peer_count:     chain.peer_count,
        unconfirmed_tx: chain.unconfirmed_count,
        high_fee:       chain.high_fee_per_kb,
        medium_fee:     chain.medium_fee_per_kb,
        low_fee:        chain.low_fee_per_kb,
      },
    };
  }

  return { status: 404, body: { error: 'Not found' } };
});
