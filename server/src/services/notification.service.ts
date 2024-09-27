import { producer } from '../configs/kafka';
import logger from '../configs/logger';

export const sendTargetedNotificationService = (
  userId: string,
  message: string,
): {
  success: boolean;
  error: any;
  data: any;
} => {
  logger.info('Constructing targeted notification:', { userId, message });
  const payloads = [
    {
      topic: 'notifications',
      messages: JSON.stringify({ userId, message }),
    },
  ];
  logger.info('Payloads being sent:', JSON.stringify(payloads));

  producer.send(payloads, (err, data) => {
    if (err) {
      logger.error(err);
      return { success: false, error: err };
    }
    logger.info('Notification sent:', JSON.stringify(data));
    return { success: true, data };
  });

  return { success: true, error: null, data: null };
};

export const sendPromotionalNotificationService = (
  message: string,
): {
  success: boolean;
  error: any;
  data: any;
} => {
  logger.info('Constructing promotional notification:', { message });
  const payloads = [
    {
      topic: 'notifications',
      messages: JSON.stringify({ message }),
    },
  ];
  logger.info('Payloads being sent:', JSON.stringify(payloads));

  producer.send(payloads, (err, data) => {
    if (err) {
      logger.error(err);
      return { success: false, error: err };
    }
    logger.info('Notification sent:', JSON.stringify(data));
    console.log('Notification sent:', JSON.stringify(data));
    return { success: true, data };
  });

  return { success: true, error: null, data: null };
};

