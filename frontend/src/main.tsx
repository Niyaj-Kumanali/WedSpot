import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from './contexts/Auth/AuthProvider';
import { UserProvider } from './contexts/User/UserProvider';
import { SnackbarProvider } from './contexts/SnackbarContext';
import theme from './theme';
import './styles/globals.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';
import { store } from './store';

import { CartProvider } from './contexts/CartContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <AuthProvider>
            <SnackbarProvider>
              <CartProvider>
                <RouterProvider router={router} />
              </CartProvider>
            </SnackbarProvider>
          </AuthProvider>
        </UserProvider>
      </ThemeProvider>
    </Provider>

  </React.StrictMode>
);
