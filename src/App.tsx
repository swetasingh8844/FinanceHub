import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Users from './pages/Users';
import Login from './pages/Login';

const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: 'admin' | 'analyst' | 'viewer' }> = ({ children, requiredRole = 'viewer' }) => {
  const { user, profile, loading, isAdmin, isAnalyst, isViewer } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (profile?.status === 'inactive') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-6 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-neutral-900">Account Inactive</h1>
          <p className="text-neutral-500">Your account has been deactivated. Please contact an administrator.</p>
        </div>
      </div>
    );
  }

  // Role checks
  if (requiredRole === 'admin' && !isAdmin) return <Navigate to="/" />;
  if (requiredRole === 'analyst' && !isAnalyst) return <Navigate to="/" />;
  if (requiredRole === 'viewer' && !isViewer) return <Navigate to="/" />;

  return <Layout>{children}</Layout>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/transactions" 
        element={
          <ProtectedRoute requiredRole="analyst">
            <Transactions />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute requiredRole="admin">
            <Users />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
