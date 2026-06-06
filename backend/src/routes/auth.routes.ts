import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { loginSchema } from '../validations/auth.validation';

const router = Router();

router.post('/', validate(loginSchema), authController.login);
router.post('/logout', (req, res) => {
  res.clearCookie('auth-token');
  res.json({ success: true });
});

export default router;
