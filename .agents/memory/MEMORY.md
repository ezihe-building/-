# Memory

- [Telegram bot token handling](telegram-bot-token.md) — store as Replit Secret; never hardcode; use it to authenticate bot-to-backend webhooks.
- [Pairing request lifecycle](pairing-lifecycle.md) — in-memory pending/completed store needs TTL cleanup and pending-only writes to prevent overwrite/replay abuse.
- [Vite dev proxy for API workflow](vite-api-proxy.md) — forward `/api` to the API server workflow in dev so the frontend can reach the backend from the Replit preview.
- [Production API + static split](prod-api-static-split.md) — deploy the API server separately and set `VITE_API_BASE_URL` for the static frontend; in-memory stores must be replaced with shared persistence before multi-instance scaling.
