---
name: Pairing request lifecycle
description: Lifecycle rules for the in-memory pairing request store.
---

The pairing store is a per-process `Map` keyed by normalized phone number. Each entry tracks `status` (`pending` | `completed`), `pairingCode`, and `requestedAt`.

Rules:

- Pending requests expire after 5 minutes and are removed by `cleanupExpired()` on every read/write endpoint.
- `POST /api/pair/code` must reject requests that are not currently `pending` (return `404`). This prevents completed or unknown requests from being overwritten or replayed.
- `POST /api/pair` re-creates a pending request for the same number, allowing the user to retry.

**Why:** without pending-only writes and expiry cleanup, an attacker with a valid bot token could overwrite old codes or replay pairing codes for arbitrary numbers.
