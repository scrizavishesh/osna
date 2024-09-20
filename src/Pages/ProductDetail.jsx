import React, { useState } from "react";
import { Grid, Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Paper } from "@mui/material";
import Header from "../Layouts/Header";
import Navbar from "../Layouts/Navbar";
import { Container } from "@mui/system";
import Footer from "../Layouts/Footer";
import YouTube from "react-youtube";

const ProductDetail = () => {
    // State for main image
    const [mainImage, setMainImage] = useState("./Product_Main_Image.png");

    const productImages = [
        "./image_1.png",
        "./image_2.png",
        "./image_3.png",
        "./image_4.png",
        "./image_5.png",
    ];

    const matchingProducts = [
        {
            name: "FT 10-RL-60-PNSL-K4",
            sensor: "Distance sensor with triangulation",
            minDistance: 10,
            maxDistance: 70,
            lightSource: "Laser, red (Class 1)",
        },
        {
            name: "FT 10-RL-60-PNSL-K4",
            sensor: "Distance sensor with triangulation",
            minDistance: 10,
            maxDistance: 70,
            lightSource: "Laser, red (Class 1)",
        },
        {
            name: "FT 10-RL-60-PNSL-K4",
            sensor: "Distance sensor with triangulation",
            minDistance: 10,
            maxDistance: 70,
            lightSource: "Laser, red (Class 1)",
        },
        {
            name: "FT 10-RL-60-PNSL-K4",
            sensor: "Distance sensor with triangulation",
            minDistance: 10,
            maxDistance: 70,
            lightSource: "Laser, red (Class 1)",
        },
        // Add more products here
    ];

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
                                <Box component="img" src={mainImage} alt="Main Product" sx={{ width: "100%", borderRadius: 2 }} />
                            </Box>
                            <Box sx={{ display: "flex", mt: 2 }}>
                                {/* Product Carousel */}
                                {productImages.map((image, index) => (
                                    <Box
                                        key={index}
                                        component="img"
                                        src={image}
                                        alt={`Product ${index + 1}`}
                                        sx={{ width: 60, height: 60, mx: 1, cursor: "pointer", border: mainImage === image ? '2px solid orange' : 'none' }}
                                        onClick={() => setMainImage(image)}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        {/* Product Name and Description */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" fontWeight="bold">
                                VISOR® V50 Code Reader Professional
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Order code: V50-CR-P3-W-M2-L <br />
                                Product variant: V50-CR-P3-I-W-M2-L | Monochrome | LED, infrared
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                <strong>Description:</strong>
                                <ul>
                                    <li>Applications: Identification max. 255 jobs with 255 detectors...</li>
                                    <li>Barcoded reading for 1D bar codes...</li>
                                    <li>Pattern matching, contrast detection...</li>
                                </ul>
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                View Details
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
                            {/* Embed a video */}
                            <YouTube videoId="Js--R6WIBww" opts={{ height: '200', width: '100%' }} />
                          </Grid>
                    </Grid>

                    {/* Third Section: Products Match Your Search Criteria */}
                    <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
                        Products match your search criteria
                    </Typography>
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table>
                            <TableHead sx={{background: "#F2F4F5"}}>
                                <TableRow>
                                    <TableCell>PRODUCTS</TableCell>
                                    <TableCell>Sensor Principle</TableCell>
                                    <TableCell>Working Distance Min</TableCell>
                                    <TableCell>Working Distance Max</TableCell>
                                    <TableCell>Light Source</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {matchingProducts.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.sensor}</TableCell>
                                        <TableCell>{product.minDistance}</TableCell>
                                        <TableCell>{product.maxDistance}</TableCell>
                                        <TableCell>{product.lightSource}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <Pagination count={6} sx={{ mt: 2, display: "flex", justifyContent: "right",  }} />
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default ProductDetail;
