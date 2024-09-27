import jwt from 'jsonwebtoken';
import { WebSocket } from 'ws';

import { createServer } from 'http';

import app from './configs/app';
import env from './configs/env';
import { consumer } from './configs/kafka';
import logger from './configs/logger';
import createWebSocketServer from './configs/sockets';
import unexpectedErrorHandler from './utils/error-handling/unexpected-error-handler';

const server = createServer(app);
const wss = createWebSocketServer(server);

// TODO: Use an external service to store the connections and terminate them when the user logs out
const users: { [key: string]: WebSocket } = {};

wss.on('connection', (ws: WebSocket & { userId?: string }, req) => {
  const params = new URLSearchParams(req.url?.split('?')[1]);
  const token = params.get('token');

  logger.info('WebSocket connection opened:', req.url);

  if (token) {
    try {
      const decoded = jwt.verify(token, env.api.secret) as { id: string };
      ws.userId = decoded.id;
      users[ws.userId] = ws;
      logger.info(`User ${ws.userId} connected via WebSocket.`);
    } catch (err) {
      logger.error('WebSocket authentication failed:', err);
      ws.close();
    }
  } else {
    logger.error('No token provided for WebSocket connection.');
    ws.close();
  }
});

consumer.on('message', message => {
  const notification = JSON.parse(message.value as string);
  logger.info('Received notification:', JSON.parse(message.value as string));
  console.log('Received notification:', JSON.parse(message.value as string));
  if (notification.userId) {
    // Send to specific user
    const userSocket = users[notification.userId];
    if (userSocket) {
      logger.info(`Sending notification to user ${notification.userId}`);
      userSocket.send(JSON.stringify(notification));
    }
  } else {
    // Broadcast to all users
    logger.info('Broadcasting notification to all users');
    wss.clients.forEach(client => {
      client.send(JSON.stringify(notification));
    });
  }
});

server.listen(env.port, () => {
  logger.info(`Server started at ${env.base.url} on port ${env.port}`);
});

process.on('uncaughtException', error => unexpectedErrorHandler(server, error));
process.on('unhandledRejection', error => unexpectedErrorHandler(server, error));
