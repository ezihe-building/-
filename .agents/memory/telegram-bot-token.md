---
name: Telegram bot token handling
description: How to store and use the Telegram bot token for the REAPER EMPIRE BOT pairing flow.
---

Store `TELEGRAM_BOT_TOKEN` as a Replit Secret, never in source code. The API server uses it for two things:

1. Sending pairing-request notifications to the configured Telegram admin chat via `sendMessage`.
2. Authenticating the bot when it pushes a pairing code back to `POST /api/pair/code`. The bot must include the token in the `Authorization: Bearer <TELEGRAM_BOT_TOKEN>` header.

**Why:** the bot token is a credential. Reusing it as the webhook shared secret avoids introducing another secret to manage, while still preventing arbitrary clients from injecting pairing codes.
