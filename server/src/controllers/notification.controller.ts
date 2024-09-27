import { NextFunction, Request, Response } from 'express';

import internalServerError from '../errors/internal-server.error';
import { sendPromotionalNotificationService, sendTargetedNotificationService } from '../services/notification.service';

export const sendTargetedNotificationController = async (
  req: Request<{
    userId: string;
    message: string;
  }>,
  res: Response,
  next: NextFunction,
) => {
  const { userId, message } = req.body;

  const { success, error, data } = sendTargetedNotificationService(userId, message);

  if (!success) {
    next(internalServerError('Failed sending targeted notification', error));
  }

  res.status(200).json({
    message: 'Notification sent successfully',
    data,
    error: null,
  });
};

export const sendPromotionalNotificationController = async (
  req: Request<{
    message: string;
  }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { message } = req.body;

  const { success, error, data } = sendPromotionalNotificationService(message);

  if (!success) {
    next(internalServerError('Failed sending promotional notification', error));
  }

  res.status(200).json({
    message: 'Notification sent successfully',
    data,
    error: null,
  });
};

