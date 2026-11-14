import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const handleRegister = () => {
    if (form.email && form.password && form.name) {
      localStorage.setItem('booknest_user', JSON.stringify({ name: form.name, email: form.email }));
      navigate('/');
    }
  };
  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: '16px', border: '1px solid #eee' }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>Create account</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Join BookNest</Typography>
        <TextField fullWidth label="Full Name" sx={{ mb: 2 }} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <TextField fullWidth label="Email" sx={{ mb: 2 }} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <TextField fullWidth label="Password" type="password" sx={{ mb: 3 }} value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <Button fullWidth variant="contained" onClick={handleRegister} sx={{ background: '#111827', height: 44, borderRadius: '10px', textTransform: 'none' }}>Register</Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>Have account? <Link to="/login" style={{ fontWeight: 700, color: '#111' }}>Login</Link></Typography>
      </Paper>
    </Box>
  );
}