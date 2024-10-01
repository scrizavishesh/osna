import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Box, Button, Typography, Container } from "@mui/material";
import Header from "../Layouts/Header";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import YouTube from "react-youtube";
import { getSingleProduct } from '../Utils/Apis';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ProductDetail = () => {

    const baseUrl = 'https://dc.damio.in/';

    // State for main image
    const [mainImage, setMainImage] = useState([]);
    const [product, setProduct] = useState({});
    const [productDescription, setProductDescription] = useState('');

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchProductResults(id);
        }
    }, [id]);

    const fetchProductResults = async (terms) => {
        try {
            const response = await getSingleProduct(terms);
            console.log(response)
            if (response?.status === 200) {
                const productData = response?.data?.data;
                setProduct(productData);
                setProductDescription(productData.product_description || "");
                setMainImage(productData?.product_image );  // Use the first image as the main image
            } else {
                console.error('Failed to fetch product details');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <Grid sx={{ bgcolor: '#0462B6' }}>
                <Header />
            </Grid>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ p: 3 }}>
                    {/* First Section: Image & Product Details */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box>
                                {/* Main Product Image */}
                                <Box
                                    component="img"
                                    src={ baseUrl + mainImage[0]?.image}
                                    alt="Main Product"
                                    sx={{ width: "100%", borderRadius: 2 }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", mt: 2 }}>
                                {/* Product Carousel */}
                                {mainImage.map((image, index) => (
                                    <Box
                                        key={index}
                                        component="img"
                                        src={baseUrl + image?.image}
                                        alt={`Product ${index + 1}`}
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            mx: 1,
                                            cursor: "pointer",
                                            border: mainImage === image ? '2px solid orange' : 'none'
                                        }}
                                        onClick={() => setMainImage(image)}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        {/* Product Name and Description */}
                        <Grid item xs={12} md={6}>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 600,
                                    lineHeight: '28px',
                                    textAlign: 'left',
                                    color: '#0462b6',
                                    mb: 1,
                                }}
                            >
                                {product?.product_name || "Product Name"}
                            </Typography>
                            <Grid sx={{ display: "flex" }}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        lineHeight: '20px',
                                        textAlign: 'left',
                                        color: '#5f6c72',
                                        mb: 1,
                                    }}
                                >
                                    Category name :
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        lineHeight: '20px',
                                        textAlign: 'left',
                                        color: '#191c1f',
                                        mb: 1,
                                    }}
                                >
                                    {' '} {product?.category_name || "Product Name"}
                                </Typography>
                            </Grid>

                            <Grid sx={{ display: "flex" }}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        lineHeight: '20px',
                                        textAlign: 'left',
                                        color: '#5f6c72',
                                        mb: 1,
                                    }}
                                >
                                    Sub Category :
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        lineHeight: '20px',
                                        textAlign: 'left',
                                        color: '#191c1f',
                                        mb: 1,
                                    }}
                                >
                                    {' '} {product?.sub_category || "Product Name"}
                                </Typography>
                            </Grid>
                            <Typography>
                                <div
                                    dangerouslySetInnerHTML={{ __html: productDescription }}
                                />
                            </Typography>
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    textTransform: 'none',
                                    padding: '10px 20px',
                                    fontSize: { xs: '14px', md: '16px' },
                                    backgroundColor: '#FA8232',
                                    color: '#FFFFFF',
                                }}
                            >
                                View All
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Second Section: Product Data & Videos */}
                    <Grid container spacing={3} sx={{ mt: 4 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="bold">Product Data</Typography>
                            <ul>
                                <li>Resolution: 2560 x 1936</li>
                                <li>Type: VISOR® Code Reader</li>
                                <li>Variant: Professional</li>
                                <li>Optics: Wide (integrated)</li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="bold">Product Videos</Typography>
                            <Box sx={{ mt: 2 }}>
                                <video width="100%" controls>
                                    <source src='https://dc.damio.in/assets/video/1727423588.Temperature%20transmitters%20_%20tasks,%20traits%20and%20technology%20_%20endresshauser.mp4' type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default ProductDetail;
