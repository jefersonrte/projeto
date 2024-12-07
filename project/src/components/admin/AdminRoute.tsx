import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/chat" replace />;
  }

  return <>{children}</>;
};