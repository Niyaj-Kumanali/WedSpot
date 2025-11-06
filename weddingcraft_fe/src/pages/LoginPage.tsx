import { useState, useContext, type JSX } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from '../contexts/SnackbarContext';

const LoginPage = (): JSX.Element => {
  const auth = useContext(AuthContext);
  const nav = useNavigate();
  const { state } = useLocation() as { state?: { from?: Location } };
  const snack = useSnackbar();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
      await auth?.login(email, password);
      snack.success('Logged in successfully');
      const to = (state?.from as any)?.pathname ?? '/';
      nav(to);
    } catch (e: any) {
      const msg = e?.response?.data || e?.message || 'Login failed';
      snack.error(String(msg));
    }
  };

  return (
    <Box sx={{ maxWidth: 420, margin: '40px auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Login</Typography>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={submit}>Login</Button>
    </Box>
  );
};

export default LoginPage;
