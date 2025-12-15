import { useState, type JSX } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = (): JSX.Element => {
  const auth = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!email || !phone || !password) { setError('All fields are required'); return; }
    setLoading(true); setError(null);
    try {
      await auth.register(email, password, phone);
      nav('/'); // after register go home
    } catch (e: any) {
      setError(e?.response?.data ?? e?.message ?? 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Register (Customer)</Typography>
      <TextField label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <TextField label="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" onClick={submit} disabled={loading}>Register</Button>
    </Box>
  );
};

export default RegisterPage;
