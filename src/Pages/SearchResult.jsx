import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Card, Typography, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Search } from '../Utils/Apis';

const SearchResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search_term = searchParams.get('search_term');
  const [events, setEvents] = useState([]);


  useEffect(() => {
    if (search_term) {
      fetchSearchResults(search_term);
    }
  }, [search_term]);


  const fetchSearchResults = async (terms) => {
    try {
      const response = await Search(terms);
      if (response?.status === 200) {
        setEvents(response?.data?.data?.data);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (err) {
      console.error(err?.message);
    }
  };

  return (
    <>
      <Grid sx={{ background: '#FAFAFA', py: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} mb={5}>
            {/* Title */}
            <Grid item xs={12} sx={{ p: 2 }}>
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '32px',
                  textAlign: 'left',
                  color: '#0462B6',
                  mb: 3,
                }}
              >
                Search Products
              </Typography>
            </Grid>

            {/* Cards */}
            {/* Cards */}
            {events.length > 0 ? (
              events.map((item, index) => (
                <Grid
                  item
                  mt={5}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2.4} // Responsive card sizes
                  key={index}
                  display="flex"
                  justifyContent="center"
                >
                  <Card
                    sx={{
                      width: '100%',
                      border: '1px solid #E4E7E9',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 2,
                      height: '100%',
                      mb: 2,
                    }}
                  >
                    <Box sx={{ width: '100%', height: 'auto', mb: 2 }}>
                      <img
                        src="./first_main.svg" // Adjust according to actual data
                        alt="Product Image"
                        style={{ width: '100%', objectFit: 'cover', height: 'auto' }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '20px',
                        textAlign: 'center',
                        color: '#191C1F',
                        mb: 2,
                      }}
                    >
                      {item?.product_name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {item.short_description}
                    </Typography>
                    <Button
                      to={`/products_Detail/${item.id}`}
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
                      View All
                    </Button>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  textAlign: 'center',
                  color: '#191C1F',
                  mb: 2,
                }}
              >
                Product not found
              </Typography>
            )}
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default SearchResult;
