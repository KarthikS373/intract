import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import crypto from 'crypto';

import pool from '../configs/db';
import env from '../configs/env';
import logger from '../configs/logger';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    // Find user
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = userResult.rows[0];

    // Compare passwords
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const isMatch = hashedPassword === user.password;
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, env.api.secret, { expiresIn: '1h' });

    // Respond with token
    return res.status(200).json({ token });
  } catch (error) {
    logger.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields.' });
    }

    // Check if user exists
    const existingUserResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUserResult.rows.length > 0) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Create user
    const newUserResult = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword],
    );

    const newUser = newUserResult.rows[0];

    // Respond with success
    return res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    logger.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

