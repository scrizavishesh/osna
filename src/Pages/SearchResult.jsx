import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Card, Typography, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Search } from '../Utils/Apis';
import Loader from '../Layouts/Loader';

const SearchResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search_term = searchParams.get('search_term');
  const [events, setEvents] = useState([]);
  const [LoaderState, setLoaderState] = useState(false);
  const baseUrl = 'https://dc.damio.in/';


  useEffect(() => {
    if (search_term) {
      fetchSearchResults(search_term);
    }
  }, [search_term]);


  const fetchSearchResults = async (terms) => {
    setLoaderState(true);
    try {
      const response = await Search(terms);
      if (response?.status === 200) {
        setLoaderState(false);
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
    {LoaderState && (
                <Loader />
            )
            }
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

            <Grid container spacing={2} mb={4}>
              {events.length > 0 ? (
                events.map((item, index) => (
                  <Grid
                    item
                    xs={12} sm={6} md={3} lg={3} mb={4}
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
                        justifyContent: 'space-between',
                        p: 2,
                        height: '100%',
                      }}
                    >
                      <Box sx={{
                        width: '100%', height: 'auto', mb: 2, overflow: 'hidden',
                        '&:hover img': {
                          transform: 'scale(1.1)',
                        },
                      }}>
                        <Link to={`/products_Detail/${item.id}`}>
                          <img
                            src={`${baseUrl}${item?.product_image}`}
                            alt="Product Image"
                            style={{
                              width: '100%', objectFit: 'cover', height: '150px', transition: 'transform 0.3s ease',
                            }}
                          />
                        </Link>
                      </Box>

                      <Box sx={{ flexGrow: 1, textAlign: 'center', mb: 1 }}>
                        <Typography
                          sx={{
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '20px',
                            color: "#191C1F",
                            mb: 2,
                          }}
                        >
                          {item?.product_name}
                        </Typography>
                        <Typography variant="body2">
                          {item?.short_description?.length > 150
                            ? `${item.short_description?.slice(0, 150)}...`
                            : item?.short_description}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 1,
                        }}
                      >
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
                          View
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" sx={{ color: 'red', mt: 2 }}>
                  No product available at the moment.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default SearchResult;
