import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Grid, Box, Button, Typography, Container, CardMedia, CardContent, Card } from "@mui/material";
import Header from "../Layouts/Header";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import { getProductAccessories, getSingleProduct } from '../Utils/Apis';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadPDF from '../Layouts/DownloadPDF';
import Modal from '../Layouts/Modal';
import ReactPlayer from 'react-player';

const ProductDetail = () => {

    const baseUrl = 'https://dc.damio.in/';
    const token = localStorage.getItem('osna_token');

    const [mainImageList, setMainImageList] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [product, setProduct] = useState({});
    const [productDescription, setProductDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [PDFData, setPDFData] = useState('');
    const [accessories, setAccessories] = useState([]);
    const [productAcccess, setproductAcccess] = useState('');
    const [redirectToSignIn, setRedirectToSignIn] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchProductResults(id);
            fetchProductAccessories(id);
        }
    }, [id]);

    const fetchProductResults = async (terms) => {
        try {
            const response = await getSingleProduct(terms);
            console.log(response, "Single Product");
            if (response?.status === 200) {
                const productData = response?.data?.data;
                setProduct(productData);
                setProductDescription(productData.product_description || "");
                const imageList = Array.isArray(productData?.product_image) ? productData?.product_image : [];
                setMainImageList(imageList);
                if (imageList.length > 0) {
                    setSelectedImage(imageList[0]?.image);
                }
            } else {
                console.error('Failed to fetch product details');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const fetchProductAccessories = async (terms) => {
        try {
            const response = await getProductAccessories(terms);
            console.log(response, "Accessories");
            if (response?.status === 200) {
                setAccessories(response?.data?.data);
                setproductAcccess(response?.data?.data?.accessory_description);
            } else {
                console.error('Failed to fetch product details');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleOpen = (pdf) => {
        if (!token) {
            console.log('User is not authenticated. Redirecting to sign in page.');
            setRedirectToSignIn(true);
            return;
        }
        setOpen(true);
        setPDFData(pdf);
    };

    if (redirectToSignIn) {
        return <Navigate to="/signin" replace />;
    }
    const handleClose = () => {
        setOpen(false);
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
                                    src={baseUrl + selectedImage}
                                    alt="Main Product"
                                    sx={{
                                        width: "100%",
                                        height: "500px",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        borderRadius: 2
                                    }}
                                />

                            </Box>
                            <Box sx={{ display: "flex", mt: 2 }}>
                                {/* Product Carousel */}
                                {mainImageList.map((image, index) => (
                                    <Box
                                        key={index}
                                        component="img"
                                        src={baseUrl + image?.image}
                                        alt={`Product ${index + 1}`}
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            objectFit: "cover", // Makes sure the image covers the entire box, even if cropped slightly
                                            mx: 1,
                                            cursor: "pointer",
                                            border: selectedImage === image?.image ? '2px solid orange' : 'none'
                                        }}
                                        onClick={() => setSelectedImage(image?.image)} // Set the clicked image as the main image
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
                                    {' '} {product?.category_name || "Category Name"}
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
                                    {' '} {product?.sub_category || "Sub Category"}
                                </Typography>
                            </Grid>
                            <Typography>
                                <div
                                    dangerouslySetInnerHTML={{ __html: productDescription }}
                                />
                            </Typography>
                            <Button
                                onClick={(e) => handleOpen(product?.document)}
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
                                <ReactPlayer
                                    url={baseUrl + product?.video}
                                    width="100%"
                                    controls
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Third Container: Related Product Details */}
                <Typography variant="h5" color="primary" align="center" sx={{ marginBottom: '2rem' }}>
                    The VISOR® Vision Sensor Family Offers the Right Product for Every Application
                </Typography>


                <Grid container spacing={2}>
                    {accessories.map((item, index) => (
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        image={baseUrl + item?.accessory_image} // Replace with product image
                                        alt="green iguana"
                                    />
                                    <Typography gutterBottom variant="h6" component="div">
                                        {item?.accessory_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item?.accessory_short_description}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',  // Use colon instead of "="
                                            justifyContent: 'center',
                                            mt: 3 // Corrected syntax
                                        }}
                                    >
                                        <Button
                                            to={`/accessories-detail/${item.id}`}
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
                                            View Details
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {token && <DownloadPDF open={open} onClose={handleClose} pdfData={PDFData} />}
            <Footer />
        </>
    );
}

export default ProductDetail;