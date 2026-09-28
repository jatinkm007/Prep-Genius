import { runCodeOnPiston } from '../services/piston.service.js';
import { normalizeLanguage } from '../config/languages.js';

export const executeCode = async (req, res) => {
  try {
    const { language, code, stdin = '' } = req.body;

    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Source code cannot be empty.',
      });
    }

    if (!language || !normalizeLanguage(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or unsupported programming language specified.',
      });
    }

    // Guard against excessive payload sizes
    if (code.length > 50000) {
      return res.status(413).json({
        success: false,
        message: 'Code payload exceeds the maximum limit (50 KB).',
      });
    }

    const result = await runCodeOnPiston({ language, code, stdin });

    const compileStep = result.compile;
    const runStep = result.run;

    // Check for compilation failures (C++, Java)
    if (compileStep && compileStep.code !== 0) {
      return res.status(200).json({
        success: false,
        status: 'Compilation Error',
        compileOutput: compileStep.stderr || compileStep.output,
        stdout: '',
        stderr: compileStep.stderr || compileStep.output,
        exitCode: compileStep.code,
        signal: compileStep.signal,
      });
    }

    // Check for execution timeouts or memory kills
    const isTimeout = runStep.signal === 'SIGKILL' || runStep.signal === 'SIGTERM';
    if (isTimeout) {
      return res.status(200).json({
        success: false,
        status: 'Time Limit Exceeded',
        stdout: runStep.stdout,
        stderr: 'Process terminated: execution time or memory limit exceeded.',
        exitCode: runStep.code,
        signal: runStep.signal,
      });
    }

    // Check for runtime exceptions
    const isRuntimeError = runStep.code !== 0;

    return res.status(200).json({
      success: !isRuntimeError,
      status: isRuntimeError ? 'Runtime Error' : 'Success',
      stdout: runStep.stdout || '',
      stderr: runStep.stderr || '',
      output: runStep.output || '',
      exitCode: runStep.code,
      signal: runStep.signal,
    });
  } catch (error) {
    console.error('[Execution Controller Error]:', error.message);

    if (error.response?.data?.message) {
      return res.status(502).json({
        success: false,
        message: `Execution engine error: ${error.response.data.message}`,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error while executing code.',
    });
  }
};