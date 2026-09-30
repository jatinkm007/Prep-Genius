import api from './axios';

export const sendTutorMessage = async (message, sessionId = null, topic = 'General Technical') => {
  const response = await api.post('/tutor/chat', {
    message,
    sessionId,
    topic,
  });
  return response.data;
};

export const fetchUserSessions = async () => {
  const response = await api.get('/tutor/sessions');
  return response.data;
};

export const fetchSessionById = async (sessionId) => {
  const response = await api.get(`/tutor/sessions/${sessionId}`);
  return response.data;
};

export const deleteUserSession = async (sessionId) => {
  const response = await api.delete(`/tutor/sessions/${sessionId}`);
  return response.data;
};