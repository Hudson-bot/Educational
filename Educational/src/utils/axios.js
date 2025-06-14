import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Changed from absolute to relative URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ response: { data: { message: 'Request timed out' } } });
    }
    if (!error.response) {
      return Promise.reject({ 
        response: { 
          data: { 
            message: 'Network error - please check your connection' 
          } 
        } 
      });
    }
    return Promise.reject(error);
  }
);

export default api;
