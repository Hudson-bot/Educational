import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (import.meta.env.MODE === 'development') {
      console.log('Making request to:', config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.MODE === 'development') {
      console.log('Response from:', response.config.url, response.data);
    }
    return response;
  },
  (error) => {
    const errorDetails = {
      config: {
        url: error.config?.url,
        method: error.config?.method,
      },
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    };

    console.error('API Error:', errorDetails);

    // Enhanced error handling
    if (error.code === 'ECONNABORTED') {
      error.response = { 
        data: { 
          message: 'Request timeout - the server took too long to respond',
          code: 'TIMEOUT_ERROR'
        } 
      };
    }
    else if (!error.response) {
      error.response = {
        data: {
          message: 'Network error - please check your internet connection',
          code: 'NETWORK_ERROR'
        }
      };
    }
    else if (error.response.status === 404) {
      error.response.data = {
        ...error.response.data,
        message: 'Endpoint not found - please check the API URL',
        code: 'ENDPOINT_NOT_FOUND'
      };
    }

    // Add specific handling for auth errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken'); // Clear invalid token
      error.response.data = {
        ...error.response.data,
        message: 'Authentication expired - please login again',
        code: 'AUTH_EXPIRED'
      };
    }
    else if (error.response?.status === 403) {
      error.response.data = {
        ...error.response.data,
        message: 'Access forbidden - insufficient permissions',
        code: 'AUTH_FORBIDDEN'
      };
    }

    return Promise.reject(error);
  }
);

export default api;