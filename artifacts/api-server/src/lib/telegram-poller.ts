import { completePairing, cleanupExpired, getPairing } from "./pairing-store";
import { logger } from "./logger";

const TELEGRAM_BOT_TOKEN = process.env["TELEGRAM_BOT_TOKEN"];
const TELEGRAM_ADMIN_CHAT_ID = process.env["TELEGRAM_ADMIN_CHAT_ID"];

const POLL_INTERVAL_MS = 3_000;

interface TelegramMessage {
  message_id: number;
  date: number;
  text?: string;
  from?: { id: number; is_bot?: boolean; username?: string };
  chat?: { id: number; type?: string };
  reply_to_message?: TelegramMessage;
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
  channel_post?: TelegramMessage;
}

let lastUpdateId = 0;
let isRunning = false;

const seenMessageIds = new Set<number>();
const recentPairCommands = new Map<number, string>(); // message_id -> phoneNumber

export function startTelegramPoller(): void {
  if (isRunning) return;
  if (!TELEGRAM_BOT_TOKEN) {
    logger.warn("TELEGRAM_BOT_TOKEN not set; Telegram poller not started");
    return;
  }
  if (!TELEGRAM_ADMIN_CHAT_ID) {
    logger.warn("TELEGRAM_ADMIN_CHAT_ID not set; Telegram poller not started");
    return;
  }
  isRunning = true;
  logger.info("Starting Telegram pairing-code poller");
  void pollLoop();
}

async function pollLoop(): Promise<void> {
  while (isRunning) {
    try {
      await pollOnce();
    } catch (err) {
      logger.error({ err }, "Telegram poller error");
    }
    await sleep(POLL_INTERVAL_MS);
  }
}

async function pollOnce(): Promise<void> {
  cleanupExpired();

  const url = new URL(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
  url.searchParams.set("offset", String(lastUpdateId + 1));
  url.searchParams.set("limit", "100");

  const response = await fetch(url.toString());
  if (!response.ok) {
    const body = await response.text();
    logger.error({ status: response.status, body }, "getUpdates failed");
    return;
  }

  const data = (await response.json()) as { ok: boolean; result?: TelegramUpdate[] };
  if (!data.ok || !data.result) {
    return;
  }

  for (const update of data.result) {
    if (update.update_id > lastUpdateId) {
      lastUpdateId = update.update_id;
    }
    processUpdate(update);
  }
}

function processUpdate(update: TelegramUpdate): void {
  const msg = update.message ?? update.edited_message ?? update.channel_post;
  if (!msg) return;
  if (!msg.chat || String(msg.chat.id) !== TELEGRAM_ADMIN_CHAT_ID) return;
  if (!msg.text) return;

  // Skip duplicates
  if (seenMessageIds.has(msg.message_id)) return;
  seenMessageIds.add(msg.message_id);

  const text = msg.text.trim();
  const isFromBot = msg.from?.is_bot === true;

  if (isFromBot) {
    // Try to extract a pairing code from bot replies
    const code = extractPairingCode(text);
    if (code) {
      // Try to match to the most recent /pair command before this reply
      const phoneNumber = findMatchingPhoneNumber(msg);
      if (phoneNumber) {
        if (completePairing(phoneNumber, code)) {
          logger.info({ phoneNumber, code }, "Captured pairing code from Telegram bot");
        } else {
          logger.warn({ phoneNumber, code }, "No pending pairing request found for captured code");
        }
      } else {
        logger.warn({ text, code }, "Could not match bot pairing code to a phone number");
      }
    }
  } else if (msg.from?.id) {
    // Track user /pair commands so we can match bot replies to phone numbers
    const pairCommandMatch = /^\/pair\s+(\+?[\d\s\-]{8,20})\b/i.exec(text);
    if (pairCommandMatch) {
      const phoneNumber = pairCommandMatch[1].replace(/\s+/g, "").replace(/-/g, "");
      recentPairCommands.set(msg.message_id, phoneNumber);
    }
  }
}

function findMatchingPhoneNumber(botReply: TelegramMessage): string | null {
  // Best case: the bot reply is a reply to the user's /pair command
  const replyToId = botReply.reply_to_message?.message_id;
  if (replyToId && recentPairCommands.has(replyToId)) {
    return recentPairCommands.get(replyToId) ?? null;
  }

  // Fallback: match to the most recent pending /pair command before this reply
  const candidates = Array.from(recentPairCommands.entries()).filter(
    ([_id, phone]) => getPendingPhoneNumber(phone) !== null,
  );
  if (candidates.length === 0) return null;

  // Most recent command
  const [latestId, phoneNumber] = candidates[candidates.length - 1];

  // If the reply is a reply to any earlier message, use that command
  if (replyToId) {
    const exact = recentPairCommands.get(replyToId);
    if (exact && getPendingPhoneNumber(exact)) return exact;
  }

  return getPendingPhoneNumber(phoneNumber) ? phoneNumber : null;
}

function getPendingPhoneNumber(phoneNumber: string): string | null {
  const record = getPairing(phoneNumber);
  return record && record.status === "pending" ? phoneNumber : null;
}

function extractPairingCode(text: string): string | null {
  // Format: "🔑 Your Code: 41NT9LTD"
  const codeMatch = /🔑\s*Your\s*Code[:\s]+([A-Za-z0-9\-]{4,20})/i.exec(text);
  if (codeMatch) return codeMatch[1].trim();

  // Generic fallback: "Your code: XXXX" or "Code: XXXX"
  const genericMatch = /(?:your\s*)?code[:\s]+([A-Za-z0-9\-]{4,20})/i.exec(text);
  if (genericMatch) return genericMatch[1].trim();

  return null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
