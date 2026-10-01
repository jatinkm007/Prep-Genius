import express from 'express';
import { getAllProblems, getProblemBySlug } from '../controllers/problemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth protection so only authenticated students access problem sets
router.use(protect);

router.get('/', getAllProblems);
router.get('/:slug', getProblemBySlug);

export default router;