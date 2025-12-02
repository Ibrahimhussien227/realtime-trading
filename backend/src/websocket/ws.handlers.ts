import { Server as HttpServer } from "http";
import { WebSocketServer } from "ws";

import { authenticateWsConnection } from "./ws.auth";
import { market } from "../market";

export function setupWebSocketServer(server: HttpServer) {
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (socket, req) => {
    if (!authenticateWsConnection(req, socket)) return;

    console.log("WS client connected");

    const listener = (tick: any) => {
      if (socket.readyState === socket.OPEN) {
        socket.send(JSON.stringify({ type: "tick", payload: tick }));
      }
    };

    market.on("tick", listener);

    socket.on("close", () => {
      market.off("tick", listener);
    });
  });
}
