---
name: Vite dev proxy for API workflow
description: How the frontend reaches the API server workflow in local/Replit dev.
---

In `artifacts/reaper-empire/vite.config.ts`, the Vite dev server proxies `/api/*` to `API_SERVER_URL` (defaults to `http://localhost:8080`). This lets the frontend use relative `/api/pair` calls from the Replit preview while the backend runs on a separate workflow port.

- Override `API_SERVER_URL` if the API server gets a different port in a future environment.
- In production, set `VITE_API_BASE_URL` to the deployed API domain and do not rely on the dev proxy.

**Why:** the frontend workflow and API workflow run on different ports. Without a proxy, browser requests to `/api` hit the frontend dev server instead of the backend.
