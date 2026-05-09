// Type definitions
type newData = {
  attempts: number;
  lastAttempt: number;
  blockedUntil?: number | undefined;
};
// Variables
const data = new Map<string, newData>();
const rate = Number(process.env.RATE_LIMIT ?? 60);
const timeWindow = Number(process.env.TIME_WINDOW_MS ?? 10 * 60_000);
const blockTime = Number(process.env.BLOCK_TIME_MS ?? 2 * 60_000);
// Rate limiting middleware
export function bruteShield(ip: string) {
  const exist = data.get(ip);
  const now: number = Date.now();

  if (!exist) {
    data.set(ip, { attempts: 1, lastAttempt: now });
    return { blocked: false };
  }
  if (exist.blockedUntil) {
    if (exist.blockedUntil > now) {
      return { blocked: true };
    }
    exist.blockedUntil = undefined;
  }
  if (exist.lastAttempt + timeWindow <= now) {
    exist.attempts = 1;
    exist.lastAttempt = now;
    return { blocked: false };
  }
  exist.attempts++;
  exist.lastAttempt = now;
  if (exist.attempts >= rate) {
    exist.blockedUntil = now + blockTime;
    exist.attempts = 0;
    return { blocked: true };
  }
  return { blocked: false };
}
// Data cleaner to remove old entries
export function dataCleaner() {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of data.entries()) {
      if (entry.lastAttempt + timeWindow <= now) {
        data.delete(ip);
      }
    }
  }, timeWindow);
}
