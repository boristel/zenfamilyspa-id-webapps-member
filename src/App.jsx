import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './components/auth/RequireAuth';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { HomePage } from './pages/HomePage';
import { HistoryPage } from './pages/HistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterForm } from './features/auth/RegisterForm';
import { SetupPinPage } from './pages/SetupPinPage';
import { VerifyPinPage } from './pages/VerifyPinPage';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zen-sand via-white to-spa-50 p-4">
          <RegisterForm />
        </div>
      } />

      {/* PIN setup and verification routes */}
      <Route path="/setup-pin" element={<SetupPinPage />} />
      <Route path="/verify-pin" element={<VerifyPinPage />} />

      {/* Protected routes */}
      <Route path="/" element={
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      }>
        <Route index element={<HomePage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;