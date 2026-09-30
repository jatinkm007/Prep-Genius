import express from 'express';
import {
  sendMessage,
  getUserSessions,
  getSessionById,
  deleteSession,
} from '../controllers/tutorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply JWT auth protection to all tutor routes
router.use(protect);

router.post('/chat', sendMessage);
router.get('/sessions', getUserSessions);
router.get('/sessions/:id', getSessionById);
router.delete('/sessions/:id', deleteSession);

export default router;