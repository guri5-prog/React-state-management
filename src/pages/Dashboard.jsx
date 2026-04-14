import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/data/dashboard');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <LayoutDashboard size={40} color="#1976d2" style={{ marginRight: '16px' }} />
        <Typography variant="h3" fontWeight="bold" color="text.primary">
          User Dashboard
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4, borderLeft: '6px solid #1976d2' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Welcome, {user?.username} (Role: <Box component="span" sx={{ textTransform: 'capitalize', fontWeight: 'bold', color: user?.role === 'admin' ? '#d32f2f' : '#2e7d32' }}>{user?.role}</Box>)
        </Typography>
        
        {loading ? (
          <CircularProgress size={24} sx={{ mt: 2 }} />
        ) : (
          <Box mt={3} p={3} bgcolor="rgba(25, 118, 210, 0.05)" borderRadius={2}>
            <Typography variant="body1" fontSize="1.1rem">
              Message from Protected API: <strong>{message}</strong>
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard;
