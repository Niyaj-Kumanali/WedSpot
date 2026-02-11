import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
<<<<<<< HEAD
import { AuthProvider } from './contexts/Auth/AuthProvider';
=======
import { AuthProvider } from './contexts/AuthContext';
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
import { SnackbarProvider } from './contexts/SnackbarContext';
import theme from './theme';
import './styles/globals.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
<<<<<<< HEAD
import { Provider } from 'react-redux';
import { store } from './store';
=======
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)

import { CartProvider } from './contexts/CartContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
<<<<<<< HEAD
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <SnackbarProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
=======
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
  </React.StrictMode>
);