const requests = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

const WINDOW = 60 * 1000;

const LIMIT = 5;

export function checkRateLimit(key: string) {
  const now = Date.now();

  const existing = requests.get(key);

  if (!existing || existing.resetAt < now) {
    requests.set(
      key,

      {
        count: 1,

        resetAt: now + WINDOW,
      },
    );

    return true;
  }

  if (existing.count >= LIMIT) {
    return false;
  }

  existing.count += 1;

  requests.set(key, existing);

  return true;
}
