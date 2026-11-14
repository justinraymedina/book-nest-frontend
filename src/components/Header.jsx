import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('booknest_user') || 'null');
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('booknest_user'); navigate('/login'); };

  return (
    <AppBar position="sticky" elevation={0} sx={{ background: 'white', borderBottom: '1px solid #eee', color: '#111' }}>
      <Toolbar sx={{ maxWidth: '1200px', width: '100%', mx: 'auto' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 900 }} component={Link} to="/" style={{ textDecoration: 'none', color: '#111' }}>
          ● BookNest
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button component={Link} to="/" sx={{ color: '#111', textTransform: 'none', fontWeight: 600 }}>Catalog</Button>
          {user ? (
            <>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mr: 1 }}>{user.email}</Typography>
              <Button onClick={logout} variant="outlined" sx={{ textTransform: 'none', borderRadius: '8px', height: 36 }}>Logout</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" sx={{ color: '#111', textTransform: 'none' }}>Login</Button>
              <Button component={Link} to="/register" variant="contained" sx={{ background: '#111', borderRadius: '8px', textTransform: 'none', height: 36 }}>Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}