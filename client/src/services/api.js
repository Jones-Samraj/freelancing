import axios from 'axios';
import { siteConfig } from '../config/siteConfig';

const api = axios.create({
  baseURL: siteConfig.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('wf_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors smoothly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 Unauthorized, clear stale token
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
        localStorage.removeItem('wf_token');
        localStorage.removeItem('wf_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
