type LimitEntry = { count: number; resetAt: number };

const store = new Map<string, LimitEntry>();

export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) {
    return false;
  }

  entry.count += 1;
  return true;
}

export function rateLimitCheckout(userId: string): boolean {
  return rateLimit(`checkout:${userId}`, 10, 60_000);
}

export function rateLimitAuth(ip: string): boolean {
  return rateLimit(`auth:${ip}`, 5, 60_000);
}
