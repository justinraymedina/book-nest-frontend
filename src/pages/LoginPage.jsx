import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const handleLogin = () => {
    if (form.email && form.password) {
      localStorage.setItem('booknest_user', JSON.stringify({ email: form.email }));
      navigate('/');
    }
  };
  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: '16px', border: '1px solid #eee' }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>Welcome back</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Login to BookNest</Typography>
        <TextField fullWidth label="Email" sx={{ mb: 2 }} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <TextField fullWidth label="Password" type="password" sx={{ mb: 3 }} value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <Button fullWidth variant="contained" onClick={handleLogin} sx={{ background: '#111827', height: 44, borderRadius: '10px', textTransform: 'none' }}>Login</Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>No account? <Link to="/register" style={{ fontWeight: 700, color: '#111' }}>Register</Link></Typography>
      </Paper>
    </Box>
  );
}