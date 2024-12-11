import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        const user = await authService.getCurrentUser();
        if (user) {
          setUser(user);
        } else {
          navigate('/signin', { state: { from: location.pathname } });
        }
      }
    };

    checkAuth();
  }, [isAuthenticated, setUser, navigate, location]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}