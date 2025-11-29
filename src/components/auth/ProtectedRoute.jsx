import React from 'react';
import { useAuth } from '../../hooks';
import LoginPage from './LoginPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-white/20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading your Zen experience...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return typeof children === 'function' ? children({ user }) : children;
};

export default ProtectedRoute;