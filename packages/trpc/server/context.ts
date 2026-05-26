import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

import { createCookieFactory, getCookieFactory, clearCookieFactory } from "./utils/cookie";

export interface TRPCContext {
  createCookie: ReturnType<typeof createCookieFactory>;

  getCookie: ReturnType<typeof getCookieFactory>;

  clearCookie: ReturnType<typeof clearCookieFactory>;

  ip: string;

  user?: {
    id: string;
  };
}

export async function createContext({
  req,

  res,
}: CreateExpressContextOptions): Promise<TRPCContext> {
  const ip = req.ip ?? req.socket.remoteAddress ?? "unknown";

  return {
    createCookie: createCookieFactory(res),

    getCookie: getCookieFactory(req),

    clearCookie: clearCookieFactory(res),

    ip,
  };
}
