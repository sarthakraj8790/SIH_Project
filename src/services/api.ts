import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const suspiciousTransactionsApi = {
  getAll: () => api.get('/suspicious-transactions'),
  getById: (id: string) => api.get(`/suspicious-transactions/${id}`),
  create: (data: any) => api.post('/suspicious-transactions', data)
};

export const authApi = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  signup: (data: { name: string; email: string; password: string }) => 
    api.post('/auth/signup', data),
  me: () => api.get('/auth/me')
};

export default api;