import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASS || 'password123';

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const token = jwt.sign(
        { username }, 
        process.env.JWT_SECRET || 'fallback-secret-key-change-me-in-production',
        { expiresIn: (process.env.JWT_EXPIRES_IN as any) || '7d' }
      );
      
      return res.json({ 
        success: true,
        token 
      });
    }
    
    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    next(error);
  }
};
