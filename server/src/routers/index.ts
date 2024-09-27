import { Router } from 'express';

import authRouter from './auth.route';
import healthRouter from './health.route';
import notificationRouter from './notification.route';

import { routeLogger } from '../configs/logger';
// import isAuth from '../middlewares/auth.middleware';

const router = Router();

// Logger
router.use(routeLogger);

// Routes
router.use('/health', healthRouter);
router.use('/notifications', notificationRouter);
router.use('/auth', authRouter);

// Development only routes
// if (process.env.NODE_ENV === 'development') {
//   router.use('/dev');
// }

export default router;
