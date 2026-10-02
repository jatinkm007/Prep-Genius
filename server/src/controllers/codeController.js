import axios from 'axios';
import Problem from '../models/Problem.js';
import Submission from '../models/Submission.js';
import { buildDynamicDriver } from '../utils/driverBuilder.js';

const JUDGE0_API_URL = (process.env.JUDGE0_API_URL || 'https://ce.judge0.com').replace(/\/+$/, '');

const LANGUAGE_ID_MAP = {
  cpp: 54,
  python: 71,
  javascript: 63,
};

const runSingleSubmission = async (languageId, code, stdin = '') => {
  const response = await axios.post(
    `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
    {
      source_code: code,
      language_id: languageId,
      stdin: stdin || '',
    },
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: 20000,
    }
  );
  return response.data;
};

const cleanUserCode = (code, language) => {
  if (language === 'cpp') {
    return code.replace(/int\s+main\s*\([^)]*\)\s*\{[\s\S]*$/m, '').trim();
  }
  if (language === 'python') {
    return code.replace(/if\s+__name__\s*==\s*['"]__main__['"]\s*:[\s\S]*$/m, '').trim();
  }
  return code;
};

const normalizeOutput = (str = '') => {
  return str
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, '');
};

const ensureRunnableCode = (language, code) => {
  if (language === 'cpp' && !code.includes('int main')) {
    return `
#include <iostream>
using namespace std;
${code}
int main() {
    cout << "[Sandbox Run] Solution compiled and initialized successfully." << endl;
    return 0;
}
`;
  }
  if (language === 'python' && !code.includes('__main__')) {
    return `
${code}
if __name__ == '__main__':
    print("[Sandbox Run] Solution compiled and initialized successfully.")
`;
  }
  if (language === 'javascript') {
    return `
${code}
console.log("[Sandbox Run] Script executed successfully.");
`;
  }
  return code;
};

/**
 * Resolves runnable code using problem.signature dynamically,
 * or falls back to legacy hardcoded drivers if signature is absent.
 */
const resolveRunnableCode = (problem, language, userCode, input, isSubmit = false) => {
  if (problem?.signature && problem.signature.methodName) {
    return buildDynamicDriver(problem.signature, language, userCode, input, isSubmit);
  }

  // Fallback for legacy problems (Two Sum & Valid Parentheses) without a signature
  const delimiter = isSubmit ? '\n' : '\n___PREP_GENIUS_RETURN___\n';

  if (problem?.slug === 'two-sum') {
    const targetMatch = input.match(/target\s*=\s*(-?\d+)/);
    const numsMatch = input.match(/nums\s*=\s*\[([^\]]+)\]/);
    const target = targetMatch ? targetMatch[1] : '9';
    const numsArrayStr = numsMatch ? numsMatch[1] : '2,7,11,15';

    if (language === 'cpp') {
      return `
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

${userCode}

int main() {
    Solution sol;
    vector<int> nums = {${numsArrayStr}};
    int target = ${target};
    vector<int> ans = sol.twoSum(nums, target);
    cout << "${delimiter}[";
    for (size_t i = 0; i < ans.size(); i++) {
        cout << ans[i] << (i + 1 < ans.size() ? "," : "");
    }
    cout << "]" << endl;
    return 0;
}
`;
    }

    if (language === 'python') {
      return `
import json
from typing import List

${userCode}

if __name__ == '__main__':
    sol = Solution()
    nums = [${numsArrayStr}]
    target = ${target}
    ans = sol.twoSum(nums, target)
    print("${delimiter}" + json.dumps(ans).replace(" ", ""))
`;
    }

    if (language === 'javascript') {
      return `
${userCode}

const nums = [${numsArrayStr}];
const target = ${target};
const ans = twoSum(nums, target);
console.log("${delimiter}" + JSON.stringify(ans).replace(/\\s+/g, ''));
`;
    }
  }

  if (problem?.slug === 'valid-parentheses') {
    const sMatch = input.match(/s\s*=\s*"([^"]*)"/);
    const sVal = sMatch ? sMatch[1] : input.replace(/["'\s]/g, '');

    if (language === 'cpp') {
      return `
#include <iostream>
#include <stack>
#include <string>
using namespace std;

${userCode}

int main() {
    Solution sol;
    string s = "${sVal}";
    cout << "${delimiter}" << (sol.isValid(s) ? "true" : "false") << endl;
    return 0;
}
`;
    }

    if (language === 'python') {
      return `
${userCode}

if __name__ == '__main__':
    sol = Solution()
    print("${delimiter}" + ("true" if sol.isValid("${sVal}") else "false"))
`;
    }

    if (language === 'javascript') {
      return `
${userCode}

console.log("${delimiter}" + (isValid("${sVal}") ? "true" : "false"));
`;
    }
  }

  return userCode;
};

/**
 * @desc    Execute code against the first visible test case (LeetCode style Run)
 * @route   POST /api/code/run
 * @access  Private
 */
export const executeCode = async (req, res, next) => {
  try {
    const { problemId, slug, language, code, stdin = '' } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ message: 'Code snippet cannot be empty.' });
    }

    const languageId = LANGUAGE_ID_MAP[language];
    if (!languageId) {
      return res.status(400).json({
        message: `Unsupported language: ${language}. Supported: cpp, python, javascript.`,
      });
    }

    let problem = null;
    if (problemId) {
      problem = await Problem.findById(problemId);
    }
    if (!problem && slug) {
      problem = await Problem.findOne({ slug });
    }

    // Fallback: If no problem was resolved, run raw standalone code
    if (!problem || !problem.visibleTestCases?.length) {
      const runnableCode = ensureRunnableCode(language, code);
      const result = await runSingleSubmission(languageId, runnableCode, stdin);
      const isSuccess = result.status?.id === 3;
      return res.status(200).json({
        success: isSuccess,
        stdout: result.stdout || '',
        stderr: result.compile_output || result.stderr || '',
      });
    }

    // Run against Sample Test Case 1
    const sampleCase = problem.visibleTestCases[0];
    const strippedUserCode = cleanUserCode(code, language);

    const runnableCode = resolveRunnableCode(
      problem,
      language,
      strippedUserCode,
      sampleCase.input,
      false
    );

    const result = await runSingleSubmission(languageId, runnableCode, '');

    // Handle compilation errors gracefully
    if (result.status?.id === 6 || result.compile_output) {
      return res.status(200).json({
        success: false,
        isCompileError: true,
        input: sampleCase.input,
        expected: sampleCase.expectedOutput,
        output: 'Compilation Error',
        stdout: '',
        stderr: result.compile_output || result.stderr || 'Compilation Error',
      });
    }

    const rawStdout = result.stdout || '';
    let userStdout = '';
    let functionOutput = 'No output';

    const DELIMITER = '___PREP_GENIUS_RETURN___';
    if (rawStdout.includes(DELIMITER)) {
      const parts = rawStdout.split(DELIMITER);
      userStdout = parts[0].trim();
      functionOutput = parts[1].trim();
    } else {
      userStdout = rawStdout.trim();
      functionOutput = rawStdout.trim() || 'No output';
    }

    const actualNormalized = normalizeOutput(functionOutput);
    const expectedNormalized = normalizeOutput(sampleCase.expectedOutput);

    const passed =
      result.status?.id === 3 &&
      actualNormalized === expectedNormalized;

    return res.status(200).json({
      success: passed,
      exitCode: passed ? 0 : 1,
      input: sampleCase.input,
      output: functionOutput,
      expected: sampleCase.expectedOutput,
      stdout: userStdout,
      stderr: result.stderr || '',
      time: result.time || '0.000',
      memory: result.memory || 0,
    });
  } catch (error) {
    console.error('--- Run Code Controller Error ---', error?.response?.data || error.message);
    res.status(500).json({
      message: 'Failed to execute code in sandbox environment.',
      error: error?.response?.data?.message || error.message,
    });
  }
};

/**
 * @desc    Submit full solution against all visible and hidden test cases
 * @route   POST /api/code/submit
 * @access  Private
 */
export const submitCode = async (req, res, next) => {
  try {
    const { problemId, slug, language, code } = req.body;
    const userId = req.user?._id;

    if (!code || !code.trim()) {
      return res.status(400).json({ message: 'Code cannot be empty.' });
    }

    const languageId = LANGUAGE_ID_MAP[language];
    if (!languageId) {
      return res.status(400).json({ message: `Unsupported language: ${language}` });
    }

    const problem = problemId
      ? await Problem.findById(problemId)
      : await Problem.findOne({ slug });

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found.' });
    }

    const allTestCases = [
      ...(problem.visibleTestCases || []).map((tc) => ({ ...tc.toObject(), isHidden: false })),
      ...(problem.hiddenTestCases || []).map((tc) => ({ ...tc.toObject(), isHidden: true })),
    ];

    if (allTestCases.length === 0) {
      return res.status(400).json({ message: 'No test cases defined for this problem.' });
    }

    const strippedUserCode = cleanUserCode(code, language);
    const testResults = [];
    let passedCount = 0;
    let compileErrorEncountered = null;
    let totalTime = 0;

    for (let i = 0; i < allTestCases.length; i++) {
      const tc = allTestCases[i];

      const runnableCode = resolveRunnableCode(
        problem,
        language,
        strippedUserCode,
        tc.input,
        true
      );

      const result = await runSingleSubmission(languageId, runnableCode, '');

      if (result.status?.id === 6) {
        compileErrorEncountered = result.compile_output || 'Compilation Error';
        break;
      }

      if (result.time) {
        totalTime = Math.max(totalTime, parseFloat(result.time) || 0);
      }

      const rawStdout = result.stdout || '';
      const lines = rawStdout.trim().split('\n').filter(Boolean);
      const actualOutput = lines[lines.length - 1] || '';

      const actualNormalized = normalizeOutput(actualOutput);
      const expectedNormalized = normalizeOutput(tc.expectedOutput);

      const passed =
        result.status?.id === 3 &&
        actualNormalized === expectedNormalized;

      if (passed) passedCount++;

      testResults.push({
        testCaseIndex: i + 1,
        input: tc.isHidden ? 'Hidden Test Case' : tc.input,
        expectedOutput: tc.isHidden ? 'Hidden' : tc.expectedOutput,
        actualOutput: tc.isHidden
          ? (passed ? 'Matched' : 'Mismatch')
          : (actualOutput || 'No output'),
        passed,
        isHidden: tc.isHidden,
        error: result.stderr || (result.status?.id !== 3 ? result.status?.description : null),
        time: result.time,
      });

      if (!passed && tc.isHidden) {
        break;
      }
    }

    let verdict = 'Accepted';
    let isPassed = false;

    if (compileErrorEncountered) {
      verdict = 'Compile Error';
      isPassed = false;
    } else {
      isPassed = passedCount === allTestCases.length;
      verdict = isPassed ? 'Accepted' : 'Wrong Answer';
    }

    if (userId) {
      await Submission.create({
        userId,
        problemId: problem._id,
        problemSlug: problem.slug,
        language,
        code,
        verdict,
        passed: isPassed,
        passedTestCases: compileErrorEncountered ? 0 : passedCount,
        totalTestCases: allTestCases.length,
        runtime: `${totalTime.toFixed(3)}s`,
      });
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

    return res.status(200).json({
      verdict,
      passed: isPassed,
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

/**
 * @desc    Get user submission history and stats
 * @route   GET /api/code/submissions
 * @access  Private
 */
export const getUserSubmissions = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const submissions = await Submission.find({ userId })
      .populate('problemId', 'title slug difficulty category')
      .sort({ createdAt: -1 })
      .limit(50);

    const totalSubmissions = await Submission.countDocuments({ userId });
    const acceptedSubmissions = await Submission.countDocuments({ userId, passed: true });

    const solvedProblems = await Submission.distinct('problemId', {
      userId,
      passed: true,
    });

    res.status(200).json({
      totalSubmissions,
      acceptedSubmissions,
      problemsSolvedCount: solvedProblems.length,
      submissions,
    });
  } catch (error) {
    next(error);
  }
};