/**
 * Dev runner — starts all services + gateway in a single process.
 * Usage: node --env-file=.env run-all.js
 */
import './services/market.js';
import './services/news.js';
import './services/onchain.js';
import './gateway.js';
