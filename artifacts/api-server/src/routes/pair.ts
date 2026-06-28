import { Router, type IRouter } from "express";

const router: IRouter = Router();

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

async function sendTelegramNotification(phoneNumber: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ADMIN_CHAT_ID) {
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_ADMIN_CHAT_ID,
        text: `New pairing request: ${phoneNumber}\nPush the code back to POST /api/pair/code`,
      }),
    });
  } catch (err) {
    console.error("Failed to send Telegram notification", err);
  }
}

// Client requests a pairing code
router.post("/pair", async (req, res) => {
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

  await sendTelegramNotification(normalized);

  res.json({ status: "pending", phoneNumber: normalized });
});

// Telegram bot (or admin) pushes the pairing code back here
router.post("/pair/code", (req, res) => {
  const { phoneNumber, pairingCode } = req.body ?? {};

  if (!isValidPhoneNumber(phoneNumber) || !isValidPairingCode(pairingCode)) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  const normalizedPhone = phoneNumber.trim();
  const normalizedCode = pairingCode.trim();
  const existing = pairingStore.get(normalizedPhone);

  pairingStore.set(normalizedPhone, {
    status: "completed",
    pairingCode: normalizedCode,
    requestedAt: existing?.requestedAt ?? Date.now(),
  });

  res.json({ status: "completed", phoneNumber: normalizedPhone, pairingCode: normalizedCode });
});

// Client polls for the pairing code
router.get("/pair/status", (req, res) => {
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

export default router;
