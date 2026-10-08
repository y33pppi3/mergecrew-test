// Self-contained tests: each test starts the app on a random free port (port 0).
// No external server is required. Run with `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './index.js';

export async function withServer(fn) {
  const server = createApp();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  try {
    await fn(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('GET / returns 200 with status ok', async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'ok');
  });
});
