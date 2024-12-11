import axios from 'axios';
import { User } from '../types/auth';

const API_URL = 'http://localhost:5000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  private setAuthToken(token: string | null) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('auth_token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('auth_token');
    }
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      // For development/demo purposes
      if (process.env.NODE_ENV === 'development') {
        const mockUser: User = {
          id: '1',
          name: 'Demo User',
          email: credentials.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const mockToken = 'mock-jwt-token';
        
        this.setAuthToken(mockToken);
        return { user: mockUser, token: mockToken };
      }

      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { user, token } = response.data;
      this.setAuthToken(token);
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async signup(data: SignupData): Promise<{ user: User; token: string }> {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, data);
      const { user, token } = response.data;
      this.setAuthToken(token);
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  }

  async logout(): Promise<void> {
    this.setAuthToken(null);
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return null;

      this.setAuthToken(token);
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data.user;
    } catch (error) {
      this.setAuthToken(null);
      return null;
    }
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await axios.put(`${API_URL}/auth/profile`, data);
      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  }
}

export const authService = new AuthService();