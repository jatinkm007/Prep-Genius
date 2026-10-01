import api from './axios';

export const fetchAllProblems = async () => {
  const response = await api.get('/problems');
  return response.data;
};

export const fetchProblemBySlug = async (slug) => {
  const response = await api.get(`/problems/${slug}`);
  return response.data;
};