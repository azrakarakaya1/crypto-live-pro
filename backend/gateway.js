/**
 * API Gateway — port 3000
 * Single entry point. Routes requests to downstream microservices.
 *
 * Routes:
 *   /market/*   → market-service  :3001
 *   /news/*     → news-service    :3002
 *   /onchain/*  → onchain-service :3003
 */
import { createServer } from 'node:http';

const PORT = 3000;

const ROUTES = [
  { prefix: '/market',  target: 'http://localhost:3001' },
  { prefix: '/news',    target: 'http://localhost:3002' },
  { prefix: '/onchain', target: 'http://localhost:3003' },
];

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    res.end();
    return;
  }

  if (req.url === '/' || req.url === '') {
    res.writeHead(200, { 'Content-Type': 'application/json', ...CORS });
    res.end(JSON.stringify({
      service: 'Crypto Live Pro — API Gateway',
      version: '1.0.0',
      routes: {
        '/market/coins/markets': 'Top 100 coins by market cap',
        '/market/global':        'Global market stats',
        '/market/trending':      'Trending coins',
        '/market/fear-greed':    'Fear & Greed index',
        '/market/coins/:id/chart?days=7': 'Price chart data',
        '/news/posts':           'Latest crypto news',
        '/onchain/btc':          'Bitcoin on-chain stats',
        '/onchain/eth':          'Ethereum on-chain stats',
      },
    }));
    return;
  }

  const route = ROUTES.find((r) => req.url?.startsWith(r.prefix));
  if (!route) {
    res.writeHead(404, { 'Content-Type': 'application/json', ...CORS });
    res.end(JSON.stringify({ error: 'Unknown route' }));
    return;
  }

  // Strip prefix before forwarding
  const upstreamPath = req.url.slice(route.prefix.length) || '/';
  const upstreamUrl  = `${route.target}${upstreamPath}`;

  try {
    const upstream = await fetch(upstreamUrl, { method: req.method });
    const body     = await upstream.text();
    res.writeHead(upstream.status, {
      'Content-Type': 'application/json',
      ...CORS,
    });
    res.end(body);
  } catch (err) {
    res.writeHead(502, { 'Content-Type': 'application/json', ...CORS });
    res.end(JSON.stringify({ error: `Service unavailable: ${err.message}` }));
  }
});

server.listen(PORT, () => {
  console.log(`[gateway] listening on http://localhost:${PORT}`);
  console.log('  /market  → :3001');
  console.log('  /news    → :3002');
  console.log('  /onchain → :3003');
});
