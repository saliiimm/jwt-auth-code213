import { Router } from 'express';
import {
  getUserById,
  login,
  register,
} from '../controllers/UserControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/:id', verifyToken, getUserById);

export default router;
