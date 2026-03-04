import { createServer } from 'node:http';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

/**
 * Minimal HTTP server factory.
 * handler(req, url) must return { status, body } or throw.
 */
export function createService(port, name, handler) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${port}`);

    if (req.method === 'OPTIONS') {
      res.writeHead(204, CORS_HEADERS);
      res.end();
      return;
    }

    try {
      const { status = 200, body } = await handler(req, url);
      res.writeHead(status, CORS_HEADERS);
      res.end(JSON.stringify(body));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Internal error';
      res.writeHead(500, CORS_HEADERS);
      res.end(JSON.stringify({ error: msg }));
      console.error(`[${name}]`, err);
    }
  });

  server.listen(port, () => {
    console.log(`[${name}] listening on http://localhost:${port}`);
  });

  return server;
}
