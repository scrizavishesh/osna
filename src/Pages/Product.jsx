import { useState, useEffect } from 'react';
import { Grid, Container, Typography, RadioGroup, FormControlLabel, Radio, Card, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GetCategoryProduct, GetPostCategory, GetPreCategory } from '../Utils/Apis';
import { toast } from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';

const Product = () => {
    const [category, setCategory] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [cardDetails, setCardDetails] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [navigationStack, setNavigationStack] = useState([]);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const navigate = useNavigate();
    const [hide, setHide] = useState(false);
    const baseUrl = 'https://dc.damio.in/';
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    useEffect(() => {
        preCategory();
    }, []);

    const preCategory = async () => {
        try {
            const response = await GetPreCategory();
            if (response?.status === 200) {
                toast.success("Got categories successfully");
                setCategory(response?.data?.data?.category_list);
                setCategoryData(response?.data?.data?.category_data);
                setLoading(false);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    const postCategory = async (id) => {
        try {
            const response = await GetPostCategory(id);
            if (response?.status === 200) {
                if (response.data.data.sub_category_list?.length > 0) {
                    setCategory(response?.data?.data?.sub_category_list);
                    setCategoryData(response?.data?.data?.sub_category_data);
                    setNavigationStack((prevStack) => [...prevStack, id]); // Push current category ID
                    setCurrentCategoryId(id);
                } else {
                    getProduct(id);
                }
                setLoading(false);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };
    const getProduct = async (id) => {
        setIsLoading(true);
        try {
            const response = await GetCategoryProduct(id);
            console.log(response, "product")
            if (response?.status === 200) {
                const newProducts = response?.data?.data;
                if (newProducts.length === 0) {
                    setHasMore(false);
                } else {
                    setCardDetails((prev) => [...prev, ...newProducts]);
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

    const handleBack = () => {
        if (navigationStack.length > 1) {
            const newStack = [...navigationStack];
            newStack.pop();
            const prevCategoryId = newStack[newStack.length - 1];
            setNavigationStack(newStack);
            setCurrentCategoryId(prevCategoryId);
            postCategory(prevCategoryId);
        } else {
            navigate(-1);  // fallback to the previous page
        }
    };



    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                            CATEGORY
                        </Typography>
                        {loading ? (
                            <Typography>Loading categories...</Typography>
                        ) : category.length > 0 ? (
                            <RadioGroup name="category">
                                {category.map((cat) => (
                                    <FormControlLabel
                                        onClick={() => postCategory(cat.id)}
                                        key={cat.id}
                                        value={cat.id}
                                        control={<Radio />}
                                        label={cat.category_name}
                                    />
                                ))}
                            </RadioGroup>
                        ) : (
                            <Typography>No categories available.</Typography>
                        )}
                        <Button variant="contained" onClick={handleBack} disabled={navigationStack.length <= 1}>
                            Back
                        </Button>
                    </Grid>
                    {!hide ? (
                        <>
                            <Grid item xs={12} md={9}>
                                <Box
                                    className="custom-scrollbar"
                                    sx={{
                                        height: '700px',
                                        overflowY: 'scroll',
                                        padding: 2,
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {parentCategory?.category_name} Category
                                        </Typography>
                                        <FormControl sx={{ minWidth: 120 }}>
                                            <InputLabel>Sort by</InputLabel>
                                            <Select defaultValue="Most Popular" label="Sort by">
                                                <MenuItem value="Most Popular">Most Popular</MenuItem>
                                                <MenuItem onClick={() => setLatest(1)} value="Latest">Latest</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Grid container spacing={2} mb={4}>
                                        {categoryData.length > 0 ? (
                                            categoryData.map((item, index) => (
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
                                                        <Box sx={{
                                                            width: '100%', height: 'auto', mb: 2, overflow: 'hidden',
                                                            '&:hover img': {
                                                                transform: 'scale(1.1)',
                                                            },
                                                        }}>
                                                            <Link to={`/products_Detail/${item.id}`}>
                                                                <img
                                                                    src={`${baseUrl}${item?.category_image}`}
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
                                                                {item?.category_name}
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
                                                                onClick={(e) => postCategory(item?.id)}
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
                                                No category available at the moment.
                                            </Typography>
                                        )}
                                    </Grid>

                                    {/* Lazy Loading Trigger */}
                                    <div ref={ref} />
                                    {isLoading && <p>Loading more category...</p>}
                                    {!hasMore && <p>No more category available.</p>}
                                </Box>
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12} md={9}>
                            <Box
                                className="custom-scrollbar"
                                sx={{
                                    height: '700px',
                                    overflowY: 'scroll',
                                    padding: 2,
                                    borderRadius: '8px',
                                }}
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        PRODUCTS
                                    </Typography>
                                    <FormControl sx={{ minWidth: 120 }}>
                                        <InputLabel>Sort by</InputLabel>
                                        <Select defaultValue="Most Popular" label="Sort by">
                                            <MenuItem value="Most Popular">Most Popular</MenuItem>
                                            <MenuItem onClick={() => setLatest(1)} value="Latest">Latest</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Grid container spacing={2} mb={4}>
                                    {cardDetails.length > 0 ? (
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

                                {/* Lazy Loading Trigger */}
                                <div ref={ref} />
                                {isLoading && <p>Loading more products...</p>}
                                {!hasMore && <p>No more products available.</p>}
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    );
};

export default Product;
