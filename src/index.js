#!/usr/bin/env node
// Simple REST API server (no frameworks).
// createApp() builds the server WITHOUT listening, so tests can start it on a random port.
import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';

export function createApp() {
  return createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      message: 'Hello from mergecrew-test',
      timestamp: new Date().toISOString()
    }));
  });
}

// Start listening only when run directly (`npm start`), not when imported by tests.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const PORT = process.env.PORT || 3000;
  createApp().listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
