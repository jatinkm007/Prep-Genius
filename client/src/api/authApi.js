import api from './axios';

export const loginRequest = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const registerRequest = async (formData) => {
  const { data } = await api.post('/auth/register', formData);
  return data;
};

export const fetchMeRequest = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};
