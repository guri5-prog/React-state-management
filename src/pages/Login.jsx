import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, Paper, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || "/dashboard";

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    try {
      const response = await axios.post('/api/auth/login', data);
      login(response.data);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 64px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Container maxWidth="xs">
        <Paper elevation={24} sx={{ 
          p: 5, 
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.4)'
        }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Box sx={{ 
              bgcolor: 'primary.main', 
              color: 'white', 
              p: 2, 
              borderRadius: '50%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              mb: 2,
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}>
              <LogIn size={32} />
            </Box>
            <Typography variant="h4" fontWeight="700" color="text.primary">
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Enter your credentials to access your account
            </Typography>
          </Box>

          {serverError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{serverError}</Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              {...register('username', { required: 'Username is required', minLength: { value: 3, message: 'Minimum 3 characters required' } })}
              error={!!errors.username}
              helperText={errors.username?.message}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters required' } })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ 
                mt: 4, 
                mb: 2, 
                py: 1.5, 
                borderRadius: 2,
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(0,118,255,0.23)'
                }
              }}
            >
              {loading ? <CircularProgress size={28} color="inherit" /> : 'Log In'}
            </Button>
          </form>
          
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account? <RouterLink to="/register" style={{ color: '#1976d2', fontWeight: 600, textDecoration: 'none' }}>Sign Up</RouterLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
