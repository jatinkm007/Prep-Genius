import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth() || {};

  // Show a clean loading state while checking login status
  if (loading) {
    return (
      <div className="h-screen w-full bg-zinc-950 flex items-center justify-center text-zinc-400 text-sm font-sans">
        Checking session...
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}