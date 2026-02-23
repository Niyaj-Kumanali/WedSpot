import React, { createContext, useContext, useMemo, useState, useCallback, type JSX } from 'react';
import { Snackbar, Alert, type AlertColor } from '@mui/material';

type SnackbarContextType = {
  show: (message: string, severity?: AlertColor, durationMs?: number) => void;
  success: (message: string, durationMs?: number) => void;
  error: (message: string, durationMs?: number) => void;
  info: (message: string, durationMs?: number) => void;
  warning: (message: string, durationMs?: number) => void;
};

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');
<<<<<<< HEAD
<<<<<<< HEAD
  const [duration, setDuration] = useState(2000);

  const close = () => setOpen(false);

  const show = useCallback((message: string, sev: AlertColor = 'info', durationMs = 2000) => {
=======
  const [duration, setDuration] = useState(4000);

  const close = () => setOpen(false);

  const show = useCallback((message: string, sev: AlertColor = 'info', durationMs = 4000) => {
>>>>>>> d720bde (Pushing the project to the repo)
=======
  const [duration, setDuration] = useState(2000);

  const close = () => setOpen(false);

  const show = useCallback((message: string, sev: AlertColor = 'info', durationMs = 2000) => {
>>>>>>> ea81db0 (added cart and graphs)
    setMsg(message);
    setSeverity(sev);
    setDuration(durationMs);
    setOpen(true);
  }, []);

  const api = useMemo<SnackbarContextType>(() => ({
    show,
    success: (m, d) => show(m, 'success', d),
    error: (m, d) => show(m, 'error', d),
    info: (m, d) => show(m, 'info', d),
    warning: (m, d) => show(m, 'warning', d),
  }), [show]);

  return (
    <SnackbarContext.Provider value={api}>
      {children}
<<<<<<< HEAD
<<<<<<< HEAD
      <Snackbar open={open} autoHideDuration={duration} onClose={close} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} sx={{ mt: 10 }}>
        <Alert onClose={close} severity={severity} variant="filled" sx={{ width: '100%', color: 'white' }}>
=======
      <Snackbar open={open} autoHideDuration={duration} onClose={close} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={close} severity={severity} variant="filled" sx={{ width: '100%' }}>
>>>>>>> d720bde (Pushing the project to the repo)
=======
      <Snackbar open={open} autoHideDuration={duration} onClose={close} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} sx={{ mt: 10 }}>
        <Alert onClose={close} severity={severity} variant="filled" sx={{ width: '100%', color: 'white' }}>
>>>>>>> ea81db0 (added cart and graphs)
          {msg}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar must be used within SnackbarProvider');
  return ctx;
};
