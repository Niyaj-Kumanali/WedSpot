<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from './contexts/Auth/AuthProvider';
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
        <AuthProvider>
          <SnackbarProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
=======
import React, { type JSX } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
import theme from './theme';
import './styles/globals.css';

const Root = (): JSX.Element => (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
>>>>>>> d720bde (Pushing the project to the repo)
