import { Router } from 'express';

import {
  sendPromotionalNotificationController,
  sendTargetedNotificationController,
} from '../controllers/notification.controller';

const router = Router();

router.post('/send', sendPromotionalNotificationController);
router.post('/:userId', sendTargetedNotificationController);

export default router;

