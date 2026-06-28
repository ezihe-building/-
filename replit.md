# REAPER EMPIRE BOT — Website

A premium dark marketing website for the REAPER EMPIRE WhatsApp Bot. Sukuna-inspired aesthetic with black, crimson red, and blood red color palette. Built with React + Vite.

## Run & Operate

- `pnpm --filter @workspace/reaper-empire run dev` — run the website frontend (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port assigned by workflow, see `PORT` env var)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite + Tailwind CSS
- Routing: Wouter
- Animations: Framer Motion
- Icons: Lucide React + React Icons
- Fonts: Cinzel (gothic titles) + Inter (body) + JetBrains Mono (code/logs)
- API: Express 5 (shared api-server artifact)
- DB: PostgreSQL + Drizzle ORM (not yet used by this site)

## Where things live

- `artifacts/reaper-empire/src/pages/` — all page components (Home, Features, Commands, Gallery, HowItWorks, TestBot, DashboardPreview, FAQ, Pricing)
- `artifacts/reaper-empire/src/components/` — Navbar, Footer, ParticleBackground, SectionBackground
- `artifacts/reaper-empire/src/index.css` — global dark theme, CSS custom properties, animation keyframes
- `lib/api-spec/openapi.yaml` — API contract source of truth
- `artifacts/api-server/src/routes/` — backend route handlers

## Pairing API

The `/test` page now calls the real pairing backend:

- `POST /api/pair` — submit `phoneNumber`; backend stores the request and (optionally) notifies the Telegram bot.
- `POST /api/pair/code` — the Telegram bot pushes the generated pairing code back to this endpoint (`{ phoneNumber, pairingCode }`).
- `GET /api/pair/status?phoneNumber=...` — frontend polls this until the pairing code is returned.

Required environment:
- `TELEGRAM_BOT_TOKEN` (Replit Secret) — used to notify the Telegram bot about new pairing requests.
- `TELEGRAM_ADMIN_CHAT_ID` (env var) — Telegram chat/group where the bot receives pairing requests. Optional; without it the backend still accepts webhook pushes from the bot, but it cannot notify the bot automatically.

Dev proxy: the Vite dev server forwards `/api/*` to `API_SERVER_URL` (defaults to `http://localhost:8080`) so the frontend can call the backend from the Replit preview.

## Architecture decisions

- **CSS-only particle backgrounds**: No canvas/WebGL. Floating red dot particles use pure CSS keyframe animations for performance.
- **Dark-only theme**: No light mode. All CSS variables locked to dark Sukuna palette.
- **Cinzel font**: Imported via Google Fonts CDN for gothic/ancient title aesthetic.

## Product

The Reaper Empire Bot is a feature-rich WhatsApp bot. The website:
- Markets the bot with a dark, powerful, Sukuna-inspired aesthetic
- Shows all bot features, commands, and how pairing works
- Provides a live pairing UI that receives real pairing codes from the backend API
- Includes a dashboard preview showing bot stats, plugins, and live logs

## User preferences

- OWNER: +234 814 831 0933
- DEV: +234 903 565 9542
- Theme: Black, Crimson Red, Blood Red, Dark Gray, White text
- No light mode, no heavy animations, no fake data in pairing UI

## Gotchas

- Do NOT call `configureWorkflow` for artifact services — use `WorkflowsRestart` with the exact managed name `artifacts/reaper-empire: web`
- Do NOT generate or display fake pairing codes in TestBot.tsx — the pairing code box is empty until the backend returns a real code
- The Cinzel font requires internet access to load from Google Fonts CDN

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Pairing API implementation: `artifacts/api-server/src/routes/pair.ts`
