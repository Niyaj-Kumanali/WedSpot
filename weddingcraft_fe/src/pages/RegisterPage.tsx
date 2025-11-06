import { useState, useContext, type JSX } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = (): JSX.Element => {
  const auth = useContext(AuthContext);
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async () => {
    try {
      await auth?.register(email, password);
      nav('/');
    } catch (e: any) {
      setErr(e?.response?.data || e.message || 'Registration failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 420, margin: '40px auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Register</Typography>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {err && <Typography color="error">{err}</Typography>}
      <Button variant="contained" onClick={submit}>
        Register
      </Button>
    </Box>
  );
};

export default RegisterPage;
