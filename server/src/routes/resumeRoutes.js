import express from 'express';
import multer from 'multer';
import { analyzeResume, getAuditHistory } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js'; // or your auth middleware

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post('/analyze', protect, upload.single('resume'), analyzeResume);
router.get('/history', protect, getAuditHistory);

export default router;