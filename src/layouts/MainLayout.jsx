import { Box, Container } from '@mui/material';
import Header from '../components/Header';
export default function MainLayout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', background: 'transparent' }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 3 }}>{children}</Container>
    </Box>
  );
}
