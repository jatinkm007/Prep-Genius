import express from 'express';
import { executeCode, submitCode } from '../controllers/codeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth protection so only logged-in users can run and submit code
router.use(protect);

router.post('/run', executeCode);
router.post('/submit', submitCode);

export default router;