import express from 'express';
import Problem from '../models/Problem.js';

const router = express.Router();

// GET /api/problems - List all problems (metadata only)
router.get('/', async (req, res) => {
  try {
    const { difficulty, category } = req.query;
    const filter = {};
    if (difficulty) filter.difficulty = difficulty;
    if (category) filter.category = category;

    const problems = await Problem.find(filter)
      .select('-testCases -starterCode')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: problems.length, data: problems });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/problems/:slug - Retrieve problem details and visible sample cases
router.get('/:slug', async (req, res) => {
  try {
    const problem = await Problem.findOne({ slug: req.params.slug });
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    const payload = problem.toObject();
    payload.testCases = (payload.testCases || []).filter((tc) => tc.isSample);

    res.status(200).json({ success: true, data: payload });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/problems/:slug/hint - Generate a Socratic hint
router.post('/:slug/hint', async (req, res) => {
  try {
    const { slug } = req.params;
    const { code, language } = req.body;

    const problem = await Problem.findOne({ slug });
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    // Check if an AI API key exists in .env
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Friendly fallback hint if no API key is added yet
      return res.status(200).json({
        success: true,
        hint: `Think about what data structure lets you store numbers you have already visited so you can check their complement in O(1) time. (Add GEMINI_API_KEY to your server .env for live AI generation).`
      });
    }

    // Call Gemini API using standard fetch
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are a Socratic DSA tutor.
Problem: ${problem.title}
Description: ${problem.description}
Language: ${language}
Student Code:
${code || '(No code written yet)'}

Instructions:
1. Provide a short, constructive hint (2-3 sentences max).
2. Do NOT write full code or solve the problem.
3. Guide the student with a leading question about time complexity or logic.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const hintText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Consider the time complexity of searching for matching pairs.';

    res.status(200).json({ success: true, hint: hintText });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


export default router;