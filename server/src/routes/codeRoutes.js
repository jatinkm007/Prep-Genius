import express from 'express';
import { executeCode, submitCode, getUserSubmissions } from '../controllers/codeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth protection to code routes
router.use(protect);

router.post('/run', executeCode);
router.post('/submit', submitCode);
router.get('/submissions', getUserSubmissions);

export default router;