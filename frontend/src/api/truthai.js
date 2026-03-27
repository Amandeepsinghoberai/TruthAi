import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper to get auth header
export const getAuthHeader = async (getToken) => {
  const token = await getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Detection API
export const uploadForDetection = async (file, getToken) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const headers = await getAuthHeader(getToken);
  headers['Content-Type'] = 'multipart/form-data';
  
  const response = await api.post('/detect', formData, { headers });
  return response.data;
};

// History API
export const getHistory = async (getToken) => {
  const headers = await getAuthHeader(getToken);
  const response = await api.get('/history', { headers });
  return response.data;
};

export const deleteScan = async (scanId, getToken) => {
  const headers = await getAuthHeader(getToken);
  const response = await api.delete(`/history/${scanId}`, { headers });
  return response.data;
};

export const clearHistory = async (getToken) => {
  const headers = await getAuthHeader(getToken);
  const response = await api.delete('/history', { headers });
  return response.data;
};

// Survey API
export const submitSurvey = async (surveyData, getToken) => {
  const headers = await getAuthHeader(getToken);
  const response = await api.post('/survey', surveyData, { headers });
  return response.data;
};

export const checkSurveyStatus = async (getToken) => {
  const headers = await getAuthHeader(getToken);
  const response = await api.get('/survey/check', { headers });
  return response.data;
};

export default api;
