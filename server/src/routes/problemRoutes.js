import express from 'express';
import Problem from '../models/Problem.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

/**
 * @desc    Fetch all available problem summaries for selection
 * @route   GET /api/problems
 */
router.get('/', async (req, res, next) => {
  try {
    const problems = await Problem.find({}, 'title slug difficulty category tags').sort({ title: 1 });
    res.status(200).json(problems);
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Fetch single problem by slug with starter code & test cases
 * @route   GET /api/problems/:slug
 */
router.get('/:slug', async (req, res, next) => {
  try {
    const problem = await Problem.findOne({ slug: req.params.slug });
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(200).json(problem);
  } catch (error) {
    next(error);
  }
});

export default router;