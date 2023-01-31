import { Container, Typography, Button } from '@mui/material';
import type { NextPage } from 'next';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        minHeight: '90vh',
      }}
    >
      <Typography variant="h2">Backbone Challenge</Typography>

      <Link href="/contacts">
        <Button
          variant="text"
          size="large"
          startIcon={<TurnLeftIcon sx={{ rotate: '180deg' }} />}
        >
          Contact List
        </Button>
      </Link>
    </Container>
  );
};

export default Home;
