import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box, Card, CardMedia, CardContent } from '@mui/material';
import YouTube from 'react-youtube';
import Header from '../Layouts/Header';
import Navbar from '../Layouts/Navbar';
import { Container } from '@mui/system';
import Footer from '../Layouts/Footer';
import { Link, useLocation } from 'react-router-dom';
import { getCategoryDetails } from '../Utils/Apis';

const Sub_ProductDetails = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category_name = searchParams.get('category_name');

    const [category, setCategory] = useState([]);
    const [description, setDescription] = useState('');
    const [subCategoryDetails, setsubCategoryDetails] = useState([])

    const baseUrl = 'https://dc.damio.in/';

    useEffect(() => {
        if (category_name) {
            fetchCategory(category_name);
        }
    }, [category_name]);

    const fetchCategory = async (terms) => {
        try {
            const response = await getCategoryDetails(terms);
            if (response?.status === 200) {
                setCategory(response?.data?.data?.category_details);
                setDescription(response?.data?.data?.category_details?.category_description);
                setsubCategoryDetails(response?.data?.data?.category_product);

            } else {
                console.error('Failed to fetch categories');
            }
        } catch (err) {
            console.error(err?.message);
        }
    };


    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ padding: '2rem' }}>
                    {/* First Container: Category details */}
                    <Grid container spacing={2} sx={{ marginBottom: '4rem' }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" color="primary">
                                {category?.category_name}
                            </Typography>
                            <Typography variant="h5" sx={{ marginTop: '1rem' }}>
                                {category?.type_parent}
                            </Typography>
                            <Typography>
                                <div
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            </Typography>
                            <Button
                                component={Link}
                                to="/products_Detail"
                                variant="contained" color="warning" sx={{ marginTop: '2rem' }}>
                                VISOR® Product Overview
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ boxShadow: 'none', border: 'none' }}>
                                <CardMedia
                                    component="img"
                                    image={baseUrl + category?.category_image}
                                    alt="Product Image"
                                    sx={{ height: 250, objectFit: 'contain' }}
                                />
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Second Container: Description and YouTube Video */}
                    <Grid container spacing={2} sx={{ marginBottom: '4rem' }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" color="primary">
                                HARDWARE + SOFTWARE = VISOR®
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                                With our portfolio of vision sensors, we cover a wide spectrum of industrial image processing. A high-performance
                                smart camera fitted in a compact and lightweight housing forms the heart of our VISOR® vision sensors.
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                                The hardware is optimized by the VISOR® software, which enables the set-up of applications in a few simple steps and
                                the adjustment of process parameters.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <YouTube videoId="R1L7ftv2qhw" opts={{ height: '250', width: '100%' }} />
                        </Grid>
                    </Grid>

                    {/* Third Container: Related Product Details */}
                    <Typography variant="h5" color="primary" align="center" sx={{ marginBottom: '2rem' }}>
                        The OSNA Family Offers the Right Product for Every Application
                    </Typography>

                    <Grid container spacing={2}>
                        {subCategoryDetails.map((subCategory) => (
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <CardMedia
                                            component="img"
                                            image={baseUrl + subCategory?.product_image} // Replace with product image
                                            alt="Product Image"
                                            sx={{ height: "100%", objectFit: 'contain' }}
                                        />
                                        <Typography variant="h6">{subCategory?.sub_category}</Typography>
                                        <Typography variant="body2">
                                            {subCategory?.short_description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>

    );
};

export default Sub_ProductDetails;

