# mergecrew-test

Test project for Mergecrew multi-agent SDLC pipeline.

## Tech Stack
- Node.js 22+
- Native HTTP (no frameworks — simple and fast)

## Development
```bash
npm start   # starts the server on $PORT (default 3000)
npm test    # node:test, self-contained — no running server needed
```

## Conventions for agents
- All routes live in `createApp()` in `src/index.js` (route on `req.method` + `req.url`).
- Tests live in `src/*.test.js` and use the `withServer()` helper from `src/index.test.js`,
  which starts the app on a random port. Never hardcode a port in tests.
- No new dependencies unless the task requires it.
- After `npm test` passes, commit the change.
