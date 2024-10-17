import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Grid, Box, Button, Typography, Container, CardMedia, CardContent, Card } from "@mui/material";
import { getProductAccessories, getSingleProduct } from '../Utils/Apis';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadPDF from '../Layouts/DownloadPDF';
import ReactPlayer from 'react-player';
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const ProductDetail = () => {
    const baseUrl = 'https://dc.damio.in/';
    const token = localStorage.getItem('osna_token');

    const [mainImageList, setMainImageList] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [product, setProduct] = useState({});
    const [accessories, setAccessories] = useState([]);
    const [redirectToSignIn, setRedirectToSignIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [PDFData, setPDFData] = useState('');

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchProductDetails(id);
            fetchProductAccessories(id);
        }
    }, [id]);

    const fetchProductDetails = async (productId) => {
        try {
            const response = await getSingleProduct(productId);
            if (response.status === 200) {
                const productData = response.data.data;
                setProduct(productData);
                const imageList = productData.product_image || [];
                setMainImageList(imageList);
                setSelectedImage(imageList[0]?.image || '');
            } else {
                console.error('Failed to fetch product details');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchProductAccessories = async (productId) => {
        try {
            const response = await getProductAccessories(productId);
            if (response.status === 200) {
                setAccessories(response.data.data);
            } else {
                console.error('Failed to fetch product accessories');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleOpenPDF = (pdf) => {
        if (!token) {
            setRedirectToSignIn(true);
            return;
        }
        setOpen(true);
        setPDFData(pdf);
    };

    if (redirectToSignIn) {
        return <Navigate to="/signin" replace />;
    }

    const handleClosePDF = () => {
        setOpen(false);
    };

    const openFancybox = (src, title) => {
        NativeFancybox.show([{ src, caption: title }]);
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ p: 3 }}>
                    {/* Product Image and Details */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Box
                                    component="img"
                                    src={baseUrl + selectedImage}
                                    alt="Main Product"
                                    sx={{
                                        width: "100%",
                                        height: "400px",
                                        objectFit: "cover",
                                        borderRadius: 2,
                                        cursor: "pointer",
                                    }}
                                    onClick={() => openFancybox(baseUrl + selectedImage, product?.product_name)}
                                />
                            </Box>
                            <Box sx={{ display: "flex", mt: 2, gap: 2 }}>
                                {mainImageList.map((image, index) => (
                                    <Box
                                        key={index}
                                        component="img"
                                        src={baseUrl + image?.image}
                                        alt={`Product ${index + 1}`}
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 2,
                                            objectFit: "cover",
                                            border: selectedImage === image?.image ? '2px solid #0462b6' : '1px solid #ddd',
                                            cursor: 'pointer',
                                            "&:hover": {
                                                border: "2px solid #FA8232"
                                            }
                                        }}
                                        onClick={() => setSelectedImage(image?.image)}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        {/* Product Details */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" fontWeight="bold" sx={{ color: '#0462b6', mb: 2 }}>
                                {product?.product_name || "Product Name"}
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 2 }}>
                                <strong>Category:</strong> {product?.category_name || "Category"}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                <strong>Sub Category:</strong> {product?.sub_category || "Sub Category"}
                            </Typography>

                            <Typography dangerouslySetInnerHTML={{ __html: product?.product_description }} />

                            <Button
                                onClick={() => handleOpenPDF(product?.document)}
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    mt: 3,
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    backgroundColor: '#FA8232',
                                    "&:hover": { backgroundColor: '#e97327' }
                                }}
                            >
                                View All
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Product Data & Videos */}
                    <Grid container spacing={3} sx={{ mt: 5 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Product Data</Typography>
                            <ul>
                                <li>Resolution: 2560 x 1936</li>
                                <li>Type: VISOR® Code Reader</li>
                                <li>Variant: Professional</li>
                                <li>Optics: Wide (integrated)</li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Product Videos</Typography>
                            <ReactPlayer
                                url={baseUrl + product?.video}
                                width="100%"
                                controls
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Related Products Section */}
                <Typography variant="h5" align="center" sx={{ mt: 6, mb: 4, color: '#0462b6' }}>
                    The VISOR® Vision Sensor Family
                </Typography>

                <Grid container spacing={3}>
                    {accessories.map((item, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={baseUrl + item?.accessory_image}
                                    alt="Accessory Image"
                                    sx={{ height: "auto" }}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        {item?.accessory_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item?.accessory_short_description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                        <Button
                                            to={`/accessories-detail/${item.id}`}
                                            component={Link}
                                            variant="contained"
                                            sx={{
                                                textTransform: 'none',
                                                padding: '5px 15px',
                                                backgroundColor: '#FA8232',
                                                "&:hover": { backgroundColor: '#e97327' }
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

            {token && <DownloadPDF open={open} onClose={handleClosePDF} pdfData={PDFData} />}
        </>
    );
}

export default ProductDetail;
