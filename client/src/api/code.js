import api from './axios';

/**
 * Execute code snippet (LeetCode style Test Case Run)
 */
export const runCodeSnippet = async (language, code, options = {}) => {
  const response = await api.post('/code/run', {
    language,
    code,
    stdin: options?.stdin || '',
    problemId: options?.problemId,
    slug: options?.slug,
  });
  return response.data;
};

/**
 * Submit code solution against all problem test cases
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

/**
 * Fetch candidate's submission history and stats
 */
export const fetchUserSubmissions = async () => {
  const response = await api.get('/code/submissions');
  return response.data;
};