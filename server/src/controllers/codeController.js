import axios from 'axios';
import Problem from '../models/Problem.js';

// Judge0 CE open execution endpoint
const JUDGE0_API_URL = (process.env.JUDGE0_API_URL || 'https://ce.judge0.com').replace(/\/+$/, '');

// Judge0 Language IDs:
// 54 -> C++ (GCC 9.2.0)
// 71 -> Python (3.8.1)
// 63 -> JavaScript (Node.js 12.14.0)
const LANGUAGE_ID_MAP = {
  cpp: 54,
  python: 71,
  javascript: 63,
};

/**
 * Helper to execute a single run against Judge0
 */
const runSingleSubmission = async (languageId, code, stdin = '') => {
  const response = await axios.post(
    `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
    {
      source_code: code,
      language_id: languageId,
      stdin: stdin || '',
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 20000,
    }
  );
  return response.data;
};

/**
 * @desc    Execute code against Judge0 CE sandbox (Ad-hoc run)
 * @route   POST /api/code/run
 * @access  Private
 */
export const executeCode = async (req, res, next) => {
  try {
    const { language, code, stdin = '' } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ message: 'Code snippet cannot be empty.' });
    }

    const languageId = LANGUAGE_ID_MAP[language];
    if (!languageId) {
      return res.status(400).json({
        message: `Unsupported language: ${language}. Supported: cpp, python, javascript.`,
      });
    }

    const result = await runSingleSubmission(languageId, code, stdin);

    const isSuccess = result.status?.id === 3;
    const compileOutput = result.compile_output || '';
    const stdout = result.stdout || '';
    const stderr = result.stderr || '';
    const isCompileError = result.status?.id === 6;

    return res.status(200).json({
      success: isSuccess,
      exitCode: isSuccess ? 0 : 1,
      stdout: stdout,
      stderr: compileOutput || stderr || (isSuccess ? '' : result.status?.description || ''),
      isCompileError,
      time: result.time,
      memory: result.memory,
    });
  } catch (error) {
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return res.status(408).json({
        message: 'Execution timed out. Please check for infinite loops.',
      });
    }

    console.error('--- Judge0 Execution Error ---');
    console.error('Status:', error?.response?.status);
    console.error('Data:', error?.response?.data);
    console.error('Message:', error?.message);
    console.error('------------------------------');

    res.status(500).json({
      message: 'Failed to execute code in sandbox environment.',
      error: error?.response?.data?.message || error.message,
    });
  }
};

/**
 * Clean up string outputs for comparison (ignoring trailing spaces and line breaks)
 */
const normalizeOutput = (str = '') => {
  return str
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ');
};

/**
 * @desc    Submit code solution against all problem test cases
 * @route   POST /api/code/submit
 * @access  Private
 */
export const submitCode = async (req, res, next) => {
  try {
    const { problemId, slug, language, code } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ message: 'Code cannot be empty.' });
    }

    const languageId = LANGUAGE_ID_MAP[language];
    if (!languageId) {
      return res.status(400).json({ message: `Unsupported language: ${language}` });
    }

    // Retrieve problem with hidden test cases
    const problem = problemId 
      ? await Problem.findById(problemId)
      : await Problem.findOne({ slug });

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found.' });
    }

    // Combine visible and hidden test cases
    const allTestCases = [
      ...(problem.visibleTestCases || []).map((tc) => ({ ...tc.toObject(), isHidden: false })),
      ...(problem.hiddenTestCases || []).map((tc) => ({ ...tc.toObject(), isHidden: true })),
    ];

    if (allTestCases.length === 0) {
      return res.status(400).json({ message: 'No test cases defined for this problem.' });
    }

    // If the starter code has an embedded main runner, we execute the solution once.
    // For standard test evaluation: execute and check against expected outputs.
    const testResults = [];
    let passedCount = 0;
    let compileErrorEncountered = null;

    // Run test cases sequentially to avoid throttling
    for (let i = 0; i < allTestCases.length; i++) {
      const tc = allTestCases[i];
      const result = await runSingleSubmission(languageId, code, tc.input);

      if (result.status?.id === 6) {
        compileErrorEncountered = result.compile_output || 'Compilation Error';
        break;
      }

      const rawStdout = result.stdout || '';
      const actualNormalized = normalizeOutput(rawStdout);
      const expectedNormalized = normalizeOutput(tc.expectedOutput);

      // Check if actual output matches expected or if stdout contains expected
      const passed = result.status?.id === 3 && (
        actualNormalized === expectedNormalized ||
        actualNormalized.includes(expectedNormalized)
      );

      if (passed) passedCount++;

      testResults.push({
        testCaseIndex: i + 1,
        input: tc.isHidden ? 'Hidden Test Case' : tc.input,
        expectedOutput: tc.isHidden ? 'Hidden' : tc.expectedOutput,
        actualOutput: tc.isHidden ? (passed ? 'Matched' : 'Mismatch') : (rawStdout.trim() || 'No output'),
        passed,
        isHidden: tc.isHidden,
        error: result.stderr || (result.status?.id !== 3 ? result.status?.description : null),
        time: result.time,
      });

      // If a hidden test case fails, we can stop early
      if (!passed && tc.isHidden) {
        break;
      }
    }

    if (compileErrorEncountered) {
      return res.status(200).json({
        verdict: 'Compile Error',
        passed: false,
        totalTestCases: allTestCases.length,
        passedTestCases: 0,
        compileError: compileErrorEncountered,
        results: [],
      });
    }

    const allPassed = passedCount === allTestCases.length;

    return res.status(200).json({
      verdict: allPassed ? 'Accepted' : 'Wrong Answer',
      passed: allPassed,
      totalTestCases: allTestCases.length,
      passedTestCases: passedCount,
      results: testResults,
    });
  } catch (error) {
    console.error('--- Submit Code Error ---', error);
    res.status(500).json({
      message: 'Failed to process submission.',
      error: error.message,
    });
  }
};