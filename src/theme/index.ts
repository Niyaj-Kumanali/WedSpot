// src/theme/index.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#7c3aed' },         // blush pink (CTA)
    secondary: { main: '#7c3aed' },       // purple accent
    success: { main: '#22c55e' },
    warning: { main: '#f59e0b' },
    error:   { main: '#ef4444' },
    info:    { main: '#0ea5e9' },
    background: { default: '#ffffff' }
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: `Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"`,
    fontWeightMedium: 600,
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: 'none'
        },
        contained: {
          boxShadow: '0px 3px 3px #2f3f5359'
        }
      },
      // Custom variants you can reuse across the app
      variants: [
        {
          // Blush CTA (exactly like your screenshot)
          props: { variant: 'cta' as any },
          style: {
            backgroundColor: '#ff7f88',
            color: '#fff',
            padding: '8px 22px',
            borderRadius: 12,
            fontWeight: 600,
            boxShadow: '0px 3px 10px rgba(255,120,136,0.40)',
            ':hover': { backgroundColor: '#ff6773' }
          }
        },
        {
          // Subtle gray “ghost” button
          props: { variant: 'ghost' as any },
          style: {
            backgroundColor: '#f1f5f9',
            color: '#0f172a',
            padding: '8px 18px',
            borderRadius: 12,
            ':hover': { backgroundColor: '#e2e8f0' }
          }
        }
      ]
    }
  }
});

theme = responsiveFontSizes(theme);
export default theme;
