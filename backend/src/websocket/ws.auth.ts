import type { WebSocket as WebSocket } from "ws";

import { verifyToken } from "../utils/jwt";

export function getWsTokenFromCookie(req: any): string | null {
  const cookieHeader = req.headers?.cookie;
  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c: string) => {
      const [key, val] = c.split("=");
      return [key, val];
    })
  );

  return cookies["token"];
}

export function authenticateWsConnection(
  req: any,
  socket: WebSocket
): boolean {
  const token = getWsTokenFromCookie(req);

  try {
    if (!token || !verifyToken(token)) {
      socket.send(JSON.stringify({ error: "Unauthorized" }));
      socket.close();
      return false;
    }
    return true;
  } catch {
    socket.send(JSON.stringify({ error: "Invalid token" }));
    socket.close();
    return false;
  }
}
