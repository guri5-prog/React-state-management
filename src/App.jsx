import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import { Box, Typography } from '@mui/material';

const Home = () => {
  const { user } = useAuth();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)', background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
      <Typography variant="h2" fontWeight="800" color="primary.main" gutterBottom>
        React SecureApp
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" sx={{ maxWidth: '600px' }}>
        A full-stack authentication system with JWT, Protected Routes, and Role-Based Access Control.
      </Typography>
      {user ? (
        <Typography variant="body1" mt={4} sx={{ p: 2, bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 2, color: '#2e7d32', fontWeight: 500 }}>
          You are logged in as {user.username}
        </Typography>
      ) : (
        <Typography variant="body1" mt={4} color="text.secondary">
          Please login or register to continue
        </Typography>
      )}
    </Box>
  );
};

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
