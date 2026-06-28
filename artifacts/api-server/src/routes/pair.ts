import { Router, type IRouter } from "express";

const router: IRouter = Router();

const PAIRING_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
const MAX_POLL_ATTEMPTS = 100; // 100 attempts * 3s = 5 minutes (keep in sync with frontend polling)

// In-memory store for pairing requests (per-process; good enough for a single-instance bot)
const pairingStore = new Map<
  string,
  { status: "pending" | "completed"; pairingCode: string | null; requestedAt: number }
>();

const TELEGRAM_BOT_TOKEN = process.env["TELEGRAM_BOT_TOKEN"];
const TELEGRAM_ADMIN_CHAT_ID = process.env["TELEGRAM_ADMIN_CHAT_ID"];

function isValidPhoneNumber(value: unknown): value is string {
  return typeof value === "string" && /^\+?[0-9\s\-]{8,20}$/.test(value.trim());
}

function isValidPairingCode(value: unknown): value is string {
  return typeof value === "string" && /^[0-9A-Za-z\-]{4,20}$/.test(value.trim());
}

function cleanupExpired() {
  const now = Date.now();
  for (const [phone, record] of pairingStore) {
    if (record.status === "pending" && now - record.requestedAt > PAIRING_TIMEOUT_MS) {
      pairingStore.delete(phone);
    }
  }
}

function extractBearerToken(req: { headers: { authorization?: string } }): string | null {
  const header = req.headers.authorization ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  return match?.[1] ?? null;
}

async function sendTelegramNotification(phoneNumber: string): Promise<{ ok: boolean; error?: string }> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ADMIN_CHAT_ID) {
    return { ok: false, error: "Telegram credentials not configured" };
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_ADMIN_CHAT_ID,
        text: `New pairing request: ${phoneNumber}\nPush the code back to POST /api/pair/code with the bot token in the Authorization header.`,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      return { ok: false, error: `Telegram API responded ${response.status}: ${body}` };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

// Client requests a pairing code
router.post("/pair", async (req, res) => {
  cleanupExpired();

  const { phoneNumber } = req.body ?? {};

  if (!isValidPhoneNumber(phoneNumber)) {
    res.status(400).json({ error: "Invalid phone number" });
    return;
  }

  const normalized = phoneNumber.trim();
  pairingStore.set(normalized, {
    status: "pending",
    pairingCode: null,
    requestedAt: Date.now(),
  });

  const notification = await sendTelegramNotification(normalized);

  res.json({
    status: "pending",
    phoneNumber: normalized,
    notified: notification.ok,
    ...(notification.error ? { notificationError: notification.error } : {}),
  });
});

// Telegram bot pushes the pairing code back here
// Requires the bot token in the Authorization: Bearer <token> header
router.post("/pair/code", (req, res) => {
  cleanupExpired();

  const token = extractBearerToken(req);
  if (!token || token !== TELEGRAM_BOT_TOKEN) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { phoneNumber, pairingCode } = req.body ?? {};

  if (!isValidPhoneNumber(phoneNumber) || !isValidPairingCode(pairingCode)) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  const normalizedPhone = phoneNumber.trim();
  const normalizedCode = pairingCode.trim();
  const existing = pairingStore.get(normalizedPhone);

  if (!existing || existing.status !== "pending") {
    res.status(404).json({ error: "No pending pairing request found for this number" });
    return;
  }

  pairingStore.set(normalizedPhone, {
    status: "completed",
    pairingCode: normalizedCode,
    requestedAt: existing.requestedAt,
  });

  res.json({ status: "completed", phoneNumber: normalizedPhone, pairingCode: normalizedCode });
});

// Client polls for the pairing code
router.get("/pair/status", (req, res) => {
  cleanupExpired();

  const phoneNumber = req.query.phoneNumber;

  if (!isValidPhoneNumber(phoneNumber)) {
    res.status(400).json({ error: "Missing or invalid phoneNumber" });
    return;
  }

  const normalized = phoneNumber.trim();
  const record = pairingStore.get(normalized);
  if (!record) {
    res.status(404).json({ error: "No pairing request found" });
    return;
  }

  res.json({
    status: record.status,
    pairingCode: record.pairingCode,
  });
});

export { MAX_POLL_ATTEMPTS };
export default router;
