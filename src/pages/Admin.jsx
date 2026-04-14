import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { ShieldAlert } from 'lucide-react';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/data/admin/users');
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <ShieldAlert size={40} color="#d32f2f" style={{ marginRight: '16px' }} />
        <Typography variant="h3" fontWeight="bold" color="text.primary">
          Admin Dashboard
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" mb={3} fontWeight="600">
          User Management
        </Typography>
        
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.04)' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell>{user._id}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{user.username}</TableCell>
                    <TableCell>
                      <Box component="span" sx={{ 
                        px: 2, 
                        py: 0.5, 
                        borderRadius: 8, 
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        bgcolor: user.role === 'admin' ? 'rgba(211, 47, 47, 0.1)' : 'rgba(46, 125, 50, 0.1)',
                        color: user.role === 'admin' ? '#d32f2f' : '#2e7d32',
                        textTransform: 'uppercase'
                      }}>
                        {user.role}
                      </Box>
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && !loading && (
                   <TableRow>
                     <TableCell colSpan={4} align="center">No users found.</TableCell>
                   </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default Admin;
