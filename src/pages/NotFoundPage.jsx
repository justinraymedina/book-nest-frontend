import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Box sx={{ p: 5, textAlign: 'center' }}>
      <Typography variant="h3">404 - Not Found</Typography>
      <Typography sx={{ mt: 2 }}>The page you are looking for does not exist.</Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>Go Home</Button>
    </Box>
  );
}