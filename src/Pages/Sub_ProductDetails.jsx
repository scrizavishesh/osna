import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box, Card, CardMedia, CardContent } from '@mui/material';
import { Container } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';
import { getCategoryDetails } from '../Utils/Apis';
import YouTube from 'react-youtube';
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const Sub_ProductDetails = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category_name = searchParams.get('category_id');

    const [category, setCategory] = useState([]);
    const [description, setDescription] = useState('');
    const [subCategoryDetails, setSubCategoryDetails] = useState([]);

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
                const data = response?.data?.data;
                setCategory(data?.category_details);
                setDescription(data?.category_details?.category_description);
                setSubCategoryDetails(data?.category_product);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (err) {
            console.error(err?.message);
        }
    };

    useEffect(() => {
        // Initialize Fancybox once component is rendered and DOM is ready
        NativeFancybox.bind("[data-fancybox='gallery']", {});
        return () => {
            NativeFancybox.destroy();
        };
    }, [category, subCategoryDetails]);

    const openFancybox = (src, title) => {
        NativeFancybox.show([{ src, caption: title }]);
    };

    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ padding: '2rem' }}>
                    {/* First Container: Category details */}
                    <Grid container spacing={4} sx={{ marginBottom: '4rem' }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" color="primary">
                                {category?.category_name}
                            </Typography>
                            <Typography variant="h5" sx={{ marginTop: '1rem', fontStyle: 'italic' }}>
                                {category?.type_parent}
                            </Typography>
                            <Typography sx={{ marginTop: '1rem' }}>
                                <div
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            </Typography>
                            <Button
                                component={Link}
                                to="/products"
                                state={{ id: category?.id}} 
                                variant="contained"
                                color="warning"
                                sx={{ marginTop: '2rem' }}
                            >
                                Product Overview
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src={baseUrl + category?.category_image}
                                alt="Main Product"
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                    borderRadius: 2,
                                    cursor: "pointer",
                                }}
                                onClick={() => openFancybox(baseUrl + category?.category_image, category?.category_name)}
                                data-fancybox="gallery"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default Sub_ProductDetails;
