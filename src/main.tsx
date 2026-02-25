import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
<<<<<<< HEAD
<<<<<<< HEAD
import { AuthProvider } from './contexts/Auth/AuthProvider';
=======
import { AuthProvider } from './contexts/AuthContext';
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
import { AuthProvider } from './contexts/Auth/AuthProvider';
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
import { SnackbarProvider } from './contexts/SnackbarContext';
import theme from './theme';
import './styles/globals.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
<<<<<<< HEAD
<<<<<<< HEAD
import { Provider } from 'react-redux';
import { store } from './store';
=======
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
import { Provider } from 'react-redux';
import { store } from './store';
>>>>>>> ea81db0 (added cart and graphs)

<<<<<<< HEAD
import { CartProvider } from './contexts/CartContext';

=======
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ea81db0 (added cart and graphs)
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <SnackbarProvider>
<<<<<<< HEAD
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
=======
            <RouterProvider router={router} />
>>>>>>> ea81db0 (added cart and graphs)
          </SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
<<<<<<< HEAD
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
=======
>>>>>>> ea81db0 (added cart and graphs)
  </React.StrictMode>
<<<<<<< HEAD
);
=======
);
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
