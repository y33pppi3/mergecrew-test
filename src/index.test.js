#!/usr/bin/env node
// Simple test
import http from 'node:http';

const options = { hostname: 'localhost', port: 3000, path: '/', method: 'GET' };

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const body = JSON.parse(data);
    console.assert(body.status === 'ok', 'Status should be ok');
    console.log('✅ Test passed:', body);
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error('❌ Test failed:', e.message);
  process.exit(1);
});

req.end();
