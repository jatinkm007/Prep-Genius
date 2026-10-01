import api from './axios';

/**
 * Execute code snippet via the backend runner (Ad-hoc run)
 * @param {string} language - 'cpp' | 'python' | 'javascript'
 * @param {string} code - Source code string
 * @param {string} stdin - Optional standard input string
 */
export const runCodeSnippet = async (language, code, stdin = '') => {
  const response = await api.post('/code/run', {
    language,
    code,
    stdin,
  });
  return response.data;
};

/**
 * Submit code solution against problem test cases
 * @param {Object} payload - { problemId, slug, language, code }
 */
export const submitCodeSolution = async ({ problemId, slug, language, code }) => {
  const response = await api.post('/code/submit', {
    problemId,
    slug,
    language,
    code,
  });
  return response.data;
};