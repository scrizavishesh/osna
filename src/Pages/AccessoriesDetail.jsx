import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Grid, Box, Button, Typography, Container } from "@mui/material";
import { getSingleAccessories } from '../Utils/Apis';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadPDF from '../Layouts/DownloadPDF';
import ReactPlayer from 'react-player';
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const AccessoriesDetail = () => {

    const baseUrl = 'https://dc.damio.in/';
    const token = localStorage.getItem('osna_token');

    // State for main image list and selected main image
    const [mainImageList, setMainImageList] = useState([]); // Holds the list of product images
    const [selectedImage, setSelectedImage] = useState(''); // Holds the currently selected main image
    const [product, setProduct] = useState({});
    const [productDescription, setProductDescription] = useState('');
    const [redirectToSignIn, setRedirectToSignIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [PDFData, setPDFData] = useState('');

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchProductResults(id);
        }
    }, [id]);

    const fetchProductResults = async (terms) => {
        try {
            const response = await getSingleAccessories(terms);
            if (response?.status === 200) {
                const productData = response?.data?.data;
                setProduct(productData);
                setProductDescription(productData.accessory_description || "");
                const imageList = Array.isArray(productData?.accessory_image) ? productData?.accessory_image : [];
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
                    {/* First Section: Image & Product Details */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Box
                                    component="img"
                                    src={baseUrl + selectedImage}
                                    alt="Main Product"
                                    sx={{
                                        width: "100%",
                                        height: "500px",
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

                        {/* Product Name and Description */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" fontWeight="bold" sx={{ color: '#0462b6', mb: 2 }}>
                                {product?.accessory_name || "Product Name"}
                            </Typography>

                            <Typography dangerouslySetInnerHTML={{ __html: productDescription }} />

                            <Button
                                onClick={() => handleOpenPDF(product?.accessory_document)}
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
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Product Videos</Typography>
                            <ReactPlayer
                                url={baseUrl + product?.accessory_video}
                                width="100%"
                                controls
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            {token && <DownloadPDF open={open} onClose={handleClosePDF} pdfData={PDFData} />}
        </>
    );
}

export default AccessoriesDetail;
