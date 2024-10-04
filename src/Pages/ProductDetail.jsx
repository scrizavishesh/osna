import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Box, Button, Typography, Container, CardMedia, CardContent, Card } from "@mui/material";
import Header from "../Layouts/Header";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import { getProductAccessories, getSingleProduct } from '../Utils/Apis';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadPDF from '../Layouts/DownloadPDF';
import Modal from '../Layouts/Modal';

const ProductDetail = () => {

    const baseUrl = 'https://dc.damio.in/';
    const token = localStorage.getItem('osna_token');

    // State for main image list and selected main image
    const [mainImageList, setMainImageList] = useState([]); // Holds the list of product images
    const [selectedImage, setSelectedImage] = useState(''); // Holds the currently selected main image
    const [product, setProduct] = useState({});
    const [productDescription, setProductDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [PDFData, setPDFData] = useState('');
    const [accessories, setAccessories] = useState([]);
    const [productAcccess, setproductAcccess] = useState('')

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
            console.log(response);
            if (response?.status === 200) {
                const productData = response?.data?.data;
                setProduct(productData);
                setProductDescription(productData.product_description || "");

                // Set mainImageList and the first image as the selected main image
                const imageList = Array.isArray(productData?.product_image) ? productData?.product_image : [];
                setMainImageList(imageList);
                if (imageList.length > 0) {
                    setSelectedImage(imageList[0]?.image); // Set the first image as the initial main image
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
        setOpen(true);
        setPDFData(pdf);
    };

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
                                        objectFit: "cover",  // Fills the container, but may crop parts of the image
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
                                <video width="100%" controls>
                                    <source src='https://dc.damio.in/assets/video/1727423588.Temperature%20transmitters%20_%20tasks,%20traits%20and%20technology%20_%20endresshauser.mp4' type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
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
                                        image={baseUrl + item?.accessory_image[0]?.image} // Replace with product image
                                        alt="green iguana"
                                    />
                                    <Typography gutterBottom variant="h6" component="div">
                                        {item?.product_accessory}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <DownloadPDF open={open} handleClose={handleClose} PDFData={PDFData} />
            <Footer />
        </>
    );
}

export default ProductDetail;
