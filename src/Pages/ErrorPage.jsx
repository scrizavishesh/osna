import { Button } from '@mui/material';
import { Container, Grid } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
        <Grid item>
          <img src="./404-error/cuate.svg" alt="404-error not found" width={450} />
        </Grid>
        <Grid item>
          <Button
            to={`/`}
            component={Link}
            variant="contained"
            sx={{
              textTransform: 'none',
              padding: '5px 15px',
              fontSize: '14px',
              backgroundColor: '#FA8232',
              color: '#FFFFFF',
            }}
          >
            Go Home
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
