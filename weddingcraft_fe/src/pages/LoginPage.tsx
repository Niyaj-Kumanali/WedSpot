import { useState, type JSX } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = (): JSX.Element => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);

  const submit = async () => {
    try {
      await auth.login(email, password);
      navigate('/');
    } catch (e: any) {
      setErr(e?.response?.data ?? 'Login failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Login</Typography>
      <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      {err && <Typography color="error">{err}</Typography>}
      <Button variant="contained" onClick={submit}>Login</Button>
    </Box>
  );
};

export default LoginPage;
