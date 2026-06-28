---
name: Production API + static split
description: Deploy the API server separately from the static frontend and set the API base URL.
---

The frontend is built as a static site (`artifacts/reaper-empire/dist/public`), while the API is a separate Express server (`artifacts/api-server`).

Production deployment:

- Deploy the API server as a web service (e.g., `reaper-empire-api` on Render) with `TELEGRAM_BOT_TOKEN` and `TELEGRAM_ADMIN_CHAT_ID` set.
- Set `VITE_API_BASE_URL` on the static frontend build to the API service URL. In Render, `render.yaml` wires this automatically via `fromService`.
- For multi-instance scaling or serverless deployments, replace the in-memory pairing store with shared persistence (Redis/PostgreSQL) so requests survive restarts and work across replicas.

**Why:** static hosts like Vercel/Render Static cannot run the Express backend. The pairing store must be shared once the API runs on more than one instance.
