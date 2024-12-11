import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { LoginCredentials, SignupData } from '../services/authService';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: storeLogin, logout: storeLogout } = useAuthStore();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await storeLogin(credentials.email, credentials.password);
      
      if (result.success) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        throw new Error('Login failed');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, [navigate, storeLogin]);

  const logout = useCallback(() => {
    storeLogout();
    navigate('/');
    toast.success('Logged out successfully');
  }, [navigate, storeLogout]);

  return {
    isLoading,
    error,
    login,
    logout,
  };
}