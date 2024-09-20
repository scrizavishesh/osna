import { Grid, Container, Typography, RadioGroup, FormControlLabel, Radio, Card, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header'
import Navbar from '../Layouts/Navbar'

const Product = () => {

    const categories = [
        'Vision Sensors',
        'VISOR® Code Reader',
        'Optical Sensors',
        'Ultrasonic Sensors',
        'Inductive Sensors',
        'Accessories',
        'Distance Sensors',
        'Color & Contrast Sensors',
        'Photoelectric Sensors',
        'GPS & Navigation',
        'Wearable Technology'
    ];

    const products = new Array(12).fill({
        title: 'Product Name',
        image: "./first_main.svg",
        description: 'Product Description'
    });

    return (
        <>
            <Grid sx={{ bgcolor: '#0462B6' }}>
                <Header />
            </Grid>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={4}>

                    {/* Left Section (Category + Advertisement) */}
                    <Grid item xs={12} md={3}>
                        {/* Category Section */}
                        <Grid item xs={12} sx={{ backgroundColor: '#FFF', p: 2 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                CATEGORY
                            </Typography>
                            <RadioGroup
                                name="category"
                                defaultValue="Vision Sensors"
                            >
                                {categories.map((category, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={category}
                                        control={<Radio />}
                                        label={category}
                                    />
                                ))}
                            </RadioGroup>
                        </Grid>

                        {/* Advertisement Section */}
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Card sx={{ p: 2, textAlign: 'center' }}>
                                <Box sx={{ mb: 2 }}>
                                    <img src="./adv.svg" alt="Advertisement" style={{ width: '100%', objectFit: 'cover' }} />
                                </Box>
                                <Typography
                                    sx={{
                                        fontSize: '24px',
                                        fontWeight: 600,
                                        lineHeight: '32px',
                                        textAlign: 'center',
                                        color: "#191C1F",
                                        mb: 1
                                    }}
                                >
                                    Optical Sensors for Factory Automation
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        lineHeight: '20px',
                                        textAlign: 'center',
                                        color: "#5f6c72",
                                        mb: 2
                                    }}
                                >
                                    The sensors of the F 10 series, available as LED and laser versions, form one of the most comprehensive series on the market in sub-miniature housings.
                                </Typography>
                                <Button variant="contained" sx={{ backgroundColor: '#FA8232', color: '#FFF' }}>
                                    View Details
                                </Button>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Product Section */}
                    <Grid item xs={12} md={9}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                OUR PRODUCTS
                            </Typography>
                            <FormControl sx={{ minWidth: 120 }}>
                                <InputLabel>Sort by</InputLabel>
                                <Select
                                    defaultValue="Most Popular"
                                    label="Sort by"
                                >
                                    <MenuItem value="Most Popular">Most Popular</MenuItem>
                                    <MenuItem value="Price">Price</MenuItem>
                                    <MenuItem value="Latest">Latest</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Grid container spacing={2} mb={4}>
                            {products.map((product, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card sx={{ p: 2, textAlign: 'center' }}>
                                        <Box sx={{ mb: 2 }}>
                                            <img src={product.image} alt={product.title} style={{ width: '100%', objectFit: 'cover' }} />
                                        </Box>
                                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                            {product.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 2 }}>
                                            {product.description}
                                        </Typography>
                                        <Button
                                            to="/sub_products"
                                            component={Link}
                                            variant="contained"
                                            sx={{ backgroundColor: '#FA8232', color: '#FFF' }}>
                                            View All
                                        </Button>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

export default Product;
