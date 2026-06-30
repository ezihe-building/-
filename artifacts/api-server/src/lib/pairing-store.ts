import { logger } from "./logger";

export type PairingRecord = {
  status: "pending" | "completed";
  pairingCode: string | null;
  requestedAt: number;
};

const PAIRING_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

const store = new Map<string, PairingRecord>();

export function setPendingPairing(phoneNumber: string): void {
  store.set(phoneNumber, {
    status: "pending",
    pairingCode: null,
    requestedAt: Date.now(),
  });
}

export function completePairing(phoneNumber: string, pairingCode: string): boolean {
  const existing = store.get(phoneNumber);
  if (!existing || existing.status !== "pending") {
    return false;
  }
  store.set(phoneNumber, {
    status: "completed",
    pairingCode,
    requestedAt: existing.requestedAt,
  });
  return true;
}

export function getPairing(phoneNumber: string): PairingRecord | undefined {
  cleanupExpired();
  return store.get(phoneNumber);
}

export function cleanupExpired(): void {
  const now = Date.now();
  for (const [phone, record] of store) {
    if (record.status === "pending" && now - record.requestedAt > PAIRING_TIMEOUT_MS) {
      store.delete(phone);
    }
  }
}
