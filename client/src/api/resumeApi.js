import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/resume';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const analyzeResumeApi = async (file, targetRole) => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('targetRole', targetRole);

  const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeaders(),
    },
  });
  return response.data;
};

export const getResumeHistoryApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/history`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};