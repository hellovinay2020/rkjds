import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const getFullUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = API_URL.replace(/\/api\/?$/, '');
  return `${baseUrl}${path}`;
};

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.code === 'ECONNABORTED') {
      console.error('Request timed out. Please check your connection.');
    } else if (err.response?.status >= 500) {
      console.error('Server error. Please try again later.');
    }
    return Promise.reject(err);
  }
);

export default api;
