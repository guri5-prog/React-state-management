import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" elevation={0} sx={{ 
        background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', flexGrow: 1 }}>
            <ShieldCheck style={{ marginRight: '8px' }} />
            <Typography variant="h6" noWrap sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
              SecureApp
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/dashboard" sx={{ textTransform: 'none', fontWeight: 500 }}>
                  Dashboard
                </Button>
                {user.role === 'admin' && (
                  <Button color="secondary" variant="contained" component={Link} to="/admin" sx={{ textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}>
                    Admin Panel
                  </Button>
                )}
                <Button color="inherit" onClick={handleLogout} sx={{ textTransform: 'none', fontWeight: 500, bgcolor: 'rgba(255,255,255,0.1)' }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login" sx={{ textTransform: 'none', fontWeight: 500 }}>
                  Login
                </Button>
                <Button color="secondary" variant="contained" component={Link} to="/register" sx={{ textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
