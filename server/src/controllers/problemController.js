import Problem from '../models/Problem.js';

/**
 * @desc    Fetch all problems (lightweight preview list)
 * @route   GET /api/problems
 * @access  Private
 */
export const getAllProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find({})
      .select('title slug difficulty category tags')
      .sort({ createdAt: 1 });

    res.status(200).json(problems);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch single problem details by slug
 * @route   GET /api/problems/:slug
 * @access  Private
 */
export const getProblemBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const problem = await Problem.findOne({ slug }).select('-hiddenTestCases');

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found.' });
    }

    res.status(200).json(problem);
  } catch (error) {
    next(error);
  }
};