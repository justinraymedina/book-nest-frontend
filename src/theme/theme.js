import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#667eea' },
    secondary: { main: '#764ba2' },
    background: { default: '#f5f3ff', paper: '#ffffff' },
    text: { primary: '#111827' }
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f5f3ff',
          backgroundImage: 'radial-gradient(at 20% 30%, #e9d5ff 0px, transparent 50%), radial-gradient(at 80% 70%, #c7d2fe 0px, transparent 50%)',
          minHeight: '100vh'
        }
      }
    }
  }
});

export default theme;