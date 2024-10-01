import { useState, useEffect } from 'react';
import { Grid, Container, Typography, RadioGroup, FormControlLabel, Radio, Card, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import Navbar from '../Layouts/Navbar';
import { GetCategorySubcategory, GetProduct } from '../Utils/Apis';
import { toast } from 'react-hot-toast';

const Product = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [response, setResponse] = useState(null); // Initial state set to `null` instead of `undefined`

    useEffect(() => {
        getEmployess();
    }, []);

    const getEmployess = async () => {
        try {
            const response = await GetCategorySubcategory();
            console.log(response, "get category");
            if (response?.status === 200) {
                toast.success("Got categories successfully");
                setResponse(response?.data); // Save the data from the response
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    // Handle category selection
    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(response?.data?.find((cat) => cat.parent.id === parseInt(categoryId)));
        setSelectedSubCategory(null);  // Reset subcategory
        setSelectedType(null);         // Reset type
    };

    // Handle subcategory selection
    const handleSubCategoryChange = (event) => {
        const subcategoryId = event.target.value;
        setSelectedSubCategory(
            selectedCategory.subcategories.find((sub) => sub.id === parseInt(subcategoryId))
        );
        setSelectedType(null);         // Reset type
    };

    // Handle type selection
    const handleTypeChange = (event) => {
        setSelectedType(
            selectedSubCategory.types.find((type) => type.id === parseInt(event.target.value))
        );
    };

    const [cardDetails, setcardDetails] = useState([]);
    const baseUrl = 'https://dc.damio.in/'

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const response = await GetProduct();
            console.log(response, "get product");
            if (response?.status === 200) {
                toast.success("Got Product successfully");
                setcardDetails(response?.data?.data);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

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

                            {/* If no category is selected, show categories list */}
                            {!selectedCategory && response?.data ? (
                                <RadioGroup name="category" onChange={handleCategoryChange}>
                                    {response.data.map((category) => (
                                        <FormControlLabel
                                            key={category.parent.id}
                                            value={category.parent.id}
                                            control={<Radio />}
                                            label={category.parent.name}
                                        />
                                    ))}
                                </RadioGroup>
                            ) : selectedCategory ? (
                                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                    Selected Category: {selectedCategory.parent.name}
                                    <Button onClick={() => setSelectedCategory(null)} sx={{ ml: 2 }}>
                                        Change Category
                                    </Button>
                                </Typography>
                            ) : (
                                <Typography variant="body1">Loading categories...</Typography>
                            )}

                            {/* Subcategory Section */}
                            {selectedCategory && selectedCategory.subcategories?.length > 0 && !selectedSubCategory && (
                                <>
                                    <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: 600 }}>
                                        SUBCATEGORY
                                    </Typography>
                                    <RadioGroup name="subcategory" onChange={handleSubCategoryChange}>
                                        {selectedCategory.subcategories.map((subCategory) => (
                                            <FormControlLabel
                                                key={subCategory.id}
                                                value={subCategory.id}
                                                control={<Radio />}
                                                label={subCategory.subcategory_name}
                                            />
                                        ))}
                                    </RadioGroup>
                                </>
                            )}

                            {/* Show selected subcategory */}
                            {selectedSubCategory && (
                                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                    Selected Subcategory: {selectedSubCategory.subcategory_name}
                                    <Button onClick={() => setSelectedSubCategory(null)} sx={{ ml: 2 }}>
                                        Change Subcategory
                                    </Button>
                                </Typography>
                            )}

                            {/* Type Section */}
                            {selectedSubCategory && selectedSubCategory.types?.length > 0 && !selectedType && (
                                <>
                                    <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: 600 }}>
                                        TYPE
                                    </Typography>
                                    <RadioGroup name="type" onChange={handleTypeChange}>
                                        {selectedSubCategory.types.map((type) => (
                                            <FormControlLabel
                                                key={type.id}
                                                value={type.id}
                                                control={<Radio />}
                                                label={type.type_name}
                                            />
                                        ))}
                                    </RadioGroup>
                                </>
                            )}

                            {/* Show selected type */}
                            {selectedType && (
                                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                    Selected Type: {selectedType.type_name}
                                    <Button onClick={() => setSelectedType(null)} sx={{ ml: 2 }}>
                                        Change Type
                                    </Button>
                                </Typography>
                            )}
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
                                        color: '#191C1F',
                                        mb: 1,
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
                                        color: '#5f6c72',
                                        mb: 2,
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
                                <Select defaultValue="Most Popular" label="Sort by">
                                    <MenuItem value="Most Popular">Most Popular</MenuItem>
                                    <MenuItem value="Price">Price</MenuItem>
                                    <MenuItem value="Latest">Latest</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Grid container spacing={2} mb={4}>
                            {/* Display products under the selected type if present */}
                            {selectedType && selectedType.products.length > 0 ? (
                                selectedType.products.map((product) => (
                                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                                        <Card sx={{ p: 2 }}>
                                            <Typography>{product.product_name}</Typography>
                                            <img
                                                src='./Product_Main_Image.png'
                                                alt={product.product_name}
                                                style={{ width: '100%', objectFit: 'cover' }}
                                            />
                                        </Card>
                                    </Grid>
                                ))
                            ) : selectedSubCategory && selectedSubCategory.products.data.length > 0 ? (
                                selectedSubCategory?.products?.data.map((product) => (
                                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                                        <Card sx={{ p: 2, textAlign: 'center' }}>
                                            <Box sx={{ mb: 2 }}>
                                                <img src="./Product_Main_Image.png" alt={product.title} style={{ width: '100%', objectFit: 'cover' }} />
                                            </Box>
                                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                                {product.product_name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mb: 2 }}>
                                                {product.short_description}
                                            </Typography>
                                            <Button
                                                to={`/products_Detail/${product.id}`}
                                                component={Link}
                                                variant="contained"
                                                sx={{ backgroundColor: '#FA8232', color: '#FFF' }}
                                            >
                                                View All
                                            </Button>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <>
                                    {cardDetails.map((item, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                                            <Card sx={{ p: 2, textAlign: 'center' }}>
                                                <Box sx={{ mb: 2 }}>
                                                    <img src="./Product_Main_Image.png" alt={item.title} style={{ width: '100%', objectFit: 'cover' }} />
                                                </Box>
                                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                                    {item.product_name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 2 }}>
                                                    {item.short_description}
                                                </Typography>
                                                <Button
                                                    to={`/products_Detail/${item.id}`}
                                                    component={Link}
                                                    variant="contained"
                                                    sx={{ backgroundColor: '#FA8232', color: '#FFF' }}
                                                >
                                                    View All
                                                </Button>
                                            </Card>
                                        </Grid>
                                    ))}
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default Product;
