import { Request, Response, NextFunction } from 'express';

const dummyUser = {};

/**
 * Authentication middleware that sends a dummy user for testing purposes.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  res.locals.user = dummyUser;

  next();
};

export default isAuth;
