import { useState, useEffect } from 'react';
import { Grid, Container, Typography, RadioGroup, FormControlLabel, Radio, Card, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { GetCategorySubcategory, GetProduct } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';

const Product = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [response, setResponse] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [latest, setLatest] = useState('');
    const { ref, inView } = useInView({
        triggerOnce: false, 
        threshold: 0.1, 
    });

    useEffect(() => {
        getEmployess();
    }, []);

    const getEmployess = async () => {
        try {
            const response = await GetCategorySubcategory();
            if (response?.status === 200) {
                toast.success("Got categories successfully");
                setResponse(response?.data);
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
        getProduct(currentPage, latest);
    }, [inView, currentPage, latest]);

    const getProduct = async (page, latest) => {
        setIsLoading(true);
        try {
            const response = await GetProduct(page, latest);
            console.log(response, "all products")
            if (response?.status === 200) {
                const newProducts = response?.data?.data?.data;
                if (newProducts.length === 0) {
                    setHasMore(false); // No more products to load
                } else {
                    setcardDetails((prev) => [...prev, ...newProducts]); // Append new products to the existing list
                    setCurrentPage((prev) => prev + 1); // Increment the page number for next load
                    toast.success("Got Product successfully");
                }
            } else {
                toast.error("Failed to fetch products");
            }
        } catch (err) {
            toast.error(err?.message);
        }
        setIsLoading(false);
    };


    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    {/* Left Section (Category + Advertisement) */}
                    <Grid item xs={12} md={3}>
                        {/* Category Section */}
                        <Grid item xs={12} sx={{ backgroundColor: '#FFF', p: 2 }}>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
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
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        lineHeight: '20px',
                                        color: "#2c2c2c",
                                    }}
                                >
                                    Selected Category
                                    <br />
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 400,
                                            lineHeight: '20px',
                                            color: "#999999",
                                        }}
                                    >
                                        {selectedCategory.parent.name}
                                    </Typography>
                                    <Button onClick={() => setSelectedCategory(null)} sx={{
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        lineHeight: '20px',
                                    }}>
                                        Change Category
                                    </Button>
                                </Typography>
                            ) : (
                                <Typography variant="body1">Loading categories...</Typography>
                            )}

                            {/* Subcategory Section */}
                            {selectedCategory && selectedCategory.subcategories?.length > 0 && !selectedSubCategory && (
                                <>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
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
                                <Typography variant="subtitle1" sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    color: "#2c2c2c",
                                }}>
                                    Selected Subcategory:
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 400,
                                            lineHeight: '20px',
                                            color: "#999999",
                                        }}
                                    >
                                        {selectedSubCategory.subcategory_name}
                                    </Typography>
                                    <Button onClick={() => setSelectedSubCategory(null)} sx={{
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        lineHeight: '20px',
                                    }}>
                                        Change Subcategory
                                    </Button>
                                </Typography>
                            )}

                            {/* Type Section */}
                            {selectedSubCategory && selectedSubCategory.types?.length > 0 && !selectedType && (
                                <>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
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

                    </Grid>

                    {/* Product Section */}
                    <Grid item xs={12} md={9}>
                        {/* Scrollable Box */}
                        <Box
                            className="custom-scrollbar" // Add this class for custom scrollbar styling
                            sx={{   // Set the background color
                                height: '700px',              // Set a fixed height for the scrollable section
                                overflowY: 'scroll',          // Enable vertical scrolling
                                padding: 2,                   // Optional padding
                                borderRadius: '8px',          // Optional: Set rounded corners
                            }}
                        >
                            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    OUR PRODUCTS
                                </Typography>
                                <FormControl sx={{ minWidth: 120 }}>
                                    <InputLabel>Sort by</InputLabel>
                                    <Select defaultValue="Most Popular" label="Sort by">
                                        <MenuItem value="Most Popular">Most Popular</MenuItem>
                                        <MenuItem onClick={(e) => setLatest(1)} value="Latest">Latest</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Grid container spacing={2} mb={4}>
                                {/* Case: Products exist for selected Type */}
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
                                ) : selectedType && selectedType.products.length === 0 ? (
                                    <Typography variant="h6" sx={{ color: 'red', mt: 2 }}>
                                        No products found for this type.
                                    </Typography>
                                ) : selectedSubCategory && selectedSubCategory.products.data.length > 0 ? (
                                    selectedSubCategory?.products?.data.map((item, index) => (
                                        <Grid
                                            item
                                            xs={12} sm={6} md={4} lg={4} mb={4}
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
                                                {/* Image Section (Clickable) */}
                                                <Box sx={{
                                                    width: '100%', height: 'auto', mb: 2, overflow: 'hidden',  // Ensure the image doesn't overflow the container
                                                    '&:hover img': {
                                                        transform: 'scale(1.1)',  // Zoom on hover
                                                    },
                                                }}>
                                                    <Link to={`/products_Detail/${item.id}`}>
                                                        <img
                                                            src={baseUrl + item?.product_image?.image_0}
                                                            alt="Product Image"
                                                            style={{
                                                                width: '100%', objectFit: 'cover', height: '150px', transition: 'transform 0.3s ease',  // Smooth transition for zoom
                                                                '&:hover': {
                                                                    transform: 'scale(1.1)',  // Zoom on hover
                                                                },
                                                            }}
                                                        />
                                                    </Link>
                                                </Box>

                                                {/* Middle Section: Product Name & Description */}
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

                                                {/* Footer Section: Button */}
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
                                                        View All
                                                    </Button>
                                                </Box>

                                            </Card>
                                        </Grid>
                                    ))
                                ) : selectedSubCategory && selectedSubCategory.products.data.length === 0 ? (
                                    <Typography variant="h6" sx={{ color: 'red', mt: 2 }}>
                                        No products found for this search.
                                    </Typography>
                                ) : cardDetails.length > 0 ? (
                                    cardDetails.map((item, index) => (
                                        <Grid
                                            item
                                            xs={12} sm={6} md={4} lg={4} mb={4}
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
                                                {/* Image Section (Clickable) */}
                                                <Box sx={{
                                                    width: '100%', height: 'auto', mb: 2, overflow: 'hidden',  // Ensure the image doesn't overflow the container
                                                    '&:hover img': {
                                                        transform: 'scale(1.1)',  // Zoom on hover
                                                    },
                                                }}>
                                                    <Link to={`/products_Detail/${item.id}`}>
                                                        <img
                                                            src={baseUrl + item?.product_image[0]?.image}
                                                            alt="Product Image"
                                                            style={{
                                                                width: '100%', objectFit: 'cover', height: '150px', transition: 'transform 0.3s ease',  // Smooth transition for zoom
                                                                '&:hover': {
                                                                    transform: 'scale(1.1)',  // Zoom on hover
                                                                },
                                                            }}
                                                        />
                                                    </Link>
                                                </Box>

                                                {/* Middle Section: Product Name & Description */}
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

                                                {/* Footer Section: Button */}
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
                                                        View All
                                                    </Button>
                                                </Box>

                                            </Card>
                                        </Grid>
                                    ))
                                ) : (
                                    <Typography variant="h6" sx={{ color: 'red', mt: 2 }}>
                                        No products available at the moment.
                                    </Typography>
                                )}
                            </Grid>

                            {/* Lazy Loading Trigger */}
                            <div ref={ref} />
                            {isLoading && <p>Loading more products...</p>}
                            {!hasMore && <p>No more products available.</p>}
                        </Box>
                    </Grid>

                </Grid>
            </Container>



        </>
    );
};

export default Product;
