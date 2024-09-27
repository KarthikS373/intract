import WebSocket from 'ws';

import { Server } from 'http';

const createWebSocketServer = (server: Server) => {
  const wss = new WebSocket.Server({ server });
  return wss;
};

export default createWebSocketServer;
