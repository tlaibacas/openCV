type newData = {
  attempts: number;
  lastAttempt: number;
  blockedUntil?: number | undefined;
};
const data = new Map<string, newData>();
const rate: number = 150;
const timeWindow: number = 30 * 60_000;
const blockTime: number = 10_000;

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
